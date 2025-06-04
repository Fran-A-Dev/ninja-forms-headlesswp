"use server";

export async function submitForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Please fill in all fields" };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result.error || "Submission failed" };
    }

    return {
      success: "Thank you for your message! We will get back to you soon.",
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to submit form",
    };
  }
}
