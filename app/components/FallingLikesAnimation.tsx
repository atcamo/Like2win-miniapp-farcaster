"use client";

import { useEffect, useRef } from 'react';

interface FallingItem {
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  spin: number;
  transformationTriggered: boolean;
  sparkleTimer: number;
  particles: { x: number; y: number; vx: number; vy: number; size: number; life: number }[];
  bounceTimer: number;
  velocityY: number;
  update(): void;
  draw(): void;
}

export function FallingLikesAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const likeImg = new Image();
    likeImg.src = '/like.png';
    const coinImg = new Image();
    coinImg.src = '/coin.png';

    const items: FallingItem[] = [];
    const splashCoins: { x: number; y: number; vx: number; vy: number; size: number; life: number; angle: number; spin: number }[] = [];

    class FallingLike implements FallingItem {
      x: number;
      y: number;
      size: number;
      speed: number;
      angle: number;
      spin: number;
      transformationTriggered: boolean;
      sparkleTimer: number;
      particles: { x: number; y: number; vx: number; vy: number; size: number; life: number }[];
      bounceTimer: number;
      velocityY: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = -50;
        this.size = Math.random() * 15 + 20;
        this.speed = Math.random() * 2 + 4.5;
        this.angle = 0;
        this.spin = Math.random() * 3 - 1.5;
        this.transformationTriggered = false;
        this.sparkleTimer = 0;
        this.particles = [];
        this.bounceTimer = 0;
        this.velocityY = this.speed;
      }

      update() {
        this.y += this.speed;
        this.angle += this.spin;

        // Punto de transformación en 50% de altura
        const transformPoint = canvas!.height * 0.5;

        // Generar partículas mágicas durante transformación
        if (Math.abs(this.y - transformPoint) < 10 && !this.transformationTriggered) {
          this.transformationTriggered = true;
          this.sparkleTimer = 10;
          
          // Crear partículas mágicas
          for (let i = 0; i < 6; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 1;
            this.particles.push({
              x: 0,
              y: 0,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: Math.random() * 4 + 2,
              life: 1,
            });
          }
        }

        // Crear splash de monedas al tocar el fondo (solo si es coin)
        if (this.y >= canvas!.height - this.size / 2 && this.transformationTriggered && splashCoins.length < 15) {
          // Crear splash de monedas saltando del fondo (reducido)
          for (let i = 0; i < 4; i++) {
            const angle = Math.PI + (Math.random() - 0.5) * Math.PI; // Arco hacia arriba
            const speed = Math.random() * 6 + 3;
            const distance = Math.random() * 40 + 15; // Distancia del impacto
            
            splashCoins.push({
              x: this.x + (Math.random() - 0.5) * distance,
              y: canvas!.height,
              vx: Math.cos(angle) * speed * 0.3, // Movimiento horizontal
              vy: Math.sin(angle) * speed, // Movimiento vertical (negativo = hacia arriba)
              size: Math.random() * 10 + 6,
              life: 0.8, // Vida más corta
              angle: Math.random() * 360,
              spin: Math.random() * 8 - 4
            });
          }
          
          // Reiniciar la moneda principal
          this.x = Math.random() * canvas!.width;
          this.y = -50;
          this.transformationTriggered = false;
          this.sparkleTimer = 0;
          this.particles.length = 0;
        }

        // Reiniciar cuando sale de pantalla sin tocar el fondo
        if (this.y > canvas!.height + 50) {
          this.x = Math.random() * canvas!.width;
          this.y = -50;
          this.transformationTriggered = false;
          this.sparkleTimer = 0;
          this.particles.length = 0;
        }

        // Actualizar partículas mágicas
        for (let i = this.particles.length - 1; i >= 0; i--) {
          const p = this.particles[i];
          if (p.life <= 0) {
            this.particles.splice(i, 1);
            continue;
          }
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.04;
          p.vy += 0.1; // Gravedad
          p.vx *= 0.98; // Resistencia del aire
        }

        // Decrementar timer de efecto
        if (this.sparkleTimer > 0) {
          this.sparkleTimer--;
        }
      }

      draw() {
        ctx!.save();
        
        const transformPoint = canvas!.height * 0.5;

        // Dibujar partículas mágicas
        this.particles.forEach(p => {
          ctx!.save();
          ctx!.translate(this.x + p.x, this.y + p.y);
          ctx!.beginPath();
          ctx!.arc(0, 0, p.size, 0, 2 * Math.PI);
          
          // Colores mágicos que cambian
          const hue = (Date.now() * 0.01 + p.life * 360) % 360;
          ctx!.fillStyle = `hsla(${hue}, 80%, 70%, ${p.life})`;
          ctx!.shadowColor = `hsla(${hue}, 100%, 50%, ${p.life * 0.5})`;
          ctx!.shadowBlur = 8;
          ctx!.fill();
          ctx!.restore();
        });

        // Transformar para rotación
        ctx!.translate(this.x, this.y);
        ctx!.rotate((this.angle * Math.PI) / 180);

        // Determinar qué imagen mostrar
        const showLike = this.y < transformPoint;
        const img = showLike ? likeImg : coinImg;

        // Efecto de destello durante transformación
        if (this.sparkleTimer > 0) {
          ctx!.filter = 'brightness(1.8) contrast(1.2)';
          ctx!.shadowColor = 'rgba(255, 215, 0, 0.9)';
          ctx!.shadowBlur = 15;
          
          // Aura dorada pulsante
          const auraSize = this.size + Math.sin(this.sparkleTimer * 0.5) * 10;
          ctx!.beginPath();
          ctx!.arc(0, 0, auraSize, 0, 2 * Math.PI);
          ctx!.fillStyle = `rgba(255, 215, 0, ${0.2 * this.sparkleTimer / 20})`;
          ctx!.fill();
          
        } else if (showLike) {
          ctx!.filter = 'brightness(1.3) contrast(1.1)';
          ctx!.shadowColor = 'rgba(255, 255, 255, 0.3)';
          ctx!.shadowBlur = 4;
        } else {
          ctx!.filter = 'none';
        }

        // Dibujar imagen con rotación
        if (img.complete) {
          ctx!.drawImage(img, -this.size / 2, -this.size / 2, this.size, this.size);
        }

        ctx!.restore();
      }
    }

    // Inicializar elementos (mínima cantidad)
    const init = () => {
      for (let i = 0; i < 3; i++) {
        items.push(new FallingLike());
        // Espaciar la aparición inicial
        items[i].y = -50 - (i * 150);
      }
    };

    // Control de FPS simplificado
    let lastTime = 0;
    const targetFPS = 30; // Aumentar a 30 FPS ya que es más simple
    const frameInterval = 1000 / targetFPS;

    // Loop de animación con splash de monedas
    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
        
        // Actualizar y dibujar items principales
        items.forEach(item => {
          item.update();
          item.draw();
        });

        // Actualizar monedas del splash
        for (let i = splashCoins.length - 1; i >= 0; i--) {
          const coin = splashCoins[i];
          
          // Física del splash
          coin.x += coin.vx;
          coin.y += coin.vy;
          coin.vy += 0.4; // Gravedad
          coin.vx *= 0.99; // Resistencia del aire
          coin.angle += coin.spin;
          coin.life -= 0.025; // Desaparecen más rápido
          
          // Dibujar moneda del splash (simplificado)
          if (coin.life > 0) {
            ctx!.save();
            ctx!.translate(coin.x, coin.y);
            ctx!.rotate((coin.angle * Math.PI) / 180);
            ctx!.globalAlpha = coin.life;
            
            // Efecto dorado simplificado
            ctx!.filter = 'brightness(1.15)';
            
            if (coinImg.complete) {
              ctx!.drawImage(coinImg, -coin.size / 2, -coin.size / 2, coin.size, coin.size);
            }
            ctx!.restore();
          } else {
            splashCoins.splice(i, 1);
          }
        }
        
        lastTime = currentTime;
      }
      
      requestAnimationFrame(animate);
    };

    // Iniciar cuando las imágenes estén listas
    Promise.all([
      new Promise(resolve => likeImg.onload = resolve),
      new Promise(resolve => coinImg.onload = resolve)
    ]).then(() => {
      init();
      requestAnimationFrame(animate);
    });

    // Redimensionar canvas
    const handleResize = () => {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-70"
      style={{ zIndex: 1 }}
    />
  );
}