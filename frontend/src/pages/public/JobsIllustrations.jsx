import React from 'react'

/* Hero — isometric server room, matches Slide 1 */
export function ServerRoomIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 500 400" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* floor */}
      <polygon points="60,330 250,390 440,330 250,270" fill="#dcdde4" />
      {/* back wall */}
      <polygon points="60,330 60,120 250,60 250,270" fill="#111225" />
      <polygon points="250,270 250,60 440,120 440,330" fill="#181933" />
      {/* rack units */}
      {[0, 1, 2, 3].map(i => {
        const x = 95 + i * 62
        return (
          <g key={i}>
            <polygon
              points={`${x},310 ${x},150 ${x + 46},135 ${x + 46},295`}
              fill="#0c0d1e"
              stroke="#2a2c4a"
              strokeWidth="1.5"
            />
            {[0, 1, 2, 3, 4, 5].map(row => (
              <rect
                key={row}
                x={x + 6}
                y={160 + row * 22}
                width="34"
                height="14"
                rx="1.5"
                fill={row % 2 === 0 ? '#1c1f3d' : '#151735'}
              />
            ))}
            <circle cx={x + 10} cy={168 + 0 * 22} r="2" fill="#4da6ff" />
            <circle cx={x + 10} cy={168 + 2 * 22} r="2" fill="#4da6ff" />
            <circle cx={x + 10} cy={168 + 4 * 22} r="2" fill="#4da6ff" />
          </g>
        )
      })}
      {/* side unit */}
      <polygon points="356,300 356,160 410,175 410,320" fill="#0c0d1e" stroke="#2a2c4a" strokeWidth="1.5" />
      <rect x="366" y="190" width="34" height="20" rx="2" fill="#181a38" />
      <rect x="366" y="220" width="34" height="20" rx="2" fill="#181a38" />
      <circle cx="374" cy="200" r="3" fill="#4da6ff" />
      <circle cx="374" cy="230" r="3" fill="#67e8a8" />
    </svg>
  )
}

/* Software Career Hierarchy — desk with dual monitors, matches Slide 3 */
export function DeskCharacterIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 400 340" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* chair */}
      <rect x="150" y="230" width="14" height="60" rx="4" fill="#2b2b2b" />
      <circle cx="120" cy="150" r="34" fill="#1f1f1f" />
      <path d="M90 175 Q120 220 150 190 L150 260 Q120 280 90 260 Z" fill="#1f1f1f" />
      <rect x="95" y="255" width="10" height="45" rx="4" fill="#2b2b2b" />
      <rect x="140" y="255" width="10" height="45" rx="4" fill="#2b2b2b" />
      <circle cx="97" cy="308" r="8" fill="#333" />
      <circle cx="147" cy="308" r="8" fill="#333" />
      {/* arm on keyboard */}
      <path d="M150 205 Q185 210 205 235" stroke="#1f1f1f" strokeWidth="12" fill="none" strokeLinecap="round" />

      {/* desk */}
      <rect x="60" y="270" width="290" height="10" rx="2" fill="#3a3a3a" />
      <rect x="80" y="280" width="10" height="55" fill="#2b2b2b" />
      <rect x="320" y="280" width="10" height="55" fill="#2b2b2b" />

      {/* monitor */}
      <rect x="190" y="115" width="130" height="90" rx="4" fill="#111" />
      <rect x="198" y="123" width="114" height="74" fill="#1c1c1c" />
      <rect x="248" y="205" width="14" height="20" fill="#2b2b2b" />
      <rect x="228" y="223" width="54" height="8" rx="2" fill="#2b2b2b" />
      {/* code lines on screen */}
      {[0, 1, 2, 3, 4].map(i => (
        <rect key={i} x={206} y={132 + i * 12} width={40 + (i % 3) * 25} height="4" rx="2" fill="#4da6ff" opacity={0.8 - i * 0.1} />
      ))}

      {/* mug */}
      <rect x="335" y="255" width="18" height="18" rx="3" fill="#555" />
      <path d="M353 260 q8 2 0 10" stroke="#555" strokeWidth="2" fill="none" />

      {/* keyboard */}
      <rect x="205" y="232" width="60" height="14" rx="2" fill="#2b2b2b" />
    </svg>
  )
}

