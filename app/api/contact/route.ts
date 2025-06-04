// pages/api/contact.js (or app/api/contact/route.js for App Router)
import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    // Validate form data
    const data: ContactFormData = await request.json();

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Prepare the mutation input
    const mutation = `
      mutation SubmitForm($input: SubmitFormInput!) {
        submitForm(input: $input) {
          success
          message
          errors {
            fieldId
            message
            slug
          }
        }
      }
    `;

    // Send to WordPress GraphQL endpoint
    const wpResponse = await fetch(
      `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.WP_AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            input: {
              formId: 1,
              data: [
                { id: 1, value: data.name },
                { id: 2, value: data.email },
                { id: 3, value: data.message },
              ],
              clientMutationId: "contact-form-submission",
            },
          },
        }),
      }
    );

    const response = await wpResponse.json();

    if (!wpResponse.ok || response.errors) {
      console.error("GraphQL Error:", response.errors);
      throw new Error(response.errors?.[0]?.message || "Submission failed");
    }

    return NextResponse.json(
      { success: true, message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { error: "Form submission failed" },
      { status: 500 }
    );
  }
}

// Optionally prevent non-POST requests
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
