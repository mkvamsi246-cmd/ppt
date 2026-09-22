// ============================================================
// PUSHKARALU 2027 — Content Data
// All text, voice scripts, labels, and section data
// ============================================================

export const CHAPTERS = [
  { id: 'hero',         number: '01', label: 'ACRONYM & VISION', icon: '🌊' },
  { id: 'problem',      number: '02', label: '2015 vs 2027',     icon: '⚡' },
  { id: 'architecture', number: '03', label: 'ARCHITECTURE',     icon: '🏗️' },
  { id: 'crowd',        number: '04', label: 'CROWD AI MODEL',   icon: '👥' },
  { id: 'adaptive',     number: '05', label: 'IOT ADAPTIVE TRAFFIC', icon: '🚦' },
  { id: 'parking',      number: '06', label: 'SMART PARKING & ANPR', icon: '🅿️' },
  { id: 'corridor',     number: '07', label: 'GREEN CORRIDOR',   icon: '🟢' },
  { id: 'river',        number: '08', label: 'RIVER SAFETY',     icon: '🚤' },
  { id: 'missing',      number: '09', label: 'FACE RE-ID MODEL', icon: '🔍' },
  { id: 'gis',          number: '10', label: 'GIS COMMAND',      icon: '🗺️' },
  { id: 'citizen',      number: '11', label: 'CITIZEN APP',      icon: '📱' },
  { id: 'final',        number: '12', label: 'GOVERNANCE & GOAL',icon: '✨' },
];

export const PUSHKARALU_ACRONYM = [
  { letter: 'P', title: 'People Safety', desc: 'Crowd & pilgrim safety with early surge alerts', color: '#0284c7', icon: '👥' },
  { letter: 'U', title: 'Unified System', desc: 'One central GIS platform for all city departments', color: '#059669', icon: '🏛️' },
  { letter: 'S', title: 'Smart Traffic', desc: 'Traffic flow, automated routes & smart parking', color: '#d97706', icon: '🚦' },
  { letter: 'H', title: 'Health Support', desc: 'Ambulance tracking, hospital ETA & Green Corridor', color: '#ea580c', icon: '🏥' },
  { letter: 'K', title: 'Knowledge & AI', desc: 'Deep learning prediction & proactive decisions', color: '#b45309', icon: '🧠' },
  { letter: 'A', title: 'Alerts', desc: 'Instant emergency, crowd & Amber broadcasts', color: '#dc2626', icon: '🔔' },
  { letter: 'R', title: 'River Rescue', desc: 'River drone scouting & rapid rescue boat dispatch', color: '#0284c7', icon: '🌊' },
  { letter: 'A', title: 'Analytics', desc: 'Real-time telemetry, model metrics & performance', color: '#d97706', icon: '📊' },
  { letter: 'L', title: 'Location / GIS', desc: 'Interactive maps, ghats & live emergency assets', color: '#0369a1', icon: '🗺️' },
  { letter: 'U', title: 'Unified Response', desc: 'Police, medical, municipal & NDRF coordination', color: '#059669', icon: '⚡' },
];

