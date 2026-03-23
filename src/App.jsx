import { useLayoutEffect, useState } from 'react';
import MealCustomization from './components/MealCustomization';

/** Escala máxima ~33% del diseño 1080px; en viewports angostos baja para que quepa. */
function computeKioskScale() {
  if (typeof window === 'undefined') return 1 / 3;
  return Math.min(1 / 3, window.innerWidth / 1080);
}

export default function App() {
  const [scale, setScale] = useState(computeKioskScale);

  useLayoutEffect(() => {
    const update = () => setScale(computeKioskScale());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className="kiosk-shell" style={{ zoom: scale }}>
      <MealCustomization />
    </div>
  );
}
