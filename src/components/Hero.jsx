import { useState, useEffect } from "react";

export default function Hero({ profile }) {
  const [displayedName, setDisplayedName] = useState("");
  const fullName = profile?.name;

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      setDisplayedName(fullName.substring(0, currentIndex));
      currentIndex++;

      if (currentIndex > fullName.length) {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [fullName]);

  return (
    <section
      id="home"
      className="min-h-screen bg-navy flex flex-col md:flex-row items-center px-[6%] pt-20 pb-16 relative overflow-hidden text-left gap-10"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 50%, rgba(201,168,76,0.06) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.03) 0%, transparent 40%)",
        }}
      ></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <svg
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          className="w-full h-full"
        >
          <line
            x1="100"
            y1="0"
            x2="100"
            y2="600"
            stroke="#c9a84c"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="200"
            x2="1200"
            y2="200"
            stroke="#c9a84c"
            strokeWidth="1"
          />
          <line
            x1="300"
            y1="0"
            x2="300"
            y2="400"
            stroke="#c9a84c"
            strokeWidth="1"
          />
          <line
            x1="300"
            y1="400"
            x2="600"
            y2="400"
            stroke="#c9a84c"
            strokeWidth="1"
          />
          <line
            x1="900"
            y1="100"
            x2="1200"
            y2="100"
            stroke="#c9a84c"
            strokeWidth="1"
          />
          <circle cx="100" cy="200" r="5" fill="#c9a84c" />
          <circle cx="300" cy="400" r="5" fill="#c9a84c" />
          <circle cx="900" cy="100" r="5" fill="#c9a84c" />
        </svg>
      </div>

      <div className="flex-1 z-10 animate-fade-up">
        <h1 className="font-condensed text-[clamp(2.8rem,6vw,5rem)] font-black leading-[1.05] text-white-soft uppercase tracking-[1px]">
          สวัสดีครับผม{" "}
          <span className="text-gold">
            {displayedName}
            <span className="animate-pulse text-gold font-light ml-1">|</span>
          </span>
          <br />
          {profile?.role || "ASPIRING PROGRAMMER."}
        </h1>
        <p className="mt-3 text-[0.95rem] tracking-[3px] uppercase text-gray-custom font-normal">
          {profile?.bio || "Looking for an internship opportunity"}
        </p>
        <a
          href="#projects"
          className="inline-block mt-9 px-9 py-3.5 bg-gold hover:bg-gold-light hover:-translate-y-0.5 text-navy-dark font-condensed text-base font-extrabold tracking-[2px] uppercase no-underline border-none cursor-pointer transition-all duration-200"
        >
          View My Work
        </a>
      </div>

      <div className="z-10 animate-fade-up-delay">
        <div className="avatar-ring w-60 h-60 rounded-full border-3 border-gold flex items-center justify-center relative shadow-[0_0_40px_rgba(201,168,76,0.2)]">
          {profile?.profile_image ? (
            <img
              src={profile.profile_image}
              className="w-[210px] h-[210px] rounded-full object-cover bg-navy-mid z-10"
              alt="Profile"
            />
          ) : (
            <div className="w-[210px] h-[210px] rounded-full bg-gradient-to-br from-navy-mid to-navy-dark flex items-center justify-center text-gray-custom text-7xl z-10">
              👨‍💻
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
