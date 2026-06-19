import { useEffect, useState } from 'react';

export function HeroCounter() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const target = 600;
    const timer = setInterval(() => {
      frame += 12;
      setValue(Math.min(target, frame));
      if (frame >= target) clearInterval(timer);
    }, 24);
    return () => clearInterval(timer);
  }, []);

  return <span className="font-mono text-3xl font-bold text-[#10D9A0]">${value.toLocaleString()},000+</span>;
}
