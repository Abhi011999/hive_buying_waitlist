"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { MessageCircle, Send, Phone, Mail } from "lucide-react";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const whatsappNumber = "5vzeno"; // Same as existing WhatsApp link
  const whatsappLink = `https://wa.link/${whatsappNumber}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (!message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    setLoading(true);

    // For now, we'll just show success - you can integrate with your backend later
    // This could be connected to Notion, email, or any other service
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Your message has been sent! We'll get back to you soon.");
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-background pb-20 sm:pb-0">
      <Header />
      <div className="mx-auto max-w-2xl px-4 pt-24 sm:px-6 sm:pt-28">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Support
          </h1>
          <p className="mt-2 text-base text-foreground/60">
            Need help? Reach out to our team and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* Quick contact options */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border-2 border-green-200 bg-green-50 p-5 transition hover:border-green-300 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-green-800">Chat on WhatsApp</p>
              <p className="text-sm text-green-600">Get instant support</p>
            </div>
          </a>

          <a
            href="mailto:support@hivebuying.com"
            className="flex items-center gap-4 rounded-2xl border-2 border-border bg-accent/20 p-5 transition hover:border-accent hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Email Us</p>
              <p className="text-sm text-foreground/60">support@hivebuying.com</p>
            </div>
          </a>
        </div>

        {/* Contact form */}
        <div className="rounded-2xl border-2 border-border p-6 sm:p-8">
          <h2 className="mb-6 text-xl font-bold text-foreground">
            Send us a message
          </h2>

          {submitted ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Send className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Message Sent!
              </h3>
              <p className="mt-2 text-sm text-foreground/60">
                Our team will get back to you within 24 hours.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setName("");
                  setEmail("");
                  setPhone("");
                  setMessage("");
                }}
                variant="outline"
                className="mt-4"
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Your phone number"
                    value={phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                      setPhone(value);
                    }}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <textarea
                  id="message"
                  placeholder="How can we help you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </div>

        {/* FAQ link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-foreground/50">
            Looking for answers?{" "}
            <Link href="/faqs" className="font-medium text-foreground underline underline-offset-4">
              Check our FAQs
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
