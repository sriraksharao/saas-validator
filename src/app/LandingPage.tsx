'use client';

import ValidationReport from '@/components/ui/ValidationReport';
import {
  Check,
  Sparkles,
  Star,
  Rocket,
} from 'lucide-react';
import { marked } from 'marked';
import { useState } from 'react';


export default function LandingPage() {

    const [idea, setIdea] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    setError('');
    setResult('');

    try {
      const res = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data.result);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to connect to validation service.');
    } finally {
      setLoading(false);
    }
  };

      const rawHtml :any = marked.parse(result);
  
  return (
    <main className="bg-white text-gray-800">
      {/* Hero */}
      <section className="py-28 px-6 md:px-20 bg-gradient-to-br from-orange-50 via-purple-50 to-green-50 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Validate Your SaaS Idea with <span className="text-orange-600">SaVi</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Instant feedback. Real demand. Smarter decisions — before you build anything.
        </p>

        <div className="mt-10 max-w-2xl mx-auto">
          <textarea
            className="w-full rounded-lg border border-gray-300 p-4 text-gray-800 shadow-sm focus:ring-2 focus:ring-purple-400"
            rows={5}
            placeholder="Paste your SaaS idea here..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-4 inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition text-lg shadow disabled:opacity-50"
          >
            {loading ? 'Validating...' : 'Validate My Idea'}
            <Rocket className="ml-2 h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 text-red-600 text-sm font-medium">{error}</div>
        )}

        {result && <ValidationReport content={result} />}

      </section>

      {/* ...rest of the original sections (features, testimonials, pricing, etc.) */}

      {/* Features */}
      <section className="py-24 px-6 md:px-20 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">Why Use SaVi?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: <Sparkles size={32} />, title: "Instant Feedback", desc: "Get a full analysis on your idea in seconds — no setup needed." },
            { icon: <Check size={32} />, title: "No Signups", desc: "Just paste your idea and go. No accounts, no onboarding friction." },
            { icon: <Star size={32} />, title: "Clear Reports", desc: "Get validation scores, monetization tips, and market insight." },
          ].map(({ icon, title, desc }, i) => (
            <div key={i} className="p-8 bg-gray-50 rounded-2xl border border-gray-200 hover:shadow-lg transition">
              <div className="mb-4 text-purple-700">{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-green-50 py-24 px-6 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            "Paste your SaaS idea",
            "Get AI-powered validation",
            "Download your detailed report",
          ].map((step, i) => (
            <div key={i} className="p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-green-600 text-2xl font-bold mb-4">Step {i + 1}</div>
              <p className="text-gray-700">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-20 bg-gradient-to-r from-purple-50 to-orange-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">Loved by Solo Builders</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              name: "Alex P.",
              quote: "SaVi saved me weeks of building the wrong thing. Best tool for indie hackers!",
            },
            {
              name: "Neha S.",
              quote: "I used SaVi before building my AI product. It gave me clear direction to pivot early.",
            },
          ].map(({ name, quote }, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-8 border border-gray-100">
              <p className="italic text-gray-700">“{quote}”</p>
              <p className="mt-4 font-semibold text-orange-700">– {name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 md:px-20 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">Simple Pricing</h2>
        <div className="flex flex-col md:flex-row gap-10 justify-center text-center">
          {/* Free Plan */}
          <div className="flex-1 bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:shadow transition">
            <h3 className="text-xl font-bold text-green-700">Free Plan</h3>
            <p className="text-4xl font-extrabold text-gray-900 my-4">$0</p>
            <p className="text-gray-600 mb-6">Basic validation • Limited ideas</p>
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition">
              Try for Free
            </button>
          </div>

          {/* Pro Plan */}
          <div className="flex-1 bg-orange-50 p-8 rounded-2xl border border-orange-200 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-orange-700">Pro Plan</h3>
            <p className="text-4xl font-extrabold text-gray-900 my-4">$5/mo</p>
            <p className="text-gray-700 mb-6">Unlimited ideas • Premium reports • Export to PDF</p>
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-3 rounded-lg transition">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 md:px-20 bg-gradient-to-r from-green-200 via-purple-100 to-orange-100 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Start validating smarter. Before you build.
        </h2>
        <p className="text-gray-700 text-lg max-w-xl mx-auto mb-8">
          SaVi helps founders skip guesswork and focus on ideas that matter.
        </p>
        <button className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-lg rounded-lg shadow transition">
          Launch SaVi Now <Rocket size={20} />
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-sm text-gray-500 bg-white border-t">
        © {new Date().getFullYear()} SaVi – Built for indie founders & solo devs.
      </footer>
      </main>
  );
}
