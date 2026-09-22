import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeader } from '../shared/UIComponents';
import { ETHICS_PRINCIPLES } from '../../data/content';

export function FinalSection() {
  return (
    <SectionWrapper id="final">
      <div className="max-w-7xl mx-auto px-6 w-full text-center flex flex-col justify-between h-full py-2">
        <SectionHeader
          number="12 / GOVERNANCE & PROJECT IMPACT"
          title="From Raw Data to Life-Saving Response"
          subtitle="Human-supervised AI transforming mass pilgrim safety in Rajahmundry 2027."
          color="#0284c7"
        />

        {/* 3 Pillars of Transformation */}
        <div className="grid md:grid-cols-3 gap-5 my-2">
          {[
            { tag: 'DATA', title: 'FROM DATA TO PREDICTION', desc: '520 CCTVs, IoT flow sensors, and drone swarms continuously analyze crowd dynamics.', color: '#0284c7', bg: '#f0f9ff', border: '#bae6fd', icon: '🧠' },
            { tag: 'DECISION', title: 'FROM PREDICTION TO RESPONSE', desc: 'Automated Green Corridors, Amber alerts, and GPS tactical tasking to nearest units.', color: '#b45309', bg: '#fffbeb', border: '#fde68a', icon: '⚡' },
            { tag: 'SAFETY', title: 'FROM RESPONSE TO ZERO CASUALTIES', desc: 'Preventing 2015-style stampedes, drownings, and family separations for 30M+ pilgrims.', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0', icon: '🛡️' },
          ].map((item, i) => (
            <motion.div
              key={item.tag}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-5 border text-left flex flex-col justify-between shadow-sm"
              style={{ borderColor: item.border, background: item.bg }}
            >
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-3xl">{item.icon}</span>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold"
                    style={{ background: '#ffffff', color: item.color, border: `1px solid ${item.border}` }}
                  >
                    {item.tag}
                  </span>
                </div>
                <h4 className="font-bold text-sm md:text-base mb-1.5" style={{ color: item.color }}>
                  {item.title}
                </h4>
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-medium">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ethical Governance Grid */}
        <div className="glass rounded-2xl p-4 border border-slate-200 bg-white/95 shadow-sm my-1">
          <div className="text-xs font-mono text-sky-900 font-bold tracking-wider mb-2.5 uppercase">
            ETHICAL AI & HUMAN-IN-THE-LOOP SAFEGUARDS
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {ETHICS_PRINCIPLES.map(p => (
              <div key={p.label} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center">
                <span className="text-xl mb-1">{p.icon}</span>
                <span className="text-xs font-bold text-slate-800 text-center leading-snug">{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Final Big Emblem */}
        <div className="py-2">
          <div className="font-display font-black text-2xl md:text-4xl text-slate-900 tracking-wider">
            PUSHKARALU <span className="text-sky-600">2027</span>
          </div>
          <p className="text-slate-600 font-mono text-xs md:text-sm tracking-widest mt-1 font-bold">
            RAJAHMUNDRY SMART PILGRIM SAFETY & EMERGENCY COMMAND PLATFORM
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
