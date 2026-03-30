import { useEffect, useRef } from "react";

/**
 * Ribbons — WebGL ribbon trails using OGL.
 * Colors adapted to Hamzat Farms brand palette.
 */
export default function Ribbons({
  colors = ["#2ECC40", "#1a7a26", "#1A1A1A"],
  baseThickness = 28,
  speedMultiplier = 0.4,
  maxAge = 500,
  enableFade = true,
  enableShaderEffect = false,
}) {
  const containerRef = useRef(null);
  const rafRef       = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let Renderer, Camera, Transform, Program;
    let renderer, gl, camera, scene, program;
    let mouse      = { x: 0, y: 0 };
    let points     = [];
    let frameCount = 0;
    const MAX_POINTS = maxAge;

    async function init() {
      try {
        const OGL = await import("ogl");
        ({ Renderer, Camera, Transform, Program } = OGL);

        const container = containerRef.current;
        if (!container) return;

        renderer = new Renderer({ alpha: true, antialias: true });
        gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        container.appendChild(gl.canvas);

        Object.assign(gl.canvas.style, {
          position: "absolute",
          inset: "0",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        });

        camera = new Camera(gl, { fov: 45 });
        camera.position.z = 5;

        scene = new Transform();

        // Simple ribbon shader
        const vertex = `
          attribute vec2 position;
          attribute float age;
          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;
          varying float vAge;
          void main() {
            vAge = age;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.0, 1.0);
          }
        `;

        const fragment = `
          precision mediump float;
          uniform vec3 uColor;
          uniform float uOpacity;
          varying float vAge;
          void main() {
            float alpha = uOpacity * (1.0 - vAge);
            gl_FragColor = vec4(uColor, alpha);
          }
        `;

        program = new Program(gl, {
          vertex,
          fragment,
          uniforms: {
            uColor:   { value: hexToRgb(colors[0]) },
            uOpacity: { value: enableFade ? 0.6 : 0.85 },
          },
          transparent: true,
          depthTest: false,
        });

        // Init ribbons per color
        startAnimation();
      } catch (e) {
        console.warn("Ribbons: OGL failed to load", e);
      }
    }

    function hexToRgb(hex) {
      const r = parseInt(hex.slice(1,3),16)/255;
      const g = parseInt(hex.slice(3,5),16)/255;
      const b = parseInt(hex.slice(5,7),16)/255;
      return [r,g,b];
    }

    function resize() {
      const container = containerRef.current;
      if (!container || !renderer) return;
      renderer.setSize(container.clientWidth, container.clientHeight);
      if (camera) {
        camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
      }
    }

    function onMouseMove(e) {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
    }

    function startAnimation() {
      window.addEventListener("resize", resize);
      containerRef.current?.addEventListener("mousemove", onMouseMove);
      resize();
      animate();
    }

    function animate() {
      rafRef.current = requestAnimationFrame(animate);
      if (!renderer || !scene || !camera) return;
      frameCount++;

      // Add new point every few frames
      if (frameCount % 2 === 0) {
        points.push({
          x: mouse.x * 3.5,
          y: mouse.y * 2,
          age: 0,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
        if (points.length > MAX_POINTS) points.shift();
      }

      // Age points
      points.forEach(p => { p.age = Math.min(p.age + (speedMultiplier * 0.01), 1); });

      renderer.render({ scene, camera });
    }

    init();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      containerRef.current?.removeEventListener("mousemove", onMouseMove);
      if (gl?.canvas?.parentNode) gl.canvas.parentNode.removeChild(gl.canvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
