import { SectionWrapper, SectionHeader } from '../shared/UIComponents';

export default function ProblemSection() {
  const comparisons = [
    {
      domain: 'Crowd & Stampede Risk',
      icon: '👥',
      color: '#0284c7',
      problem2015: 'Manual gate surveillance missed sudden crowd build-ups, causing the Pushkar Ghat stampede.',
      solution2027: 'YOLOv8 + CSRNet AI crowd heatmaps warn authorities 15 mins before dangerous surges.',
      impact: 'Zero Blindspots · 15m Early Alert',
    },
    {
      domain: 'Ambulance & Medical Transit',
      icon: '🚑',
      color: '#d97706',
      problem2015: 'Emergency ambulances trapped in 2+ hour traffic jams across Godavari Bridge roads.',
      solution2027: 'AI vehicle flow analytics triggers automated Green Corridor traffic signal preemption.',
      impact: 'Hospital ETA: 11 Mins (was 45m+)',
    },
    {
      domain: 'River Safety & Drowning',
      icon: '🌊',
      color: '#e11d48',
      problem2015: 'Manual boat search took 15+ minutes to spot struggling swimmers in fast river currents.',
      solution2027: 'AI thermal & optical drones locate distress in seconds and drop auto-inflating flotation pods.',
      impact: 'Rescue Intervention: < 90s',
    },
    {
      domain: 'Missing Children & Elderly',
      icon: '🔍',
      color: '#b45309',
      problem2015: 'Over 12,000 pilgrims separated; manual police helpdesks overwhelmed for days.',
      solution2027: 'Facial Re-ID across 520 CCTVs + BLE smart wristbands push instant GPS alerts to nearest officers.',
      impact: 'Reunification: < 7 Mins',
    },
    {
      domain: 'Inter-Agency Coordination',
      icon: '🏛️',
      color: '#059669',
      problem2015: 'Police, Municipal, Medical, and NDRF operated on disjointed radio channels with no shared picture.',
      solution2027: 'Unified GIS Command Center provides a single real-time operational map with automated task dispatch.',
      impact: '100% Shared Operational Map',
    },
    {
      domain: 'Traffic & Smart Parking',
      icon: '🅿️',
      color: '#4f46e5',
      problem2015: 'Fixed-timer signals and unguided vehicles created massive gridlocks around ghats.',
      solution2027: 'IoT edge sensors, ATCS algorithms, and ANPR smart parking auto-allocate bays in < 2s.',
      impact: '-42% Delay · Auto Slot Assign',
    },
  ];

  return (
    <SectionWrapper id="problem">
      <div className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-between py-2">
        <SectionHeader
          number="02 / 2015 TRAGEDIES vs 2027 AI SOLUTIONS"
          title="Why This Project Exists"
          subtitle="Direct comparison: 2015 Pushkaralu manual failures versus 2027 AI-automated working solutions."
          color="#dc2626"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-2">
          {comparisons.map((c) => (
            <div
              key={c.domain}
              className="glass rounded-2xl p-4 border border-slate-200 flex flex-col justify-between bg-white/95 shadow-sm hover:shadow-md transition-all"
              style={{ borderTop: `4px solid ${c.color}` }}
            >
              <div>
                <div className="flex items-center gap-2.5 mb-3 pb-2 border-b border-slate-100">
                  <span className="text-2xl">{c.icon}</span>
                  <span className="font-bold text-slate-900 text-sm md:text-base">{c.domain}</span>
                </div>

                <div className="space-y-2.5 text-xs md:text-sm">
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-slate-800">
                    <span className="text-rose-800 font-bold font-mono text-xs block mb-0.5">❌ 2015 FAILURE:</span>
                    <p className="text-slate-700 leading-snug">{c.problem2015}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-slate-800">
                    <span className="text-emerald-800 font-bold font-mono text-xs block mb-0.5">⚡ 2027 AI FIX:</span>
                    <p className="text-slate-700 leading-snug">{c.solution2027}</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-mono font-bold text-emerald-800 flex items-center justify-between">
                <span className="text-slate-500 uppercase font-medium">IMPACT:</span>
                <span className="bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">{c.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
