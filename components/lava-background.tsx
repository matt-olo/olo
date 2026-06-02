"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform float uScroll;
  uniform float uIntro;
  uniform vec2 uResolution;

  vec2 flowField(vec2 p, float phase) {
    // Start at 135 degrees (diagonal like the deck), smooth continuous rotation from there
    float angle = 2.356 + phase * 0.4; // 2.356 rad = 135 deg
    return vec2(cos(angle), sin(angle));
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = (uv - 0.5) * 2.0;
    p.x *= uResolution.x / uResolution.y;

    float phase = uScroll * 3.0 + uTime * 0.001;

    vec2 flow = flowField(p, phase);
    vec2 perp = vec2(-flow.y, flow.x);
    
    // Intro: offset lines from off-screen, ease into final position
    float introEase = uIntro * uIntro * (3.0 - 2.0 * uIntro); // smoothstep
    float introOffset = (1.0 - introEase) * 2.0; // starts offset by 2, ends at 0
    
    float linePos = dot(p, perp);
    linePos += introOffset; // roll in
    linePos += sin(dot(p, flow) * 2.5 + phase * 0.2) * 0.015;
    
    float spacing = 0.18;
    float d = abs(mod(linePos + spacing * 0.5, spacing) - spacing * 0.5);
    
    float line = smoothstep(0.002, 0.0, d);
    float glow = smoothstep(0.008, 0.0, d) * 0.2;
    
    // Chaotic color per line - shifts over time
    float lineIndex = floor((linePos + spacing * 0.5) / spacing);
    float hash = fract(sin(lineIndex * 127.1 + 311.7) * 43758.5453);
    
    // Slowly shift which color each line has
    float colorShift = sin(uTime * 0.03 + lineIndex * 0.5) * 0.5 + 0.5;
    float mixedHash = fract(hash + colorShift * 0.4);
    
    vec3 colors[5];
    colors[0] = vec3(0.0, 0.35, 0.38);    // teal
    colors[1] = vec3(0.1, 0.55, 0.5);     // seafoam
    colors[2] = vec3(0.0, 0.25, 0.4);     // deep blue
    colors[3] = vec3(0.12, 0.65, 0.58);   // bright turquoise
    colors[4] = vec3(0.0, 0.4, 0.5);      // ocean cyan
    
    int ci = int(mod(mixedHash * 5.0, 5.0));
    vec3 lineColor;
    if (ci == 0) lineColor = colors[0];
    else if (ci == 1) lineColor = colors[1];
    else if (ci == 2) lineColor = colors[2];
    else if (ci == 3) lineColor = colors[3];
    else lineColor = colors[4];
    
    // More color variation per line
    lineColor = mix(lineColor, vec3(0.0, 0.6, 0.65), fract(mixedHash * 2.7) * 0.4);
    lineColor *= 0.4 + mixedHash * 0.6;
    
    // Dark base
    vec3 color = vec3(0.008, 0.02, 0.03);
    color += lineColor * (line * 0.4 + glow * 0.7);
    
    // Center blur/darken for text readability
    float centerMask = smoothstep(0.6, 0.0, length(p * vec2(0.7, 1.0)));
    color *= (1.0 - centerMask * 0.6);
    
    // Slight overall dimming + intro fade
    color *= 0.8 * introEase;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function LavaBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const renderer = new THREE.WebGLRenderer({ alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    containerRef.current.appendChild(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uIntro: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      uniforms.uScroll.value = window.scrollY / Math.max(maxScroll, 1);
    };
    window.addEventListener("scroll", handleScroll);

    let animFrame: number;
    let startTime = Date.now();
    const introDuration = 3000; // 3 seconds to roll in

    const animate = () => {
      uniforms.uTime.value += 0.016;
      
      // Intro progress: 0 to 1 over introDuration
      const elapsed = Date.now() - startTime;
      uniforms.uIntro.value = Math.min(elapsed / introDuration, 1.0);
      
      renderer.render(scene, camera);
      animFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10" style={{ pointerEvents: "none" }} />
  );
}
