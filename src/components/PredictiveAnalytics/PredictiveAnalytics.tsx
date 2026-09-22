import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionWrapper, SectionHeader } from '../shared/UIComponents';
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer,
  BarChart, Bar, LineChart, Line,
} from 'recharts';

const crowdForecast = Array.from({ length: 10 }, (_, i) => ({
  hour: `${8 + i}h`, value: 20 + i * 5 + Math.sin(i) * 8,
}));
const trafficHotspot = Array.from({ length: 8 }, (_, i) => ({
  road: `R${i+1}`, load: 15 + i * 9 + Math.random() * 10,
}));
const riskscore = Array.from({ length: 10 }, (_, i) => ({
  time: `T${i}`, risk: Math.round(10 + i * 6 + Math.sin(i * 0.9) * 12),
}));

const inputNodes = [
  { label: 'Historical Data', icon: '🗄️', color: '#7ecff7' },
  { label: 'Real-Time Data', icon: '📡', color: '#00d4ff' },
  { label: 'Location', icon: '📍', color: '#c9a227' },
  { label: 'Time', icon: '⏰', color: '#f0d080' },
  { label: 'Crowd', icon: '👥', color: '#ffd600' },
  { label: 'Traffic', icon: '🚦', color: '#ff6b35' },
];

export default function PredictiveAnalytics() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <SectionWrapper id="prediction">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          number="14 / PREDICTIVE ANALYTICS"
          title="From Detection to Prediction"
          subtitle="The system is designed not only to understand the current situation, but to support forecasting of what may come next."
          color="#c9a227"
        />

        {/* AI Model visualization */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-8 mb-10"
          style={{ border: '1px solid rgba(201,162,39,0.25)' }}
        >
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            {inputNodes.map((node, i) => (
              <div key={i} className="flex items-center gap-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass rounded-xl px-3 py-2 flex items-center gap-2"
                  style={{ border: `1px solid ${node.color}30` }}
                >
                  <span>{node.icon}</span>
                  <span style={{ color: node.color, fontSize: '0.75rem', fontWeight: 600 }}>{node.label}</span>
                </motion.div>
                {i < inputNodes.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: i * 0.1 + 0.05 }}
                    style={{ color: '#00d4ff40', fontSize: '0.8rem' }}
                  >
                    +
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Arrow down */}
          <div className="flex justify-center mb-4">
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={inView ? { scaleY: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transformOrigin: 'top' }}
            >
              <div style={{ width: 2, height: 30, background: 'linear-gradient(to bottom, #c9a22760, #c9a227)' }} />
              <span style={{ color: '#c9a227' }}>▼</span>
            </motion.div>
          </div>

          {/* AI Core */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="glass-strong rounded-2xl p-5 text-center max-w-sm mx-auto mb-4"
            style={{ border: '1px solid rgba(201,162,39,0.5)' }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{ fontSize: '2.5rem', display: 'block', marginBottom: 8 }}
            >
              🧠
            </motion.div>
            <div style={{ color: '#c9a227', fontWeight: 800, fontSize: '1rem', letterSpacing: '0.1em' }}>
              AI / ML ANALYTICS ENGINE
            </div>
            <div style={{ color: '#7ecff7', fontSize: '0.75rem', marginTop: 4 }}>
              Pattern recognition · Predictive modelling · Risk scoring
            </div>
          </motion.div>

          {/* Arrow down */}
          <div className="flex justify-center mb-4">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 2, height: 30, background: 'linear-gradient(to bottom, #c9a227, #00d4ff60)' }} />
              <span style={{ color: '#00d4ff' }}>▼</span>
            </div>
          </div>

          {/* Output label */}
          <div className="flex justify-center">
            <div
              className="glass-strong rounded-xl px-6 py-3 text-center"
              style={{ border: '1px solid rgba(0,212,255,0.4)' }}
            >
              <span style={{ color: '#00d4ff', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.9rem' }}>
                PREDICTION → ALERT → DECISION SUPPORT
              </span>
            </div>
          </div>
        </motion.div>

        {/* Forecast charts */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Crowd Forecast */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-5"
          >
            <div className="flex justify-between items-center mb-3">
              <span style={{ color: '#f0f4ff', fontWeight: 700, fontSize: '0.85rem' }}>Crowd Forecast</span>
              <span className="chip chip-simulation">Simulation</span>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={crowdForecast}>
                <defs>
                  <linearGradient id="cfGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#00d4ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" stroke="#7ecff720" tick={{ fill: '#7ecff7', fontSize: 9 }} />
                <YAxis stroke="#7ecff720" tick={{ fill: '#7ecff7', fontSize: 9 }} />
                <Area type="monotone" dataKey="value" stroke="#00d4ff" fill="url(#cfGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Traffic Hotspot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl p-5"
          >
            <div className="flex justify-between items-center mb-3">
              <span style={{ color: '#f0f4ff', fontWeight: 700, fontSize: '0.85rem' }}>Traffic Hotspots</span>
              <span className="chip chip-prototype">Prototype</span>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={trafficHotspot}>
                <XAxis dataKey="road" stroke="#7ecff720" tick={{ fill: '#7ecff7', fontSize: 9 }} />
                <YAxis stroke="#7ecff720" tick={{ fill: '#7ecff7', fontSize: 9 }} />
                <Bar dataKey="load" fill="#ffd600" radius={[3,3,0,0]} opacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Emergency Risk Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-5"
          >
            <div className="flex justify-between items-center mb-3">
              <span style={{ color: '#f0f4ff', fontWeight: 700, fontSize: '0.85rem' }}>Emergency Risk Score</span>
              <span className="chip chip-simulation">Simulation</span>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={riskscore}>
                <XAxis dataKey="time" stroke="#7ecff720" tick={{ fill: '#7ecff7', fontSize: 9 }} />
                <YAxis stroke="#7ecff720" tick={{ fill: '#7ecff7', fontSize: 9 }} />
                <Line type="monotone" dataKey="risk" stroke="#ff6b35" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Applications grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: '👥', label: 'Crowd-Density Forecasting', color: '#00d4ff' },
            { icon: '🚦', label: 'Traffic Hotspot Prediction', color: '#ffd600' },
            { icon: '🌊', label: 'Ghat Utilization Analysis', color: '#1a5f7a' },
            { icon: '⚠️', label: 'Emergency Risk Scoring', color: '#ff6b35' },
            { icon: '🚑', label: 'Resource-Demand Forecasting', color: '#00e676' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-4 text-center"
              style={{ border: `1px solid ${item.color}25` }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>{item.icon}</div>
              <div style={{ color: item.color, fontSize: '0.72rem', fontWeight: 600, lineHeight: 1.4 }}>{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-20" />
    </SectionWrapper>
  );
}
