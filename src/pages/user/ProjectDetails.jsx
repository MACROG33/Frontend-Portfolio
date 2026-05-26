import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../api/config";
import Navbar from "../../components/Navbar";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // สำหรับเก็บ Index ของรูปภาพที่กำลังแสดงเป็นรูปใหญ่
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // เก็บ Popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/projects/${id}`);
        setProject(res.data.data || res.data);
      } catch (err) {
        console.error("Error fetching project details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDetail();
  }, [id]);

  const handleImageClick = () => {
    if (window.screen.width < 768 || window.innerWidth < 768) {
      setIsPopupOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center text-gold font-condensed text-3xl font-black uppercase tracking-widest animate-pulse">
        Loading Project...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-navy flex flex-col items-center justify-center text-white gap-4 px-4 text-center">
        <h2 className="text-2xl font-bold text-gold">ไม่พบข้อมูลโปรเจกต์นี้</h2>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-gold text-navy font-bold uppercase tracking-wider hover:bg-gold-light transition-all rounded"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white-soft font-barlow overflow-x-hidden relative">
      <Navbar activeSection="projects" />

      {/*หน้าต่าง Popup */}
      {isPopupOpen && project.image_urls && project.image_urls.length > 0 && (
        <div
          className="fixed inset-0 z-[300] bg-black/90 md:hidden flex flex-col items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsPopupOpen(false)}
        >
          {/* ปุ่มกากบาทปิดที่มุมขวาบน */}
          <div className="absolute top-6 right-6 text-white text-3xl font-light cursor-pointer select-none p-2 bg-black/40 rounded-full w-10 h-10 flex items-center justify-center active:scale-95 transition-transform">
            ✕
          </div>

          {/* ตัวแสดงรูปภาพ */}
          <div
            className="w-full max-w-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={project.image_urls[activeImageIdx]}
              alt="Popup Preview"
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}

      <div className="min-h-screen text-text-main pt-24 pb-12 sm:pb-16 px-5 sm:px-[6%] md:px-[10%] lg:px-[6%] animate-fade-up">
        {/* ปุ่มย้อนกลับ */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 sm:mb-8 flex items-center gap-2 font-condensed text-sm font-black uppercase tracking-[2px] text-navy hover:text-gold transition-colors group"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
            strokeWidth="3"
          >
            <path d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
          Back to Portfolio
        </button>

        {/* หัวข้อโปรเจกต์ */}
        <div className="border-b border-gray-200 pb-5 sm:pb-6 mb-8 sm:mb-10">
          <h1 className="font-condensed text-3xl sm:text-[clamp(2rem,4vw,3.5rem)] font-black text-navy uppercase tracking-[1px] leading-tight break-words">
            {project.title}
          </h1>
          {project.is_featured && (
            <span className="inline-block mt-2 text-[10px] sm:text-[11px] font-bold bg-gold/20 text-gold-dark px-3 py-1 rounded-full uppercase tracking-wider">
              ⭐ Featured Project
            </span>
          )}
        </div>

        {/* แผง Grid ใหญ่แบ่งซ้าย-ขวา */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ฝั่งซ้าย: รูปภาพ */}
          <div className="lg:col-span-7 space-y-4">
            {/*รูปภาพหลักขนาดใหญ่ */}
            {}
            <div
              onClick={handleImageClick}
              className="aspect-video w-full rounded-2xl overflow-hidden bg-navy border-2 border-gray-200 shadow-lg relative cursor-pointer md:cursor-default active:opacity-90 transition-opacity"
            >
              {project.image_urls && project.image_urls.length > 0 ? (
                <img
                  src={project.image_urls[activeImageIdx]}
                  alt={`${project.title} Large Preview`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-5xl sm:text-6xl">
                  📁
                </div>
              )}
            </div>

            {/* รูปภาพขนาดเล็ก*/}
            {project.image_urls && project.image_urls.length > 1 && (
              <div className="w-full bg-navy/5 p-2 sm:p-3 rounded-xl border border-gray-200/60">
                <div
                  className="flex flex-row flex-nowrap gap-2 sm:gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  {project.image_urls.map((url, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-28 sm:w-36 md:w-40 aspect-video rounded-lg overflow-hidden border-2 bg-white shrink-0 transition-all shadow-sm ${
                        activeImageIdx === idx
                          ? "border-gold scale-95 ring-2 ring-gold/30"
                          : "border-gray-200 hover:border-navy opacity-75 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={url}
                        alt={`${project.title} Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ฝั่งขวา: รายละเอียดโปรเจกต์ & ลิงก์ต่าง ๆ */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            {/* ข้อมูลเนื้อหารายละเอียด */}
            <div>
              <h3 className="font-condensed text-lg font-black text-navy uppercase tracking-widest mb-2 sm:mb-3">
                Project Overview
              </h3>
              <p className="text-sm sm:text-[1rem] leading-[1.7] text-[#5a6a75] whitespace-pre-line break-words">
                {project.project_overview}
              </p>
            </div>

            {/* สกิล/เครื่องมือที่ใช้ */}
            <div>
              <h3 className="font-condensed text-lg font-black text-navy uppercase tracking-widest mb-2 sm:mb-3">
                Technologies Used
              </h3>
              <div className="flex gap-2 flex-wrap">
                {project.tech_stack && project.tech_stack.length > 0 ? (
                  project.tech_stack.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] sm:text-[0.7rem] font-bold tracking-[0.5px] uppercase px-3 py-1.5 rounded bg-gray-100 text-navy-mid border border-gray-200 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-sm italic text-gray-400">
                    No tools specified
                  </span>
                )}
              </div>
            </div>

            {/*ส่วนของลิงก์ปลายทางภายนอก*/}
            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-start gap-3 sm:gap-4">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-40 flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-navy hover:bg-navy-dark text-white font-condensed font-extrabold text-sm uppercase tracking-[1.5px] rounded transition-all text-center shadow hover:-translate-y-0.5"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.5.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.6 4.9.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5C19.1 20.2 22 16.4 22 12c0-5.5-4.5-10-10-10z" />
                  </svg>
                  GitHub Repo
                </a>
              )}

              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-40 flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-gold hover:bg-gold-light text-navy font-condensed font-extrabold text-sm uppercase tracking-[1.5px] rounded transition-all text-center shadow hover:-translate-y-0.5"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21z" />
                  </svg>
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