/* Software Engineer — whiteboard system-design sketch, matches Slide 6 */
export function EngineerBoardIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 400 360" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* board */}
      <rect x="140" y="40" width="220" height="150" rx="6" fill="#fff" stroke="#1a1a1a" strokeWidth="4" />
      <rect x="230" y="190" width="40" height="70" fill="#1a1a1a" />
      <rect x="200" y="255" width="100" height="8" rx="2" fill="#1a1a1a" />

      {/* diagram on board */}
      <rect x="165" y="65" width="34" height="24" rx="3" fill="none" stroke="#1a1a1a" strokeWidth="2.5" />
      <rect x="230" y="65" width="34" height="24" rx="3" fill="none" stroke="#1a1a1a" strokeWidth="2.5" />
      <rect x="295" y="65" width="34" height="24" rx="3" fill="none" stroke="#1a1a1a" strokeWidth="2.5" />
      <path d="M199 77 h31" stroke="#1a1a1a" strokeWidth="2" markerEnd="url(#arrow)" />
      <path d="M264 77 h31" stroke="#1a1a1a" strokeWidth="2" markerEnd="url(#arrow)" />
      <circle cx="182" cy="130" r="16" fill="none" stroke="#1a1a1a" strokeWidth="2.5" />
      <circle cx="247" cy="130" r="16" fill="none" stroke="#1a1a1a" strokeWidth="2.5" />
      <circle cx="312" cy="130" r="16" fill="none" stroke="#1a1a1a" strokeWidth="2.5" />
      <path d="M198 130 h33" stroke="#1a1a1a" strokeWidth="2" />
      <path d="M263 130 h33" stroke="#1a1a1a" strokeWidth="2" />
      <path d="M182 146 v14 M247 146 v14 M312 146 v14" stroke="#1a1a1a" strokeWidth="2" />
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a" />
        </marker>
      </defs>

      {/* engineer figure */}
      <circle cx="90" cy="230" r="18" fill="#1a1a1a" />
      <rect x="72" y="248" width="36" height="16" rx="6" fill="#fbbf24" />
      <path d="M78 264 Q90 320 72 355" stroke="#1a1a1a" strokeWidth="14" fill="none" strokeLinecap="round" />
      <path d="M102 264 Q100 320 118 355" stroke="#1a1a1a" strokeWidth="14" fill="none" strokeLinecap="round" />
      <path d="M108 258 Q140 250 155 200" stroke="#1a1a1a" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M72 258 Q45 270 40 300" stroke="#1a1a1a" strokeWidth="10" fill="none" strokeLinecap="round" />
    </svg>
  )
}

/* DevOps pipeline dashboard, matches Slide 8 */
export function DevOpsDashboardIllustration({ className = '' }) {
  const stages = ['Code', 'Build', 'Test', 'Deploy', 'Monitor']
  return (
    <svg viewBox="0 0 420 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="400" height="280" rx="14" fill="#14152b" stroke="#2a2c4a" strokeWidth="1.5" />
      <text x="30" y="42" fill="#e5e7eb" fontSize="13" fontFamily="sans-serif" fontWeight="600">DevOps Pipeline</text>
      <text x="30" y="58" fill="#8a8dab" fontSize="9" fontFamily="sans-serif">Automation Dashboard</text>

      {/* pipeline stages */}
      {stages.map((s, i) => (
        <g key={s} transform={`translate(${30 + i * 74},80)`}>
          <circle cx="18" cy="18" r="16" fill="#1c1f3d" stroke="#3d3f66" strokeWidth="1.5" />
          <circle cx="18" cy="18" r="9" fill="none" stroke="#67e8a8" strokeWidth="2.5" />
          <path d="M13 18 l4 4 l8 -9" stroke="#67e8a8" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="18" y="46" textAnchor="middle" fill="#c7c9e0" fontSize="9" fontFamily="sans-serif">{s}</text>
          {i < stages.length - 1 && (
            <line x1="36" y1="18" x2="56" y2="18" stroke="#3d3f66" strokeWidth="2" />
          )}
        </g>
      ))}

      {/* success ring */}
      <circle cx="90" cy="175" r="34" fill="none" stroke="#2a2c4a" strokeWidth="8" />
      <circle cx="90" cy="175" r="34" fill="none" stroke="#67e8a8" strokeWidth="8" strokeDasharray="180 214" strokeLinecap="round" transform="rotate(-90 90 175)" />
      <text x="90" y="170" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="700" fontFamily="sans-serif">87%</text>
      <text x="90" y="184" textAnchor="middle" fill="#8a8dab" fontSize="8" fontFamily="sans-serif">Success</text>

      {/* recent deployments list */}
      <text x="150" y="150" fill="#c7c9e0" fontSize="9" fontFamily="sans-serif" fontWeight="600">Recent Deployments</text>
      {['Web Service', 'API Gateway', 'Auth Service', 'Worker Service'].map((d, i) => (
        <g key={d} transform={`translate(150,${162 + i * 16})`}>
          <circle cx="4" cy="0" r="3" fill={i === 3 ? '#f87171' : '#67e8a8'} />
          <text x="14" y="4" fill="#a8abc9" fontSize="8" fontFamily="sans-serif">{d}</text>
          <text x="230" y="4" fill="#6b6e91" fontSize="7" fontFamily="sans-serif">{i === 3 ? 'Failed' : `${(i + 2) * 3}m ago`}</text>
        </g>
      ))}

      {/* activity bars */}
      <text x="30" y="245" fill="#c7c9e0" fontSize="9" fontFamily="sans-serif" fontWeight="600">Pipeline Activity</text>
      {Array.from({ length: 14 }).map((_, i) => {
        const h = 8 + ((i * 37) % 30)
        return (
          <rect key={i} x={30 + i * 25} y={270 - h} width="12" height={h} rx="2" fill={i === 12 ? '#f87171' : '#3d5cff'} opacity={0.85} />
        )
      })}
    </svg>
  )
}

