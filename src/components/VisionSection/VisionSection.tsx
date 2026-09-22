import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionWrapper } from '../shared/UIComponents';

const words = [
  { text: 'ONE CITY', color: '#00d4ff', delay: 0 },
  { text: 'ONE COMMON PICTURE', color: '#c9a227', delay: 0.4 },
  { text: 'ONE CONNECTED RESPONSE', color: '#00e676', delay: 0.8 },
];

const pillars = [
  { icon: '📹', title: 'Cameras & Vision', desc: 'CCTV and drone feeds processed by computer vision', color: '#00d4ff' },
  { icon: '📡', title: 'IoT Sensors', desc: 'Environmental, crowd and infrastructure sensors', color: '#c9a227' },
  { icon: '📍', title: 'GPS & Mobility', desc: 'Vehicle and resource location tracking', color: '#7ecff7' },
  { icon: '📱', title: 'Mobile & Apps', desc: 'Citizen and field officer mobile data', color: '#00e676' },
  { icon: '🗺️', title: 'GIS & Maps', desc: 'Geospatial intelligence layer', color: '#f0d080' },
  { icon: '🌧️', title: 'Weather & River', desc: 'Environmental and river-level monitoring', color: '#1a5f7a' },
];

export default function VisionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <SectionWrapper id="vision">
      <div className="max-w-5xl mx-auto px-6">
        {/* Chapter label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="font-mono-tech text-xs" style={{ color: '#00d4ff', letterSpacing: '0.3em', opacity: 0.7 }}>
            04 / VISION
          </span>
        </motion.div>

        {/* Big dramatic words */}
        <div ref={ref} className="text-center mb-20">
          {words.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1, delay: w.delay, ease: [0.22, 1, 0.36, 1] }}
              className="font-display block"
              style={{
                fontSize: 'clamp(2.2rem, 6vw, 5rem)',
                fontWeight: 900,
                color: w.color,
                textShadow: `0 0 40px ${w.color}60`,
                lineHeight: 1.1,
                marginBottom: '0.3em',
                letterSpacing: '-0.01em',
              }}
            >
              {w.text}
            </motion.div>
          ))}

          {/* Connecting lines between words */}
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.4 }}
              style={{
                width: '60%',
                height: 1,
                margin: '0 auto 1.2em',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                transformOrigin: 'center',
              }}
            />
          ))}
        </div>

        {/* Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p style={{ color: '#f0f4ff', fontSize: 'clamp(1rem, 2vw, 1.25rem)', lineHeight: 1.7, maxWidth: 700, margin: '0 auto', opacity: 0.85 }}>
            Connect information from cameras, IoT devices, GPS, mobile applications, 
            traffic systems, environmental data and GIS into{' '}
            <span style={{ color: '#00d4ff', fontWeight: 700 }}>one integrated platform</span>.
          </p>
        </motion.div>

        {/* Data source pillars */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-5 text-center"
              style={{ border: `1px solid ${p.color}20` }}
            >
              <div style={{ fontSize: '2rem', marginBottom: 10 }}>{p.icon}</div>
              <div style={{ color: p.color, fontWeight: 700, fontSize: '0.9rem', marginBottom: 6 }}>
                {p.title}
              </div>
              <div style={{ color: '#7ecff7', fontSize: '0.75rem', lineHeight: 1.5, opacity: 0.8 }}>
                {p.desc}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Convergence arrow */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center my-10"
        >
          <div style={{ width: 2, height: 60, background: 'linear-gradient(to bottom, rgba(0,212,255,0.5), rgba(0,230,118,0.5))' }} />
          <div
            className="glass-strong rounded-2xl px-8 py-4 text-center"
            style={{ border: '1px solid rgba(0,212,255,0.3)' }}
          >
            <span style={{ color: '#00d4ff', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.1em' }}>
              UNIFIED GIS COMMAND CENTER
            </span>
          </div>
        </motion.div>
      </div>

      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(0,212,255,0.04) 0%, transparent 70%)',
        }}
      />
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-20" />
    </SectionWrapper>
  );
}
