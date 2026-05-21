import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../api/config";

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    project_overview: "", // 🌟 1. เพิ่มฟิลด์ใน State หลักสำหรับรองรับข้อมูลภาพรวม
    tags: "",
    github_url: "",
    demo_url: "",
    image_urls: [],
    is_featured: false,
  });

  const [status, setStatus] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchProjects = () => {
    axios
      .get(`${API_BASE_URL}/projects/`)
      .then((res) => setProjects(res.data.projects || res.data.data || []))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setStatus(`กำลังเตรียมอัปโหลดไฟล์ทั้งหมด ${files.length} รูป...`);

    const uploadPromises = Array.from(files).map(async (file, index) => {
      const uploadData = new FormData();
      uploadData.append("file", file);

      try {
        const res = await axios.post(`${API_BASE_URL}/uploads/`, uploadData);
        return res.data.url || res.data.file_url;
      } catch (error) {
        console.error(`ไฟล์ที่ ${index + 1} อัปโหลดล้มเหลว:`, error);
        return null;
      }
    });

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter((url) => url !== null);

      if (validUrls.length > 0) {
        setProjectForm((prev) => ({
          ...prev,
          image_urls: [...prev.image_urls, ...validUrls],
        }));
        setStatus(`✅ อัปโหลดสำเร็จทั้งหมด ${validUrls.length} รูป!`);
      } else {
        setStatus("❌ อัปโหลดล้มเหลวทุกไฟล์");
      }

      setTimeout(() => setStatus(""), 3000);
      e.target.value = "";
    } catch (error) {
      console.error(error);
      setStatus("❌ เกิดข้อผิดพลาดในระบบเครือข่ายขณะอัปโหลด");
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setProjectForm((prev) => ({
      ...prev,
      image_urls: prev.image_urls.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    setStatus("Saving...");

    try {
      const formattedData = {
        title: projectForm.title,
        description: projectForm.description,
        project_overview: projectForm.project_overview, // 🌟 2. แนบข้อมูลภาพรวมส่งไปที่ FastAPI
        tech_stack: projectForm.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
        github_url: projectForm.github_url,
        demo_url: projectForm.demo_url,
        image_urls: projectForm.image_urls,
        is_featured: projectForm.is_featured,
      };

      if (editingId) {
        await axios.put(`${API_BASE_URL}/projects/${editingId}`, formattedData);
        setStatus("✅ แก้ไขโปรเจกต์สำเร็จ!");
      } else {
        await axios.post(`${API_BASE_URL}/projects/`, formattedData);
        setStatus("✅ เพิ่มโปรเจกต์สำเร็จ!");
      }

      handleCancelEdit();
      fetchProjects();
      setTimeout(() => setStatus(""), 3000);
    } catch (err) {
      setStatus("❌ เกิดข้อผิดพลาด");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("แน่ใจนะว่าจะลบโปรเจกต์นี้?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/projects/${id}`);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (proj) => {
    const id = proj._id || proj.id;
    setEditingId(id);
    setProjectForm({
      title: proj.title || "",
      description: proj.description || "",
      project_overview: proj.project_overview || "", // 🌟 3. โหลดข้อมูลเดิมขึ้นมาโชว์ในช่องฟอร์มเมื่อกดแก้ไข
      tags: proj.tech_stack ? proj.tech_stack.join(", ") : "",
      github_url: proj.github_url || "",
      demo_url: proj.demo_url || "",
      image_urls: proj.image_urls || [],
      is_featured: proj.is_featured || false,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setProjectForm({
      title: "",
      description: "",
      project_overview: "", // 🌟 4. รีเซ็ตค่าให้ว่างเมื่อยกเลิกการแก้ไข
      tags: "",
      github_url: "",
      demo_url: "",
      image_urls: [],
      is_featured: false,
    });
    const fileInput = document.getElementById("project-image-upload");
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="animate-fade-up">
      <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-4">
        <h3 className="text-2xl font-black text-navy uppercase tracking-widest">
          Projects Management
        </h3>
        {status && (
          <span className="text-sm font-bold text-gold bg-navy-dark px-3 py-1 rounded">
            {status}
          </span>
        )}
      </div>

      <form
        onSubmit={handleSaveProject}
        className={`p-6 rounded-xl border mb-8 space-y-6 transition-colors ${editingId ? "bg-gold/10 border-gold" : "bg-gray-50 border-gray-200"}`}
      >
        {editingId && (
          <div className="text-gold font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            ✏️ โหมดแก้ไขโปรเจกต์
          </div>
        )}

        {/* แผงจัดการรูปภาพ */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-bold text-navy uppercase">
              Upload Project Images (เลือกพร้อมกันได้หลายรูป)
            </label>
            <input
              id="project-image-upload"
              type="file"
              accept="image/*"
              multiple={true}
              onChange={handleImageUpload}
              className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold file:text-navy hover:file:bg-gold-light cursor-pointer"
            />
          </div>

          {projectForm.image_urls.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {projectForm.image_urls.map((url, idx) => (
                <div
                  key={idx}
                  className="relative group aspect-video rounded-lg overflow-hidden border-2 border-gray-100 bg-gray-50"
                >
                  <img
                    src={url}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1 text-[10px] bg-navy/80 text-white px-1.5 py-0.5 rounded font-mono">
                    {idx === 0 ? "Cover (0)" : `Img (${idx})`}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center opacity-90 hover:bg-red-600 shadow transition-all"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-20 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              ยังไม่มีรูปภาพในโปรเจกต์นี้
            </div>
          )}
        </div>

        {/* บล็อก Title & Tech Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-navy uppercase mb-1">
              Project Title
            </label>
            <input
              type="text"
              value={projectForm.title}
              onChange={(e) =>
                setProjectForm({ ...projectForm, title: e.target.value })
              }
              required
              className="w-full p-2 border border-gray-300 rounded outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-navy uppercase mb-1">
              Tech Stack (คั่นด้วยลูกน้ำ)
            </label>
            <input
              type="text"
              placeholder="e.g. YOLO, Python, MongoDB"
              value={projectForm.tags}
              onChange={(e) =>
                setProjectForm({ ...projectForm, tags: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>
        </div>

        {/* บล็อก Description หน้าแรก */}
        <div>
          <label className="block text-sm font-bold text-navy uppercase mb-1">
            Description (คำอธิบายสั้นสลักบนการ์ดหน้าแรก)
          </label>
          <textarea
            value={projectForm.description}
            onChange={(e) =>
              setProjectForm({ ...projectForm, description: e.target.value })
            }
            required
            rows="2"
            className="w-full p-2 border border-gray-300 rounded outline-none focus:border-gold focus:ring-1 focus:ring-gold"
          ></textarea>
        </div>

        {/* 🌟 5. บล็อกกรอกภาพรวมข้อสรุปของโปรเจกต์ (Project Overview) แยกเป็นสัดส่วน */}
        <div>
          <label className="block text-sm font-bold text-gold uppercase mb-1 tracking-wider">
            Project Overview
          </label>
          <textarea
            value={projectForm.project_overview}
            onChange={(e) =>
              setProjectForm({
                ...projectForm,
                project_overview: e.target.value,
              })
            }
            placeholder="กรอกรายละเอียดเชิงลึก ขั้นตอน และผลลัพธ์ของโปรเจกต์..."
            rows="5"
            className="w-full p-3 border border-gray-300 rounded outline-none bg-white focus:border-gold focus:ring-1 focus:ring-gold"
          ></textarea>
        </div>

        {/* บล็อก URL ลิงก์ปลายทาง */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-navy uppercase mb-1">
              GitHub URL
            </label>
            <input
              type="url"
              value={projectForm.github_url}
              onChange={(e) =>
                setProjectForm({ ...projectForm, github_url: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-navy uppercase mb-1">
              Live Demo URL
            </label>
            <input
              type="url"
              value={projectForm.demo_url}
              onChange={(e) =>
                setProjectForm({ ...projectForm, demo_url: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>
        </div>

        {/* ปุ่มบันทึกข้อมูล */}
        <div className="pt-2 flex gap-3 flex-wrap">
          <button
            type="submit"
            className="px-8 py-3 bg-navy text-gold font-black uppercase tracking-widest rounded hover:bg-navy-dark w-full md:w-auto transition-all shadow-md"
          >
            {editingId ? "Update Project" : "Add New Project"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-8 py-3 bg-gray-300 text-gray-700 font-black uppercase tracking-widest rounded hover:bg-gray-400 w-full md:w-auto transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* บล็อกแสดงรายการลิสต์โปรเจกต์ด้านล่าง */}
      <div className="space-y-4">
        {projects.map((proj) => (
          <div
            key={proj._id || proj.id}
            className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 max-w-[70%]">
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center">
                {proj.image_urls && proj.image_urls.length > 0 ? (
                  <img
                    src={proj.image_urls[0]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl">📁</span>
                )}
              </div>
              <div>
                <h4 className="font-bold text-navy text-lg flex items-center gap-2">
                  {proj.title}
                  {proj.is_featured && (
                    <span className="text-[10px] bg-gold/20 text-gold-dark px-2 py-0.5 rounded-full uppercase">
                      Featured
                    </span>
                  )}
                </h4>
                <p className="text-sm text-gray-500 line-clamp-1 m-0">
                  {proj.description}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditClick(proj)}
                className="text-blue-600 hover:bg-blue-50 px-4 py-1.5 rounded font-bold transition-colors border border-blue-200 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(proj._id || proj.id)}
                className="text-red-500 hover:bg-red-50 px-4 py-1.5 rounded font-bold transition-colors border border-red-200 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