export const VOICE_SCRIPTS: Record<string, string> = {
  hero: `Welcome to Rajahmundry Smart Pushkaralu 2027. PUSHKARALU represents a ten-pillar engineering framework connecting People Safety, Unified System, Smart Traffic, Health Support, Knowledge and AI, Alerts, River Rescue, Analytics, Location GIS, and Unified Response to protect over thirty million pilgrims.`,

  problem: `In the 2015 Pushkaralu, manual blindspots caused fatal stampedes, gridlocked ambulances, and separated families. Our 2027 platform replaces manual reactions with automated AI predictions and instant multi-agency response.`,

  architecture: `The system operates on four interconnected layers: physical IoT and CCTV sensors at the bottom, an AI analytics and computer vision engine, a unified GIS command dashboard, and coordinated multi-agency field outcomes.`,

  crowd: `AI cameras continuously monitor crowd density across all ghats in real time. When high density is detected, the system immediately pushes an automated alert with GPS coordinates to the nearest on-duty officer in that sector to prevent stampedes.`,

  adaptive: `Our IoT-enabled Adaptive Traffic Control System utilizes roadside inductive loops and ESP32 edge microcontrollers to dynamically balance traffic light timings, reducing intersection delays by forty-two percent.`,

  parking: `The Smart Parking Management System enables pilgrims to monitor real-time parking slot availability near every ghat via the mobile app. Onsite, high-speed ANPR cameras detect vehicle number plates at the entrance gate and automatically assign a dedicated parking slot, opening the smart boom barrier in under two seconds.`,

  corridor: `For critical medical emergencies, the Green Corridor system automatically clears traffic signals ahead of incoming ambulances, guaranteeing an eleven-minute transit to the government hospital.`,

  river: `For river safety, AI thermal drones identify struggling swimmers in seconds and drop auto-inflating flotation pods, while rescue speedboats perform recovery within ninety seconds.`,

  missing: `Our facial re-identification model scans five hundred and twenty CCTV streams, matching uploaded photos and smart wristband beacons to reunite lost children and elderly pilgrims in under seven minutes.`,

  gis: `The operational portals provide synchronized control: the Admin Command Portal for city-wide GIS monitoring, AI early warnings, and Green Corridor overrides, and the Officer Field Portal giving ground police and medics GPS-guided dispatch and missing person verification.`,

  citizen: `Pilgrims access live Ghat crowd meters, emergency SOS buttons, lost person reporting, and real-time parking navigation directly from their smartphone app.`,

  final: `All operational commands remain with human commanders. By turning raw data into early warnings, Rajahmundry Smart Pushkaralu 2027 transforms mass pilgrimage safety into an intelligent, life-saving reality.`,
};

export const PROBLEM_NODES = [
  { id: 'crowd',   label: 'Crowded Ghats',       icon: '👥', x: 20, y: 20, color: '#ff6b35' },
  { id: 'traffic', label: 'Traffic Congestion',   icon: '🚦', x: 75, y: 20, color: '#ff6b35' },
  { id: 'routes',  label: 'Blocked Routes',       icon: '🚧', x: 50, y: 10, color: '#ff2d4a' },
  { id: 'river',   label: 'River Incidents',      icon: '🌊', x: 20, y: 70, color: '#ff2d4a' },
  { id: 'medical', label: 'Delayed Ambulance',    icon: '🚑', x: 75, y: 70, color: '#ff2d4a' },
  { id: 'agencies',label: 'Fragmented Agencies',  icon: '🏛️', x: 50, y: 85, color: '#ff6b35' },
  { id: 'hospital',label: 'Hospitals Unreached',  icon: '🏥', x: 50, y: 50, color: '#ff6b35' },
];

export const ARCHITECTURE_LAYERS = [
  {
    id: 'sources',
    label: 'DATA SOURCES',
    color: '#00d4ff',
    items: [
      { icon: '📹', label: 'CCTV / Video' },
      { icon: '🚁', label: 'Drones' },
      { icon: '📡', label: 'IoT Sensors' },
      { icon: '📍', label: 'GPS / Mobility' },
      { icon: '📱', label: 'Mobile App' },
      { icon: '🚦', label: 'Traffic Data' },
      { icon: '🌧️', label: 'Weather + River' },
      { icon: '🗺️', label: 'GIS / Maps' },
    ],
  },
  {
    id: 'ai',
    label: 'AI / ANALYTICS ENGINE',
    color: '#c9a227',
    items: [
      { icon: '👁️', label: 'Computer Vision' },
      { icon: '👥', label: 'Crowd Analytics' },
      { icon: '🚦', label: 'Traffic Prediction' },
      { icon: '⚠️', label: 'Risk Assessment' },
      { icon: '🔔', label: 'Incident Detection' },
      { icon: '⚡', label: 'Resource Priority' },
    ],
  },
  {
    id: 'command',
    label: 'UNIFIED GIS COMMAND CENTER',
    color: '#00e676',
    items: [
      { icon: '🗺️', label: 'Live GIS Map' },
      { icon: '🔔', label: 'Real-Time Alerts' },
      { icon: '📋', label: 'Incident Management' },
      { icon: '🚐', label: 'Resource Tracking' },
      { icon: '💡', label: 'Decision Support' },
      { icon: '🏛️', label: 'Agency Coordination' },
    ],
  },
  {
    id: 'outcomes',
    label: 'OUTCOMES / SERVICES',
    color: '#7ecff7',
    items: [
      { icon: '👥', label: 'Safer Crowds' },
      { icon: '⚡', label: 'Faster Response' },
      { icon: '🚦', label: 'Smart Traffic' },
      { icon: '🌊', label: 'River Safety' },
      { icon: '🚑', label: 'Green Corridor' },
      { icon: '📱', label: 'Public Info' },
    ],
  },
];

