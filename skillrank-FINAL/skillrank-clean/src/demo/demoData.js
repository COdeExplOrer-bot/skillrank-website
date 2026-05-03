// Shared demo state — simulates real-time between customer and worker

export const WORKERS = [
  { id: 'w1', name: 'Ramesh Sharma', initials: 'RS', skill: 'Electrician', exp: '8 yrs', rating: 4.8, jobs: 312, completion: 94, repeat: 68, rank: 'Gold', rankColor: '#B07A00', rankBg: '#FEF3D7', distance: 1.2, online: true, color: '#2952C4', skills: ['Wiring','Geyser repair','Switchboard','Inverter','AC wiring'], reviews: [{ text: 'Fixed my AC wiring in 30 mins. Very professional.', by: 'Anita M.' }, { text: 'Showed up on time, clean work.', by: 'Suresh P.' }] },
  { id: 'w2', name: 'Ajay Kumar', initials: 'AK', skill: 'Plumber', exp: '5 yrs', rating: 4.5, jobs: 187, completion: 88, repeat: 54, rank: 'Silver', rankColor: '#555', rankBg: '#E8E8EE', distance: 2.1, online: true, color: '#0A7A55', skills: ['Pipe fitting','Leak repair','Bathroom','Tank installation'], reviews: [{ text: 'Very thorough with the pipe work. No leaks after!', by: 'Priya D.' }, { text: 'Reasonable price, good service.', by: 'Mohan L.' }] },
  { id: 'w3', name: 'Sunil Das', initials: 'SD', skill: 'Painter', exp: '10 yrs', rating: 4.6, jobs: 241, completion: 91, repeat: 61, rank: 'Gold', rankColor: '#B07A00', rankBg: '#FEF3D7', distance: 3.4, online: true, color: '#8A3FC8', skills: ['Interior','Exterior','Texture','Waterproofing'], reviews: [{ text: 'Best painter in Kolkata. Clean finish.', by: 'Kavya R.' }] },
  { id: 'w4', name: 'Mukesh Roy', initials: 'MR', skill: 'Mechanic', exp: '6 yrs', rating: 4.3, jobs: 98, completion: 82, repeat: 40, rank: 'Bronze', rankColor: '#7A4A00', rankBg: '#FAE8D0', distance: 1.8, online: false, color: '#C07B3A', skills: ['Two-wheeler','Four-wheeler','Engine repair','Oil change'], reviews: [{ text: 'Fixed my bike quickly and at fair price.', by: 'Ravi S.' }] },
  { id: 'w5', name: 'Anita Boro', initials: 'AB', skill: 'Cleaning', exp: '3 yrs', rating: 4.7, jobs: 156, completion: 96, repeat: 72, rank: 'Silver', rankColor: '#555', rankBg: '#E8E8EE', distance: 0.9, online: true, color: '#C0395A', skills: ['Deep cleaning','Kitchen','Bathroom','Post-construction'], reviews: [{ text: 'House felt brand new after she finished!', by: 'Sunita M.' }] },
]

export const SERVICE_TYPES = [
  { icon: '⚡', name: 'Electrician' },
  { icon: '🔧', name: 'Plumber' },
  { icon: '🖌️', name: 'Painter' },
  { icon: '🔩', name: 'Mechanic' },
  { icon: '🧹', name: 'Cleaning' },
  { icon: '🏗️', name: 'Helper' },
]

export const PRICE_ESTIMATES = {
  Electrician: { min: 300, max: 600 },
  Plumber: { min: 250, max: 500 },
  Painter: { min: 500, max: 2000 },
  Mechanic: { min: 200, max: 800 },
  Cleaning: { min: 400, max: 900 },
  Helper: { min: 150, max: 350 },
}

export function getEstimate(skill) {
  const p = PRICE_ESTIMATES[skill] || { min: 200, max: 500 }
  return Math.round((p.min + p.max) / 2)
}

export const JOB_STATUSES = {
  IDLE: 'idle',
  POSTED: 'posted',
  MATCHED: 'matched',
  ACCEPTED: 'accepted',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  RATED: 'rated',
  REJECTED: 'rejected',
}
