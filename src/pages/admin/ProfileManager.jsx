import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../api/config";

export default function ProfileManager() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    email: "",
    github: "",
    linkedin: "",
    resume_url: "",
    profile_image: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/profile/`)
      .then((res) => {
        if (res.data.data) setFormData(res.data.data);
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Saving...");
    try {
      await axios.put(`${API_BASE_URL}/profile/`, formData);
      setStatus("✅ บันทึกข้อมูลสำเร็จ!");
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      console.error(error);
      setStatus("❌ เกิดข้อผิดพลาดในการบันทึก");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadData = new FormData();
    uploadData.append("file", file);
    setStatus("Uploading image...");
    try {
      const res = await axios.post(`${API_BASE_URL}/uploads/`, uploadData);
      setFormData({
        ...formData,
        profile_image: res.data.url || res.data.file_url,
      });
      setStatus("✅ อัปโหลดรูปสำเร็จ! (อย่าลืมกด Save)");
    } catch (error) {
      console.error(error);
      setStatus("❌ อัปโหลดรูปล้มเหลว");
    }
  };

  return (
    <div className="animate-fade-up">
      {/* 🌟 ปรับ Header ให้ไม่เบียดกันถ้า Status แจ้งเตือนยาว */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-6 border-b border-gray-200 pb-4">
        <h3 className="text-2xl font-black text-navy uppercase tracking-widest">
          Profile Settings
        </h3>
        {status && (
          <span className="text-sm font-bold text-gold bg-navy-dark px-3 py-1 rounded w-full sm:w-auto text-center sm:text-left">
            {status}
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 🌟 รูปโปรไฟล์ (ปรับให้เรียงบนล่างในมือถือ และซ้ายขวาในคอม) */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-100">
          <div className="w-24 h-24 rounded-full border-4 border-gold overflow-hidden bg-navy shrink-0">
            {formData.profile_image ? (
              <img
                src={formData.profile_image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl">
                👨‍💻
              </div>
            )}
          </div>
          <div className="flex-1 space-y-2 w-full text-center sm:text-left">
            <label className="block text-sm font-bold text-navy uppercase">
              Profile Image URL
            </label>
            <input
              type="text"
              name="profile_image"
              value={formData.profile_image}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-gold focus:ring-1 focus:ring-gold outline-none"
              placeholder="https://res.cloudinary.com/..."
            />
            <div className="text-sm text-gray-500 flex flex-col sm:flex-row items-center gap-2 mt-2">
              <span>หรืออัปโหลดไฟล์ใหม่:</span>
              <input
                type="file"
                onChange={handleImageUpload}
                className="text-sm file:mr-2 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold file:text-navy hover:file:bg-gold-light cursor-pointer w-full sm:w-auto"
              />
            </div>
          </div>
        </div>

        {/* ชื่อ และ ตำแหน่ง */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-navy uppercase mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:border-gold focus:ring-1 focus:ring-gold outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-navy uppercase mb-1">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:border-gold focus:ring-1 focus:ring-gold outline-none"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-bold text-navy uppercase mb-1">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
            required
            className="w-full p-3 border border-gray-300 rounded focus:border-gold focus:ring-1 focus:ring-gold outline-none"
          />
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-navy uppercase mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-gold outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-navy uppercase mb-1">
              GitHub URL
            </label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-gold outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-navy uppercase mb-1">
              LinkedIn URL
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-gold outline-none"
            />
          </div>
        </div>

        {/* 🌟 ปุ่ม Submit ปรับให้เต็มจอในมือถือ */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-gold hover:bg-gold-light text-navy-dark font-black uppercase tracking-widest rounded transition-all shadow-lg text-center"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