export const SENSE_CHAIN = [
  'SENSE', 'ANALYZE', 'PREDICT', 'ALERT',
  'DISPATCH', 'ASSIST', 'RESCUE', 'EVACUATE', 'TREAT', 'LEARN',
];

export const GHAT_ZONES = [
  { id: 'a', label: 'GHAT A', status: 'LOW',      density: 0.2, color: '#00e676' },
  { id: 'b', label: 'GHAT B', status: 'MEDIUM',   density: 0.5, color: '#ffd600' },
  { id: 'c', label: 'GHAT C', status: 'HIGH',      density: 0.78, color: '#ff6b35' },
  { id: 'd', label: 'GHAT D', status: 'CRITICAL',  density: 0.95, color: '#ff2d4a' },
];

export const ROAD_ZONES = [
  { id: 'a', label: 'ROAD A — NH-216',      status: 'LOW',      color: '#00e676', load: 25  },
  { id: 'b', label: 'ROAD B — Morampudi',   status: 'MEDIUM',   color: '#ffd600', load: 55  },
  { id: 'c', label: 'ROAD C — Ghat Road',   status: 'HIGH',     color: '#ff6b35', load: 78  },
  { id: 'd', label: 'ROAD D — Godavari St', status: 'CRITICAL', color: '#ff2d4a', load: 97  },
];

export const RIVER_RESCUE_STEPS = [
  { step: 1,  icon: '📹', label: 'Possible person in distress detected' },
  { step: 2,  icon: '📍', label: 'Location estimated' },
  { step: 3,  icon: '🖥️', label: 'Command center receives alert' },
  { step: 4,  icon: '👤', label: 'Authorized personnel verify incident' },
  { step: 5,  icon: '🗺️', label: 'Nearest emergency resources identified' },
  { step: 6,  icon: '🚁', label: 'AI-assisted rescue drone provides flotation (if feasible)' },
  { step: 7,  icon: '🚤', label: 'Trained rescue / medical boat reaches person' },
  { step: 8,  icon: '🤝', label: 'Person is recovered' },
  { step: 9,  icon: '💊', label: 'Medical support begins where appropriate' },
  { step: 10, icon: '⚓', label: 'Transfer to landing point' },
  { step: 11, icon: '🚑', label: 'Ambulance transport' },
  { step: 12, icon: '🟢', label: 'Green Corridor activated' },
  { step: 13, icon: '🏥', label: 'Hospital arrival' },
];

export const GREEN_CORRIDOR_STEPS = [
  { label: 'AMBULANCE DETECTED',   icon: '🚑', color: '#ff2d4a' },
  { label: 'GPS LOCATION',          icon: '📍', color: '#ffd600' },
  { label: 'DESTINATION HOSPITAL',  icon: '🏥', color: '#00d4ff' },
  { label: 'ROUTE ANALYSIS',        icon: '🗺️', color: '#c9a227' },
  { label: 'TRAFFIC COORDINATION',  icon: '🚦', color: '#ffd600' },
  { label: 'GREEN CORRIDOR',         icon: '🟢', color: '#00e676' },
  { label: 'HOSPITAL',              icon: '🏥', color: '#00e676' },
];

export const MEDICAL_TIMELINE = [
  { label: 'Detection Time',      value: 'Prototype Evaluation', color: '#00d4ff' },
  { label: 'Dispatch Time',       value: 'Prototype Evaluation', color: '#c9a227' },
  { label: 'Rescue Time',         value: 'Prototype Evaluation', color: '#ffd600' },
  { label: 'Evacuation Time',     value: 'Prototype Evaluation', color: '#ff6b35' },
  { label: 'Hospital Arrival',    value: 'Prototype Evaluation', color: '#00e676' },
];

