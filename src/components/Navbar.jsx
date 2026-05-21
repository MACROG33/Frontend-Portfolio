export default function Navbar({ activeSection }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-dark flex items-center justify-between px-[6%] h-16 shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
      <div className="font-condensed text-xl font-extrabold tracking-[1px] text-white-soft">
        <span>PALM</span>
        <span className="text-gray-custom mx-2 font-light">|</span>
        <span className="text-[0.75rem] font-normal tracking-[3px] text-gray-custom">
          PROGRAMMER PORTFOLIO
        </span>
      </div>
      <ul className="hidden md:flex gap-8 list-none">
        {["home", "about", "skills", "projects", "contact"].map((item) => (
          <li key={item}>
            <a
              href={`#${item}`}
              className={`text-[0.9rem] font-semibold tracking-[1px] uppercase transition-colors duration-200 ${
                activeSection === item
                  ? "text-gold"
                  : "text-gray-custom hover:text-gold"
              }`}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
