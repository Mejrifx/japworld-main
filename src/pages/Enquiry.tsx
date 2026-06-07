import { useState } from "react";
import { Send, CheckCircle, Mail, User, Phone, Building2, Car, MessageSquare, Coins, X } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { useSubmitEnquiry } from "@/hooks/useEnquiries";

const Enquiry = () => {
  const submitEnquiry = useSubmitEnquiry();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    vehicle_interest: "",
    budget_range: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await submitEnquiry.mutateAsync(form);
      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        vehicle_interest: "",
        budget_range: "",
        message: "",
      });
      // Reset after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      console.error("Error submitting enquiry:", err);
      setError(err?.message || "Failed to submit enquiry. Please try again or contact us directly.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary/60 text-sm font-display tracking-[0.3em] mb-4 uppercase">
            お問い合わせ
          </p>
          <h1 className="font-display text-6xl md:text-7xl text-foreground mb-6 tracking-tight text-balance">
            Enquire About Import
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Tell us about your requirements and we'll get back to you with a tailored solution for importing your dream vehicle from Japan.
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="mb-8 border-shoji bg-emerald-400/10 border-emerald-400/30 p-6 animate-fade-in">
            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-display text-lg text-emerald-400 mb-2">Enquiry Submitted Successfully!</h3>
                <p className="text-muted-foreground text-sm">
                  Thank you for your enquiry. Our team will review your request and get back to you within 24 hours.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-8 border-shoji bg-red-400/10 border-red-400/30 p-6 animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="h-6 w-6 rounded-full bg-red-400/20 flex items-center justify-center flex-shrink-0 mt-1">
                <X className="h-4 w-4 text-red-400" />
              </div>
              <div>
                <h3 className="font-display text-lg text-red-400 mb-2">Submission Failed</h3>
                <p className="text-muted-foreground text-sm">{error}</p>
                <p className="text-muted-foreground text-sm mt-2">
                  Please try again or contact us directly at{" "}
                  <a href="mailto:Japworldofficial@gmail.com" className="text-primary hover:underline">
                    Japworldofficial@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-shoji bg-card/40 p-8 relative">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary/40 rounded-sm" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-primary/40 rounded-sm" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-primary/40 rounded-sm" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-primary/40 rounded-sm" />

            <h2 className="font-display text-2xl text-foreground mb-6 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Your Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2 font-medium">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-background/60 border border-border/60 text-foreground px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                  placeholder="John Smith"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2 font-medium">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-background/60 border border-border/60 text-foreground px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                  placeholder="john@company.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2 font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full bg-background/60 border border-border/60 text-foreground px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                  placeholder="+44 7700 900000"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2 font-medium">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full bg-background/60 border border-border/60 text-foreground px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                  placeholder="Your Company Ltd"
                />
              </div>
            </div>
          </div>

          <div className="border-shoji bg-card/40 p-8 relative">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary/40 rounded-sm" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-primary/40 rounded-sm" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-primary/40 rounded-sm" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-primary/40 rounded-sm" />

            <h2 className="font-display text-2xl text-foreground mb-6 flex items-center gap-2">
              <Car className="h-5 w-5 text-primary" />
              Vehicle Requirements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vehicle Interest */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2 font-medium">
                  Vehicle Type / Model
                </label>
                <input
                  type="text"
                  name="vehicle_interest"
                  value={form.vehicle_interest}
                  onChange={handleChange}
                  className="w-full bg-background/60 border border-border/60 text-foreground px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                  placeholder="e.g., Toyota Land Cruiser 70 Series"
                />
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2 font-medium">
                  Budget Range
                </label>
                <select
                  name="budget_range"
                  value={form.budget_range}
                  onChange={handleChange}
                  className="w-full bg-background/60 border border-border/60 text-foreground px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                >
                  <option value="">Select your budget</option>
                  <option value="Under £10,000">Under £10,000</option>
                  <option value="£10,000 - £20,000">£10,000 - £20,000</option>
                  <option value="£20,000 - £40,000">£20,000 - £40,000</option>
                  <option value="£40,000 - £60,000">£40,000 - £60,000</option>
                  <option value="£60,000+">£60,000+</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="mt-6">
              <label className="block text-sm text-muted-foreground mb-2 font-medium">
                Your Message *
              </label>
              <textarea
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                className="w-full bg-background/60 border border-border/60 text-foreground px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none"
                placeholder="Tell us about your requirements, timeline, and any specific vehicles you're interested in..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitEnquiry.isPending}
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base font-medium transition-all disabled:opacity-50"
            >
              {submitEnquiry.isPending ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Enquiry
                </>
              )}
            </button>
          </div>
        </form>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 border-shoji bg-card/40">
            <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              Email us directly at
            </p>
            <a href="mailto:Japworldofficial@gmail.com" className="text-sm text-primary hover:underline">
              Japworldofficial@gmail.com
            </a>
          </div>
          <div className="text-center p-6 border-shoji bg-card/40">
            <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              Call us on
            </p>
            <a href="tel:+81705552370" className="text-sm text-primary hover:underline">
              +81 70-5555-2370
            </a>
          </div>
          <div className="text-center p-6 border-shoji bg-card/40">
            <CheckCircle className="h-8 w-8 text-primary mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              Response time
            </p>
            <p className="text-sm text-foreground font-medium">
              Within 24 hours
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Enquiry;
