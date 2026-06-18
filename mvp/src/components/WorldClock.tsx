import { useEffect, useState } from 'react'

const ZONES = [
  { label: 'Silicon Valley', tz: 'America/Los_Angeles' },
  { label: 'Europa', tz: 'Europe/Madrid' },
  { label: 'Asia', tz: 'Asia/Singapore' },
]

export default function WorldClock() {
  const [now, setNow] = useState<Date>(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="worldclock">
      {ZONES.map((zone) => (
        <div className="worldclock__item" key={zone.tz}>
          <span className="worldclock__label">{zone.label}</span>
          <span className="worldclock__time">
            {now.toLocaleTimeString('es-CL', {
              timeZone: zone.tz,
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      ))}
    </div>
  )
}