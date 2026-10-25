(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,61580,e=>{"use strict";var t=e.i(43476),r=e.i(71645);let o=`#version 300 es
in vec2 aPosition;
uniform vec2 uTexel;
out vec2 vUv;
out vec2 vL;
out vec2 vR;
out vec2 vT;
out vec2 vB;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(uTexel.x, 0.0);
  vR = vUv + vec2(uTexel.x, 0.0);
  vT = vUv + vec2(0.0, uTexel.y);
  vB = vUv - vec2(0.0, uTexel.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,a=`#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
out vec4 outColor;
`,i=`${a}
uniform sampler2D uTarget;
uniform float uAspect;
uniform vec2 uA;
uniform vec2 uB;
uniform float uRadius;
uniform float uWide;
uniform vec3 uValue;
uniform float uMode;
uniform float uStrength;
float erf(float x) {
  float x2 = x * x;
  float a = 0.147;
  return sign(x) * sqrt(1.0 - exp(-x2 * (1.2732395 + a * x2) / (1.0 + a * x2)));
}
float sweep(float along, float length, float across, float radius) {
  return exp(-across * across / (radius * radius)) * 0.5 * (erf(along / radius) - erf((along - length) / radius));
}
void main() {
  vec2 p = vec2(vUv.x * uAspect, vUv.y);
  vec2 a = vec2(uA.x * uAspect, uA.y);
  vec2 ab = vec2(uB.x * uAspect, uB.y) - a;
  float len = length(ab);
  vec2 dir = len > 1e-6 ? ab / len : vec2(1.0, 0.0);
  vec2 ap = p - a;
  vec3 base = texture(uTarget, vUv).xyz;
  if (uMode > 1.5) {
    float along = dot(ap, dir);
    float across = dot(ap, vec2(-dir.y, dir.x));
    if (uMode > 2.5) {
      outColor = vec4(mix(base, uValue, sweep(along, len, across, uRadius) * uStrength), 1.0);
      return;
    }
    vec3 add = vec3(uValue.xy * sweep(along, len, across, uRadius), uValue.z * sweep(along, len, across, uWide));
    outColor = vec4(base + add, 1.0);
    return;
  }
  float h = clamp(dot(ap, ab) / max(dot(ab, ab), 1e-9), 0.0, 1.0);
  vec2 d = ap - ab * h;
  float r2 = dot(d, d);
  float falloff = exp(-r2 / (uRadius * uRadius));
  float wide = exp(-r2 / (uWide * uWide));
  vec3 result = uMode > 0.5 ? mix(base, uValue, falloff * uStrength) : base + vec3(uValue.xy * falloff, uValue.z * wide);
  outColor = vec4(result, 1.0);
}`,u=`${a}
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 uVelocityTexel;
uniform float uDt;
uniform vec4 uDecay;
void main() {
  vec2 coord = vUv - uDt * texture(uVelocity, vUv).xy * uVelocityTexel;
  outColor = texture(uSource, coord) * uDecay;
}`,l=`${a}
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform sampler2D uForward;
uniform sampler2D uBack;
uniform vec2 uVelocityTexel;
uniform vec2 uSourceTexel;
uniform float uDt;
uniform vec4 uDecay;
void main() {
  vec2 coord = vUv - uDt * texture(uVelocity, vUv).xy * uVelocityTexel;
  vec4 forward = texture(uForward, vUv);
  vec4 corrected = forward + 0.5 * (texture(uSource, vUv) - texture(uBack, vUv));
  vec2 base = (floor(coord / uSourceTexel - 0.5) + 0.5) * uSourceTexel;
  vec4 a = texture(uSource, base);
  vec4 b = texture(uSource, base + vec2(uSourceTexel.x, 0.0));
  vec4 c = texture(uSource, base + vec2(0.0, uSourceTexel.y));
  vec4 d = texture(uSource, base + uSourceTexel);
  vec4 low = min(min(a, b), min(c, d));
  vec4 high = max(max(a, b), max(c, d));
  outColor = clamp(corrected, low, high) * uDecay;
}`,n=`${a}
uniform sampler2D uVelocity;
void main() {
  float left = texture(uVelocity, vL).x;
  float right = texture(uVelocity, vR).x;
  float top = texture(uVelocity, vT).y;
  float bottom = texture(uVelocity, vB).y;
  vec2 center = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) left = -center.x;
  if (vR.x > 1.0) right = -center.x;
  if (vT.y > 1.0) top = -center.y;
  if (vB.y < 0.0) bottom = -center.y;
  outColor = vec4(0.5 * (right - left + top - bottom), 0.0, 0.0, 1.0);
}`,c=`${a}
uniform sampler2D uSource;
uniform float uValue;
void main() {
  outColor = texture(uSource, vUv) * uValue;
}`,f=`${a}
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
void main() {
  float left = texture(uPressure, vL).x;
  float right = texture(uPressure, vR).x;
  float top = texture(uPressure, vT).x;
  float bottom = texture(uPressure, vB).x;
  float divergence = texture(uDivergence, vUv).x;
  outColor = vec4((left + right + bottom + top - divergence) * 0.25, 0.0, 0.0, 1.0);
}`,d=`${a}
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
void main() {
  float left = texture(uPressure, vL).x;
  float right = texture(uPressure, vR).x;
  float top = texture(uPressure, vT).x;
  float bottom = texture(uPressure, vB).x;
  vec2 velocity = texture(uVelocity, vUv).xy - vec2(right - left, top - bottom);
  outColor = vec4(velocity, 0.0, 1.0);
}`,v=`
uniform vec3 uColor;
uniform vec3 uSecondary;
uniform float uIntensity;
uniform float uHotspot;
vec3 shade(vec3 dye) {
  float energy = max(dye.x, 0.0);
  float heat = clamp(dye.y, 0.0, energy);
  float gas = max(dye.z, 0.0);
  float fresh = heat / max(energy, 0.0001);
  vec3 tint = mix(uSecondary, uColor, fresh);
  return (tint * energy + uSecondary * gas + vec3(heat * heat * 0.3 * uHotspot)) * uIntensity;
}
`,m=`${a}${v}
uniform sampler2D uDye;
uniform vec2 uDyeTexel;
void main() {
  vec2 o = uDyeTexel * 0.5;
  vec3 light = shade(texture(uDye, vUv + vec2(-o.x, -o.y)).xyz);
  light += shade(texture(uDye, vUv + vec2(o.x, -o.y)).xyz);
  light += shade(texture(uDye, vUv + vec2(-o.x, o.y)).xyz);
  light += shade(texture(uDye, vUv + vec2(o.x, o.y)).xyz);
  outColor = vec4(light * 0.25, 1.0);
}`,s=`${a}
uniform sampler2D uSource;
uniform vec2 uSourceTexel;
void main() {
  vec2 o = uSourceTexel;
  vec3 color = texture(uSource, vUv).rgb * 4.0;
  color += texture(uSource, vUv + vec2(-o.x, -o.y)).rgb;
  color += texture(uSource, vUv + vec2(o.x, -o.y)).rgb;
  color += texture(uSource, vUv + vec2(-o.x, o.y)).rgb;
  color += texture(uSource, vUv + vec2(o.x, o.y)).rgb;
  outColor = vec4(color / 8.0, 1.0);
}`,x=`${a}
uniform sampler2D uSource;
uniform vec2 uSourceTexel;
void main() {
  vec2 o = uSourceTexel;
  vec3 color = texture(uSource, vUv + vec2(-o.x * 2.0, 0.0)).rgb;
  color += texture(uSource, vUv + vec2(o.x * 2.0, 0.0)).rgb;
  color += texture(uSource, vUv + vec2(0.0, -o.y * 2.0)).rgb;
  color += texture(uSource, vUv + vec2(0.0, o.y * 2.0)).rgb;
  color += texture(uSource, vUv + vec2(-o.x, -o.y)).rgb * 2.0;
  color += texture(uSource, vUv + vec2(o.x, -o.y)).rgb * 2.0;
  color += texture(uSource, vUv + vec2(-o.x, o.y)).rgb * 2.0;
  color += texture(uSource, vUv + vec2(o.x, o.y)).rgb * 2.0;
  outColor = vec4(color / 12.0, 1.0);
}`,h=`${a}${v}
uniform sampler2D uDye;
uniform sampler2D uBloom;
uniform float uGlow;
uniform float uGrain;
uniform float uTime;
uniform float uLight;
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
void main() {
  vec3 dye = texture(uDye, vUv).xyz;
  vec3 light = shade(dye);
  vec3 bloom = texture(uBloom, vUv).rgb * uGlow;
  float edge = smoothstep(0.0, 0.02, min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y)));
  float grain = 1.0 + (hash(gl_FragCoord.xy + fract(uTime * 13.7) * 97.0) - 0.5) * uGrain * 2.0;
  if (uLight > 0.5) {
    float energy = max(dye.x, 0.0);
    float heat = clamp(dye.y, 0.0, energy);
    float gas = max(dye.z, 0.0);
    float fresh = heat / max(energy, 0.0001);
    vec3 tint = mix(uSecondary, uColor, fresh);
    float halo = dot(bloom, vec3(0.2126, 0.7152, 0.0722));
    float density = 1.0 - exp(-((energy * 1.1 + gas * 0.8) * uIntensity + halo * 0.25));
    float tone = dot(tint, vec3(0.2126, 0.7152, 0.0722));
    vec3 ink = tint * min(1.0, 0.5 / max(tone, 0.001)) * mix(0.95, 0.72, smoothstep(0.5, 3.0, energy));
    ink = mix(ink, vec3(1.0), clamp(heat * heat * 0.05 * uHotspot, 0.0, 0.45));
    density = clamp(density * grain, 0.0, 1.0) * edge;
    outColor = vec4(ink * density, density);
  } else {
    vec3 color = 1.0 - exp(-(light + bloom) * grain);
    color *= edge;
    outColor = vec4(color, max(color.r, max(color.g, color.b)));
  }
}`,y={low:{sim:96,dye:384},medium:{sim:128,dye:576},high:{sim:160,dye:768}},g=(e,t,r)=>Math.min(r,Math.max(t,e)),p=(e,t,r)=>{let o=e.createShader(t);return o?(e.shaderSource(o,r),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS))?o:(e.deleteShader(o),null):null};e.s(["default",0,({color:e="#5f8bff",secondaryColor:a,intensity:v=1.3,trailWidth:b=3,linger:T=1.4,glow:w=1.2,hotspot:R=.8,followSpeed:E=.6,grain:S=0,clickBurst:D=!0,quality:U="high",theme:A="dark",blendMode:M,maxDevicePixelRatio:F=2,enabled:B=!0,children:P,className:L="",style:V,...C})=>{let _=(0,r.useRef)(null),I=(0,r.useRef)(null),O=(0,r.useRef)(null);return(0,r.useEffect)(()=>{O.current={color:String(e),secondaryColor:a?String(a):"",intensity:Math.max(0,v),trailWidth:g(b,.5,40),linger:g(T,.1,10),glow:Math.max(0,w),hotspot:Math.max(0,R),followSpeed:g(E,0,1),grain:Math.max(0,S),clickBurst:D,quality:y[U]?U:"high",theme:A,maxDevicePixelRatio:F,enabled:B}}),(0,r.useEffect)(()=>{let e=_.current,t=I.current,r=t?.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1});if(!e||!t)return;let a=e=>{t.dataset.glowState!==e&&(t.dataset.glowState=e)};if(!r||!r.getExtension("EXT_color_buffer_float"))return void a("fallback");a("idle");let v=p(r,r.VERTEX_SHADER,o);if(!v)return void a("fallback");let g=e=>{let t=p(r,r.FRAGMENT_SHADER,e),o=r.createProgram();if(!t||!o)return t&&r.deleteShader(t),o&&r.deleteProgram(o),null;if(r.attachShader(o,v),r.attachShader(o,t),r.bindAttribLocation(o,0,"aPosition"),r.linkProgram(o),r.deleteShader(t),!r.getProgramParameter(o,r.LINK_STATUS))return r.deleteProgram(o),null;let a={},i=r.getProgramParameter(o,r.ACTIVE_UNIFORMS);for(let e=0;e<i;e++){let t=r.getActiveUniform(o,e);t&&(a[t.name]=r.getUniformLocation(o,t.name))}return{program:o,uniforms:a}},b={splat:g(i),advect:g(u),maccormack:g(l),divergence:g(n),scale:g(c),pressure:g(f),gradient:g(d),prefilter:g(m),down:g(s),up:g(x),display:g(h)};if(Object.values(b).some(e=>!e)){Object.values(b).forEach(e=>{e&&r.deleteProgram(e.program)}),r.deleteShader(v),a("fallback");return}let T=r.createVertexArray(),w=r.createBuffer();r.bindVertexArray(T),r.bindBuffer(r.ARRAY_BUFFER,w),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),r.STATIC_DRAW),r.enableVertexAttribArray(0),r.vertexAttribPointer(0,2,r.FLOAT,!1,0,0);let R=document.createElement("canvas");R.width=1,R.height=1;let E=R.getContext("2d",{willReadFrequently:!0}),S=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,D={width:1,height:1,ratio:1,colorKey:"",color:[.37,.55,1],secondary:[.25,.3,1],pointer:{x:0,y:0,inside:!1},emitter:{x:0,y:0,vx:0,vy:0,px:0,py:0,travelled:0},ready:!1,bursts:[],active:-1/0,time:0,allocated:"",targets:null},U=0,A=0,M=!0,F=!0,B=(e,t)=>{if(!E||!e)return t;let r=/^[0-9a-f]{3,8}$/i.test(e)?`#${e}`:e;E.clearRect(0,0,1,1),E.fillStyle="#000000",E.fillStyle=r,E.fillRect(0,0,1,1);let[o,a,i]=E.getImageData(0,0,1,1).data;return[o/255,a/255,i/255]},P=(e,t,o,a,i)=>{let u=r.createTexture();r.bindTexture(r.TEXTURE_2D,u),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,i),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,i),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.texImage2D(r.TEXTURE_2D,0,o,e,t,0,a,r.HALF_FLOAT,null);let l=r.createFramebuffer();return r.bindFramebuffer(r.FRAMEBUFFER,l),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,u,0),r.viewport(0,0,e,t),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),{texture:u,fbo:l,width:e,height:t,texel:[1/e,1/t]}},L=(e,t,r,o,a)=>{let i=P(e,t,r,o,a),u=P(e,t,r,o,a);return{get read(){return i},get write(){return u},swap(){let e=i;i=u,u=e},targets:()=>[i,u]}},V=e=>{r.deleteTexture(e.texture),r.deleteFramebuffer(e.fbo)},C=()=>{let e=D.targets;e&&([...e.velocity.targets(),...e.dye.targets(),...e.pressure.targets(),e.divergence,e.forward,e.back,...e.bloom].forEach(V),D.targets=null)},$=()=>{let e=O.current,o=`${e.quality}|${D.width}|${D.height}|${t.width}|${t.height}`;if(o===D.allocated&&D.targets)return;C(),D.allocated=o;let a=y[e.quality],i=D.width/D.height,u=e=>i>=1?[Math.round(e*i),e]:[e,Math.round(e/i)],[l,n]=u(a.sim),[c,f]=u(a.dye),d=Math.min(1,t.width/c,t.height/f),v=[],m=(c=Math.max(2,Math.round(c*d)))>>1,s=(f=Math.max(2,Math.round(f*d)))>>1;for(let e=0;e<5;e++)v.push(P(Math.max(1,m),Math.max(1,s),r.RGBA16F,r.RGBA,r.LINEAR)),m>>=1,s>>=1;D.targets={velocity:L(l,n,r.RG16F,r.RG,r.LINEAR),dye:L(c,f,r.RGBA16F,r.RGBA,r.LINEAR),forward:P(c,f,r.RGBA16F,r.RGBA,r.LINEAR),back:P(c,f,r.RGBA16F,r.RGBA,r.LINEAR),pressure:L(l,n,r.R16F,r.RED,r.NEAREST),divergence:P(l,n,r.R16F,r.RED,r.NEAREST),bloom:v}},G=()=>{let r=O.current,o=Math.max(1,e.clientWidth),a=Math.max(1,e.clientHeight),i=Math.min(window.devicePixelRatio||1,Math.max(.5,r.maxDevicePixelRatio||2),1440/Math.max(o,a)),u=Math.max(1,Math.round(o*i)),l=Math.max(1,Math.round(a*i));(t.width!==u||t.height!==l)&&(t.width=u,t.height=l),D.width=o,D.height=a,D.ratio=i,$()},N=e=>{e?(r.bindFramebuffer(r.FRAMEBUFFER,e.fbo),r.viewport(0,0,e.width,e.height)):(r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,t.width,t.height)),r.drawArrays(r.TRIANGLES,0,3)},k=(e,t)=>(r.useProgram(e.program),e.uniforms.uTexel&&r.uniform2f(e.uniforms.uTexel,t[0],t[1]),e.uniforms),X=(e,t)=>(r.activeTexture(r.TEXTURE0+e),r.bindTexture(r.TEXTURE_2D,t.texture),e),z=(e,t,o,a,i,u,l,n,c,f=u)=>{let d=k(b.splat,e.read.texel);r.uniform1i(d.uTarget,X(0,e.read)),r.uniform1f(d.uAspect,D.width/D.height),r.uniform2f(d.uA,t/D.width,1-o/D.height),r.uniform2f(d.uB,a/D.width,1-i/D.height),r.uniform1f(d.uRadius,u/D.height),r.uniform1f(d.uWide,f/D.height),r.uniform3f(d.uValue,l[0],l[1],l[2]),r.uniform1f(d.uMode,n),r.uniform1f(d.uStrength,c),N(e.write),e.swap()},W=(e,t)=>{let{velocity:r}=D.targets;return[e*r.read.width/D.width,-t*r.read.height/D.height]},H=e=>Math.max(.5*e.trailWidth,D.height/D.targets.dye.read.height*.9),j=(e,t,r,o)=>{let{velocity:a,dye:i}=D.targets,u=H(e),l=Math.random()*Math.PI*2;for(let e=0;e<6;e++){let o=l+e/6*Math.PI*2+(Math.random()-.5)*.5,n=Math.cos(o),c=Math.sin(o),f=20+14*Math.random(),d=t+3*n,v=r+3*c,m=t+n*f,s=r+c*f;if(!S){let e=W(760*Math.cos(o+.6),760*Math.sin(o+.6));z(a,d,v,m,s,18,[e[0],e[1],0],1,.9)}z(i,d,v,m,s,1.1*u,[2.4,2.4,.3],0,1,5*u+6)}z(i,t,r,t+.01,r,2.2*u,[1.8,1.8,.4],0,1,7*u+10),D.active=o},q=(e,t)=>{r.uniform3f(e.uColor,D.color[0],D.color[1],D.color[2]),r.uniform3f(e.uSecondary,D.secondary[0],D.secondary[1],D.secondary[2]),r.uniform1f(e.uIntensity,t.intensity),r.uniform1f(e.uHotspot,t.hotspot)},K=()=>{r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,t.width,t.height),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT)},Y=e=>{if(U=0,!M||!F||document.hidden)return void a("paused");if(A&&e-A<1e3/30){U=requestAnimationFrame(Y);return}a("running");let o=O.current,i=A?Math.min(1/30,(e-A)/1e3):1/60;for(A=e,D.time+=i,Math.abs(Math.min(window.devicePixelRatio||1,Math.max(.5,o.maxDevicePixelRatio||2),1440/Math.max(D.width,D.height))-D.ratio)>.01&&G(),$(),(e=>{let t=`${e.color}|${e.secondaryColor}`;if(t!==D.colorKey)if(D.colorKey=t,D.color=B(e.color,[.37,.55,1]),e.secondaryColor)D.secondary=B(e.secondaryColor,D.color);else{let[e,t,r]=(([e,t,r])=>{let o=Math.max(e,t,r),a=o-Math.min(e,t,r),i=0;return a>0&&(i=o===e?(t-r)/a%6:o===t?(r-e)/a+2:(e-t)/a+4),[(60*i+360)%360,o>0?a/o:0,o]})(D.color);D.secondary=((e,t,r)=>{let o=(e%360+360)%360/60,a=r*t,i=a*(1-Math.abs(o%2-1)),u=r-a,[l,n,c]=o<1?[a,i,0]:o<2?[i,a,0]:o<3?[0,a,i]:o<4?[0,i,a]:o<5?[i,0,a]:[a,0,i];return[l+u,n+u,c+u]})(e+8,Math.min(1,1.1*t+.05),r)}})(o),r.bindVertexArray(T),r.disable(r.BLEND),D.ready&&((e,t,r)=>{let{emitter:o,pointer:a}=D,{velocity:i,dye:u}=D.targets;if(o.px=o.x,o.py=o.y,S||e.followSpeed>=1)o.x=a.x,o.y=a.y;else{let r=10+50*e.followSpeed,i=Math.max(1,Math.ceil(t/.004)),u=t/i;for(let e=0;e<i;e++)o.vx+=(r*r*(a.x-o.x)-2*r*o.vx)*u,o.vy+=(r*r*(a.y-o.y)-2*r*o.vy)*u,o.x+=o.vx*u,o.y+=o.vy*u}let l=o.x-o.px,n=o.y-o.py;if(.05>Math.hypot(l,n)||!e.enabled)return;let c=H(e);if(!S){let e=W(l/Math.max(t,.001),n/Math.max(t,.001));z(i,o.px,o.py,o.x,o.y,4*c+18,[e[0],e[1],0],3,.6*.75)}z(u,o.px,o.py,o.x,o.y,c,[5.6,5.6,.7],2,1,5*c+6),D.active=r})(o,i,e);D.bursts.length;){let[t,r]=D.bursts.shift();j(o,t,r,e)}((e,t)=>{let{velocity:o,dye:a,pressure:i,divergence:u}=D.targets;if(!S){let e=k(b.divergence,o.read.texel);r.uniform1i(e.uVelocity,X(0,o.read)),N(u),e=k(b.scale,i.read.texel),r.uniform1i(e.uSource,X(0,i.read)),r.uniform1f(e.uValue,.8),N(i.write),i.swap(),e=k(b.pressure,i.read.texel),r.uniform1i(e.uDivergence,X(1,u));for(let t=0;t<20;t++)r.uniform1i(e.uPressure,X(0,i.read)),N(i.write),i.swap();e=k(b.gradient,o.read.texel),r.uniform1i(e.uPressure,X(0,i.read)),r.uniform1i(e.uVelocity,X(1,o.read)),N(o.write),o.swap(),e=k(b.advect,o.read.texel),r.uniform2f(e.uVelocityTexel,o.read.texel[0],o.read.texel[1]),r.uniform1i(e.uVelocity,X(0,o.read)),r.uniform1i(e.uSource,X(0,o.read)),r.uniform1f(e.uDt,t);let a=Math.exp(-(1.2*t));r.uniform4f(e.uDecay,a,a,1,1),N(o.write),o.swap()}let l=[Math.exp(-(4.6*t)/(.8*e.linger)),Math.exp(-(4.6*t)/(.2*e.linger)),Math.exp(-(4.6*t)/(1.2*e.linger)),1],{forward:n,back:c}=D.targets;if(S){let e=k(b.advect,a.read.texel);r.uniform2f(e.uVelocityTexel,o.read.texel[0],o.read.texel[1]),r.uniform1i(e.uVelocity,X(0,o.read)),r.uniform1i(e.uSource,X(1,a.read)),r.uniform1f(e.uDt,0),r.uniform4f(e.uDecay,l[0],l[1],l[2],l[3]),N(a.write),a.swap();return}let f=k(b.advect,a.read.texel);r.uniform2f(f.uVelocityTexel,o.read.texel[0],o.read.texel[1]),r.uniform1i(f.uVelocity,X(0,o.read)),r.uniform1i(f.uSource,X(1,a.read)),r.uniform1f(f.uDt,t),r.uniform4f(f.uDecay,1,1,1,1),N(n),r.uniform1i(f.uSource,X(1,n)),r.uniform1f(f.uDt,-t),N(c),f=k(b.maccormack,a.read.texel),r.uniform2f(f.uVelocityTexel,o.read.texel[0],o.read.texel[1]),r.uniform2f(f.uSourceTexel,a.read.texel[0],a.read.texel[1]),r.uniform1i(f.uVelocity,X(0,o.read)),r.uniform1i(f.uSource,X(1,a.read)),r.uniform1i(f.uForward,X(2,n)),r.uniform1i(f.uBack,X(3,c)),r.uniform1f(f.uDt,t),r.uniform4f(f.uDecay,l[0],l[1],l[2],l[3]),N(a.write),a.swap()})(o,i),(e=>{let{dye:o,bloom:a}=D.targets;if(e.glow>0){let t=k(b.prefilter,a[0].texel);r.uniform1i(t.uDye,X(0,o.read)),r.uniform2f(t.uDyeTexel,o.read.texel[0],o.read.texel[1]),q(t,e),N(a[0]),t=k(b.down,a[0].texel);for(let e=1;e<a.length;e++)r.uniform1i(t.uSource,X(0,a[e-1])),r.uniform2f(t.uSourceTexel,a[e-1].texel[0],a[e-1].texel[1]),N(a[e]);r.enable(r.BLEND),r.blendFunc(r.ONE,r.ONE),t=k(b.up,a[0].texel);for(let e=a.length-1;e>0;e--)r.uniform1i(t.uSource,X(0,a[e])),r.uniform2f(t.uSourceTexel,a[e].texel[0],a[e].texel[1]),N(a[e-1]);r.disable(r.BLEND)}let i=k(b.display,[1/t.width,1/t.height]);r.uniform1i(i.uDye,X(0,o.read)),r.uniform1i(i.uBloom,X(1,a[0])),q(i,e),r.uniform1f(i.uGlow,e.glow>0?1.4*e.glow/5:0),r.uniform1f(i.uGrain,e.grain),r.uniform1f(i.uTime,D.time),r.uniform1f(i.uLight,+("light"===e.theme)),N(null)})(o);let u=e-D.active>1200*o.linger+900,l=1>Math.hypot(D.emitter.vx,D.emitter.vy);if(u&&l){let e;a("idle"),(e=D.targets)&&(r.clearColor(0,0,0,0),[...e.velocity.targets(),...e.dye.targets(),...e.pressure.targets()].forEach(e=>{r.bindFramebuffer(r.FRAMEBUFFER,e.fbo),r.clear(r.COLOR_BUFFER_BIT)})),K(),A=0;return}U=requestAnimationFrame(Y)},J=()=>{!U&&M&&F&&!document.hidden&&(U=requestAnimationFrame(Y))},Q=t=>{if("touch"===t.pointerType)return;let r=e.getBoundingClientRect(),o=t.clientX-r.left,a=t.clientY-r.top;if(!(o>=0&&a>=0&&o<=r.width&&a<=r.height)){D.pointer.inside&&(D.pointer.inside=!1,D.ready=!1,J());return}D.ready||(D.emitter.x=o,D.emitter.y=a,D.emitter.px=o,D.emitter.py=a,D.emitter.vx=0,D.emitter.vy=0,D.ready=!0),D.pointer.x=o,D.pointer.y=a,D.pointer.inside=!0,J()},Z=t=>{let r=O.current;if(!r.clickBurst||!r.enabled)return;let o=e.getBoundingClientRect(),a=t.clientX-o.left,i=t.clientY-o.top;a<0||i<0||a>o.width||i>o.height||(D.bursts.push([a,i]),J())},ee=()=>{D.pointer.inside=!1,D.ready=!1,J()},et=()=>{A=0,document.hidden?(cancelAnimationFrame(U),U=0,a("paused")):J()},er=()=>{M=!1,cancelAnimationFrame(U),U=0,a("fallback")};t.addEventListener("webglcontextlost",er);let eo=new ResizeObserver(()=>{G(),J()});eo.observe(e);let ea=new IntersectionObserver(e=>{(F=e.some(e=>e.isIntersecting))?(A=0,J()):(cancelAnimationFrame(U),U=0,a("paused"))});return ea.observe(e),window.addEventListener("pointermove",Q,{passive:!0}),window.addEventListener("pointerdown",Z,{passive:!0}),document.documentElement.addEventListener("pointerleave",ee),document.addEventListener("visibilitychange",et),G(),K(),()=>{M=!1,cancelAnimationFrame(U),t.removeEventListener("webglcontextlost",er),eo.disconnect(),ea.disconnect(),window.removeEventListener("pointermove",Q),window.removeEventListener("pointerdown",Z),document.documentElement.removeEventListener("pointerleave",ee),document.removeEventListener("visibilitychange",et),C(),Object.values(b).forEach(e=>r.deleteProgram(e.program)),r.deleteShader(v),r.deleteBuffer(w),r.deleteVertexArray(T)}},[]),(0,t.jsxs)("div",{ref:_,className:["relative h-full w-full overflow-hidden",L].filter(Boolean).join(" "),style:V,...C,children:[(0,t.jsx)("canvas",{ref:I,className:"pointer-events-none absolute inset-0 block h-full w-full select-none",style:{mixBlendMode:M??("light"===A?"normal":"screen")},"aria-hidden":"true"}),P&&(0,t.jsx)("div",{className:"relative z-[1] h-full w-full",children:P})]})}])}]);