import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionWrapper, SectionHeader } from '../shared/UIComponents';

const flowSteps = [
  { icon: '📹', label: 'Camera sees crowd', color: '#00d4ff' },
  { icon: '👁️', label: 'Computer Vision processes video', color: '#7ecff7' },
  { icon: '👥', label: 'Crowd density estimated', color: '#c9a227' },
  { icon: '🧠', label: 'AI analytics evaluates situation', color: '#f0d080' },
  { icon: '⚠️', label: 'Risk level generated', color: '#ff6b35' },
  { icon: '🖥️', label: 'Command center receives information', color: '#00d4ff' },
  { icon: '👤', label: 'Authorized official verifies', color: '#00e676' },
  { icon: '⚡', label: 'Response action begins', color: '#00e676' },
];

export default function AIEngine() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <SectionWrapper id="ai">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          number="06 / AI ENGINE"
          title="How PUSHKARALU Thinks"
          subtitle="Transforming raw data into actionable operational intelligence — with humans in control."
          color="#c9a227"
        />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Animated flow */}
          <div ref={ref} className="space-y-1">
            {flowSteps.map((step, i) => (
              <div key={i}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{
                    background: `linear-gradient(90deg, ${step.color}10, transparent)`,
                    border: `1px solid ${step.color}20`,
                  }}
                >
                  <div
                    className="flex-shrink-0 rounded-lg flex items-center justify-center text-xl"
                    style={{
                      width: 44, height: 44,
                      background: `${step.color}15`,
                      border: `1px solid ${step.color}30`,
                    }}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <p style={{ color: '#f0f4ff', fontSize: '0.9rem', fontWeight: 500 }}>
                      {step.label}
                    </p>
                    <div style={{ color: step.color, fontSize: '0.7rem', letterSpacing: '0.08em' }}>
                      STEP {i + 1} OF {flowSteps.length}
                    </div>
                  </div>
                  {/* Animated indicator */}
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                    className="ml-auto rounded-full"
                    style={{ width: 6, height: 6, background: step.color }}
                  />
                </motion.div>
                {i < flowSteps.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.3, delay: i * 0.15 + 0.2 }}
                    className="flex justify-start pl-9"
                    style={{ transformOrigin: 'top' }}
                  >
                    <div style={{ width: 1, height: 16, background: `linear-gradient(to bottom, ${step.color}60, ${flowSteps[i+1].color}30)` }} />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Key principles */}
          <div className="space-y-6">
            {/* AI Decision Support card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-strong rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <span style={{ fontSize: '1.5rem' }}>🧠</span>
                <h3 style={{ color: '#c9a227', fontWeight: 700, fontSize: '1rem' }}>
                  AI as Decision Support
                </h3>
              </div>
              <p style={{ color: '#f0f4ff', fontSize: '0.88rem', lineHeight: 1.7, opacity: 0.85 }}>
                AI detects, analyzes, predicts and recommends.{' '}
                <span style={{ color: '#00e676', fontWeight: 600 }}>
                  Authorized officials and trained responders
                </span>{' '}
                make and execute all operational decisions.
              </p>
            </motion.div>

            {/* Three capabilities */}
            {[
              { icon: '👁️', title: 'SENSE', desc: 'Continuously monitor cameras, sensors, GPS and mobile data', color: '#00d4ff' },
              { icon: '📊', title: 'ANALYZE', desc: 'Computer vision and analytics extract patterns from raw data', color: '#c9a227' },
              { icon: '🔮', title: 'PREDICT', desc: 'Predictive models estimate risk levels before they escalate', color: '#f0d080' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-xl p-4 flex items-start gap-4"
                style={{ border: `1px solid ${item.color}25` }}
              >
                <div
                  className="text-xl rounded-lg flex-shrink-0"
                  style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                >
                  {item.icon}
                </div>
                <div>
                  <div style={{ color: item.color, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', marginBottom: 4 }}>
                    {item.title}
                  </div>
                  <div style={{ color: '#7ecff7', fontSize: '0.8rem', lineHeight: 1.5, opacity: 0.85 }}>
                    {item.desc}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Chip labels */}
            <div className="flex gap-2 flex-wrap">
              <span className="chip chip-prototype">Prototype</span>
              <span className="chip chip-simulation">Simulation</span>
              <span className="chip chip-proposed">Proposed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-grid absolute inset-0 pointer-events-none opacity-20" />
    </SectionWrapper>
  );
}
