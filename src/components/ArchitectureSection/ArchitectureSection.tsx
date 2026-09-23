import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeader } from '../shared/UIComponents';
import { ARCHITECTURE_LAYERS, SENSE_CHAIN } from '../../data/content';

export default function ArchitectureSection() {
  return (
    <SectionWrapper id="architecture">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 w-full flex-1 flex flex-col justify-start sm:justify-between gap-3 py-1 sm:py-2">
        <SectionHeader
          number="03 / COMPLETE SYSTEM ARCHITECTURE"
          title="Four-Tier Intelligent Technology Stack"
          subtitle="How raw physical data from IoT sensors transforms into automated multi-agency field response."
          color="#0284c7"
        />

        {/* 4 Architecture Layers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-1 sm:my-2">
          {ARCHITECTURE_LAYERS.map((layer, li) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: li * 0.08 }}
              className="glass rounded-2xl p-4 border border-slate-200 flex flex-col justify-between bg-white/95 shadow-sm hover:shadow-md transition-all"
              style={{
                borderTop: `4px solid ${layer.color}`,
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100">
                  <span
                    className="px-2.5 py-0.5 rounded text-xs font-mono font-bold"
                    style={{ background: `${layer.color}15`, color: layer.color, border: `1px solid ${layer.color}40` }}
                  >
                    LAYER 0{li + 1}
                  </span>
                  <span className="text-xs md:text-sm font-bold text-slate-900 tracking-wide">{layer.label}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {layer.items.map((item, ii) => (
                    <div
                      key={ii}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center shadow-2xs"
                    >
                      <span className="text-xl mb-1">{item.icon}</span>
                      <span className="text-xs font-semibold text-slate-800 leading-tight">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="mt-3 pt-2 border-t border-slate-100 text-xs font-mono font-bold text-center"
                style={{ color: layer.color }}
              >
                {li === 0 && '⚡ Physical Telemetry'}
                {li === 1 && '🧠 Deep Learning Models'}
                {li === 2 && '🗺️ Real-Time GIS Common Picture'}
                {li === 3 && '🚀 Automated Multi-Agency Action'}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Operational Sequence Pipeline */}
        <div className="glass rounded-2xl p-3.5 border border-slate-200 max-w-5xl mx-auto w-full bg-white/95 shadow-sm mt-1">
          <div className="text-center mb-2">
            <span className="text-sky-900 font-mono text-xs font-bold tracking-widest uppercase">
              END-TO-END OPERATIONAL SEQUENCE
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {SENSE_CHAIN.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className="px-3.5 py-1.5 rounded-full text-xs md:text-sm font-mono font-bold bg-sky-50 text-sky-900 border border-sky-200 shadow-xs"
                >
                  {step}
                </div>
                {i < SENSE_CHAIN.length - 1 && (
                  <span className="text-sky-500 font-bold text-sm">➔</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
