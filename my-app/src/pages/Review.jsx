import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Send, CheckCircle } from "lucide-react";

export default function Review() {
  const [rating, setRating] = useState(8);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isValid = review.trim().length >= 12;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    setSubmitted(true);
    setTimeout(() => {
      setReview("");
      setRating(8);
      setSubmitted(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      <Sidebar />

      <div className="md:ml-64 flex-1 px-6 md:px-12 py-14">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-10 animate-fade-in">
            <h1 className="text-4xl font-semibold text-slate-800 mb-2">
              Share Your Experience
            </h1>
            <p className="text-slate-500">
              Your feedback helps us improve Expense Tracker for everyone.
            </p>
          </div>

          {/* Card */}
          <div className="relative bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl p-8 md:p-10 animate-slide-up">

            {/* Rating */}
            <div className="mb-10">
              <label className="block text-sm font-medium text-slate-600 mb-3">
                Overall Rating
              </label>

              <div className="flex items-center gap-6">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full accent-blue-500 cursor-pointer"
                />

                <div className="min-w-[56px] text-center">
                  <span className="text-3xl font-semibold text-blue-600">
                    {rating}
                  </span>
                  <span className="text-slate-400 text-sm">/10</span>
                </div>
              </div>

              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
            </div>

            {/* Review */}
            <div className="mb-10">
              <label className="block text-sm font-medium text-slate-600 mb-3">
                Your Review
              </label>

              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Tell us what you liked, what can be better, or how it helped you manage expenses..."
                rows={5}
                className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-slate-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />

              <div className="flex justify-between mt-2 text-xs">
                <span
                  className={
                    review.length >= 12
                      ? "text-green-500"
                      : "text-slate-400"
                  }
                >
                  Minimum 12 characters
                </span>
                <span className="text-slate-400">
                  {review.length}/250
                </span>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={!isValid || submitted}
                className="
                  group relative inline-flex items-center gap-2
                  px-6 py-3 rounded-xl
                  bg-gradient-to-r from-blue-500 to-indigo-500
                  text-white font-medium
                  shadow-lg shadow-blue-200
                  hover:shadow-xl hover:scale-[1.02]
                  active:scale-95
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all
                "
              >
                {submitted ? (
                  <>
                    <CheckCircle size={18} />
                    Submitted
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Review
                  </>
                )}
              </button>
            </div>

            {/* Success Overlay */}
            {submitted && (
              <div className="absolute inset-0 rounded-3xl bg-white/90 backdrop-blur-md flex items-center justify-center animate-fade-in">
                <div className="text-center">
                  <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold text-slate-800">
                    Thank you for your feedback
                  </h3>
                  <p className="text-slate-500 mt-1">
                    We really appreciate it.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
