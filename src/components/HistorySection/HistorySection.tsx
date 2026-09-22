import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionWrapper, SectionHeader } from '../shared/UIComponents';

const timeline = [
  { year: '2015', label: 'Godavari Maha Pushkaralu', desc: 'Large-scale gathering on sacred river', color: '#c9a227' },
  { year: '', label: 'Large-Scale Crowd Movement', desc: 'Millions of pilgrims across multiple ghats', color: '#7ecff7' },
  { year: '', label: 'Safety Coordination Challenges', desc: 'Managing massive flows across ghats, roads and emergency routes', color: '#ff6b35' },
  { year: '', label: 'Need Identified', desc: 'Technology-assisted coordination could improve outcomes', color: '#00d4ff' },
  { year: '', label: 'Research & Prototype Study', desc: 'Proposal for an integrated AI platform begins', color: '#00e676' },
  { year: '2027', label: 'Smart Pushkaralu Vision', desc: 'AI-Enabled Integrated Platform — Detect, Predict, Coordinate, Respond', color: '#c9a227' },
];

export default function HistorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <SectionWrapper id="history">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          number="03 / MOTIVATION"
          title="Learning From the Past"
          subtitle="Understanding historical challenges helps design better systems for the future."
          color="#c9a227"
        />

        <div ref={ref} className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute left-8 md:left-1/2 top-0 bottom-0"
            style={{
              width: 2,
              background: 'linear-gradient(to bottom, #c9a22700, #c9a227, #00d4ff, #00e676)',
              transformOrigin: 'top',
              transform: 'translateX(-50%)',
            }}
          />

          <div className="space-y-8">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className={`relative flex items-center gap-6 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  style={{ paddingLeft: 48, paddingRight: 0 }}
                >
                  {/* Mobile/desktop: dot on line */}
                  <div
                    className="absolute left-8 md:left-1/2 flex-shrink-0"
                    style={{ transform: 'translate(-50%, 0)', zIndex: 2 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: i * 0.2 + 0.3 }}
                      className="rounded-full flex items-center justify-center"
                      style={{
                        width: 16, height: 16,
                        background: item.color,
                        boxShadow: `0 0 20px ${item.color}80`,
                      }}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className={`glass rounded-2xl p-5 flex-1 max-w-sm ${isLeft ? 'md:mr-[calc(50%+20px)]' : 'md:ml-[calc(50%+20px)]'}`}
                    style={{
                      border: `1px solid ${item.color}30`,
                      background: `linear-gradient(135deg, rgba(5,13,26,0.9), ${item.color}08)`,
                    }}
                  >
                    {item.year && (
                      <div
                        className="font-display mb-1"
                        style={{ color: item.color, fontSize: '1.4rem', fontWeight: 900 }}
                      >
                        {item.year}
                      </div>
                    )}
                    <div style={{ color: '#f0f4ff', fontWeight: 600, fontSize: '0.95rem', marginBottom: 4 }}>
                      {item.label}
                    </div>
                    <div style={{ color: '#7ecff7', fontSize: '0.8rem', lineHeight: 1.5, opacity: 0.85 }}>
                      {item.desc}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Key message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 glass-strong rounded-3xl p-8 text-center"
        >
          <div className="flex justify-center gap-8 flex-wrap">
            {['DETECT', 'PREDICT', 'COORDINATE', 'RESPOND EARLIER'].map((w, i) => (
              <motion.div
                key={w}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                style={{
                  color: '#c9a227',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  letterSpacing: '0.1em',
                }}
              >
                {w}
              </motion.div>
            ))}
          </div>
          <p style={{ color: '#7ecff7', fontSize: '0.9rem', marginTop: 12, opacity: 0.8 }}>
            The goal is not simply to react after an incident — it is to act before one escalates.
          </p>
        </motion.div>
      </div>

      <div className="bg-grid absolute inset-0 pointer-events-none opacity-20" />
    </SectionWrapper>
  );
}
