import { Mesh, Program, Renderer, Triangle, Vec3 } from 'ogl';
import { frag, vert } from './shaders';

interface OrbSceneOptions {
  hue: number;
  hoverIntensity: number;
  rotateOnHover: boolean;
  forceHoverState: boolean;
  backgroundColor: string;
}

function hexToVec3(color: string): Vec3 {
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16) / 255;
    const g = parseInt(color.slice(3, 5), 16) / 255;
    const b = parseInt(color.slice(5, 7), 16) / 255;
    return new Vec3(r, g, b);
  }
  return new Vec3(0, 0, 0);
}

export function setupOrbScene(
  container: HTMLDivElement,
  opts: OrbSceneOptions,
): () => void {
  const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  (gl.canvas as HTMLCanvasElement).style.background = 'transparent';
  container.appendChild(gl.canvas as HTMLCanvasElement);

  const geometry = new Triangle(gl);
  const program = new Program(gl, {
    vertex: vert,
    fragment: frag,
    uniforms: {
      iTime: { value: 0 },
      iResolution: {
        value: new Vec3(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height),
      },
      hue: { value: opts.hue },
      hover: { value: 0 },
      rot: { value: 0 },
      hoverIntensity: { value: opts.hoverIntensity },
      backgroundColor: { value: hexToVec3(opts.backgroundColor) },
    },
  });

  const mesh = new Mesh(gl, { geometry, program });

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width * dpr, height * dpr);
    (gl.canvas as HTMLCanvasElement).style.width = width + 'px';
    (gl.canvas as HTMLCanvasElement).style.height = height + 'px';
    program.uniforms.iResolution.value.set(
      gl.canvas.width,
      gl.canvas.height,
      gl.canvas.width / gl.canvas.height
    );
  }
  window.addEventListener('resize', resize);
  resize();

  let targetHover = 0;
  let lastTime = 0;
  let currentRot = 0;
  const rotationSpeed = 0.3;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;
    const size = Math.min(width, height);
    const centerX = width / 2;
    const centerY = height / 2;
    const uvX = ((x - centerX) / size) * 2.0;
    const uvY = ((y - centerY) / size) * 2.0;
    targetHover = Math.sqrt(uvX * uvX + uvY * uvY) < 0.8 ? 1 : 0;
  };

  const handleMouseLeave = () => { targetHover = 0; };

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  let rafId: number;
  const update = (t: number) => {
    rafId = requestAnimationFrame(update);
    const dt = (t - lastTime) * 0.001;
    lastTime = t;
    program.uniforms.iTime.value = t * 0.001;
    program.uniforms.hue.value = opts.hue;
    program.uniforms.hoverIntensity.value = opts.hoverIntensity;
    program.uniforms.backgroundColor.value = hexToVec3(opts.backgroundColor);

    const effectiveHover = opts.forceHoverState ? 1 : targetHover;
    program.uniforms.hover.value += (effectiveHover - program.uniforms.hover.value) * 0.1;

    if (opts.rotateOnHover && effectiveHover > 0.5) {
      currentRot += dt * rotationSpeed;
    }
    program.uniforms.rot.value = currentRot;

    renderer.render({ scene: mesh });
  };
  rafId = requestAnimationFrame(update);

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', resize);
    container.removeEventListener('mousemove', handleMouseMove);
    container.removeEventListener('mouseleave', handleMouseLeave);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    (gl.canvas as HTMLCanvasElement).style.opacity = '0';
    requestAnimationFrame(() => {
      if ((gl.canvas as HTMLCanvasElement).parentElement === container) {
        container.removeChild(gl.canvas as HTMLCanvasElement);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    });
  };
}
