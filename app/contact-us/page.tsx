import { ContactForm } from "./contact-form";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-300 mb-8">Contact Us</h1>
        <ContactForm />
      </div>
    </main>
  );
}
