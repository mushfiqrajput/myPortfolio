"use client";

import { useEffect, useRef, useState } from "react";

// Raw-WebGL aurora field — no three.js, no deps.
// A fragment shader paints flowing cyan plasma that drifts toward the cursor.
// Falls back to the static radial glows (children) on reduced-motion or
// when WebGL is unavailable, so nothing ever looks broken.

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

// fbm value-noise aurora. Tuned to stay subtle on near-black so text reads.
const FRAG = `
precision highp float;
uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;   // 0..1, smoothed

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i + vec2(1.0,0.0));
  float c = hash(i + vec2(0.0,1.0)), d = hash(i + vec2(1.0,1.0));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
}
float fbm(vec2 p){
  float v = 0.0, amp = 0.5;
  for (int i = 0; i < 5; i++){ v += amp*noise(p); p *= 2.02; amp *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p  = uv;
  p.x *= u_res.x / u_res.y;

  float t = u_time * 0.04;

  // domain-warped fbm — gives the flowing aurora ribbons
  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 1.5*q + vec2(1.7, 9.2) + 0.15*t),
                fbm(p + 1.5*q + vec2(8.3, 2.8) - 0.12*t));
  float f = fbm(p + 1.8*r);

  // pull the field gently toward the cursor
  float md = distance(uv, u_mouse);
  float pull = smoothstep(0.6, 0.0, md) * 0.35;
  f += pull;

  // cyan -> deep teal ramp, kept dim so it reads as ambient light
  vec3 cyan = vec3(0.0, 0.749, 0.875);   // #00bfdf
  vec3 deep = vec3(0.0, 0.20, 0.28);
  vec3 col  = mix(deep, cyan, smoothstep(0.35, 0.95, f));

  // vignette so edges fade to background instead of a hard rectangle
  float vig = smoothstep(1.2, 0.2, length(uv - 0.5));
  float intensity = pow(f, 2.4) * 0.55 * vig + pull * 0.4;

  gl_FragColor = vec4(col * intensity, intensity);
}
`;

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function ShaderBackground({ className = "", children }) {
  const canvasRef = useRef(null);
  const [usingGL, setUsingGL] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setUsingGL(false);
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: true }) ||
      canvas.getContext("experimental-webgl");
    if (!gl) {
      setUsingGL(false);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      setUsingGL(false);
      return;
    }
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setUsingGL(false);
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]), // single big triangle
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    // cap DPR — the shader is per-pixel, full retina is wasteful here
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

    function resize() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * DPR));
      canvas.height = Math.max(1, Math.floor(h * DPR));
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const mouse = { x: 0.5, y: 0.5 };
    const smooth = { x: 0.5, y: 0.5 };
    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = 1 - (e.clientY - rect.top) / rect.height; // GL y is bottom-up
    }
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf;
    let running = true;
    const start = performance.now();

    // pause when the canvas scrolls out of view (panel-snap = big perf win)
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running && !raf) raf = requestAnimationFrame(frame);
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    function frame(now) {
      smooth.x += (mouse.x - smooth.x) * 0.05;
      smooth.y += (mouse.y - smooth.y) * 0.05;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, smooth.x, smooth.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = running ? requestAnimationFrame(frame) : null;
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 -z-0 overflow-hidden ${className}`} aria-hidden>
      {usingGL && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ opacity: 0.9 }}
        />
      )}
      {/* static fallback / underlay — always present, shader composites over it */}
      {children}
    </div>
  );
}
