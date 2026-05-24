import { useState } from "react";
import ProfileManager from "./ProfileManager";
import SkillsManager from "./SkillsManager";
import ProjectsManager from "./ProjectsManager";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 🌟 1. เพิ่ม State สำหรับเปิดปิดเมนูมือถือ

  // ฟังก์ชันเปลี่ยนแท็บ พร้อมกับปิดเมนูมือถืออัตโนมัติ
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-barlow relative">
      {/* 🌟 2. Navbar สำหรับมือถือ (แฮมเบอร์เกอร์เมนู) ซ่อนบนจอใหญ่ (md:hidden) */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-navy-dark text-white p-4 px-6 flex justify-between items-center z-40 shadow-md">
        <h2 className="font-condensed text-xl font-black text-gold tracking-widest uppercase m-0">
          Admin Panel
        </h2>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="text-3xl text-gold focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* 🌟 3. พื้นหลังดำโปร่งแสง (Overlay) โชว์เฉพาะตอนเปิดเมนูบนมือถือ กดปุ๊บปิดเมนู */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* 🌟 4. Sidebar ปรับให้ Slide เข้าออกได้บนมือถือ และ Fix ค้างไว้บนจอใหญ่ */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-navy-dark text-white p-6 shadow-xl z-50 flex flex-col transition-transform duration-300 ease-in-out 
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 // จอใหญ่ (md ขึ้นไป) โชว์เสมอ ไม่ต้องสนใจ State
        `}
      >
        <div className="flex justify-between items-center mb-10 mt-2 md:mt-0">
          <h2 className="font-condensed text-3xl font-black text-gold tracking-widest uppercase m-0">
            Admin
          </h2>
          {/* ปุ่มปิดเมนู (กากบาท) โชว์เฉพาะบนมือถือ */}
          <button
            className="md:hidden text-gray-400 hover:text-white text-2xl font-bold"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <button
            onClick={() => handleTabClick("profile")}
            className={`text-left px-4 py-3 rounded font-bold tracking-wide transition-colors ${
              activeTab === "profile"
                ? "bg-gold text-navy-dark"
                : "text-gray-custom hover:bg-white/10 hover:text-white"
            }`}
          >
            👤 Profile
          </button>
          <button
            onClick={() => handleTabClick("skills")}
            className={`text-left px-4 py-3 rounded font-bold tracking-wide transition-colors ${
              activeTab === "skills"
                ? "bg-gold text-navy-dark"
                : "text-gray-custom hover:bg-white/10 hover:text-white"
            }`}
          >
            ⚡ Skills
          </button>
          <button
            onClick={() => handleTabClick("projects")}
            className={`text-left px-4 py-3 rounded font-bold tracking-wide transition-colors ${
              activeTab === "projects"
                ? "bg-gold text-navy-dark"
                : "text-gray-custom hover:bg-white/10 hover:text-white"
            }`}
          >
            💼 Projects
          </button>
        </nav>

        <div className="mt-auto border-t border-white/10 pt-4">
          <a
            href="/"
            target="_blank"
            className="text-sm text-gray-custom hover:text-white flex items-center gap-2"
          >
            <span>🌐</span> View Website
          </a>
        </div>
      </aside>

      {/* 🌟 5. พื้นที่แสดงเนื้อหาฝั่งขวา ปรับ Margin และ Padding ให้รับกับจอมือถือ */}
      <main className="flex-1 w-full bg-gray-100 min-h-screen p-4 pt-24 md:p-10 md:pt-10 md:ml-64 overflow-y-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 min-h-[80vh]">
          {activeTab === "profile" && <ProfileManager />}
          {activeTab === "skills" && <SkillsManager />}
          {activeTab === "projects" && <ProjectsManager />}
        </div>
      </main>
    </div>
  );
}
