import { useState } from "react";

export const LeadForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);

    // Grabbing form data PLUS background data
    const data = {
      fullName: formData.get("fullName"),
      phoneNumber: formData.get("phoneNumber"),
      landingPageUrl: window.location.href,       // Captures the full page URL
      submissionDate: new Date().toISOString(),   // Captures the exact date and time
    };

    try {
      await fetch("https://hooks.zapier.com/hooks/catch/25429357/uclzmpn/", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          event_category: 'Lead',
          event_label: 'SODIC Interest Form',
          value: 1.0,
          currency: 'EGP',
          send_to: 'AW-17103245801'
        });
      }

      setIsSuccess(true);
      e.target.reset();
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
        <h3 className="text-emerald-900 font-bold text-lg mb-2">Thank You!</h3>
        <p className="text-emerald-700 text-sm">Your details have been received. We will be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto p-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 w-full transition-all">
      <div className="text-center mb-2">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">REGISTER YOUR INTEREST</h3>
        <p className="text-xs text-slate-500 mt-1">Receive floor plans, updated availability, and payment breakdowns</p>
      </div>

      <div>
        <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          required
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all"
        />
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          type="tel"
          name="phoneNumber"
          required
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-2 bg-slate-900 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider hover:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-md"
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>

      <p className="text-[11px] text-center text-slate-500 leading-relaxed mt-1">
        By submitting, you agree to receive communications from properties-sa.com regarding real estate projects.
      </p>
    </form>
  );
};

export default LeadForm;
