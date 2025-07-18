// app/consent/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ConsentPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const handleContinue = () => {
    if (agreed) {
      router.push("/api/line-login"); // หรือ redirect ไปยัง LINE Login handler จริง ๆ
    } else {
      alert("Please agree to share your email before continuing.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full border p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">🔒 Email Consent</h1>
        <p className="text-gray-700 mb-4">
          We collect your email address to:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>Send personalized offers and updates</li>
          <li>Let you retrieve saved car comparisons</li>
          <li>Notify you about your selected vehicles</li>
        </ul>

        <label className="flex items-center mb-6">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mr-2 accent-blue-600"
          />
          <span className="text-gray-800">
            I agree to share my email with BYD Metromobile.
          </span>
        </label>

        <button
          onClick={handleContinue}
          className={`w-full py-2 px-4 rounded-xl text-white font-semibold transition ${
            agreed
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Continue with LINE
        </button>
      </div>
    </div>
  );
}