export const GIS_ROLES = [
  'District Administration',
  'Police & Security',
  'Traffic Command',
  'Health & EMS',
  'NDRF & River Rescue',
  'Municipal Corporation',
];

export const ADMIN_PORTAL_FEATURES = [
  {
    icon: '🗺️',
    title: 'Unified Common Operational Picture (COP)',
    desc: 'Real-time citywide 2D/3D GIS map integrating 520+ CCTV feeds, IoT river sensors, drone telemetry, and live emergency vehicle GPS coordinates.',
    tag: 'GIS INTELLIGENCE',
    color: '#00d4ff',
  },
  {
    icon: '🚨',
    title: 'AI Early Warning & Surge Dispatch',
    desc: 'Automated predictive threshold alarms (crowd surge >75%, river perimeter breach, road bottlenecks) with 1-click multi-unit dispatching.',
    tag: 'AUTOMATION',
    color: '#ff2d4a',
  },
  {
    icon: '🟢',
    title: 'Green Corridor Traffic Signal Preemption',
    desc: 'Direct overrides of Rajahmundry smart traffic lights along ambulance routes, clearing a continuous green corridor to government hospitals.',
    tag: 'TRAFFIC CONTROL',
    color: '#00e676',
  },
  {
    icon: '📢',
    title: 'City-wide Broadcasts & Amber Alerts',
    desc: 'Instant broadcast of missing person alerts and crowd diversion directives to roadside VMS displays, public address speakers, and Citizen Apps.',
    tag: 'PUBLIC BROADCAST',
    color: '#ffd600',
  },
  {
    icon: '📊',
    title: 'Multi-Agency Coordination & Audit Trail',
    desc: 'Role-based command consoles for District Collector, Police Chief, Municipal Commissioner, and NDRF with cryptographic incident audit logs.',
    tag: 'GOVERNANCE',
    color: '#c9a227',
  },
];

export const OFFICER_PORTAL_FEATURES = [
  {
    icon: '📍',
    title: 'Proximity-Based Incident Auto-Dispatch',
    desc: 'Patrol officers and medical staff receive instant tactical assignments based on real-time GPS proximity with optimal navigation paths.',
    tag: 'RAPID RESPONSE',
    color: '#00d4ff',
  },
  {
    icon: '🔍',
    title: 'On-Field Missing Person Scanner',
    desc: 'Camera snapshot search and BLE wristband scanner on officer smartphones with live AI matching confidence (98.4%) to verify lost persons.',
    tag: 'RE-ID VERIFICATION',
    color: '#00e676',
  },
  {
    icon: '⚡',
    title: '1-Tap Status Milestones',
    desc: 'Quick status updates: [Acknowledged] ➔ [En Route] ➔ [On Scene] ➔ [Stabilized/Reunited], synchronizing with central command in milliseconds.',
    tag: 'TACTICAL WORKFLOW',
    color: '#ffd600',
  },
  {
    icon: '🆘',
    title: 'Emergency SOS & Backup Beacon',
    desc: 'One-touch distress button instantly transmits officer live coordinates and audio stream to nearby patrol units and HQ for backup.',
    tag: 'OFFICER SAFETY',
    color: '#ff2d4a',
  },
  {
    icon: '📶',
    title: 'Offline-First Mesh Synchronization',
    desc: 'Continues logging incident telemetry and wristband scans during high cellular congestion, syncing automatically via ad-hoc Wi-Fi mesh.',
    tag: 'RESILIENT ARCHITECTURE',
    color: '#c9a227',
  },
];

export const PORTAL_WORKFLOW_STEPS = [
  { step: '01', source: 'AI Engine', action: 'Detects crowd surge (>80%) or lost child at Kotilingala Ghat', badge: 'DETECT', color: '#ff2d4a' },
  { step: '02', source: 'Admin Portal', action: 'HQ validates incident and triggers automated dispatch & Green Corridor', badge: 'COMMAND', color: '#00d4ff' },
  { step: '03', source: 'Officer Portal', action: 'Nearest patrol officer (Delta-3) receives GPS push route & live photo match', badge: 'RESPOND', color: '#ffd600' },
  { step: '04', source: 'Field Action', action: 'Officer resolves situation on-site and updates 1-tap status to Reunited/Safe', badge: 'RESOLVE', color: '#00e676' },
];

