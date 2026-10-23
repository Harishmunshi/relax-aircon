// Animated 3D AC unit shown in the homepage hero. Purely decorative.
export default function AcUnit() {
  return (
    <div className="ac-stage" aria-hidden="true">
      <div className="ac-unit">
        <div className="ac-body">
          <div className="ac-screen">
            <div className="ac-temp">18°C</div>
            <div className="ac-mode">Cooling</div>
          </div>
          <div className="ac-vents">
            {[0, 0.3, 0.6, 0.9, 1.2, 1.5].map(delay => (
              <div key={delay} className="ac-vent">
                <div className="ac-vent-glow" style={{ animationDelay: `${delay}s` }} />
              </div>
            ))}
          </div>
          <div className="ac-leds">
            {['#00ff88', '#00d4ff', '#c9a84c'].map((c, i) => (
              <div key={c} className="ac-led" style={{ background: c, boxShadow: `0 0 8px ${c}`, animationDelay: `${i * 0.5}s` }} />
            ))}
          </div>
          <div className="ac-brand">Relax Aircon</div>
        </div>
        <div className="ac-flap" />
        <div className="ac-air">
          {[0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2].map(delay => (
            <div key={delay} className="ac-air-line" style={{ animationDelay: `${delay}s` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
