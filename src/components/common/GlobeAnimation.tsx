import React, { useEffect, useRef } from 'react';

export const GlobeAnimation: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const width = (canvas.width = 440);
    const height = (canvas.height = 440);
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 170;

    // Fixed points on sphere (Lat/Lon)
    // India ~ (20N, 78E)
    // Europe ~ (50N, 10E)
    // UAE ~ (25N, 55E)
    // USA ~ (38N, -95W)
    // Singapore ~ (1.3N, 103E)
    const cities = [
      { name: 'India (Origin)', lat: 20, lon: 78, isOrigin: true },
      { name: 'Germany (Hamburg)', lat: 53, lon: 10, isOrigin: false },
      { name: 'UAE (Dubai)', lat: 25, lon: 55, isOrigin: false },
      { name: 'USA (New York)', lat: 40, lon: -74, isOrigin: false },
      { name: 'UK (London)', lat: 51, lon: -0.1, isOrigin: false },
      { name: 'Singapore', lat: 1.3, lon: 103, isOrigin: false },
      { name: 'Japan (Tokyo)', lat: 35, lon: 139, isOrigin: false }
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw globe halo
      const grad = ctx.createRadialGradient(centerX, centerY, radius * 0.4, centerX, centerY, radius * 1.15);
      grad.addColorStop(0, 'rgba(14, 165, 233, 0.15)');
      grad.addColorStop(0.7, 'rgba(20, 184, 166, 0.08)');
      grad.addColorStop(1, 'rgba(10, 25, 47, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.15, 0, Math.PI * 2);
      ctx.fill();

      // Draw sphere outline
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw rotating latitude / longitude wireframe rings
      for (let lat = -60; lat <= 60; lat += 30) {
        const rLat = radius * Math.cos((lat * Math.PI) / 180);
        const yLat = centerY - radius * Math.sin((lat * Math.PI) / 180);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(centerX, yLat, rLat, rLat * 0.28, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw longitude rings
      for (let l = 0; l < Math.PI; l += Math.PI / 6) {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle + l);
        ctx.strokeStyle = 'rgba(45, 212, 191, 0.12)';
        ctx.beginPath();
        ctx.ellipse(0, 0, radius, radius * 0.32, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Project cities
      const projected: { x: number; y: number; visible: boolean; isOrigin: boolean; name: string }[] = [];

      cities.forEach(city => {
        const radLat = (city.lat * Math.PI) / 180;
        const radLon = (city.lon * Math.PI) / 180 + angle;

        // 3D coordinates on unit sphere
        const x3d = Math.cos(radLat) * Math.sin(radLon);
        const y3d = -Math.sin(radLat);
        const z3d = Math.cos(radLat) * Math.cos(radLon);

        const isVisible = z3d > -0.2; // front-facing hemisphere
        const screenX = centerX + x3d * radius;
        const screenY = centerY + y3d * radius;

        projected.push({
          x: screenX,
          y: screenY,
          visible: isVisible,
          isOrigin: city.isOrigin,
          name: city.name
        });
      });

      // Find origin (India)
      const origin = projected.find(p => p.isOrigin);

      // Draw trade arcs from India to destinations
      if (origin && origin.visible) {
        projected.forEach(dest => {
          if (!dest.isOrigin && dest.visible) {
            ctx.beginPath();
            ctx.moveTo(origin.x, origin.y);
            // Curved control point arching above
            const midX = (origin.x + dest.x) / 2;
            const midY = Math.min(origin.y, dest.y) - 35;
            ctx.quadraticCurveTo(midX, midY, dest.x, dest.y);

            ctx.strokeStyle = 'rgba(20, 184, 166, 0.45)';
            ctx.setLineDash([4, 4]);
            ctx.lineWidth = 1.8;
            ctx.stroke();
            ctx.setLineDash([]);

            // Moving packet along arc
            const progress = (Date.now() * 0.0008 + (dest.x % 10)) % 1;
            const t = progress;
            const packetX = (1 - t) * (1 - t) * origin.x + 2 * (1 - t) * t * midX + t * t * dest.x;
            const packetY = (1 - t) * (1 - t) * origin.y + 2 * (1 - t) * t * midY + t * t * dest.y;

            ctx.fillStyle = '#38bdf8';
            ctx.beginPath();
            ctx.arc(packetX, packetY, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      // Draw city nodes
      projected.forEach(p => {
        if (p.visible) {
          ctx.beginPath();
          if (p.isOrigin) {
            // Glowing origin India pulse
            ctx.fillStyle = '#10b981';
            ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
            ctx.lineWidth = 3;
            ctx.stroke();
          } else {
            ctx.fillStyle = '#06b6d4';
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      angle += 0.004;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <canvas ref={canvasRef} className="max-w-full h-auto drop-shadow-2xl" />
      {/* Decorative center label */}
      <div className="absolute bottom-4 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-navy-900/80 text-teal-300 border border-teal-500/30 backdrop-blur-md">
        India 🇮🇳 ➔ Global Trade Routes
      </div>
    </div>
  );
};
