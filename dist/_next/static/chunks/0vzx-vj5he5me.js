(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,20989,e=>{"use strict";var t=e.i(43476),o=e.i(71645),r=e.i(26487);let a={focus:0,part:1,none:2},i={dots:0,dashes:.45,lines:1},u={depth:0,along:1,across:2},n=[0,.75,.35],l=[[0,0,0,0],[1.9,-4.6,-.08,2.4],[-1.05,2,.12,4.1]],s=[1,.5,.55],f=Math.PI/180,c=1/(2*Math.tan(.28)),m=`#version 300 es
precision highp float;
`,h=`
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
`,d=`${m}
${h}
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
  float focalPx = uViewport.y * ${c.toFixed(5)} / max(depth, 0.1);
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
}`,v=`${m}
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
}`,p=`${m}
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
}`,x=`${m}
out vec2 vUv;
void main() {
  vec2 p = vec2(gl_VertexID == 1 ? 3.0 : -1.0, gl_VertexID == 2 ? 3.0 : -1.0);
  vUv = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}`,g=`${m}
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
}`,w=`${m}
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
}`,y=`${m}
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
}`,b=`${m}
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
}`,T=["uTime","uTwist","uRoll","uWaves","uWidth","uRibbon","uOrient","uScale","uPlace","uVolume","uViewProj","uEye","uViewport","uDpr","uFibers","uDots","uFlow","uSize","uFocus","uDof","uMaxCoc","uFocal","uIntro","uPulse","uHover","uPart","uDotLength","uSparkle","uDepthSpread","uGain","uTips","uTint","uGradient","uFold","uGlowColor","uLineColor","uSecondaryColor"],E=["uViewProj","uViewport","uDpr","uTime","uSize","uFocus","uDof","uMaxCoc","uFocal","uIntro","uSparkle","uScale","uGradient","uGain","uGlowColor","uLineColor","uSecondaryColor"],S=["uSource","uTexel"],R=["uScene","uBloom","uGlow","uBrightness","uLightMode","uGrain","uVignette","uFrame","uView","uDpr"],M=(e,t,o)=>Math.min(o,Math.max(t,e)),D=(e,t,o)=>{let r=e.createShader(t);return r?(e.shaderSource(r,o),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS))?r:(e.deleteShader(r),null):null},F=(e,t,o,r)=>{let a=D(e,e.VERTEX_SHADER,t),i=D(e,e.FRAGMENT_SHADER,o),u=e.createProgram();if(!a||!i||!u)return null;if(e.attachShader(u,a),e.attachShader(u,i),e.linkProgram(u),e.deleteShader(a),e.deleteShader(i),!e.getProgramParameter(u,e.LINK_STATUS))return e.deleteProgram(u),null;let n={};for(let t of r)n[t]=e.getUniformLocation(u,t);return{program:u,uniforms:n}},L=(e,t)=>[e[0]*t[0]+e[3]*t[1]+e[6]*t[2],e[1]*t[0]+e[4]*t[1]+e[7]*t[2],e[2]*t[0]+e[5]*t[1]+e[8]*t[2]];e.s(["default",0,({glowColor:e="#8b5cf6",lineColor:c,secondaryColor:m,gradient:h="depth",speed:D=.5,scale:P=1,rotation:C=18,rollSpeed:U=.15,layers:k=3,waves:_=1,twist:V=1.2,threads:G=72,volume:A=.7,spread:I=1,density:B=1,thickness:O=1,flow:N=.4,fiberStyle:z="dots",tips:X=0,foldGlow:W=1,perspective:j=.65,depthOfField:$=.85,focusDepth:q=0,particles:H=.5,sparkle:K=.5,glow:Y=.8,brightness:Z=1,vignette:J=.3,grain:Q=.06,mouseInteraction:ee=!0,hoverEffect:et="focus",mouseStrength:eo=1,pulseOnClick:er=!0,intro:ea=!0,lightMode:ei=!1,paused:eu=!1,dpr:en,...el})=>{let es=(0,o.useRef)(null),ef=(0,o.useRef)(null),ec=(0,o.useRef)(null),em={glowColor:String(e),lineColor:c?String(c):"",secondaryColor:m?String(m):"",gradient:u[h]??0,speed:Math.max(0,D),scale:M(P,.3,3),rotation:C*f,rollSpeed:U,layers:M(Math.round(k),1,3),waves:Math.max(0,_),twist:Math.max(0,V),threads:M(Math.round(G),6,180),volume:M(A,0,2),spread:M(I,.2,3),density:M(B,.2,3),thickness:M(O,.2,4),flow:N,dotLength:i[z]??0,tips:M(X,0,1),foldGlow:M(W,0,3),perspective:M(j,0,1),depthOfField:M($,0,2),focusDepth:M(q,-1,1),particles:M(H,0,2),sparkle:M(K,0,2),glow:Math.max(0,Y),brightness:Math.max(0,Z),vignette:M(J,0,1),grain:Math.max(0,Q),mouseInteraction:ee,hover:a[et]??0,mouseStrength:Math.max(0,eo),pulseOnClick:er,intro:ea,lightMode:ei,paused:eu,dpr:en},eh=(0,o.useRef)(em);(0,o.useEffect)(()=>{let e=es.current,t=ef.current,o=t?.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1});if(!e||!t||!o){e&&(e.dataset.ghostState="fallback");return}let a=o.getExtension("WEBGL_debug_renderer_info"),i=a?o.getParameter(a.UNMASKED_RENDERER_WEBGL):"";if((0,r.e)(i)){e.dataset.ghostState="fallback";return}let u=!!o.getExtension("EXT_color_buffer_float"),f=F(o,d,p,T),c=F(o,v,p,E),m=F(o,x,g,S),h=F(o,x,w,S),D=F(o,x,y,S),P=F(o,x,b,R);if(!f||!c||!m||!h||!D||!P){e.dataset.ghostState="fallback",[f,c,m,h,D,P].forEach(e=>{e&&o.deleteProgram(e.program)});return}let C=u?o.RGBA16F:o.RGBA8,U=()=>({texture:null,framebuffer:o.createFramebuffer(),width:0,height:0}),k=(e,t,r)=>{if(e.texture&&e.width===t&&e.height===r)return;e.texture&&o.deleteTexture(e.texture);let a=o.createTexture();o.bindTexture(o.TEXTURE_2D,a),o.texStorage2D(o.TEXTURE_2D,1,C,t,r),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.bindFramebuffer(o.FRAMEBUFFER,e.framebuffer),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,a,0),e.texture=a,e.width=t,e.height=r},_=U(),V=Array.from({length:3},U),G=o.createVertexArray(),A=document.createElement("canvas");A.width=1,A.height=1;let I=A.getContext("2d",{willReadFrequently:!0}),B=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,O={time:0,roll:0,flow:0,frame:0,intro:eh.current.intro&&!B?0:2.6,width:1,height:1,fit:1,colorKey:"",glow:[.55,.36,.96],line:[1,.85,.98],secondary:[.44,.29,.77],pointer:{x:0,y:0,inside:!1},hover:{x:0,y:0,presence:0,placed:!1},look:{x:0,y:0,vx:0,vy:0},focus:7.5+3*eh.current.focusDepth,pulse:{s:0,age:9,strength:0,ribbon:0},camera:null},N=0,z=0,X=0,W=!0,j=!0,$=(0,r.Z)(),q=(e,t)=>{if(!I||!e)return t;let o=/^[0-9a-f]{3,8}$/i.test(e)?`#${e}`:e;I.clearRect(0,0,1,1),I.fillStyle="#000000",I.fillStyle=o,I.fillRect(0,0,1,1);let[r,a,i]=I.getImageData(0,0,1,1).data;return[r/255,a/255,i/255]},H=(e,t,o,r)=>{let a=l[o],i=a[3],u=24*e,n=r*(.52*Math.sin(.43*u+.31*t+i)+.26*Math.sin(.79*u-.23*t+1.3+.7*i))+a[0]+u*a[2],s=.65*r*Math.sin(.33*u+.19*t+.7+1.3*i)+a[1];return[u,n,s]},K=(e,t)=>{let o=e.viewProj,r=o[0]*t[0]+o[4]*t[1]+o[8]*t[2]+o[12],a=o[1]*t[0]+o[5]*t[1]+o[9]*t[2]+o[13],i=o[3]*t[0]+o[7]*t[1]+o[11]*t[2]+o[15];return{x:(r/i*.5+.5)*O.width,y:(.5-a/i*.5)*O.height,depth:i}},Y=(e,t,o)=>{let r=O.camera;if(!r)return null;let a=null;for(let i=0;i<e.layers;i+=1)for(let u=0;u<=96;u+=1){let n=u/96-.5,l=H(n,O.time,i,e.waves).map(t=>t*e.scale*O.fit),s=L(r.orient,l),f=K(r,s),c=Math.hypot(f.x-t,f.y-o);(!a||c<a.gap)&&(a={gap:c,s:n,ribbon:i,depth:f.depth})}return a},Z=()=>{let o=eh.current,r=Math.max(1,e.clientWidth),a=Math.max(1,e.clientHeight),i=Math.min(o.dpr||window.devicePixelRatio||1,2),u=Math.max(r,a)*i,n=u>1600?1600*i/u:i,l=Math.max(1,Math.round(r*n)),s=Math.max(1,Math.round(a*n));(t.width!==l||t.height!==s)&&(t.width=l,t.height=s),O.width=r,O.height=a,O.fit=M(r/a/1.5,.6,1),Q()},J=(e,t,r,a)=>{o.bindFramebuffer(o.FRAMEBUFFER,t.framebuffer),o.viewport(0,0,t.width,t.height),o.useProgram(e.program),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,r.texture),o.uniform1i(e.uniforms.uSource,0),o.uniform2f(e.uniforms.uTexel,a[0],a[1]),o.drawArrays(o.TRIANGLES,0,3)},Q=()=>{var e,r,a;let i,u,d,v,p,x,g,w,y,b,T,E,S,R,F,L=eh.current;(i=`${L.glowColor}|${L.lineColor}|${L.secondaryColor}|${L.lightMode}`)!==O.colorKey&&(O.colorKey=i,O.glow=q(L.glowColor,[.55,.36,.96]),O.secondary=L.secondaryColor?q(L.secondaryColor,O.glow):O.glow.map(e=>.8*e),L.lineColor?O.line=q(L.lineColor,O.glow):O.line=L.lightMode?O.glow:O.glow.map(e=>e+(1-e)*.72));let C=(u=O.width/Math.max(O.height,1),d=[0,0,7.5],p=-1/59.9,x=[(v=1/Math.tan(.28))/u,0,0,0,0,v,0,0,0,0,60.1*p,-1,0,0,12*p,0],g=[1,0,0,0,0,1,0,0,0,0,1,0,-d[0],-d[1],-d[2],1],e=.85*L.perspective+.22*O.look.x,r=.12-.14*O.look.y,a=L.rotation,w=Math.cos(e),y=Math.sin(e),b=Math.cos(r),T=Math.sin(r),E=Math.cos(a),S=Math.sin(a),F=(R=(e,t)=>{let o=Array(9);for(let r=0;r<3;r+=1)for(let a=0;a<3;a+=1)o[3*r+a]=e[a]*t[3*r]+e[3+a]*t[3*r+1]+e[6+a]*t[3*r+2];return o})([E,S,0,-S,E,0,0,0,1],R([1,0,0,0,b,T,0,-T,b],[w,0,-y,0,1,0,y,0,w])),{eye:d,viewProj:((e,t)=>{let o=Array(16);for(let r=0;r<4;r+=1)for(let a=0;a<4;a+=1)o[4*r+a]=e[a]*t[4*r]+e[4+a]*t[4*r+1]+e[8+a]*t[4*r+2]+e[12+a]*t[4*r+3];return o})(x,g),orient:F});O.camera=C;let U=t.height/Math.max(O.height,1),A=L.paused||B?1:M(O.intro/2.6,0,1),I=1-(1-A)*(1-A)*(1-A);k(_,t.width,t.height),o.bindVertexArray(G),o.bindFramebuffer(o.FRAMEBUFFER,_.framebuffer),o.viewport(0,0,t.width,t.height),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT),o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE);let N=Math.round(260*L.density),z=22*M(Math.sqrt(56e3/(L.threads*N*L.layers)),.45,1),X=Math.max(.8*L.thickness,.45)**2/.64,W=Math.pow(L.threads/72*L.density*X,-.75);o.useProgram(f.program);let j=f.uniforms;o.uniform1f(j.uTime,O.time),o.uniform1f(j.uTwist,L.twist),o.uniform1f(j.uRoll,O.roll),o.uniform1f(j.uWaves,L.waves),o.uniform1f(j.uWidth,.62*L.spread),o.uniformMatrix3fv(j.uOrient,!1,C.orient),o.uniform1f(j.uScale,L.scale*O.fit),o.uniformMatrix4fv(j.uViewProj,!1,C.viewProj),o.uniform3f(j.uEye,C.eye[0],C.eye[1],C.eye[2]),o.uniform2f(j.uViewport,t.width,t.height),o.uniform1f(j.uDpr,U),o.uniform1f(j.uFibers,L.threads),o.uniform1f(j.uDots,N),o.uniform1f(j.uFlow,O.flow),o.uniform1f(j.uSize,1.6*L.thickness),o.uniform1f(j.uFocus,O.focus),o.uniform1f(j.uDof,L.depthOfField),o.uniform1f(j.uMaxCoc,z),o.uniform1f(j.uFocal,7.5),o.uniform1f(j.uIntro,I),o.uniform4f(j.uPulse,O.pulse.s,O.pulse.age,O.pulse.strength,O.pulse.ribbon),o.uniform4f(j.uHover,O.hover.x*U,(O.height-O.hover.y)*U,140*U,O.hover.presence*L.mouseStrength),o.uniform1f(j.uPart,+(1===L.hover)),o.uniform1f(j.uDotLength,L.dotLength),o.uniform1f(j.uSparkle,L.sparkle),o.uniform1f(j.uDepthSpread,.12),o.uniform1f(j.uVolume,L.volume),o.uniform3f(j.uGlowColor,O.glow[0],O.glow[1],O.glow[2]),o.uniform3f(j.uLineColor,O.line[0],O.line[1],O.line[2]),o.uniform3f(j.uSecondaryColor,O.secondary[0],O.secondary[1],O.secondary[2]),o.uniform1f(j.uTips,L.tips),o.uniform1f(j.uGradient,L.gradient),o.uniform1f(j.uFold,L.foldGlow);for(let e=0;e<L.layers;e+=1){let t=l[e];o.uniform1f(j.uRibbon,e),o.uniform4f(j.uPlace,t[0],t[1],t[2],t[3]),o.uniform1f(j.uGain,s[e]*W),o.uniform1f(j.uTint,n[e]),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,L.threads*N)}let $=Math.round(420*L.particles);if($>0){o.useProgram(c.program);let e=c.uniforms;o.uniformMatrix4fv(e.uViewProj,!1,C.viewProj),o.uniform2f(e.uViewport,t.width,t.height),o.uniform1f(e.uDpr,U),o.uniform1f(e.uTime,O.time),o.uniform1f(e.uSize,2.2*L.thickness),o.uniform1f(e.uFocus,O.focus),o.uniform1f(e.uDof,L.depthOfField),o.uniform1f(e.uMaxCoc,22),o.uniform1f(e.uFocal,7.5),o.uniform1f(e.uIntro,I),o.uniform1f(e.uSparkle,L.sparkle),o.uniform1f(e.uScale,L.scale*O.fit),o.uniform1f(e.uGradient,L.gradient),o.uniform1f(e.uGain,1/L.thickness),o.uniform3f(e.uGlowColor,O.glow[0],O.glow[1],O.glow[2]),o.uniform3f(e.uLineColor,O.line[0],O.line[1],O.line[2]),o.uniform3f(e.uSecondaryColor,O.secondary[0],O.secondary[1],O.secondary[2]),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,$)}o.disable(o.BLEND);let H=L.glow>.001&&!L.lightMode;if(o.bindVertexArray(G),H){V.forEach((e,o)=>{k(e,Math.max(1,Math.round(t.width/2**(o+1))),Math.max(1,Math.round(t.height/2**(o+1))))}),J(m,V[0],_,[.5/_.width,.5/_.height]);for(let e=1;e<3;e+=1)J(h,V[e],V[e-1],[1/V[e-1].width,1/V[e-1].height]);o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE);for(let e=2;e>0;e-=1)J(D,V[e-1],V[e],[.5/V[e].width,.5/V[e].height]);o.disable(o.BLEND)}o.bindFramebuffer(o.FRAMEBUFFER,null),o.viewport(0,0,t.width,t.height),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT),o.useProgram(P.program);let K=P.uniforms;o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,_.texture),o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,H?V[0].texture:_.texture),o.uniform1i(K.uScene,0),o.uniform1i(K.uBloom,1),o.uniform1f(K.uGlow,H?L.glow:0),o.uniform1f(K.uBrightness,L.brightness),o.uniform1f(K.uLightMode,+!!L.lightMode),o.uniform1f(K.uGrain,L.grain),o.uniform1f(K.uVignette,L.vignette),o.uniform1f(K.uFrame,O.frame%977),o.uniform2f(K.uView,t.width,t.height),o.uniform1f(K.uDpr,U),o.drawArrays(o.TRIANGLES,0,3),o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,null),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,null),o.bindVertexArray(null)},ee=t=>{if(N=0,!j||!W||document.hidden){e.dataset.ghostState="paused";return}if(X&&t-X<1e3/(O.width<768?12:20)){N=requestAnimationFrame(ee);return}X=t,e.dataset.ghostState="running";let o=eh.current,r=z?(t-z)/1e3:1/60,a=Math.min(.05,r);z=t;let i=!o.paused&&!B;i?(O.frame+=1,O.time+=a*o.speed,O.roll+=a*o.speed*o.rollSpeed,O.flow+=a*o.flow*12,O.intro+=Math.min(r,1)):O.intro<2.6&&(O.intro=2.6),O.pulse.age+=a,O.pulse.strength=Math.max(0,1-O.pulse.age/1.8)**2;let{pointer:u,hover:n,look:l}=O,s=o.mouseInteraction&&u.inside&&!B;s&&!n.placed&&(n.x=u.x,n.y=u.y,n.placed=!0),n.x+=(u.x-n.x)*(1-Math.exp(-a/.08)),n.y+=(u.y-n.y)*(1-Math.exp(-a/.08));let f=+!!s;n.presence+=(f-n.presence)*(1-Math.exp(-a/(f>n.presence?.3:.6))),!s&&n.presence<.001&&(n.placed=!1);let c=s?(u.x/O.width-.5)*.5:0,m=s?(.5-u.y/O.height)*.5:0;l.vx+=(30*(c-l.x)-11*l.vx)*a,l.vy+=(30*(m-l.y)-11*l.vy)*a,l.x+=l.vx*a,l.y+=l.vy*a;let h=7.5+3*o.focusDepth,d=h;if(s&&0===o.hover){let e=Y(o,n.x,n.y);e&&(d=h+(e.depth-h)*n.presence*Math.min(1,o.mouseStrength))}O.focus+=(d-O.focus)*(1-Math.exp(-a/.35));let v=performance.now();if(Q(),$.record(performance.now()-v,1e3*r)){e.dataset.ghostState="static-performance";return}let p=Math.abs(f-n.presence)>.002||Math.abs(c-l.x)>2e-4||Math.abs(m-l.y)>2e-4||Math.abs(d-O.focus)>.001||O.pulse.strength>.001;i||p?N=requestAnimationFrame(ee):z=0},et=()=>{if($.limited){e.dataset.ghostState="static-performance";return}!N&&j&&W&&!document.hidden&&(N=requestAnimationFrame(ee))},eo=t=>{let o=e.getBoundingClientRect(),r=t.clientX-o.left,a=t.clientY-o.top;O.pointer.x=r,O.pointer.y=a,O.pointer.inside=r>=0&&a>=0&&r<=o.width&&a<=o.height,et()},er=t=>{let o=eh.current;if(!o.mouseInteraction||!o.pulseOnClick||0!==t.button||B||t.target instanceof Element&&t.target.closest('a, button, input, textarea, select, label, [role="button"]'))return;let r=e.getBoundingClientRect(),a=t.clientX-r.left,i=t.clientY-r.top;if(a<0||i<0||a>r.width||i>r.height)return;let u=Y(o,a,i);u&&(O.pulse={s:u.s,age:0,strength:1,ribbon:u.ribbon}),et()},ea=()=>{O.pointer.inside=!1,et()},ei=()=>{z=0,et()},eu=new ResizeObserver(Z);eu.observe(e);let en=new IntersectionObserver(e=>{(W=e.some(e=>e.isIntersecting))&&(z=0,et())});return en.observe(e),window.addEventListener("pointermove",eo,{passive:!0}),window.addEventListener("pointerdown",er),document.documentElement.addEventListener("pointerleave",ea),document.addEventListener("visibilitychange",ei),Z(),et(),ec.current=()=>{N||Q(),et()},()=>{j=!1,cancelAnimationFrame(N),ec.current=null,eu.disconnect(),en.disconnect(),window.removeEventListener("pointermove",eo),window.removeEventListener("pointerdown",er),document.documentElement.removeEventListener("pointerleave",ea),document.removeEventListener("visibilitychange",ei),o.deleteVertexArray(G),[_,...V].forEach(e=>{e.texture&&o.deleteTexture(e.texture),o.deleteFramebuffer(e.framebuffer)}),[f,c,m,h,D,P].forEach(e=>o.deleteProgram(e.program))}},[]),(0,o.useEffect)(()=>{eh.current=em,ec.current?.()});let{className:ed="",...ev}=el;return(0,t.jsx)("div",{ref:es,className:["relative h-full w-full overflow-hidden",ed].filter(Boolean).join(" "),...ev,children:(0,t.jsx)("canvas",{ref:ef,className:"absolute inset-0 block h-full w-full","aria-hidden":"true"})})}])}]);