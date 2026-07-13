export default function About({ profile }) {
  return (
    <section id="about" className="py-20 px-[6%] bg-white-soft">
      <h2 className="font-condensed text-3xl font-black tracking-[2px] uppercase text-navy mb-10 relative inline-block after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-10 after:h-[3px] after:bg-gold">
        About Me
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[60px] items-start reveal">
        <div className="text-[1rem] leading-[1.8] text-[#5a6a75]">
          <p>
            สวัสดีครับผม <strong>{profile?.name || "Palm"} </strong>
            นิสิตวิทยาการคอมพิวเตอร์ที่สนใจด้าน Full-Stack Development, Mobile
            Application และ Machine Learning มีประสบการณ์พัฒนาโปรเจกต์ทั้ง
            Frontend, Backend, ฐานข้อมูล และการนำโมเดล AI มาใช้งานจริง
            ผมเป็นคนเรียนรู้เร็ว ชอบแก้ปัญหา
            และให้ความสำคัญกับโค้ดที่อ่านง่ายและใช้งานได้จริง
            พร้อมนำทักษะที่มีไปเรียนรู้และพัฒนาต่อในสภาพแวดล้อมการทำงานจริง
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center">
            <span className="font-bold text-[0.85rem] tracking-[1px] uppercase text-navy min-w-[100px]">
              Name
            </span>
            <span className="text-[#5a6a75] text-[0.95rem]">
              {profile?.name || "Palm"}
            </span>
          </div>
          <div className="flex gap-3 items-center">
            <span className="font-bold text-[0.85rem] tracking-[1px] uppercase text-navy min-w-[100px]">
              Focus
            </span>
            <span className="text-[#5a6a75] text-[0.95rem]">
              Full-Stack / Mobile / AI Development
            </span>
          </div>
          <div className="flex gap-3 items-center">
            <span className="font-bold text-[0.85rem] tracking-[1px] uppercase text-navy min-w-[100px]">
              Email
            </span>
            <a
              href={
                profile?.email
                  ? `mailto:${profile.email}`
                  : "mailto:66011212003@msu.ac.th"
              }
              className="text-gold no-underline break-all"
            >
              {profile?.email || "66011212003@msu.ac.th"}
            </a>
          </div>
          <div className="flex gap-3 items-center">
            <span className="font-bold text-[0.85rem] tracking-[1px] uppercase text-navy min-w-[100px]">
              Tel
            </span>
            <span className="text-[#5a6a75] text-[0.95rem]">098-226-8073</span>
          </div>
          <div className="mt-8">
            <a
              href="https://res.cloudinary.com/dsdepkz4h/image/upload/v1783953667/Resume_Kitsanaphon_sukdee_p79rji.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-navy text-gold font-black uppercase tracking-widest rounded hover:bg-navy-dark transition-all duration-200 border border-gold hover:shadow-[0_0_15px_rgba(201,168,76,0.3)]"
            >
              View Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
