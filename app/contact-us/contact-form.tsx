"use client";

import Form from "next/form";
import { useFormStatus } from "react-dom";
import { submitForm } from "./actions";
import { useState } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full py-3 px-6 rounded bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition-colors ${
        pending ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}

export function ContactForm() {
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(formData: FormData) {
    const result = await submitForm(formData);
    if ("error" in result) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({ type: "success", text: result.success });
    }
  }

  return (
    <div className="space-y-6">
      {message && (
        <div
          className={`p-4 rounded ${
            message.type === "success"
              ? "bg-green-500/20 text-green-300 border border-green-500/20"
              : "bg-red-500/20 text-red-300 border border-red-500/20"
          }`}
        >
          {message.text}
        </div>
      )}

      <Form action={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-yellow-300 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full p-3 rounded bg-black/50 border border-yellow-500/20 text-yellow-200 focus:border-yellow-500/60 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-yellow-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full p-3 rounded bg-black/50 border border-yellow-500/20 text-yellow-200 focus:border-yellow-500/60 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-yellow-300 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full p-3 rounded bg-black/50 border border-yellow-500/20 text-yellow-200 focus:border-yellow-500/60 focus:outline-none"
          />
        </div>

        <SubmitButton />
      </Form>
    </div>
  );
}
