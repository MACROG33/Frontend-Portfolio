import { useState } from "react";
import ProfileManager from "./ProfileManager";
import SkillsManager from "./SkillsManager";
import ProjectsManager from "./ProjectsManager";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-100 flex font-barlow">
      {/* Sidebar เมนูด้านซ้าย */}
      <aside className="w-64 bg-navy-dark text-white p-6 shadow-xl z-10 flex flex-col fixed h-full">
        <h2 className="font-condensed text-3xl font-black text-gold mb-10 tracking-widest uppercase">
          Admin Panel
        </h2>
        <nav className="flex flex-col gap-2 flex-1">
          <button
            onClick={() => setActiveTab("profile")}
            className={`text-left px-4 py-3 rounded font-bold tracking-wide transition-colors ${activeTab === "profile" ? "bg-gold text-navy-dark" : "text-gray-custom hover:bg-white/10 hover:text-white"}`}
          >
            👤 Profile
          </button>
          <button
            onClick={() => setActiveTab("skills")}
            className={`text-left px-4 py-3 rounded font-bold tracking-wide transition-colors ${activeTab === "skills" ? "bg-gold text-navy-dark" : "text-gray-custom hover:bg-white/10 hover:text-white"}`}
          >
            ⚡ Skills
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`text-left px-4 py-3 rounded font-bold tracking-wide transition-colors ${activeTab === "projects" ? "bg-gold text-navy-dark" : "text-gray-custom hover:bg-white/10 hover:text-white"}`}
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

      {/* พื้นที่แสดงเนื้อหาฝั่งขวา */}
      <main className="flex-1 p-10 overflow-y-auto ml-64 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8 min-h-[80vh]">
          {}
          {activeTab === "profile" && <ProfileManager />}
          {activeTab === "skills" && <SkillsManager />}
          {activeTab === "projects" && <ProjectsManager />}
        </div>
      </main>
    </div>
  );
}
