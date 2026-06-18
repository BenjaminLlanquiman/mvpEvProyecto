import { useEffect, useState } from 'react'

// Zonas horarias de las 3 regiones donde opera Innovatech
const ZONES = [
  { label: 'Silicon Valley', tz: 'America/Los_Angeles' }, // Proyecto Gestión de Pacientes
  { label: 'Europa', tz: 'Europe/Madrid' },                // Proyecto Banca Móvil
  { label: 'Asia', tz: 'Asia/Singapore' },                 // Proyecto E-Learning
]

/**
 * WorldClock — reloj en tiempo real para las 3 regiones.
 * Se actualiza cada segundo y muestra la hora local
 * de cada equipo distribuido de Innovatech.
 */
export default function WorldClock() {

  // Hora actual — se actualiza cada 1 segundo
  const [now, setNow] = useState<Date>(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id) // Limpia el intervalo al desmontar
  }, [])

  return (
    <div className="worldclock">
      {ZONES.map((zone) => (
        <div className="worldclock__item" key={zone.tz}>

          {/* Nombre de la región */}
          <span className="worldclock__label">{zone.label}</span>

          {/* Hora local en formato HH:MM según la zona horaria */}
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