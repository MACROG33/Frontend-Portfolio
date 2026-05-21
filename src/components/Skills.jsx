export default function Skills({ skills }) {
  return (
    <section id="skills" className="py-20 px-[6%] bg-gray-light">
      <h2 className="font-condensed text-3xl font-black tracking-[2px] uppercase text-navy mb-10 relative inline-block after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-10 after:h-[3px] after:bg-gold reveal">
        Skills
      </h2>

      <div className="space-y-12">
        {skills.map((skillGroup) => (
          <div key={skillGroup._id || skillGroup.id} className="reveal">
            <h3 className="font-condensed text-xl font-bold text-navy-mid uppercase tracking-widest mb-6 flex items-center gap-2">
              <span>{skillGroup.category_image}</span> {skillGroup.category}
            </h3>

            <div className="flex flex-wrap gap-4">
              {skillGroup.items?.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-3 flex flex-col items-center justify-center gap-2 w-30 h-30 shrink-0 shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.06)] transition-all duration-300 group cursor-default border border-gray-100"
                >
                  <div className="w-10 h-10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                    {item.icon?.startsWith("http") ? (
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <span className="text-3xl">{item.icon}</span>
                    )}
                  </div>
                  <span className="text-[0.75rem] font-bold uppercase tracking-[0.5px] text-navy text-center group-hover:text-gold transition-colors truncate w-full px-1">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
