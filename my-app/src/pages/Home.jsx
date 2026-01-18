import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  

  return (
    <div className="w-full min-h-screen bg-[#F8FBFD] scroll-smooth">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-10 py-5 bg-white/70 backdrop-blur-xl 
                sticky top-0 z-50 border-b border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">

  {/* LOGO */}
  <div className="flex items-center gap-3 cursor-pointer group">
    <div className="relative">
      <div className="w-5 h-5 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full 
                      group-hover:scale-110 transition-transform duration-300" />
      <div className="absolute inset-0 bg-teal-400/40 blur-lg rounded-full 
                      opacity-0 group-hover:opacity-100 transition" />
    </div>

    <h1 className="text-xl font-semibold text-gray-800 tracking-tight
                   group-hover:text-teal-600 transition-colors">
      ExpenseTracker
    </h1>
  </div>

  {/* LINKS */}
  <div className="hidden md:flex items-center gap-12 text-gray-600 font-medium">

    {/* Feature Link */}
    <Link
      to="/features"
      className="relative group transition-colors hover:text-gray-900"
    >
      Features
      <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-teal-500 to-blue-500
                       group-hover:w-full transition-all duration-300" />
    </Link>

    {/* About Link */}
    <Link
      to="/about"
      className="relative group transition-colors hover:text-gray-900"
    >
      About
      <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-teal-500 to-blue-500
                       group-hover:w-full transition-all duration-300" />
    </Link>

    {/* CTA BUTTON */}
    <Link
      to="/signup"
      className="relative px-6 py-2.5 rounded-lg text-white font-semibold
                 bg-gradient-to-r from-teal-500 to-blue-500
                 shadow-md overflow-hidden
                 hover:shadow-xl hover:-translate-y-0.5
                 transition-all duration-300"
    >
      <span className="relative z-10">Sign Up</span>
      <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition" />
    </Link>

  </div>
</nav>


      {/* HERO SECTION */}
<section className="relative px-12 py-40 flex items-center bg-black overflow-hidden isolate">

  {/* BACKGROUND VIDEO (CRISP) */}
  <video
    className="absolute inset-0 w-full h-full object-cover scale-105"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src="homevid.mp4" type="video/mp4" />
  </video>

  {/* LIGHT CONTRAST OVERLAY (NO BLUR) */}
  <div className="absolute inset-0 bg-gradient-to-br 
    from-white/50 via-white/35 to-white/20" />

  {/* NEON AURAS (DO NOT AFFECT VIDEO SHARPNESS) */}
  <div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] bg-teal-400/35 blur-[110px] rounded-full" />
  <div className="absolute bottom-[-10rem] right-[-10rem] w-[32rem] h-[32rem] bg-blue-500/35 blur-[110px] rounded-full" />

  {/* CYBER GRID (VERY SUBTLE) */}
  <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:72px_72px]" />

  {/* CONTENT */}
  <div className="relative z-10 max-w-2xl">

    {/* FLOATING CHIP */}
    <div className="inline-flex items-center gap-3 px-5 py-2 mb-8 rounded-full 
      bg-white/80 border border-white/60 shadow-md">
      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 animate-pulse" />
      <span className="text-sm font-semibold text-gray-700">
        Smart Expense Platform
      </span>
    </div>

    <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
      Track. Save.{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
        Grow.
      </span>
    </h1>

    <h2 className="mt-6 text-2xl md:text-3xl font-semibold text-gray-800">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
        Track Your Expenses.
      </span>{" "}
      Control Your Money.
    </h2>

    <p className="mt-7 text-lg text-gray-700 leading-relaxed max-w-xl">
      Real-time insights, clean visuals, and full control over your finances —
      without hiding your background.
    </p>

    {/* ACTIONS */}
    <div className="flex flex-wrap gap-6 mt-14">
      <Link to="/signup">
        <button className="px-10 py-4 rounded-xl font-semibold text-white
          bg-gradient-to-r from-teal-500 to-blue-500
          shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
          Get Started
        </button>
      </Link>

      <Link to="/about">
        <button className="px-10 py-4 rounded-xl font-semibold text-gray-900
          bg-white/80 border border-white/60 shadow-md hover:bg-white transition transform hover:-translate-y-1">
          Learn More
        </button>
      </Link>
    </div>
  </div>
</section>


      {/* SECOND SECTION */}
<section className="relative py-32 bg-white overflow-hidden px-6 isolate">

  {/* BACKGROUND AURAS */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute top-1/3 left-1/2 w-[520px] h-[520px] -translate-x-1/2 rounded-full 
      bg-gradient-to-r from-teal-300/30 to-blue-300/30 blur-[120px]" />
    <div className="absolute bottom-[-10rem] right-[-10rem] w-[420px] h-[420px] rounded-full 
      bg-gradient-to-r from-violet-300/20 to-purple-300/20 blur-[120px]" />
  </div>

  {/* SUBTLE GRID */}
  <div className="absolute inset-0 -z-10 opacity-10 
    bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),
        linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)]
    bg-[size:72px_72px]" />

  {/* HEADING */}
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
      Everything You Need to Take Control of Your Finances
    </h2>

    <p className="text-gray-600 mt-7 text-lg md:text-xl leading-relaxed">
      Track expenses, categorize spending, and gain crystal-clear insights into where your money goes.
      Built for clarity, speed, and smarter decisions.
    </p>
  </div>

  {/* FEATURE CARDS */}
  <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

    {/* CARD 1 */}
    <div className="group relative p-8 rounded-3xl border border-white/60 
      bg-white/80 backdrop-blur-xl shadow-lg
      hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">

      {/* Glow ring */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 
        bg-gradient-to-r from-teal-500/20 to-cyan-500/20 blur-xl transition" />

      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 
          flex items-center justify-center text-white text-2xl mb-6
          shadow-lg group-hover:scale-110 transition">
          ₹
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Simple Expense Tracking
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed">
          Log expenses in seconds using a clean, distraction-free interface designed for speed.
        </p>
      </div>
    </div>

    {/* CARD 2 */}
    <div className="group relative p-8 rounded-3xl border border-white/60 
      bg-white/80 backdrop-blur-xl shadow-lg
      hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">

      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 
        bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-xl transition" />

      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 
          flex items-center justify-center text-white text-2xl mb-6
          shadow-lg group-hover:scale-110 transition">
          ⛃
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Smart Filters & Summaries
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed">
          Filter by date or category instantly and uncover meaningful spending patterns.
        </p>
      </div>
    </div>

    {/* CARD 3 */}
    <div className="group relative p-8 rounded-3xl border border-white/60 
      bg-white/80 backdrop-blur-xl shadow-lg
      hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">

      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 
        bg-gradient-to-r from-violet-500/20 to-purple-500/20 blur-xl transition" />

      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-500 
          flex items-center justify-center text-white text-2xl mb-6
          shadow-lg group-hover:scale-110 transition">
          📊
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Clear Visual Insights
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed">
          Interactive charts and summaries that make financial data easy to understand.
        </p>
      </div>
    </div>

  </div>
</section>


{/* FULL SCREEN VIDEO SECTION */}
<section className="relative w-full h-screen overflow-hidden">
  <video
    className="absolute inset-0 w-full h-full object-cover"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src="/expensetag.mp4" type="video/mp4" />
  </video>

  {/* Optional overlay (for readability / style) */}
  <div className="absolute inset-0 bg-black/20"></div>

  {/* Optional text on video */}
  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
    
  </div>
</section>


      {/* WHY CHOOSE US */}
<section className="relative py-32 px-6 bg-[#F8FBFD] overflow-hidden">

  {/* Ambient glows */}
  <div className="absolute -top-40 left-1/3 w-[700px] h-[700px] bg-gradient-to-r from-teal-300/20 to-blue-300/20 blur-[120px] rounded-full" />
  <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-300/20 blur-[120px] rounded-full" />

  <div className="relative max-w-6xl mx-auto">

    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto mb-20">
      <p className="text-teal-600 font-semibold uppercase tracking-wider">
        Why Choose Us
      </p>

      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
        Designed for{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
          clarity & control
        </span>
      </h2>

      <p className="text-gray-600 text-lg mt-6">
        A future-ready expense experience focused on speed, simplicity, and insight.
      </p>
    </div>

    {/* Feature Grid */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        {
          icon: "📊",
          title: "Beautiful Dashboard",
          short: "Clean visuals that feel effortless.",
          detail:
            "Instant summaries, charts, and category insights designed for quick understanding."
        },
        {
          icon: "📈",
          title: "Smart Analytics",
          short: "Decisions powered by trends.",
          detail:
            "Track patterns, spending behavior, and growth using intelligent analytics."
        },
        {
          icon: "⚡",
          title: "Quick Entry",
          short: "Speed without friction.",
          detail:
            "Log expenses in seconds with minimal input and smart defaults."
        },
        {
          icon: "☁️",
          title: "Cloud Sync",
          short: "Your data everywhere.",
          detail:
            "Secure cloud sync keeps your finances updated across all devices."
        }
      ].map((item, index) => (
        <div
          key={index}
          className="relative group text-left rounded-3xl p-6
                     bg-white/70 backdrop-blur-xl
                     border border-gray-100
                     transition-all duration-500
                     hover:-translate-y-2 hover:shadow-2xl"
        >

          {/* Hover glow */}
          <div className="absolute inset-0 rounded-3xl
                          bg-gradient-to-br from-teal-400/10 to-blue-400/10
                          opacity-0 group-hover:opacity-100 transition" />

          <div className="relative z-10 space-y-4">

            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center
                            bg-gradient-to-r from-teal-500 to-blue-500
                            text-white text-2xl
                            group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>

            <h4 className="font-semibold text-gray-900 text-lg">
              {item.title}
            </h4>

            <p className="text-gray-600 text-sm">
              {item.short}
            </p>

            {/* Hover reveal info */}
            <div
              className="max-h-0 opacity-0 overflow-hidden
                         group-hover:max-h-40 group-hover:opacity-100
                         transition-all duration-500 ease-out"
            >
              <p className="text-sm text-gray-500 leading-relaxed mt-2">
                {item.detail}
              </p>
            </div>

          </div>
        </div>
      ))}
    </div>
  </div>
</section>



      {/* TESTIMONIALS */}
      <section className="relative py-28 px-6 bg-white overflow-hidden text-center">

  {/* Ambient background glow */}
  <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-teal-200/20 blur-[120px] rounded-full" />
  <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] bg-blue-200/20 blur-[120px] rounded-full" />

  {/* Heading */}
  <div className="relative max-w-3xl mx-auto mb-16">
    <p className="text-teal-600 font-semibold uppercase tracking-wide">
      Loved by Thousands
    </p>

    <h2 className="text-4xl font-bold text-gray-800 mt-3 mb-4">
      Real Stories. Real Impact.
    </h2>

    <p className="text-gray-600 text-lg">
      Hear from people who transformed their financial lives with ExpenseTracker.
    </p>
  </div>

  {/* Testimonials */}
  <div className="relative max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-4">
    {[
      {
        text: "A total game-changer! I finally understand my money.",
        name: "Sarah J.",
        job: "Freelancer"
      },
      {
        text: "The analytics are insanely good. So easy to use!",
        name: "Michael B.",
        job: "Software Engineer"
      },
      {
        text: "Clean, modern, and actually enjoyable to use.",
        name: "Emily K.",
        job: "Marketing Manager"
      }
    ].map((t, i) => (
      <div
        key={i}
        className="group relative rounded-3xl p-8
                   bg-white/70 backdrop-blur-xl
                   border border-gray-200
                   transition-all duration-500
                   hover:-translate-y-3 hover:shadow-2xl"
      >

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-3xl
                        bg-gradient-to-br from-teal-400/10 to-blue-400/10
                        opacity-0 group-hover:opacity-100 transition" />

        <div className="relative z-10 flex flex-col h-full">

          {/* Quote mark */}
          <div className="text-5xl text-teal-400/30 mb-4 select-none">
            “
          </div>

          <p className="text-gray-700 italic text-lg leading-relaxed flex-grow">
            {t.text}
          </p>

          {/* Divider */}
          <div className="h-px w-12 bg-gradient-to-r from-teal-400 to-blue-400 my-6
                          group-hover:w-20 transition-all duration-500" />

          {/* Author */}
          <div>
            <p className="font-semibold text-gray-900">
              {t.name}
            </p>
            <p className="text-sm text-gray-500">
              {t.job}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* CTA SECTION */}
      <section className="py-24 px-8 mb-16">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-teal-500 to-blue-600 text-white 
                        rounded-3xl py-16 px-10 text-center shadow-2xl relative overflow-hidden">

          <div className="absolute top-0 left-0 w-44 h-44 bg-white/10 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 blur-3xl rounded-full"></div>

          <h2 className="text-4xl font-bold mb-4">
            Ready to take control of your spending?
          </h2>

          <p className="mb-8 text-white/90 max-w-2xl mx-auto text-lg">
            Start your journey to better budgeting, smarter tracking, and financial clarity.
          </p>

          <Link to="/signup">
  <button className="px-10 py-3 bg-white text-teal-700 font-semibold rounded-xl 
                     shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-1">
    Start Tracking Now
  </button>
</Link>

        </div>
      </section>
      {/* FOOTER */}
<footer className="relative bg-[#F8FBFD] overflow-hidden">

  {/* Soft background accents */}
  <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] bg-teal-200/30 blur-[120px] rounded-full" />
  <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-200/30 blur-[120px] rounded-full" />

  <div className="relative max-w-7xl mx-auto px-8 py-20 grid gap-12 md:grid-cols-4">

    {/* Brand */}
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-teal-500 to-blue-500" />
        <h3 className="text-xl font-semibold text-gray-900">
          ExpenseTracker
        </h3>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
        A smarter way to track, analyze, and control your expenses with clarity
        and confidence.
      </p>
    </div>

    {/* Product */}
    <div>
      <h4 className="text-gray-900 font-semibold mb-5">
        Product
      </h4>
      <ul className="space-y-3 text-sm text-gray-600">
        <li className="hover:text-teal-600 transition cursor-pointer">Features</li>
        <li className="hover:text-teal-600 transition cursor-pointer">Analytics</li>
        <li className="hover:text-teal-600 transition cursor-pointer">Pricing</li>
        <li className="hover:text-teal-600 transition cursor-pointer">Security</li>
      </ul>
    </div>

    {/* Company */}
    <div>
      <h4 className="text-gray-900 font-semibold mb-5">
        Company
      </h4>
      <ul className="space-y-3 text-sm text-gray-600">
        <li className="hover:text-teal-600 transition cursor-pointer">About</li>
        <li className="hover:text-teal-600 transition cursor-pointer">Careers</li>
        <li className="hover:text-teal-600 transition cursor-pointer">Blog</li>
        <li className="hover:text-teal-600 transition cursor-pointer">Contact</li>
      </ul>
    </div>

    {/* Legal */}
    <div>
      <h4 className="text-gray-900 font-semibold mb-5">
        Legal
      </h4>
      <ul className="space-y-3 text-sm text-gray-600">
        <li className="hover:text-teal-600 transition cursor-pointer">Privacy Policy</li>
        <li className="hover:text-teal-600 transition cursor-pointer">Terms of Service</li>
        <li className="hover:text-teal-600 transition cursor-pointer">Cookie Policy</li>
      </ul>
    </div>
  </div>

  {/* Bottom bar */}
  <div className="border-t border-gray-200">
    <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} ExpenseTracker. All rights reserved.
      </p>

      <div className="flex items-center gap-6 text-sm text-gray-500">
        
        <span className="hover:text-teal-600 transition cursor-pointer">GitHub</span>
        <span className="hover:text-teal-600 transition cursor-pointer">LinkedIn</span>
      </div>
    </div>
  </div>
</footer>


    </div>
  );
};

export default Home;
