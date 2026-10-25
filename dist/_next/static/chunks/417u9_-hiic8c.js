(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,20989,e=>{"use strict";var t=e.i(43476),o=e.i(71645);let r={focus:0,part:1,none:2},a={dots:0,dashes:.45,lines:1},i={depth:0,along:1,across:2},u=[0,.75,.35],n=[[0,0,0,0],[1.9,-4.6,-.08,2.4],[-1.05,2,.12,4.1]],l=[1,.5,.55],s=Math.PI/180,f=1/(2*Math.tan(.28)),c=`#version 300 es
precision highp float;
`,m=`
uniform float uTime;
uniform float uTwist;
uniform float uRoll;
uniform float uWaves;
uniform float uWidth;
uniform float uRibbon;
uniform mat3 uOrient;
uniform float uScale;
uniform vec4 uPlace;
uniform float uVolume;

float hash11(float n) {
  return fract(sin(n * 91.3458) * 47453.5453);
}

vec3 centerLocal(float s) {
  float t = uTime;
  float ph = uPlace.w;
  float x = s * 24.0;
  float y = uWaves * (0.52 * sin(x * 0.43 + t * 0.31 + ph) + 0.26 * sin(x * 0.79 - t * 0.23 + 1.3 + ph * 0.7)) + uPlace.x + x * uPlace.z;
  float z = uWaves * 0.65 * sin(x * 0.33 + t * 0.19 + 0.7 + ph * 1.3) + uPlace.y;
  return vec3(x, y, z);
}

float twistAt(float s, float layer) {
  float x = s * 24.0;
  return uTwist * 0.483 * x + uRoll + uPlace.w * 0.6 + layer * uVolume * 0.42 + 0.5 * sin(x * 0.26 + uTime * 0.27 + uPlace.w);
}

vec3 ribbonPoint(float s, float v, float n, float layer, out vec3 normal) {
  vec3 c0 = centerLocal(s);
  vec3 c1 = centerLocal(s + 0.004);
  vec3 tangent = normalize(c1 - c0);
  vec3 up = vec3(0.0, 1.0, 0.0);
  vec3 n0 = normalize(up - tangent * dot(up, tangent));
  vec3 b0 = cross(tangent, n0);
  float th = twistAt(s, layer);
  vec3 across = cos(th) * n0 + sin(th) * b0;
  vec3 sheet = -sin(th) * n0 + cos(th) * b0;
  float halfWidth = uWidth * (0.78 + 0.22 * cos(s * 3.14159));
  vec3 local = c0 + across * v * halfWidth + sheet * (n + layer * uVolume * 0.16) * halfWidth;
  normal = uOrient * sheet;
  return uOrient * (local * uScale);
}
`,h=`${c}
${m}
uniform mat4 uViewProj;
uniform vec3 uEye;
uniform vec2 uViewport;
uniform float uDpr;
uniform float uFibers;
uniform float uDots;
uniform float uFlow;
uniform float uSize;
uniform float uFocus;
uniform float uDof;
uniform float uMaxCoc;
uniform float uFocal;
uniform float uIntro;
uniform vec4 uPulse;
uniform vec4 uHover;
uniform float uPart;
uniform float uDotLength;
uniform float uSparkle;
uniform float uDepthSpread;
uniform float uGain;
uniform float uTips;
uniform float uTint;
uniform float uGradient;
uniform float uFold;

out vec2 vLocal;
out float vRadius;
out float vSegment;
out vec3 vLight;
out float vTint;

vec3 project(vec3 world, out float depth) {
  vec4 clip = uViewProj * vec4(world, 1.0);
  depth = clip.w;
  vec2 ndc = clip.xy / clip.w;
  return vec3((ndc * 0.5 + 0.5) * uViewport, clip.w);
}

vec2 part(vec2 px) {
  if (uPart <= 0.0 || uHover.w <= 0.0) return px;
  vec2 away = px - uHover.xy;
  float dist = length(away);
  float radius = uHover.z;
  float push = uPart * uHover.w * radius * 0.55 * exp(-dist * dist / (radius * radius));
  return px + away / max(dist, 1e-3) * push * smoothstep(0.0, radius * 0.25, dist);
}

void main() {
  int perFiber = int(uDots);
  int fiber = gl_InstanceID / perFiber;
  int bead = gl_InstanceID - fiber * perFiber;
  float fi = float(fiber);
  float fk = float(bead);

  float seed = hash11(fi * 1.731 + uRibbon * 17.0);
  float s = fract((fk + uFlow + seed * uDots) / uDots) - 0.5;
  float sNext = s + 1.0 / uDots;
  float layer = mod(fi, 3.0) - 1.0;
  float slot = floor(fi / 3.0);
  float perLayer = max(floor(uFibers / 3.0), 1.0);
  float v = ((slot + 0.5) / perLayer) * 2.0 - 1.0 + (hash11(fi * 3.113 + 4.0) - 0.5) * (1.6 / perLayer) + layer * 0.12 / perLayer;
  float depthOffset = (hash11(fi * 7.919 + 2.0) - 0.5) * uDepthSpread * (0.35 + 6.0 * s * s);

  vec3 normal;
  vec3 world = ribbonPoint(s, v, depthOffset, layer, normal);
  vec3 nextNormal;
  vec3 nextWorld = ribbonPoint(sNext, v, depthOffset, layer, nextNormal);

  float depth;
  vec3 p0 = project(world, depth);
  float nextDepth;
  vec3 p1 = project(nextWorld, nextDepth);
  vec2 px = part(p0.xy);
  vec2 pxNext = part(p1.xy);

  float baseRadius = max(0.5 * uSize * uDpr * uFocal / max(depth, 0.1), 0.45);
  float coc = min(uDof * abs(1.0 - uFocus / max(depth, 0.1)) * uViewport.y * 0.035, uMaxCoc * uDpr);
  float radius = baseRadius + coc;
  float spill = max(10.0 * uDpr, baseRadius);
  float energy = pow(baseRadius / min(radius, spill), 1.25) * pow(min(1.0, spill / radius), 2.0);

  vec3 toEye = normalize(uEye - world);
  float facing = abs(dot(normalize(normal), toEye));
  float focalPx = uViewport.y * ${f.toFixed(5)} / max(depth, 0.1);
  float widthPx = 2.0 * uWidth * uScale * focalPx;
  float stack = (widthPx * facing + 2.0 * baseRadius) / (widthPx + 2.0 * baseRadius);
  float spacingFace = length(nextWorld - world) * focalPx;
  float trail = (length(p1.xy - p0.xy) + 2.0 * baseRadius) / (spacingFace + 2.0 * baseRadius);
  float crowd = sqrt(clamp(stack * trail, 0.002, 1.0));
  float fold = pow(1.0 - facing, 6.0) * uFold;
  float endFade = smoothstep(0.5, 0.4, abs(s)) * smoothstep(1.6, 4.2, depth);
  float tipEnd = mix(0.6, 0.06 + 0.26 * hash11(fi * 9.137 + uPlace.w * 3.0), uTips);
  float tip = exp(-pow((s - tipEnd) / 0.0065, 2.0)) * uTips;
  endFade *= smoothstep(tipEnd + 0.003, tipEnd - 0.001, s);
  float appear = smoothstep(0.0, 0.12, uIntro * 1.3 - (s + 0.5) - seed * 0.12);
  float twinklePhase = hash11(fi * 13.7 + fk * 0.917 + uRibbon * 3.0);
  float twinkle = pow(max(sin(uTime * (1.2 + 2.6 * twinklePhase) * 3.0 + twinklePhase * 61.0), 0.0), 36.0) * uSparkle * (1.0 - 0.85 * uDotLength);
  float pulseGap = abs(s - uPulse.x) - uPulse.y * 0.42;
  float pulse = uPulse.z * exp(-pulseGap * pulseGap / 0.0018) * (abs(uPulse.w - uRibbon) < 0.5 ? 1.0 : 0.35);
  float strength = mix(0.45, 1.0, hash11(fi * 5.37 + 1.0)) * mix(1.0, 0.72, abs(layer) * uVolume);
  float intensity = energy * crowd * strength * endFade * appear * 0.8 * uGain * (1.0 + fold * 7.0 + twinkle * 5.0 + pulse * 4.0 + tip * 7.0);
  float highlight = clamp(fold * 0.55 + twinkle + pulse + tip, 0.0, 1.0);

  vec2 segment = (pxNext - px) * uDotLength;
  float segmentLength = length(segment);
  intensity *= mix(1.0, (2.0 * radius) / (segmentLength + 2.0 * radius) * 1.6, uDotLength);
  vec2 axis = segmentLength > 1e-3 ? segment / segmentLength : vec2(1.0, 0.0);
  vec2 perp = vec2(-axis.y, axis.x);
  vec2 corner = vec2(gl_VertexID == 1 || gl_VertexID == 3 ? 1.0 : 0.0, gl_VertexID >= 2 ? 1.0 : 0.0);
  float along = mix(-radius, segmentLength + radius, corner.x);
  float across = mix(-radius, radius, corner.y);
  vec2 position = px + axis * along + perp * across;

  vLocal = vec2(along, across);
  vRadius = radius;
  vSegment = segmentLength;
  vLight = vec3(intensity, highlight, coc / max(radius, 1e-3));
  float depthTint = clamp(uTint + smoothstep(uFocus, uFocus + 5.0, depth) * 0.5, 0.0, 1.0);
  vTint = uGradient < 0.5 ? depthTint : uGradient < 1.5 ? smoothstep(-0.42, 0.42, s) : clamp(v * 0.5 + 0.5, 0.0, 1.0);
  if (intensity < 0.0005) position = vec2(-1e4);
  gl_Position = vec4(position / uViewport * 2.0 - 1.0, 0.0, 1.0);
}`,d=`${c}
uniform mat4 uViewProj;
uniform vec2 uViewport;
uniform float uDpr;
uniform float uTime;
uniform float uSize;
uniform float uFocus;
uniform float uDof;
uniform float uMaxCoc;
uniform float uFocal;
uniform float uIntro;
uniform float uSparkle;
uniform float uScale;
uniform float uGradient;
uniform float uGain;

out vec2 vLocal;
out float vRadius;
out float vSegment;
out vec3 vLight;
out float vTint;

float hash11(float n) {
  return fract(sin(n * 91.3458) * 47453.5453);
}

void main() {
  float id = float(gl_InstanceID);
  vec3 seed = vec3(hash11(id * 1.37 + 0.3), hash11(id * 2.91 + 1.7), hash11(id * 4.17 + 2.9));
  vec3 box = vec3(9.0, 5.4, 6.0);
  vec3 p = (seed - 0.5) * box;
  p.z -= 0.6;
  p += 0.18 * vec3(sin(uTime * 0.21 + seed.x * 40.0), sin(uTime * 0.17 + seed.y * 40.0), sin(uTime * 0.13 + seed.z * 40.0));
  p *= mix(1.0, uScale, 0.5);
  vec4 clip = uViewProj * vec4(p, 1.0);
  float depth = clip.w;
  vec2 px = (clip.xy / clip.w * 0.5 + 0.5) * uViewport;
  float size = uSize * mix(0.5, 1.4, hash11(id * 7.7));
  float baseRadius = max(0.5 * size * uDpr * uFocal / max(depth, 0.1), 0.45);
  float coc = min(uDof * abs(1.0 - uFocus / max(depth, 0.1)) * uViewport.y * 0.035, uMaxCoc * uDpr * 1.6);
  float radius = baseRadius + coc;
  float spill = max(10.0 * uDpr, baseRadius);
  float energy = pow(baseRadius / min(radius, spill), 0.9) * pow(min(1.0, spill / radius), 2.0);
  float twinkle = pow(max(sin(uTime * (0.8 + 1.6 * seed.y) * 2.0 + seed.z * 50.0), 0.0), 8.0);
  float intensity = energy * (0.35 + 0.65 * twinkle) * mix(0.4, 1.0, seed.x) * smoothstep(0.3, 1.0, uIntro) * (depth > 0.2 ? 1.0 : 0.0);
  vec2 corner = vec2(gl_VertexID == 1 || gl_VertexID == 3 ? 1.0 : 0.0, gl_VertexID >= 2 ? 1.0 : 0.0) * 2.0 - 1.0;
  vec2 position = px + corner * radius;
  vLocal = corner * radius;
  vRadius = radius;
  vSegment = 0.0;
  vLight = vec3(intensity * 0.8 * uGain, 0.3 + 0.6 * twinkle * uSparkle, coc / max(radius, 1e-3));
  vTint = uGradient < 0.5 ? 0.45 + 0.55 * seed.y : seed.y;
  gl_Position = vec4(position / uViewport * 2.0 - 1.0, 0.0, 1.0);
}`,v=`${c}
uniform vec3 uGlowColor;
uniform vec3 uLineColor;
uniform vec3 uSecondaryColor;
in vec2 vLocal;
in float vRadius;
in float vSegment;
in vec3 vLight;
in float vTint;
out vec4 outColor;
void main() {
  float along = clamp(vLocal.x, 0.0, vSegment);
  float d = length(vec2(vLocal.x - along, vLocal.y));
  float rho = d / max(vRadius, 1e-3);
  if (rho > 1.0) discard;
  float soft = clamp(2.6 / max(vRadius, 1e-3), 0.14, 1.0);
  float disk = 1.0 - smoothstep(1.0 - soft, 1.0, rho);
  float bokeh = disk * (0.94 + 0.08 * smoothstep(0.55, 0.95, rho));
  float core = exp(-rho * rho * 3.2);
  float shape = mix(core, bokeh, smoothstep(0.25, 0.7, vLight.z));
  vec3 color = mix(mix(uGlowColor, uSecondaryColor, vTint), uLineColor, vLight.y);
  outColor = vec4(color * shape * vLight.x, shape * vLight.x);
}`,p=`${c}
out vec2 vUv;
void main() {
  vec2 p = vec2(gl_VertexID == 1 ? 3.0 : -1.0, gl_VertexID == 2 ? 3.0 : -1.0);
  vUv = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}`,x=`${c}
uniform sampler2D uSource;
uniform vec2 uTexel;
in vec2 vUv;
out vec4 outColor;
vec3 pick(vec2 uv) {
  vec3 c = texture(uSource, uv).rgb;
  float peak = max(max(c.r, c.g), c.b);
  return c * smoothstep(0.35, 1.2, peak);
}
void main() {
  vec2 o = uTexel;
  vec3 c = pick(vUv + vec2(-o.x, -o.y)) + pick(vUv + vec2(o.x, -o.y)) + pick(vUv + vec2(-o.x, o.y)) + pick(vUv + vec2(o.x, o.y));
  outColor = vec4(c * 0.25, 1.0);
}`,g=`${c}
uniform sampler2D uSource;
uniform vec2 uTexel;
in vec2 vUv;
out vec4 outColor;
void main() {
  vec2 o = uTexel;
  vec3 c = texture(uSource, vUv).rgb * 4.0;
  c += texture(uSource, vUv + vec2(-o.x, -o.y)).rgb;
  c += texture(uSource, vUv + vec2(o.x, -o.y)).rgb;
  c += texture(uSource, vUv + vec2(-o.x, o.y)).rgb;
  c += texture(uSource, vUv + vec2(o.x, o.y)).rgb;
  outColor = vec4(c / 8.0, 1.0);
}`,w=`${c}
uniform sampler2D uSource;
uniform vec2 uTexel;
in vec2 vUv;
out vec4 outColor;
void main() {
  vec2 o = uTexel;
  vec3 c = texture(uSource, vUv + vec2(-o.x * 2.0, 0.0)).rgb;
  c += texture(uSource, vUv + vec2(-o.x, o.y)).rgb * 2.0;
  c += texture(uSource, vUv + vec2(0.0, o.y * 2.0)).rgb;
  c += texture(uSource, vUv + vec2(o.x, o.y)).rgb * 2.0;
  c += texture(uSource, vUv + vec2(o.x * 2.0, 0.0)).rgb;
  c += texture(uSource, vUv + vec2(o.x, -o.y)).rgb * 2.0;
  c += texture(uSource, vUv + vec2(0.0, -o.y * 2.0)).rgb;
  c += texture(uSource, vUv + vec2(-o.x, -o.y)).rgb * 2.0;
  outColor = vec4(c / 12.0, 1.0);
}`,y=`${c}
uniform sampler2D uScene;
uniform sampler2D uBloom;
uniform float uGlow;
uniform float uBrightness;
uniform float uLightMode;
uniform float uGrain;
uniform float uVignette;
uniform float uFrame;
uniform vec2 uView;
uniform float uDpr;
in vec2 vUv;
out vec4 outColor;

float hash(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

float smoother(float x) {
  x = clamp(x, 0.0, 1.0);
  return x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
}

void main() {
  vec4 scene = texture(uScene, vUv);
  vec3 bloom = texture(uBloom, vUv).rgb;
  vec3 light = (scene.rgb + bloom * uGlow) * uBrightness;
  float reach = max(uVignette * 0.3, 1e-4);
  float mask = uVignette > 0.0 ? smoother(vUv.x / reach) * smoother((1.0 - vUv.x) / reach) * smoother(vUv.y / reach) * smoother((1.0 - vUv.y) / reach) : 1.0;
  vec2 cell = floor(vUv * uView / max(uDpr, 1.0));
  float grain = hash(cell + uFrame * 17.31) + hash(cell * 1.31 + uFrame * 3.7 + 9.1) - 1.0;
  if (uLightMode > 0.5) {
    float amount = scene.a * uBrightness;
    float ink = (1.0 - exp(-amount * 1.5)) * mask;
    ink = clamp(ink * (1.0 + grain * uGrain * 2.0), 0.0, 1.0);
    vec3 hue = clamp(scene.rgb / max(scene.a, 1e-4), 0.0, 1.0);
    vec3 tone = hue * mix(1.0, 0.72, clamp(amount * 0.35, 0.0, 1.0));
    outColor = vec4(tone * ink, ink);
    return;
  }
  vec3 color = (1.0 - exp(-light * 1.25)) * mask;
  float peak = max(color.r, max(color.g, color.b));
  color = max(color + grain * uGrain * (0.25 + 0.75 * sqrt(peak)), 0.0);
  outColor = vec4(color, max(color.r, max(color.g, color.b)));
}`,b=["uTime","uTwist","uRoll","uWaves","uWidth","uRibbon","uOrient","uScale","uPlace","uVolume","uViewProj","uEye","uViewport","uDpr","uFibers","uDots","uFlow","uSize","uFocus","uDof","uMaxCoc","uFocal","uIntro","uPulse","uHover","uPart","uDotLength","uSparkle","uDepthSpread","uGain","uTips","uTint","uGradient","uFold","uGlowColor","uLineColor","uSecondaryColor"],T=["uViewProj","uViewport","uDpr","uTime","uSize","uFocus","uDof","uMaxCoc","uFocal","uIntro","uSparkle","uScale","uGradient","uGain","uGlowColor","uLineColor","uSecondaryColor"],E=["uSource","uTexel"],S=["uScene","uBloom","uGlow","uBrightness","uLightMode","uGrain","uVignette","uFrame","uView","uDpr"],R=(e,t,o)=>Math.min(o,Math.max(t,e)),M=(e,t,o)=>{let r=e.createShader(t);return r?(e.shaderSource(r,o),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS))?r:(e.deleteShader(r),null):null},D=(e,t,o,r)=>{let a=M(e,e.VERTEX_SHADER,t),i=M(e,e.FRAGMENT_SHADER,o),u=e.createProgram();if(!a||!i||!u)return null;if(e.attachShader(u,a),e.attachShader(u,i),e.linkProgram(u),e.deleteShader(a),e.deleteShader(i),!e.getProgramParameter(u,e.LINK_STATUS))return e.deleteProgram(u),null;let n={};for(let t of r)n[t]=e.getUniformLocation(u,t);return{program:u,uniforms:n}},F=(e,t)=>[e[0]*t[0]+e[3]*t[1]+e[6]*t[2],e[1]*t[0]+e[4]*t[1]+e[7]*t[2],e[2]*t[0]+e[5]*t[1]+e[8]*t[2]];e.s(["default",0,({glowColor:e="#8b5cf6",lineColor:f,secondaryColor:c,gradient:m="depth",speed:M=.5,scale:L=1,rotation:P=18,rollSpeed:C=.15,layers:U=3,waves:k=1,twist:_=1.2,threads:V=72,volume:G=.7,spread:A=1,density:I=1,thickness:B=1,flow:O=.4,fiberStyle:z="dots",tips:N=0,foldGlow:X=1,perspective:j=.65,depthOfField:W=.85,focusDepth:$=0,particles:q=.5,sparkle:H=.5,glow:K=.8,brightness:Y=1,vignette:J=.3,grain:Q=.06,mouseInteraction:Z=!0,hoverEffect:ee="focus",mouseStrength:et=1,pulseOnClick:eo=!0,intro:er=!0,lightMode:ea=!1,paused:ei=!1,dpr:eu,...en})=>{let el=(0,o.useRef)(null),es=(0,o.useRef)(null),ef=(0,o.useRef)(null),ec={glowColor:String(e),lineColor:f?String(f):"",secondaryColor:c?String(c):"",gradient:i[m]??0,speed:Math.max(0,M),scale:R(L,.3,3),rotation:P*s,rollSpeed:C,layers:R(Math.round(U),1,3),waves:Math.max(0,k),twist:Math.max(0,_),threads:R(Math.round(V),6,180),volume:R(G,0,2),spread:R(A,.2,3),density:R(I,.2,3),thickness:R(B,.2,4),flow:O,dotLength:a[z]??0,tips:R(N,0,1),foldGlow:R(X,0,3),perspective:R(j,0,1),depthOfField:R(W,0,2),focusDepth:R($,-1,1),particles:R(q,0,2),sparkle:R(H,0,2),glow:Math.max(0,K),brightness:Math.max(0,Y),vignette:R(J,0,1),grain:Math.max(0,Q),mouseInteraction:Z,hover:r[ee]??0,mouseStrength:Math.max(0,et),pulseOnClick:eo,intro:er,lightMode:ea,paused:ei,dpr:eu},em=(0,o.useRef)(ec);(0,o.useEffect)(()=>{let e=el.current,t=es.current,o=t?.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1});if(!e||!t||!o){e&&(e.dataset.ghostState="fallback");return}let r=!!o.getExtension("EXT_color_buffer_float"),a=D(o,h,v,b),i=D(o,d,v,T),s=D(o,p,x,E),f=D(o,p,g,E),c=D(o,p,w,E),m=D(o,p,y,S);if(!a||!i||!s||!f||!c||!m){e.dataset.ghostState="fallback",[a,i,s,f,c,m].forEach(e=>{e&&o.deleteProgram(e.program)});return}let M=r?o.RGBA16F:o.RGBA8,L=()=>({texture:null,framebuffer:o.createFramebuffer(),width:0,height:0}),P=(e,t,r)=>{if(e.texture&&e.width===t&&e.height===r)return;e.texture&&o.deleteTexture(e.texture);let a=o.createTexture();o.bindTexture(o.TEXTURE_2D,a),o.texStorage2D(o.TEXTURE_2D,1,M,t,r),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.bindFramebuffer(o.FRAMEBUFFER,e.framebuffer),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,a,0),e.texture=a,e.width=t,e.height=r},C=L(),U=Array.from({length:3},L),k=o.createVertexArray(),_=document.createElement("canvas");_.width=1,_.height=1;let V=_.getContext("2d",{willReadFrequently:!0}),G=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,A={time:0,roll:0,flow:0,frame:0,intro:em.current.intro&&!G?0:2.6,width:1,height:1,fit:1,colorKey:"",glow:[.55,.36,.96],line:[1,.85,.98],secondary:[.44,.29,.77],pointer:{x:0,y:0,inside:!1},hover:{x:0,y:0,presence:0,placed:!1},look:{x:0,y:0,vx:0,vy:0},focus:7.5+3*em.current.focusDepth,pulse:{s:0,age:9,strength:0,ribbon:0},camera:null},I=0,B=0,O=0,z=!0,N=!0,X=(e,t)=>{if(!V||!e)return t;let o=/^[0-9a-f]{3,8}$/i.test(e)?`#${e}`:e;V.clearRect(0,0,1,1),V.fillStyle="#000000",V.fillStyle=o,V.fillRect(0,0,1,1);let[r,a,i]=V.getImageData(0,0,1,1).data;return[r/255,a/255,i/255]},j=(e,t,o,r)=>{let a=n[o],i=a[3],u=24*e,l=r*(.52*Math.sin(.43*u+.31*t+i)+.26*Math.sin(.79*u-.23*t+1.3+.7*i))+a[0]+u*a[2],s=.65*r*Math.sin(.33*u+.19*t+.7+1.3*i)+a[1];return[u,l,s]},W=(e,t)=>{let o=e.viewProj,r=o[0]*t[0]+o[4]*t[1]+o[8]*t[2]+o[12],a=o[1]*t[0]+o[5]*t[1]+o[9]*t[2]+o[13],i=o[3]*t[0]+o[7]*t[1]+o[11]*t[2]+o[15];return{x:(r/i*.5+.5)*A.width,y:(.5-a/i*.5)*A.height,depth:i}},$=(e,t,o)=>{let r=A.camera;if(!r)return null;let a=null;for(let i=0;i<e.layers;i+=1)for(let u=0;u<=96;u+=1){let n=u/96-.5,l=j(n,A.time,i,e.waves).map(t=>t*e.scale*A.fit),s=F(r.orient,l),f=W(r,s),c=Math.hypot(f.x-t,f.y-o);(!a||c<a.gap)&&(a={gap:c,s:n,ribbon:i,depth:f.depth})}return a},q=()=>{let o=em.current,r=Math.max(1,e.clientWidth),a=Math.max(1,e.clientHeight),i=Math.min(o.dpr||window.devicePixelRatio||1,2),u=Math.max(r,a)*i,n=u>1600?1600*i/u:i,l=Math.max(1,Math.round(r*n)),s=Math.max(1,Math.round(a*n));(t.width!==l||t.height!==s)&&(t.width=l,t.height=s),A.width=r,A.height=a,A.fit=R(r/a/1.5,.6,1),K()},H=(e,t,r,a)=>{o.bindFramebuffer(o.FRAMEBUFFER,t.framebuffer),o.viewport(0,0,t.width,t.height),o.useProgram(e.program),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,r.texture),o.uniform1i(e.uniforms.uSource,0),o.uniform2f(e.uniforms.uTexel,a[0],a[1]),o.drawArrays(o.TRIANGLES,0,3)},K=()=>{var e,r,h;let d,v,p,x,g,w,y,b,T,E,S,M,D,F,L,_=em.current;(d=`${_.glowColor}|${_.lineColor}|${_.secondaryColor}|${_.lightMode}`)!==A.colorKey&&(A.colorKey=d,A.glow=X(_.glowColor,[.55,.36,.96]),A.secondary=_.secondaryColor?X(_.secondaryColor,A.glow):A.glow.map(e=>.8*e),_.lineColor?A.line=X(_.lineColor,A.glow):A.line=_.lightMode?A.glow:A.glow.map(e=>e+(1-e)*.72));let V=(v=A.width/Math.max(A.height,1),p=[0,0,7.5],g=-1/59.9,w=[(x=1/Math.tan(.28))/v,0,0,0,0,x,0,0,0,0,60.1*g,-1,0,0,12*g,0],y=[1,0,0,0,0,1,0,0,0,0,1,0,-p[0],-p[1],-p[2],1],e=.85*_.perspective+.22*A.look.x,r=.12-.14*A.look.y,h=_.rotation,b=Math.cos(e),T=Math.sin(e),E=Math.cos(r),S=Math.sin(r),M=Math.cos(h),D=Math.sin(h),L=(F=(e,t)=>{let o=Array(9);for(let r=0;r<3;r+=1)for(let a=0;a<3;a+=1)o[3*r+a]=e[a]*t[3*r]+e[3+a]*t[3*r+1]+e[6+a]*t[3*r+2];return o})([M,D,0,-D,M,0,0,0,1],F([1,0,0,0,E,S,0,-S,E],[b,0,-T,0,1,0,T,0,b])),{eye:p,viewProj:((e,t)=>{let o=Array(16);for(let r=0;r<4;r+=1)for(let a=0;a<4;a+=1)o[4*r+a]=e[a]*t[4*r]+e[4+a]*t[4*r+1]+e[8+a]*t[4*r+2]+e[12+a]*t[4*r+3];return o})(w,y),orient:L});A.camera=V;let I=t.height/Math.max(A.height,1),B=_.paused||G?1:R(A.intro/2.6,0,1),O=1-(1-B)*(1-B)*(1-B);P(C,t.width,t.height),o.bindVertexArray(k),o.bindFramebuffer(o.FRAMEBUFFER,C.framebuffer),o.viewport(0,0,t.width,t.height),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT),o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE);let z=Math.round(260*_.density),N=22*R(Math.sqrt(56e3/(_.threads*z*_.layers)),.45,1),j=Math.max(.8*_.thickness,.45)**2/.64,W=Math.pow(_.threads/72*_.density*j,-.75);o.useProgram(a.program);let $=a.uniforms;o.uniform1f($.uTime,A.time),o.uniform1f($.uTwist,_.twist),o.uniform1f($.uRoll,A.roll),o.uniform1f($.uWaves,_.waves),o.uniform1f($.uWidth,.62*_.spread),o.uniformMatrix3fv($.uOrient,!1,V.orient),o.uniform1f($.uScale,_.scale*A.fit),o.uniformMatrix4fv($.uViewProj,!1,V.viewProj),o.uniform3f($.uEye,V.eye[0],V.eye[1],V.eye[2]),o.uniform2f($.uViewport,t.width,t.height),o.uniform1f($.uDpr,I),o.uniform1f($.uFibers,_.threads),o.uniform1f($.uDots,z),o.uniform1f($.uFlow,A.flow),o.uniform1f($.uSize,1.6*_.thickness),o.uniform1f($.uFocus,A.focus),o.uniform1f($.uDof,_.depthOfField),o.uniform1f($.uMaxCoc,N),o.uniform1f($.uFocal,7.5),o.uniform1f($.uIntro,O),o.uniform4f($.uPulse,A.pulse.s,A.pulse.age,A.pulse.strength,A.pulse.ribbon),o.uniform4f($.uHover,A.hover.x*I,(A.height-A.hover.y)*I,140*I,A.hover.presence*_.mouseStrength),o.uniform1f($.uPart,+(1===_.hover)),o.uniform1f($.uDotLength,_.dotLength),o.uniform1f($.uSparkle,_.sparkle),o.uniform1f($.uDepthSpread,.12),o.uniform1f($.uVolume,_.volume),o.uniform3f($.uGlowColor,A.glow[0],A.glow[1],A.glow[2]),o.uniform3f($.uLineColor,A.line[0],A.line[1],A.line[2]),o.uniform3f($.uSecondaryColor,A.secondary[0],A.secondary[1],A.secondary[2]),o.uniform1f($.uTips,_.tips),o.uniform1f($.uGradient,_.gradient),o.uniform1f($.uFold,_.foldGlow);for(let e=0;e<_.layers;e+=1){let t=n[e];o.uniform1f($.uRibbon,e),o.uniform4f($.uPlace,t[0],t[1],t[2],t[3]),o.uniform1f($.uGain,l[e]*W),o.uniform1f($.uTint,u[e]),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,_.threads*z)}let q=Math.round(420*_.particles);if(q>0){o.useProgram(i.program);let e=i.uniforms;o.uniformMatrix4fv(e.uViewProj,!1,V.viewProj),o.uniform2f(e.uViewport,t.width,t.height),o.uniform1f(e.uDpr,I),o.uniform1f(e.uTime,A.time),o.uniform1f(e.uSize,2.2*_.thickness),o.uniform1f(e.uFocus,A.focus),o.uniform1f(e.uDof,_.depthOfField),o.uniform1f(e.uMaxCoc,22),o.uniform1f(e.uFocal,7.5),o.uniform1f(e.uIntro,O),o.uniform1f(e.uSparkle,_.sparkle),o.uniform1f(e.uScale,_.scale*A.fit),o.uniform1f(e.uGradient,_.gradient),o.uniform1f(e.uGain,1/_.thickness),o.uniform3f(e.uGlowColor,A.glow[0],A.glow[1],A.glow[2]),o.uniform3f(e.uLineColor,A.line[0],A.line[1],A.line[2]),o.uniform3f(e.uSecondaryColor,A.secondary[0],A.secondary[1],A.secondary[2]),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,q)}o.disable(o.BLEND);let K=_.glow>.001&&!_.lightMode;if(o.bindVertexArray(k),K){U.forEach((e,o)=>{P(e,Math.max(1,Math.round(t.width/2**(o+1))),Math.max(1,Math.round(t.height/2**(o+1))))}),H(s,U[0],C,[.5/C.width,.5/C.height]);for(let e=1;e<3;e+=1)H(f,U[e],U[e-1],[1/U[e-1].width,1/U[e-1].height]);o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE);for(let e=2;e>0;e-=1)H(c,U[e-1],U[e],[.5/U[e].width,.5/U[e].height]);o.disable(o.BLEND)}o.bindFramebuffer(o.FRAMEBUFFER,null),o.viewport(0,0,t.width,t.height),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT),o.useProgram(m.program);let Y=m.uniforms;o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,C.texture),o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,K?U[0].texture:C.texture),o.uniform1i(Y.uScene,0),o.uniform1i(Y.uBloom,1),o.uniform1f(Y.uGlow,K?_.glow:0),o.uniform1f(Y.uBrightness,_.brightness),o.uniform1f(Y.uLightMode,+!!_.lightMode),o.uniform1f(Y.uGrain,_.grain),o.uniform1f(Y.uVignette,_.vignette),o.uniform1f(Y.uFrame,A.frame%977),o.uniform2f(Y.uView,t.width,t.height),o.uniform1f(Y.uDpr,I),o.drawArrays(o.TRIANGLES,0,3),o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,null),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,null),o.bindVertexArray(null)},Y=t=>{if(I=0,!N||!z||document.hidden){e.dataset.ghostState="paused";return}if(O&&t-O<1e3/(A.width<768?12:20)){I=requestAnimationFrame(Y);return}O=t,e.dataset.ghostState="running";let o=em.current,r=B?(t-B)/1e3:1/60,a=Math.min(.05,r);B=t;let i=!o.paused&&!G;i?(A.frame+=1,A.time+=a*o.speed,A.roll+=a*o.speed*o.rollSpeed,A.flow+=a*o.flow*12,A.intro+=Math.min(r,1)):A.intro<2.6&&(A.intro=2.6),A.pulse.age+=a,A.pulse.strength=Math.max(0,1-A.pulse.age/1.8)**2;let{pointer:u,hover:n,look:l}=A,s=o.mouseInteraction&&u.inside&&!G;s&&!n.placed&&(n.x=u.x,n.y=u.y,n.placed=!0),n.x+=(u.x-n.x)*(1-Math.exp(-a/.08)),n.y+=(u.y-n.y)*(1-Math.exp(-a/.08));let f=+!!s;n.presence+=(f-n.presence)*(1-Math.exp(-a/(f>n.presence?.3:.6))),!s&&n.presence<.001&&(n.placed=!1);let c=s?(u.x/A.width-.5)*.5:0,m=s?(.5-u.y/A.height)*.5:0;l.vx+=(30*(c-l.x)-11*l.vx)*a,l.vy+=(30*(m-l.y)-11*l.vy)*a,l.x+=l.vx*a,l.y+=l.vy*a;let h=7.5+3*o.focusDepth,d=h;if(s&&0===o.hover){let e=$(o,n.x,n.y);e&&(d=h+(e.depth-h)*n.presence*Math.min(1,o.mouseStrength))}A.focus+=(d-A.focus)*(1-Math.exp(-a/.35)),K();let v=Math.abs(f-n.presence)>.002||Math.abs(c-l.x)>2e-4||Math.abs(m-l.y)>2e-4||Math.abs(d-A.focus)>.001||A.pulse.strength>.001;i||v?I=requestAnimationFrame(Y):B=0},J=()=>{!I&&N&&z&&!document.hidden&&(I=requestAnimationFrame(Y))},Q=t=>{let o=e.getBoundingClientRect(),r=t.clientX-o.left,a=t.clientY-o.top;A.pointer.x=r,A.pointer.y=a,A.pointer.inside=r>=0&&a>=0&&r<=o.width&&a<=o.height,J()},Z=t=>{let o=em.current;if(!o.mouseInteraction||!o.pulseOnClick||0!==t.button||G||t.target instanceof Element&&t.target.closest('a, button, input, textarea, select, label, [role="button"]'))return;let r=e.getBoundingClientRect(),a=t.clientX-r.left,i=t.clientY-r.top;if(a<0||i<0||a>r.width||i>r.height)return;let u=$(o,a,i);u&&(A.pulse={s:u.s,age:0,strength:1,ribbon:u.ribbon}),J()},ee=()=>{A.pointer.inside=!1,J()},et=()=>{B=0,J()},eo=new ResizeObserver(q);eo.observe(e);let er=new IntersectionObserver(e=>{(z=e.some(e=>e.isIntersecting))&&(B=0,J())});return er.observe(e),window.addEventListener("pointermove",Q,{passive:!0}),window.addEventListener("pointerdown",Z),document.documentElement.addEventListener("pointerleave",ee),document.addEventListener("visibilitychange",et),q(),J(),ef.current=()=>{I||K(),J()},()=>{N=!1,cancelAnimationFrame(I),ef.current=null,eo.disconnect(),er.disconnect(),window.removeEventListener("pointermove",Q),window.removeEventListener("pointerdown",Z),document.documentElement.removeEventListener("pointerleave",ee),document.removeEventListener("visibilitychange",et),o.deleteVertexArray(k),[C,...U].forEach(e=>{e.texture&&o.deleteTexture(e.texture),o.deleteFramebuffer(e.framebuffer)}),[a,i,s,f,c,m].forEach(e=>o.deleteProgram(e.program))}},[]),(0,o.useEffect)(()=>{em.current=ec,ef.current?.()});let{className:eh="",...ed}=en;return(0,t.jsx)("div",{ref:el,className:["relative h-full w-full overflow-hidden",eh].filter(Boolean).join(" "),...ed,children:(0,t.jsx)("canvas",{ref:es,className:"absolute inset-0 block h-full w-full","aria-hidden":"true"})})}])}]);