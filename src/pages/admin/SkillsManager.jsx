import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../api/config";

export default function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [status, setStatus] = useState("");

  const [category, setCategory] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [items, setItems] = useState([]);

  const [tempItemName, setTempItemName] = useState("");
  const [tempItemIcon, setTempItemIcon] = useState("");

  const [editingGroupId, setEditingGroupId] = useState(null);

  const fetchSkills = () => {
    axios
      .get(`${API_BASE_URL}/skills/`)
      .then((res) => setSkills(res.data.skills || res.data.data || []))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddTempItem = (e) => {
    e.preventDefault();
    if (!tempItemName.trim() || !tempItemIcon.trim()) return;

    setItems([
      ...items,
      { name: tempItemName.trim(), icon: tempItemIcon.trim() },
    ]);
    setTempItemName("");
    setTempItemIcon("");
  };

  const handleRemoveTempItem = (indexToRemove) => {
    setItems(items.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSaveSkillGroup = async (e) => {
    e.preventDefault();
    if (!category.trim() || items.length === 0) {
      alert("กรุณากรอกชื่อหมวดหมู่และเพิ่มทักษะอย่างน้อย 1 อย่างก่อนครับ");
      return;
    }

    setStatus("Saving...");
    try {
      const finalData = {
        category: category.trim(),
        category_image: categoryImage.trim(),
        items: items,
      };

      if (editingGroupId) {
        await axios.put(`${API_BASE_URL}/skills/${editingGroupId}`, finalData);
        setStatus("✅ แก้ไขหมวดหมู่ทักษะสำเร็จ!");
      } else {
        await axios.post(`${API_BASE_URL}/skills/`, finalData);
        setStatus("✅ เพิ่มหมวดหมู่ทักษะสำเร็จ!");
      }

      handleCancelEdit();
      fetchSkills();
      setTimeout(() => setStatus(""), 3000);
    } catch (err) {
      setStatus("❌ เกิดข้อผิดพลาด");
      console.error(err);
    }
  };

  const handleDeleteGroup = async (id) => {
    if (!window.confirm("แน่ใจนะว่าจะลบหมวดหมู่นี้ทิ้งทั้งหมด?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/skills/${id}`);
      fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditGroupClick = (skillGroup) => {
    const id = skillGroup._id || skillGroup.id;
    setEditingGroupId(id);
    setCategory(skillGroup.category || "");
    setCategoryImage(skillGroup.category_image || "");
    setItems(skillGroup.items || []);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingGroupId(null);
    setCategory("");
    setCategoryImage("");
    setItems([]);
    setTempItemName("");
    setTempItemIcon("");
  };

  return (
    <div className="animate-fade-up">
      <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-4">
        <h3 className="text-2xl font-black text-navy uppercase tracking-widest">
          Skills Management
        </h3>
        {status && (
          <span className="text-sm font-bold text-gold bg-navy-dark px-3 py-1 rounded">
            {status}
          </span>
        )}
      </div>

      <div
        className={`p-6 rounded-xl border mb-8 space-y-6 transition-colors ${editingGroupId ? "bg-gold/10 border-gold" : "bg-gray-50 border-gray-200"}`}
      >
        {editingGroupId && (
          <div className="text-gold font-bold uppercase tracking-widest flex items-center gap-2">
            ✏️ โหมดแก้ไขหมวดหมู่ทักษะ
          </div>
        )}

        {/* ฟอร์มกรอกข้อมูล (อันนี้ Responsive อยู่แล้ว) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-navy uppercase mb-1">
              1. Category Name
            </label>
            <input
              type="text"
              placeholder="e.g. Backend & Mobile"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-navy uppercase mb-1">
              Category Icon
            </label>
            <input
              type="text"
              placeholder="e.g. 💻"
              value={categoryImage}
              onChange={(e) => setCategoryImage(e.target.value)}
              className="w-full p-2 border rounded outline-none focus:border-gold"
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-3">
          <label className="block text-sm font-bold text-gold uppercase">
            2. Add Skills into this Category
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Skill Name
              </label>
              <input
                type="text"
                placeholder="e.g. Python"
                value={tempItemName}
                onChange={(e) => setTempItemName(e.target.value)}
                className="w-full p-2 border rounded outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Icon URL
              </label>
              <input
                type="text"
                placeholder="https://cdn.jsdelivr.net/..."
                value={tempItemIcon}
                onChange={(e) => setTempItemIcon(e.target.value)}
                className="w-full p-2 border rounded outline-none focus:border-gold"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddTempItem}
            className="mt-2 px-4 py-1.5 bg-gray-200 text-navy font-bold text-sm rounded hover:bg-gray-300 w-full md:w-auto"
          >
            + Add to List
          </button>
        </div>

        {items.length > 0 && (
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-500 uppercase">
              ลิสต์ทักษะในหมวดหมู่นี้:
            </label>
            <div className="flex flex-wrap gap-2">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-navy text-white px-3 py-1 rounded-full text-sm"
                >
                  {item.icon?.startsWith("http") ? (
                    <img
                      src={item.icon}
                      className="w-4 h-4 object-contain invert"
                      alt=""
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <span>{item.icon}</span>
                  )}
                  <span>{item.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTempItem(idx)}
                    className="text-gold font-bold ml-1 hover:text-red-400"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-gray-200 flex gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleSaveSkillGroup}
            className="px-8 py-3 bg-navy text-gold font-black uppercase tracking-widest rounded hover:bg-navy-dark w-full md:w-auto transition-all shadow-md"
          >
            {editingGroupId ? "Update Category" : "Save Category to Database"}
          </button>
          {editingGroupId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-8 py-3 bg-gray-300 text-gray-700 font-black uppercase tracking-widest rounded hover:bg-gray-400 w-full md:w-auto transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* 🌟 บล็อกแสดงลิสต์หมวดหมู่ (แก้ Responsive แล้ว) 🌟 */}
      <div className="space-y-4">
        {skills.map((skillGroup) => (
          <div
            key={skillGroup._id || skillGroup.id}
            className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow"
          >
            {/* ส่วนหัว: ชื่อหมวดหมู่ + ปุ่ม Edit/Delete */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <h4 className="font-bold text-navy text-xl uppercase flex items-center m-0">
                <span className="mr-2 text-2xl">
                  {skillGroup.category_image}
                </span>
                {skillGroup.category}
              </h4>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleEditGroupClick(skillGroup)}
                  className="text-blue-600 hover:bg-blue-50 px-4 py-1.5 rounded font-bold border border-blue-200 text-sm flex-1 sm:flex-none text-center transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    handleDeleteGroup(skillGroup._id || skillGroup.id)
                  }
                  className="text-red-500 hover:bg-red-50 px-4 py-1.5 rounded font-bold border border-red-200 text-sm flex-1 sm:flex-none text-center transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* ส่วนไอเทมย่อยๆ (ทักษะ) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {skillGroup.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 border border-gray-100 rounded-lg bg-gray-50 overflow-hidden"
                >
                  {item.icon?.startsWith("http") ? (
                    <img
                      src={item.icon}
                      alt=""
                      className="w-6 h-6 object-contain shrink-0"
                    />
                  ) : (
                    <span className="text-sm shrink-0">{item.icon}</span>
                  )}
                  <span
                    className="text-sm font-semibold text-navy truncate"
                    title={item.name}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
