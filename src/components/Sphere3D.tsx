"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Color palette
const ELECTRIC_BLUE = 0x4d9fff;
const GCP_GREEN = 0x5ee89a;
const AWS_ORANGE = 0xffb347;
const TEAL = 0x22d3ee;
const NODE_COLORS = [ELECTRIC_BLUE, GCP_GREEN, AWS_ORANGE, TEAL, ELECTRIC_BLUE, GCP_GREEN];

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

interface NodeData {
  position: THREE.Vector3;
  basePosition: THREE.Vector3;
  color: number;
  size: number;
  phase: number;
  speed: number;
}

interface EdgeData {
  from: number;
  to: number;
  pulseOffset: number;
  pulseSpeed: number;
  pulseColor: number;
  lineColor: number;
}

export default function Sphere3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.set(0, 0, 6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(550, 550);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    container.appendChild(renderer.domElement);

    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // --- NODES ---
    const NODE_COUNT = 35;
    const nodes: NodeData[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const r1 = seededRandom(i * 3);
      const r2 = seededRandom(i * 3 + 1);
      const r3 = seededRandom(i * 3 + 2);

      const theta = r1 * Math.PI * 2;
      const phi = Math.acos(2 * r2 - 1);
      const radius = 1.2 + r3 * 1.6;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const pos = new THREE.Vector3(x, y, z);
      const colorIdx = Math.floor(seededRandom(i * 7 + 5) * NODE_COLORS.length);
      const size = 0.04 + seededRandom(i * 11 + 3) * 0.07;

      nodes.push({
        position: pos.clone(),
        basePosition: pos.clone(),
        color: NODE_COLORS[colorIdx],
        size,
        phase: seededRandom(i * 13 + 7) * Math.PI * 2,
        speed: 0.3 + seededRandom(i * 17 + 11) * 0.5,
      });
    }

    // Create luxury node meshes: bright core + inner glow + outer glow + ring
    const nodeCores: THREE.Mesh[] = [];
    const nodeInnerGlows: THREE.Mesh[] = [];
    const nodeOuterGlows: THREE.Mesh[] = [];
    const nodeRings: THREE.Mesh[] = [];

    nodes.forEach((node) => {
      // Bright white core
      const coreGeo = new THREE.SphereGeometry(node.size * 0.6, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.position.copy(node.position);
      networkGroup.add(core);
      nodeCores.push(core);

      // Inner glow — saturated color
      const innerGeo = new THREE.SphereGeometry(node.size * 1.2, 16, 16);
      const innerMat = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
      });
      const inner = new THREE.Mesh(innerGeo, innerMat);
      inner.position.copy(node.position);
      networkGroup.add(inner);
      nodeInnerGlows.push(inner);

      // Outer glow — large soft bloom
      const outerGeo = new THREE.SphereGeometry(node.size * 4, 16, 16);
      const outerMat = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.2,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const outer = new THREE.Mesh(outerGeo, outerMat);
      outer.position.copy(node.position);
      networkGroup.add(outer);
      nodeOuterGlows.push(outer);

      // Ring around node
      const ringGeo = new THREE.RingGeometry(node.size * 2, node.size * 2.4, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(node.position);
      networkGroup.add(ring);
      nodeRings.push(ring);
    });

    // --- EDGES ---
    const edges: EdgeData[] = [];
    const MAX_DIST = 2.2;
    const edgeColorOptions = [ELECTRIC_BLUE, GCP_GREEN, AWS_ORANGE, TEAL];

    for (let i = 0; i < NODE_COUNT; i++) {
      const distances: { idx: number; dist: number }[] = [];
      for (let j = 0; j < NODE_COUNT; j++) {
        if (i === j) continue;
        distances.push({
          idx: j,
          dist: nodes[i].position.distanceTo(nodes[j].position),
        });
      }
      distances.sort((a, b) => a.dist - b.dist);

      const connectCount = 2 + Math.floor(seededRandom(i * 23 + 1) * 2);
      let connected = 0;
      for (const d of distances) {
        if (connected >= connectCount) break;
        if (d.dist > MAX_DIST) break;
        const exists = edges.some(
          (e) =>
            (e.from === i && e.to === d.idx) ||
            (e.from === d.idx && e.to === i)
        );
        if (!exists) {
          const ci = Math.floor(seededRandom(i * 53 + d.idx * 59) * edgeColorOptions.length);
          edges.push({
            from: i,
            to: d.idx,
            pulseOffset: seededRandom(i * 31 + d.idx * 37) * Math.PI * 2,
            pulseSpeed: 0.8 + seededRandom(i * 41 + d.idx * 43) * 1.5,
            pulseColor: edgeColorOptions[ci],
            lineColor: edgeColorOptions[ci],
          });
        }
        connected++;
      }
    }

    // Create bright glowing edge lines — two layers: bright core + soft bloom
    const edgeCoreLines: THREE.Line[] = [];
    const edgeGlowLines: THREE.Line[] = [];
    const edgeGeometries: THREE.BufferGeometry[] = [];
    const edgeGlowGeometries: THREE.BufferGeometry[] = [];

    edges.forEach((edge) => {
      const from = nodes[edge.from].position;
      const to = nodes[edge.to].position;

      // Bright core line
      const coreGeo = new THREE.BufferGeometry();
      const corePos = new Float32Array(6);
      corePos[0] = from.x; corePos[1] = from.y; corePos[2] = from.z;
      corePos[3] = to.x; corePos[4] = to.y; corePos[5] = to.z;
      coreGeo.setAttribute("position", new THREE.BufferAttribute(corePos, 3));

      const coreMat = new THREE.LineBasicMaterial({
        color: edge.lineColor,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const coreLine = new THREE.Line(coreGeo, coreMat);
      networkGroup.add(coreLine);
      edgeCoreLines.push(coreLine);
      edgeGeometries.push(coreGeo);

      // Soft glow line (same geometry, brighter, lower opacity for bloom effect)
      const glowGeo = new THREE.BufferGeometry();
      const glowPos = new Float32Array(6);
      glowPos[0] = from.x; glowPos[1] = from.y; glowPos[2] = from.z;
      glowPos[3] = to.x; glowPos[4] = to.y; glowPos[5] = to.z;
      glowGeo.setAttribute("position", new THREE.BufferAttribute(glowPos, 3));

      const glowMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const glowLine = new THREE.Line(glowGeo, glowMat);
      networkGroup.add(glowLine);
      edgeGlowLines.push(glowLine);
      edgeGlowGeometries.push(glowGeo);
    });

    // --- DATA PULSES (bigger, brighter) ---
    const PULSE_COUNT = edges.length;
    const pulseGeo = new THREE.BufferGeometry();
    const pulsePositions = new Float32Array(PULSE_COUNT * 3);
    const pulseColors = new Float32Array(PULSE_COUNT * 3);

    for (let i = 0; i < PULSE_COUNT; i++) {
      const c = new THREE.Color(edges[i].pulseColor);
      pulseColors[i * 3] = c.r;
      pulseColors[i * 3 + 1] = c.g;
      pulseColors[i * 3 + 2] = c.b;
    }

    pulseGeo.setAttribute("position", new THREE.BufferAttribute(pulsePositions, 3));
    pulseGeo.setAttribute("color", new THREE.BufferAttribute(pulseColors, 3));

    const pulseMat = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pulsePoints = new THREE.Points(pulseGeo, pulseMat);
    networkGroup.add(pulsePoints);

    // Pulse glow layer (larger, softer)
    const pulseGlowGeo = new THREE.BufferGeometry();
    const pulseGlowPositions = new Float32Array(PULSE_COUNT * 3);
    const pulseGlowColors = new Float32Array(PULSE_COUNT * 3);
    for (let i = 0; i < PULSE_COUNT; i++) {
      const c = new THREE.Color(edges[i].pulseColor);
      pulseGlowColors[i * 3] = c.r;
      pulseGlowColors[i * 3 + 1] = c.g;
      pulseGlowColors[i * 3 + 2] = c.b;
    }
    pulseGlowGeo.setAttribute("position", new THREE.BufferAttribute(pulseGlowPositions, 3));
    pulseGlowGeo.setAttribute("color", new THREE.BufferAttribute(pulseGlowColors, 3));

    const pulseGlowMat = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pulseGlowPoints = new THREE.Points(pulseGlowGeo, pulseGlowMat);
    networkGroup.add(pulseGlowPoints);

    // --- AMBIENT DUST ---
    const dustCount = 100;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (seededRandom(i * 67 + 1) - 0.5) * 8;
      dustPos[i * 3 + 1] = (seededRandom(i * 71 + 2) - 0.5) * 8;
      dustPos[i * 3 + 2] = (seededRandom(i * 73 + 3) - 0.5) * 8;
      const dc = new THREE.Color(edgeColorOptions[Math.floor(seededRandom(i * 79 + 5) * edgeColorOptions.length)]);
      dustColors[i * 3] = dc.r;
      dustColors[i * 3 + 1] = dc.g;
      dustColors[i * 3 + 2] = dc.b;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    dustGeo.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    networkGroup.add(dust);

    // --- ANIMATION ---
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow rotation
      networkGroup.rotation.y = elapsed * 0.08;
      networkGroup.rotation.x = Math.sin(elapsed * 0.05) * 0.1;

      // Animate nodes
      nodes.forEach((node, i) => {
        const ox = Math.sin(elapsed * node.speed + node.phase) * 0.04;
        const oy = Math.cos(elapsed * node.speed * 0.7 + node.phase) * 0.04;
        const oz = Math.sin(elapsed * node.speed * 0.5 + node.phase + 1) * 0.03;

        const px = node.basePosition.x + ox;
        const py = node.basePosition.y + oy;
        const pz = node.basePosition.z + oz;

        nodeCores[i].position.set(px, py, pz);
        nodeInnerGlows[i].position.set(px, py, pz);
        nodeOuterGlows[i].position.set(px, py, pz);
        nodeRings[i].position.set(px, py, pz);

        // Rings always face camera
        nodeRings[i].lookAt(camera.position);

        // Pulse outer glow
        const outerMat = nodeOuterGlows[i].material as THREE.MeshBasicMaterial;
        outerMat.opacity = 0.15 + Math.sin(elapsed * 2.0 + node.phase) * 0.1;

        // Pulse ring
        const ringMat = nodeRings[i].material as THREE.MeshBasicMaterial;
        ringMat.opacity = 0.2 + Math.sin(elapsed * 1.5 + node.phase + 0.5) * 0.15;

        // Pulse ring scale
        const ringScale = 1 + Math.sin(elapsed * 1.2 + node.phase) * 0.2;
        nodeRings[i].scale.set(ringScale, ringScale, ringScale);

        node.position.set(px, py, pz);
      });

      // Update edge lines
      edges.forEach((edge, i) => {
        const from = nodes[edge.from].position;
        const to = nodes[edge.to].position;

        const coreArr = edgeGeometries[i].attributes.position.array as Float32Array;
        coreArr[0] = from.x; coreArr[1] = from.y; coreArr[2] = from.z;
        coreArr[3] = to.x; coreArr[4] = to.y; coreArr[5] = to.z;
        edgeGeometries[i].attributes.position.needsUpdate = true;

        const glowArr = edgeGlowGeometries[i].attributes.position.array as Float32Array;
        glowArr[0] = from.x; glowArr[1] = from.y; glowArr[2] = from.z;
        glowArr[3] = to.x; glowArr[4] = to.y; glowArr[5] = to.z;
        edgeGlowGeometries[i].attributes.position.needsUpdate = true;

        // Shimmer line brightness
        const coreMat = edgeCoreLines[i].material as THREE.LineBasicMaterial;
        coreMat.opacity = 0.4 + Math.sin(elapsed * 1.8 + edge.pulseOffset) * 0.25;
      });

      // Data pulses
      const pulsePosArr = pulseGeo.attributes.position.array as Float32Array;
      const pulseGlowPosArr = pulseGlowGeo.attributes.position.array as Float32Array;
      edges.forEach((edge, i) => {
        const t = ((elapsed * edge.pulseSpeed + edge.pulseOffset) % (Math.PI * 2)) / (Math.PI * 2);
        const from = nodes[edge.from].position;
        const to = nodes[edge.to].position;
        const px = from.x + (to.x - from.x) * t;
        const py = from.y + (to.y - from.y) * t;
        const pz = from.z + (to.z - from.z) * t;
        pulsePosArr[i * 3] = px;
        pulsePosArr[i * 3 + 1] = py;
        pulsePosArr[i * 3 + 2] = pz;
        pulseGlowPosArr[i * 3] = px;
        pulseGlowPosArr[i * 3 + 1] = py;
        pulseGlowPosArr[i * 3 + 2] = pz;
      });
      pulseGeo.attributes.position.needsUpdate = true;
      pulseGlowGeo.attributes.position.needsUpdate = true;

      dust.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const size = Math.min(w, h, 550);
      renderer.setSize(size, size);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      nodeCores.forEach((m) => { m.geometry.dispose(); (m.material as THREE.Material).dispose(); });
      nodeInnerGlows.forEach((m) => { m.geometry.dispose(); (m.material as THREE.Material).dispose(); });
      nodeOuterGlows.forEach((m) => { m.geometry.dispose(); (m.material as THREE.Material).dispose(); });
      nodeRings.forEach((m) => { m.geometry.dispose(); (m.material as THREE.Material).dispose(); });
      edgeCoreLines.forEach((l) => { l.geometry.dispose(); (l.material as THREE.Material).dispose(); });
      edgeGlowLines.forEach((l) => { l.geometry.dispose(); (l.material as THREE.Material).dispose(); });
      pulseGeo.dispose();
      pulseMat.dispose();
      pulseGlowGeo.dispose();
      pulseGlowMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-[550px] h-[550px] flex items-center justify-center"
    />
  );
}
