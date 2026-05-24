import { useState, useEffect } from "react";

export default function Navbar({ activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // จับการเลื่อนเมาส์ เพื่อเปลี่ยนพื้นหลัง Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ฟังก์ชันเลื่อนหน้าจอไปยัง Section ต่างๆ และปิดเมนูมือถืออัตโนมัติ
  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "HOME", id: "home" },
    { name: "ABOUT", id: "about" },
    { name: "SKILLS", id: "skills" },
    { name: "PROJECTS", id: "projects" },
    { name: "CONTACT", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-navy-dark/90 backdrop-blur-md py-3 shadow-lg border-b border-white/5"
          : "bg-navy-dark py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* โลโก้ฝั่งซ้าย */}
        <div
          className="text-white font-condensed font-black text-2xl tracking-widest cursor-pointer flex items-center gap-3 relative z-50"
          onClick={() => scrollToSection("home")}
        >
          PALM
          <span className="text-gold opacity-50 font-light hidden sm:block">
            |
          </span>
          <span className="text-sm font-normal tracking-wide text-gray-400 hidden sm:block mt-1">
            PROGRAMMER PORTFOLIO
          </span>
        </div>

        {/*เมนูแนวนอนสำหรับ Desktop (ซ่อนในมือถือ) */}
        <nav className="hidden md:flex gap-8 relative z-50">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-sm font-bold tracking-[2px] transition-colors relative group ${
                activeSection === link.id
                  ? "text-gold"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.name}
              {}
              <span
                className={`absolute -bottom-2 left-0 w-full h-[2px] bg-gold transition-transform duration-300 ${
                  activeSection === link.id
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              ></span>
            </button>
          ))}
        </nav>

        {/* 🌟 ปุ่มสลับเมนูสำหรับจอมือถือ */}
        <button
          className="md:hidden text-gold p-1 focus:outline-none transition-transform active:scale-95 relative z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* เมนู Dropdown สำหรับมือถือ */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-navy-dark/95 backdrop-blur-md border-t border-white/10 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen
            ? "max-h-[400px] opacity-100 py-4 shadow-xl"
            : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-lg font-bold tracking-[3px] transition-all w-full text-center py-3 ${
                activeSection === link.id
                  ? "text-gold bg-white/5 border-l-4 border-gold"
                  : "text-gray-300 hover:text-white hover:bg-white/5 border-l-4 border-transparent"
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
