import { Link } from "react-router-dom";

export default function Projects({ projects }) {
  return (
    <section id="projects" className="py-20 px-[6%] bg-white-soft">
      <h2 className="font-condensed text-3xl font-black tracking-[2px] uppercase text-navy mb-10 relative inline-block after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-10 after:h-[3px] after:bg-gold reveal">
        Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj._id || proj.id}
            className="bg-navy rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] transition-all duration-250 flex flex-col reveal"
          >
            {/* ส่วนรูปภาพ*/}
            <div className="h-48 bg-gradient-to-br from-navy-mid to-navy-dark flex items-center justify-center text-6xl relative overflow-hidden">
              {proj.image_urls && proj.image_urls.length > 0 ? (
                <img
                  src={proj.image_urls[0]}
                  alt={proj.title}
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                />
              ) : (
                <span className="z-10">📁</span>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy/100" />
            </div>

            {/* ส่วนเนื้อหา */}
            <div className="p-6 pb-5 flex-1 flex flex-col">
              <div className="font-condensed text-[1.25rem] font-extrabold tracking-[1px] uppercase text-gold mb-3 line-clamp-1">
                {proj.title}
              </div>
              <p className="text-[0.9rem] leading-[1.6] text-gray-custom flex-1 mb-5">
                {proj.description}
              </p>

              <div className="flex gap-2 flex-wrap mb-6">
                {proj.tech_stack?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[0.65rem] font-bold tracking-[0.5px] uppercase px-2 py-1 rounded bg-white/5 text-gray-custom/70 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/10">
                <div className="flex gap-4">
                  {proj.github_url && (
                    <a
                      href={proj.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-custom hover:text-gold transition-colors"
                      title="GitHub"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.5.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.6 4.9.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5C19.1 20.2 22 16.4 22 12c0-5.5-4.5-10-10-10z" />
                      </svg>
                    </a>
                  )}
                  {proj.demo_url && (
                    <a
                      href={proj.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-custom hover:text-gold transition-colors"
                      title="Live Demo"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z" />
                      </svg>
                    </a>
                  )}
                </div>

                <Link
                  to={`/projects/${proj._id || proj.id}`}
                  className="group flex items-center gap-2 text-[0.75rem] font-black uppercase tracking-[2px] text-gold hover:text-white transition-all duration-300"
                >
                  View Details
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    strokeWidth="3"
                  >
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