export const CITIZEN_APP_SCREENS = [
  { label: 'FREE GHAT FINDER',    icon: '✨', desc: 'Find open, free ghats to avoid heavy crowds' },
  { label: 'LIVE GHAT METERS',    icon: '🌊', desc: 'Real-time occupancy & wait time estimates' },
  { label: 'SMART DIVERSION',     icon: '🗺️', desc: 'AI routes saving 30+ mins transit time' },
  { label: 'PARKING AVAILABILITY',icon: '🅿️', desc: 'Live spot count in peripheral parking' },
  { label: 'TRAFFIC & SHUTTLE',   icon: '🚌', desc: 'Free electric bus timings & route status' },
  { label: 'LOST FAMILY HELP',    icon: '🔍', desc: 'Upload photo / scan wristband for search' },
  { label: 'EMERGENCY SOS',       icon: '🆘', desc: '1-tap instant medical & police assistance' },
  { label: 'EVENT SCHEDULE',      icon: '🏛️', desc: 'Pushkaram rituals & auspicious timings' },
];

export const TECH_STACK = [
  { group: 'AI', color: '#c9a227', items: ['Python', 'OpenCV', 'Machine Learning', 'Deep Learning', 'Computer Vision'] },
  { group: 'IoT', color: '#00d4ff', items: ['ESP32', 'Raspberry Pi', 'IoT Sensors', 'GPS Modules', 'Drones'] },
  { group: 'GIS', color: '#00e676', items: ['GIS Platform', 'Web Mapping', 'Spatial Analytics', 'Leaflet.js'] },
  { group: 'BACKEND', color: '#7ecff7', items: ['REST APIs', 'Database', 'Cloud APIs', 'Real-Time Engine'] },
  { group: 'FRONTEND', color: '#f0d080', items: ['Web Application', 'Mobile Application', 'Dashboard UI'] },
  { group: 'DATA', color: '#ff6b35', items: ['Simulation', 'Historical Data', 'Real-Time Streams', 'Analytics'] },
];

export const RESEARCH_STAGES = [
  { step: 1, label: 'Historical Incident & Gap Analysis',   icon: '🔍' },
  { step: 2, label: 'Stakeholder & Workflow Mapping',        icon: '🗂️' },
  { step: 3, label: 'GIS & Data-Layer Design',               icon: '🗺️' },
  { step: 4, label: 'AI / Computer-Vision Prototype',        icon: '🧠' },
  { step: 5, label: 'Crowd / Traffic / River Simulation',    icon: '🌊' },
  { step: 6, label: 'KPI Evaluation',                        icon: '📊' },
  { step: 7, label: 'Pilot Demonstration',                   icon: '🚀' },
  { step: 8, label: 'Iterative Refinement',                  icon: '🔄' },
];

export const KPI_METRICS = [
  { label: 'Crowd Detection Accuracy',       value: 'Prototype Evaluation', icon: '👥', color: '#00d4ff' },
  { label: 'Incident Detection Time',        value: 'To Be Evaluated',      icon: '⏱️', color: '#c9a227' },
  { label: 'Dispatch Time',                  value: 'To Be Evaluated',      icon: '📡', color: '#ffd600' },
  { label: 'Rescue Response Time',           value: 'Prototype Evaluation', icon: '🚤', color: '#ff6b35' },
  { label: 'Medical Evacuation Time',        value: 'To Be Evaluated',      icon: '🚑', color: '#00e676' },
  { label: 'Green Corridor Activation',      value: 'Prototype Evaluation', icon: '🟢', color: '#00d4ff' },
  { label: 'Hospital Arrival Time',          value: 'To Be Evaluated',      icon: '🏥', color: '#c9a227' },
  { label: 'Prediction Accuracy',            value: 'Prototype Evaluation', icon: '📊', color: '#7ecff7' },
  { label: 'System Availability',            value: 'To Be Evaluated',      icon: '⚡', color: '#f0d080' },
];

