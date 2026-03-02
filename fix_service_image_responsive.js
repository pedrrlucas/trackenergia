import fs from 'fs';

const filePath = 'client/src/pages/service-detail.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// There is a slight issue with responsiveness where the card content might be hidden or poorly positioned
// on smaller screens. We should make the overlay more elegant.

const oldOverlay = `{/* Overlay com informações do projeto ilustrado */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <div className="rounded-[20px] bg-black/40 backdrop-blur-xl border border-white/10 p-5 sm:p-6 text-white transform transition-transform duration-500 group-hover:-translate-y-1">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                      <div className="max-w-xl">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
                            Caso Real Ilustrado
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-medium tracking-tight mb-2">
                          {projectInfoMap[serviceId]?.title || "Projeto Referência"}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                          {projectInfoMap[serviceId]?.desc || "Ilustração de uma de nossas implementações técnicas."}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4 shrink-0">
                        {projectInfoMap[serviceId]?.stats.map((stat, i) => (
                          <div key={i} className="flex flex-col gap-1 border-l border-white/10 pl-4">
                            <span className="text-[10px] uppercase tracking-wider text-white/50">{stat.label}</span>
                            <span className="text-sm font-semibold">{stat.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>`;

const newOverlay = `{/* Overlay com informações do projeto ilustrado */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0014]/90 via-[#0a0014]/30 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 flex flex-col justify-end h-full">
                  <div className="transform transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:-translate-y-2">
                    <div className="flex items-center gap-2.5 mb-4">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full ring-1 ring-white/10">
                        Projeto Ilustrado
                      </span>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12">
                      <div className="max-w-2xl">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight mb-3 text-white leading-[1.1]">
                          {projectInfoMap[serviceId]?.title || "Projeto Referência"}
                        </h3>
                        <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-xl">
                          {projectInfoMap[serviceId]?.desc || "Ilustração de uma de nossas implementações técnicas."}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-6 sm:gap-8 shrink-0 bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-5 ring-1 ring-white/10">
                        {projectInfoMap[serviceId]?.stats.map((stat, i) => (
                          <div key={i} className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase tracking-[0.15em] text-white/40">{stat.label}</span>
                            <span className="text-base sm:text-lg font-medium text-white tracking-tight">{stat.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>`;

if(content.includes(oldOverlay)) {
    content = content.replace(oldOverlay, newOverlay);
    fs.writeFileSync(filePath, content);
    console.log("Made overlay more elegant and integrated.");
} else {
    console.log("Could not find the previous overlay string exactly.");
}
