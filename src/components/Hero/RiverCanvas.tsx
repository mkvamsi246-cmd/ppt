import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

export default function RiverCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    // Pilgrim lights — warm golden-amber & sky-blue sparkles
    const GOLD_COLORS = ['#d97706', '#f59e0b', '#fbbf24', '#b45309'];
    const CYAN_COLORS = ['#0284c7', '#38bdf8', '#0ea5e9'];

    function spawnParticle(): Particle {
      const isGold = Math.random() > 0.4;
      return {
        x: Math.random() * W(),
        y: H() * 0.45 + Math.random() * H() * 0.55,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.4 - 0.1,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        color: isGold
          ? GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)]
          : CYAN_COLORS[Math.floor(Math.random() * CYAN_COLORS.length)],
        life: 0,
        maxLife: Math.random() * 180 + 120,
      };
    }

    for (let i = 0; i < 200; i++) {
      const p = spawnParticle();
      p.life = Math.random() * p.maxLife;
      particlesRef.current.push(p);
    }

    let t = 0;

    function drawWater() {
      const w = W(), h = H();
      const riverTop = h * 0.48;

      // River gradient (Clean Light Sky & Blue River)
      const grad = ctx.createLinearGradient(0, riverTop, 0, h);
      grad.addColorStop(0, 'rgba(224, 242, 254, 0.9)');
      grad.addColorStop(0.5, 'rgba(186, 230, 253, 0.95)');
      grad.addColorStop(1, 'rgba(125, 211, 252, 0.9)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, riverTop, w, h - riverTop);

      // Water ripples
      ctx.save();
      ctx.globalAlpha = 0.15;
      for (let i = 0; i < 5; i++) {
        const y = riverTop + (h - riverTop) * (i / 5);
        ctx.beginPath();
        ctx.moveTo(0, y);
        for (let x = 0; x <= w; x += 6) {
          const wave = Math.sin((x * 0.008) + t * 0.02 + i * 1.2) * 3
                     + Math.sin((x * 0.015) + t * 0.015 + i * 0.8) * 2;
          ctx.lineTo(x, y + wave);
        }
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawSilhouettes() {
      const w = W(), h = H();
      const baseY = h * 0.48;

      // Soft slate skyline silhouette
      ctx.save();
      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.moveTo(0, baseY);

      const buildings = [
        { x: 0, w: 30, h: 40 },
        { x: 30, w: 25, h: 55 },
        { x: 55, w: 20, h: 40 },
        { x: 75, w: 35, h: 70 },
        { x: 110, w: 15, h: 50 },
        { x: 125, w: 40, h: 80 },
        { x: 165, w: 50, h: 100, temple: true },
        { x: 215, w: 25, h: 55 },
        { x: 240, w: 30, h: 65 },
        { x: 270, w: 50, h: 75 },
        { x: 320, w: 20, h: 45 },
        { x: 340, w: 35, h: 65 },
        { x: 375, w: 60, h: 90, ghat: true },
        { x: 435, w: 30, h: 50 },
        { x: 465, w: 25, h: 60 },
        { x: 490, w: 45, h: 80 },
        { x: 535, w: 40, h: 110, temple: true },
        { x: 575, w: 30, h: 55 },
        { x: 605, w: 20, h: 40 },
        { x: 625, w: 50, h: 70 },
        { x: 675, w: 35, h: 60 },
        { x: 710, w: 25, h: 50 },
      ];

      const scale = w / 760;

      buildings.forEach(b => {
        const bx = b.x * scale;
        const bw = b.w * scale;
        const bh = b.h * (h / 600);
        const by = baseY - bh;

        if (b.temple) {
          ctx.moveTo(bx, baseY);
          ctx.lineTo(bx, by + bh * 0.3);
          ctx.lineTo(bx + bw * 0.5, by - bh * 0.35);
          ctx.lineTo(bx + bw, by + bh * 0.3);
          ctx.lineTo(bx + bw, baseY);
        } else if (b.ghat) {
          const steps = 4;
          const sw = bw / steps;
          const sh = bh / steps;
          ctx.moveTo(bx, baseY);
          for (let s = 0; s < steps; s++) {
            ctx.lineTo(bx + s * sw, baseY - s * sh);
            ctx.lineTo(bx + (s + 1) * sw, baseY - s * sh);
          }
          ctx.lineTo(bx + bw, baseY);
        } else {
          ctx.rect(bx, by, bw, bh);
        }
      });

      ctx.fill();
      ctx.restore();
    }

    function updateParticles() {
      particlesRef.current = particlesRef.current.filter(p => p.life < p.maxLife);
      while (particlesRef.current.length < 200) {
        particlesRef.current.push(spawnParticle());
      }

      particlesRef.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const lifeRatio = p.life / p.maxLife;
        const alpha = p.opacity * (lifeRatio > 0.8 ? (1 - lifeRatio) / 0.2 : 1);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    }

    function frame() {
      const w = W(), h = H();
      t++;

      // Light Sky
      const sky = ctx.createLinearGradient(0, 0, 0, h * 0.55);
      sky.addColorStop(0, '#f8fafc');
      sky.addColorStop(0.5, '#f0f9ff');
      sky.addColorStop(1, '#e0f2fe');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h * 0.6);

      drawWater();
      drawSilhouettes();
      updateParticles();

      animRef.current = requestAnimationFrame(frame);
    }

    animRef.current = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}
