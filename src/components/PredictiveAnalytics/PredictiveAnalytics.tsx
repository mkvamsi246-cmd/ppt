import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionWrapper, SectionHeader } from '../shared/UIComponents';

const inputNodes = [
  { label: 'Historical Data', icon: '🗄️', color: '#0284c7' },
  { label: 'Real-Time Data', icon: '📡', color: '#0369a1' },
  { label: 'Location', icon: '📍', color: '#d97706' },
  { label: 'Time', icon: '⏰', color: '#b45309' },
  { label: 'Crowd', icon: '👥', color: '#dc2626' },
  { label: 'Traffic', icon: '🚦', color: '#ea580c' },
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
          className="glass rounded-3xl p-6 mb-6 border border-amber-300 bg-white/95 shadow-md"
        >
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            {inputNodes.map((node, i) => (
              <div key={i} className="flex items-center gap-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass rounded-xl px-3 py-2 flex items-center gap-2 border border-slate-200 bg-slate-50"
                >
                  <span>{node.icon}</span>
                  <span style={{ color: node.color, fontSize: '0.75rem', fontWeight: 600 }}>{node.label}</span>
                </motion.div>
                {i < inputNodes.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: i * 0.1 + 0.05 }}
                    className="text-slate-400 text-xs"
                  >
                    +
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* AI Core */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="glass rounded-2xl p-5 text-center max-w-sm mx-auto mb-4 border border-amber-400 bg-amber-50"
          >
            <div className="text-3xl mb-1">🧠</div>
            <div className="text-amber-900 font-bold text-sm">AI / ML ANALYTICS ENGINE</div>
            <div className="text-slate-600 text-xs mt-1">Pattern recognition · Predictive modelling · Risk scoring</div>
          </motion.div>
        </motion.div>

        {/* Forecast cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="glass rounded-2xl p-4 border border-slate-200 bg-white shadow-xs">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-xs text-slate-800">Crowd Surge Forecast</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200">15m Lead Time</span>
            </div>
            <p className="text-xs text-slate-600">LSTM deep temporal network predicts peak entry congestion before gate saturation.</p>
          </div>

          <div className="glass rounded-2xl p-4 border border-slate-200 bg-white shadow-xs">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-xs text-slate-800">Arterial Traffic Flow</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">Dynamic ATCS</span>
            </div>
            <p className="text-xs text-slate-600">IoT inductive loops dynamically balance signal timings across bridge approaches.</p>
          </div>

          <div className="glass rounded-2xl p-4 border border-slate-200 bg-white shadow-xs">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-xs text-slate-800">Emergency Risk Score</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">Preemptive Push</span>
            </div>
            <p className="text-xs text-slate-600">Real-time danger score triggers Green Corridor overrides and nearest officer alerts.</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
