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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Upload failed");
      }

      setImageUrl(result.secure_url);
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to upload image",
      });
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSubmit(formData: FormData) {
    if (imageUrl) {
      formData.append("imageUrl", imageUrl);
    }
    const result = await submitForm(formData);
    if ("error" in result) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({ type: "success", text: result.success });
      setImageUrl(null);
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

        <div>
          <label htmlFor="image" className="block text-yellow-300 mb-2">
            Image (Optional)
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-3 rounded bg-black/50 border border-yellow-500/20 text-yellow-200 focus:border-yellow-500/60 focus:outline-none"
          />
          {isUploading && (
            <p className="mt-2 text-yellow-300">Uploading image...</p>
          )}
          {imageUrl && (
            <div className="mt-2">
              <img
                src={imageUrl}
                alt="Uploaded"
                className="max-w-xs rounded border border-yellow-500/20"
              />
            </div>
          )}
        </div>

        <SubmitButton />
      </Form>
    </div>
  );
}