/* QA / Software Testing character, matches Slide 10 */
export function QATestingIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 400 360" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* desk + laptop */}
      <rect x="90" y="270" width="220" height="10" rx="2" fill="#2b2b2b" />
      <rect x="110" y="280" width="8" height="50" fill="#1f1f1f" />
      <rect x="280" y="280" width="8" height="50" fill="#1f1f1f" />
      <path d="M150 270 L150 220 L250 220 L250 270 Z" fill="#1a1a1a" />
      <rect x="158" y="228" width="84" height="34" fill="#e5e7eb" />
      <path d="M172 245 l6 6 l12 -14" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="205" y="240" width="30" height="4" rx="2" fill="#9ca3af" />
      <rect x="205" y="248" width="20" height="4" rx="2" fill="#9ca3af" />

      {/* seated figure */}
      <circle cx="200" cy="150" r="26" fill="#1a1a1a" />
      <path d="M160 190 Q200 165 240 190 L245 270 Q200 290 155 270 Z" fill="#1a1a1a" />
      <path d="M175 220 Q195 245 220 225" stroke="#1a1a1a" strokeWidth="14" fill="none" strokeLinecap="round" />

      {/* QA tag */}
      <rect x="270" y="70" width="70" height="46" rx="6" fill="#fff" stroke="#1a1a1a" strokeWidth="3" />
      <circle cx="286" cy="86" r="3" fill="#1a1a1a" />
      <circle cx="298" cy="86" r="3" fill="#1a1a1a" />
      <circle cx="310" cy="86" r="3" fill="#1a1a1a" />
      <text x="305" y="104" textAnchor="middle" fontSize="14" fontWeight="700" fontFamily="sans-serif" fill="#1a1a1a">QA</text>

      {/* magnifier + check */}
      <circle cx="330" cy="180" r="26" fill="none" stroke="#1a1a1a" strokeWidth="5" />
      <line x1="349" y1="199" x2="368" y2="218" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
      <path d="M318 180 l8 8 l16 -18" stroke="#22c55e" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* IT Support desk character, matches Slide 11 */
export function ITSupportIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 380 320" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* seated support agent w/ headset */}
      <circle cx="150" cy="120" r="30" fill="#1a1a1a" />
      <path d="M122 108 a30 30 0 0 1 56 0" stroke="#1a1a1a" strokeWidth="6" fill="none" />
      <circle cx="122" cy="122" r="7" fill="#1a1a1a" />
      <path d="M118 128 q-14 4 -10 20" stroke="#1a1a1a" strokeWidth="5" fill="none" strokeLinecap="round" />

      <path d="M108 165 Q150 145 192 165 L198 260 Q150 280 102 260 Z" fill="#1a1a1a" />
      <path d="M115 190 Q140 215 168 195" stroke="#1a1a1a" strokeWidth="14" fill="none" strokeLinecap="round" />

      {/* desk with support monitor */}
      <rect x="40" y="245" width="300" height="12" rx="3" fill="#3a3a3a" />
      <rect x="60" y="257" width="12" height="50" fill="#2b2b2b" />
      <rect x="300" y="257" width="12" height="50" fill="#2b2b2b" />

      {/* support monitor stand */}
      <rect x="105" y="230" width="150" height="90" rx="6" fill="#0c0d1e" />
      <text x="180" y="280" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fontWeight="700" fill="#fff">IT SUPPORT</text>
      <circle cx="125" cy="250" r="7" fill="#67e8a8" />

      {/* mug */}
      <rect x="325" y="222" width="18" height="18" rx="3" fill="#555" />
    </svg>
  )
}