export const ETHICS_PRINCIPLES = [
  { label: 'Privacy',              icon: '🔒', desc: 'Data handled with strict access controls' },
  { label: 'Authorization',        icon: '🪪', desc: 'Role-based access to sensitive functions' },
  { label: 'Human Oversight',      icon: '👤', desc: 'All AI outputs verified by trained personnel' },
  { label: 'Regulatory Compliance',icon: '📜', desc: 'Aviation, waterway and medical protocols' },
  { label: 'Data Protection',      icon: '🛡️', desc: 'Applicable privacy and legal requirements' },
  { label: 'Operational Safety',   icon: '⚕️', desc: 'Research & prototype positioning' },
];

export const ECOSYSTEM_NODES = [
  { id: 'crowd',   label: 'CROWD',          angle: 0,   color: '#00d4ff' },
  { id: 'traffic', label: 'TRAFFIC',         angle: 30,  color: '#ffd600' },
  { id: 'river',   label: 'RIVER SAFETY',   angle: 60,  color: '#1a5f7a' },
  { id: 'emerg',   label: 'EMERGENCY',      angle: 90,  color: '#ff2d4a' },
  { id: 'medical', label: 'MEDICAL',        angle: 120, color: '#ff6b35' },
  { id: 'parking', label: 'PARKING',        angle: 150, color: '#7ecff7' },
  { id: 'gis',     label: 'GIS',            angle: 180, color: '#00e676' },
  { id: 'ai',      label: 'AI',             angle: 210, color: '#c9a227' },
  { id: 'iot',     label: 'IoT',            angle: 240, color: '#f0d080' },
  { id: 'cctv',    label: 'CCTV',           angle: 270, color: '#00d4ff' },
  { id: 'gps',     label: 'GPS',            angle: 300, color: '#ffd600' },
  { id: 'cloud',   label: 'CLOUD',          angle: 330, color: '#7ecff7' },
];

export const FINAL_QUESTIONS = [
  'WHAT IF WE COULD SEE THE CROWD?',
  'WHAT IF WE COULD PREDICT THE RISK?',
  'WHAT IF WE COULD COORDINATE THE RESPONSE?',
  'WHAT IF EVERY SECOND COULD BE MEASURED?',
];

export const MISSING_PERSON_CASES = [
  {
    id: 'MP-8921',
    name: 'Aarav Sharma',
    age: 7,
    category: 'Child (Smart Wristband Active)',
    reportedTime: '14:22:10',
    lastSeen: 'Kotilingala Ghat — Gate 4',
    status: 'FOUND & REUNITED',
    confidence: 98.6,
    wristbandId: 'BLE-WRIST-4091',
    cctvMatch: 'CAM-KG-14 (North Promenade)',
    responseTime: '4 min 18 sec',
    officer: 'Patrol Team Delta-3',
    avatar: '👦',
    color: '#00e676',
  },
  {
    id: 'MP-8924',
    name: 'Lakshmi Devi',
    age: 69,
    category: 'Senior Citizen (Telugu Speaker)',
    reportedTime: '14:38:45',
    lastSeen: 'Pushkar Ghat Main Stairs',
    status: 'LOCATED — DISPATCHING',
    confidence: 96.2,
    wristbandId: 'BLE-WRIST-7720',
    cctvMatch: 'CAM-PG-08 (East Refreshment Zone)',
    responseTime: '3 min 10 sec (Active)',
    officer: 'Officer V. Prasad (50m away)',
    avatar: '👵',
    color: '#ffd600',
  },
  {
    id: 'MP-8927',
    name: 'Suresh Verma',
    age: 12,
    category: 'Child (Photo Re-ID Search)',
    reportedTime: '14:50:02',
    lastSeen: 'Saraswathi Ghat Footbridge',
    status: 'AI SCANNING 520 CCTVs',
    confidence: 94.1,
    wristbandId: 'N/A (CCTV AI Tracked)',
    cctvMatch: 'CAM-SG-03 (Bridge Transit Gate)',
    responseTime: 'In Progress (1m 40s elapsed)',
    officer: 'Transit Control Unit',
    avatar: '🧑',
    color: '#00d4ff',
  },
];

