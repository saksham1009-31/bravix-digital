import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const { name, email, projectType, budget, message, honeypot } = body || {};

    // Honeypot anti-spam check
    if (honeypot) {
      return NextResponse.json(
        { success: false, error: "Spam detected." },
        { status: 400 }
      );
    }

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!projectType || typeof projectType !== "string") {
      return NextResponse.json(
        { success: false, error: "Please select a project type." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Please provide a project description (at least 10 characters)." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanBudget = budget || "Not specified";
    const cleanMessage = message.trim();

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();

    if (!accessKey) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Web3Forms Access Key is not configured. Please add WEB3FORMS_ACCESS_KEY to your .env.local file.",
        },
        { status: 500 }
      );
    }

    // Official Web3Forms API endpoint
    const web3formsResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New Project Enquiry: ${cleanName} (${projectType})`,
        from_name: "BRAVIX Digital Agency",
        name: cleanName,
        email: cleanEmail,
        "Project Type": projectType,
        "Budget Range": cleanBudget,
        "Project Description": cleanMessage,
        botcheck: honeypot || "",
      }),
    });

    let data;
    try {
      data = await web3formsResponse.json();
    } catch {
      data = {
        success: false,
        message: "Unexpected response received from Web3Forms service.",
      };
    }

    if (!web3formsResponse.ok || !data.success) {
      return NextResponse.json(
        {
          success: false,
          error: data.message || "Failed to submit enquiry through Web3Forms.",
        },
        { status: web3formsResponse.status >= 400 ? web3formsResponse.status : 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for reaching out! Your project enquiry has been submitted. Our team will review your requirements and respond within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[CONTACT_API_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Internal server error. Please try again or email us directly at ssakkssham@gmail.com.",
      },
      { status: 500 }
    );
  }
}

