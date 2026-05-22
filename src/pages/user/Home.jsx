import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../api/config";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Skills from "../../components/Skills";
import Projects from "../../components/Projects";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  // ดึงข้อมูลครั้งเดียวจาก API ชุดหลัก
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, skillsRes, projectsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/profile/`),
          axios.get(`${API_BASE_URL}/skills/`),
          axios.get(`${API_BASE_URL}/projects/`),
        ]);

        setProfile(profileRes.data.data || profileRes.data || null);
        setSkills(skillsRes.data.skills || skillsRes.data.data || []);
        setProjects(projectsRes.data.projects || projectsRes.data.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //ตั้งค่าการจับแอนิเมชัน Intersection Observer และระบบสกรอลเมาส์
  useEffect(() => {
    if (loading) return;

    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    reveals.forEach((r) => observer.observe(r));

    const handleScroll = () => {
      const sections = document.querySelectorAll("section, footer");
      let current = "";
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 80) current = s.id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  if (loading)
    return (
      <div className="min-h-screen bg-navy flex flex-col items-center justify-center text-center px-4">
        <div className="text-gold font-condensed text-3xl font-black uppercase tracking-widest animate-pulse mb-3">
          Loading...
        </div>
        <div className="text-slate-300 text-sm md:text-base font-light tracking-wide animate-pulse">
          กำลังปลุกเซิร์ฟเวอร์หลังบ้าน... <br className="hidden md:block" />
          (ระบบอาจใช้เวลาเริ่มต้นประมาณ 50 วินาที รอนิดนึงนะครับ!)
        </div>
      </div>
    );

  return (
    <div className="font-barlow bg-white-soft text-text-main overflow-x-hidden">
      <Navbar activeSection={activeSection} />

      <Hero profile={profile} />

      <About profile={profile} />

      <Skills skills={skills} />

      <Projects projects={projects} />

      {/* ─── FOOTER ─── */}
      <footer
        id="contact"
        className="bg-navy-dark py-16 px-[6%] flex items-center justify-between flex-wrap gap-6"
      >
        <div className="flex gap-5">
          <a
            href={profile?.email ? `mailto:${profile.email}` : "#"}
            title="Email"
            className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-gray-custom hover:bg-gold hover:text-navy-dark transition-all duration-200"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>
          <a
            href={profile?.linkedin || "#"}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-gray-custom hover:bg-gold hover:text-navy-dark transition-all duration-200"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
            </svg>
          </a>
          <a
            href={profile?.github || "#"}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-gray-custom hover:bg-gold hover:text-navy-dark transition-all duration-200"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.5.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.6 4.9.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5C19.1 20.2 22 16.4 22 12c0-5.5-4.5-10-10-10z" />
            </svg>
          </a>
        </div>
        <div className="text-[0.8rem] tracking-[1px] uppercase text-gray-custom">
          © 2026 {profile?.name ? profile.name.split(" ")[0] : "PALM"}. All
          Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