export const MISSING_TECH_PILLARS = [
  {
    icon: '👁️',
    title: 'Multi-Camera AI Facial Re-ID',
    desc: 'Deep feature vector extraction and cosine similarity matching across 500+ HD camera streams in real-time, even in dense occluded crowds.',
    color: '#00d4ff',
  },
  {
    icon: '📡',
    title: 'BLE & RFID Smart Wristbands',
    desc: 'Lightweight waterproof wristbands issued to children and elderly at entry points with geo-fencing and lost-boundary triggers.',
    color: '#ffd600',
  },
  {
    icon: '🚁',
    title: 'AI Drone Aerial Re-Identification',
    desc: 'High-altitude thermal and optical drone swarms scan riverbanks, open promenades, and exit gates for high-speed perimeter searches.',
    color: '#ff6b35',
  },
  {
    icon: '📢',
    title: 'Amber Broadcast & Geo-Dispatch',
    desc: 'Immediate encrypted push notification with photo and GPS location sent to the nearest 3 patrolling officers and synchronized LED boards.',
    color: '#00e676',
  },
];

export const SMART_PARKING_LOTS = [
  {
    id: 'lot-kotilingala',
    name: 'Kotilingala Ghat Smart Lot A',
    ghat: 'Kotilingala Ghat',
    totalSlots: 250,
    occupiedSlots: 215,
    availableSlots: 35,
    distanceToGhat: '180 meters (3 min walk)',
    status: 'SURGE / LIMITED',
    color: '#dc2626',
    bg: '#fee2e2',
    zone: 'Zone North-1',
  },
  {
    id: 'lot-pushkar',
    name: 'Pushkar Ghat Central Parking B',
    ghat: 'Pushkar Ghat',
    totalSlots: 300,
    occupiedSlots: 180,
    availableSlots: 120,
    distanceToGhat: '220 meters (4 min walk)',
    status: 'MODERATE / AVAILABLE',
    color: '#d97706',
    bg: '#fef3c7',
    zone: 'Zone Central-2',
  },
  {
    id: 'lot-saraswathi',
    name: 'Saraswathi Ghat Multi-Tier Lot C',
    ghat: 'Saraswathi Ghat',
    totalSlots: 200,
    occupiedSlots: 45,
    availableSlots: 155,
    distanceToGhat: '150 meters (2 min walk)',
    status: 'FREE / HIGH CAPACITY',
    color: '#059669',
    bg: '#d1fae5',
    zone: 'Zone South-1',
  },
  {
    id: 'lot-markandeya',
    name: 'Markandeya Bypass Overflow Lot D',
    ghat: 'Markandeya Ghat',
    totalSlots: 400,
    occupiedSlots: 90,
    availableSlots: 310,
    distanceToGhat: '300 meters (Free EV Shuttle)',
    status: 'FREE / HIGH CAPACITY',
    color: '#059669',
    bg: '#d1fae5',
    zone: 'Zone Outer Bypass',
  },
];

export const ANPR_DEMO_VEHICLES = [
  {
    plate: 'AP 05 BX 9922',
    vehicleType: 'Car (SUV)',
    driver: 'R. K. Verma (Pilgrim)',
    targetLot: 'Saraswathi Ghat Lot C',
    assignedSlot: 'SLOT C-24',
    entryGate: 'Gate North ANPR-02',
    anprConfidence: 99.4,
    barrierStatus: 'BARRIER OPENED',
    appSynced: true,
  },
  {
    plate: 'AP 39 TE 4120',
    vehicleType: 'Bus (Pilgrim Tour)',
    driver: 'Sri Venkateswara Travels',
    targetLot: 'Markandeya Bypass Lot D',
    assignedSlot: 'BUS BAY D-06',
    entryGate: 'Gate East ANPR-01',
    anprConfidence: 98.8,
    barrierStatus: 'BARRIER OPENED',
    appSynced: true,
  },
  {
    plate: 'TS 09 FH 5511',
    vehicleType: 'Car (Sedan)',
    driver: 'S. N. Murthy',
    targetLot: 'Pushkar Ghat Lot B',
    assignedSlot: 'SLOT B-18',
    entryGate: 'Gate Central ANPR-04',
    anprConfidence: 99.1,
    barrierStatus: 'BARRIER OPENED',
    appSynced: true,
  },
];


