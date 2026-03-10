// components/ui/Tooltip.tsx
'use client'

import { useState } from 'react'

interface Props {
  label: string
  children: React.ReactNode
}

const Tooltip = ({ label, children }: Props) => {
  const [visible, setVisible] = useState(false)

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-[10px] tracking-wide whitespace-nowrap z-50 pointer-events-none"
          style={{
            backgroundColor: "var(--text-primary)",
            color: "var(--background)",
          }}
        >
          {label}
          {/* Arrow pointing down */}
          <div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
            style={{ backgroundColor: "var(--text-primary)" }}
          />
        </div>
      )}
    </div>
  )
}

export default Tooltip