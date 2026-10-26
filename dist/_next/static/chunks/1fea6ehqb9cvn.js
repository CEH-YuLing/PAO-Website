(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,70307,t=>{"use strict";let e,i,s;var r=t.i(43476),a=t.i(71645);function h(t){let e=t[0],i=t[1],s=t[2];return Math.sqrt(e*e+i*i+s*s)}function n(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t}function l(t,e,i){return t[0]=e[0]+i[0],t[1]=e[1]+i[1],t[2]=e[2]+i[2],t}function o(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t[2]=e[2]-i[2],t}function u(t,e,i){return t[0]=e[0]*i,t[1]=e[1]*i,t[2]=e[2]*i,t}function d(t){let e=t[0],i=t[1],s=t[2];return e*e+i*i+s*s}function c(t,e){let i=e[0],s=e[1],r=e[2],a=i*i+s*s+r*r;return a>0&&(a=1/Math.sqrt(a)),t[0]=e[0]*a,t[1]=e[1]*a,t[2]=e[2]*a,t}function f(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}function g(t,e,i){let s=e[0],r=e[1],a=e[2],h=i[0],n=i[1],l=i[2];return t[0]=r*l-a*n,t[1]=a*h-s*l,t[2]=s*n-r*h,t}let p=(e=[0,0,0],i=[0,0,0],function(t,s){n(e,t),n(i,s),c(e,e),c(i,i);let r=f(e,i);return r>1?0:r<-1?Math.PI:Math.acos(r)});class m extends Array{constructor(t=0,e=t,i=t){return super(t,e,i),this}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}set x(t){this[0]=t}set y(t){this[1]=t}set z(t){this[2]=t}set(t,e=t,i=t){return t.length?this.copy(t):(this[0]=t,this[1]=e,this[2]=i,this)}copy(t){return n(this,t),this}add(t,e){return e?l(this,t,e):l(this,this,t),this}sub(t,e){return e?o(this,t,e):o(this,this,t),this}multiply(t){if(t.length)this[0]=this[0]*t[0],this[1]=this[1]*t[1],this[2]=this[2]*t[2];else u(this,this,t);return this}divide(t){if(t.length)this[0]=this[0]/t[0],this[1]=this[1]/t[1],this[2]=this[2]/t[2];else u(this,this,1/t);return this}inverse(t=this){return this[0]=1/t[0],this[1]=1/t[1],this[2]=1/t[2],this}len(){return h(this)}distance(t){let e,i,s;if(!t)return h(this);return e=t[0]-this[0],Math.sqrt(e*e+(i=t[1]-this[1])*i+(s=t[2]-this[2])*s)}squaredLen(){return d(this)}squaredDistance(t){let e,i,s;if(!t)return d(this);return e=t[0]-this[0],e*e+(i=t[1]-this[1])*i+(s=t[2]-this[2])*s}negate(t=this){return this[0]=-t[0],this[1]=-t[1],this[2]=-t[2],this}cross(t,e){return e?g(this,t,e):g(this,this,t),this}scale(t){return u(this,this,t),this}normalize(){return c(this,this),this}dot(t){return f(this,t)}equals(t){return this[0]===t[0]&&this[1]===t[1]&&this[2]===t[2]}applyMatrix3(t){let e,i,s;return e=this[0],i=this[1],s=this[2],this[0]=e*t[0]+i*t[3]+s*t[6],this[1]=e*t[1]+i*t[4]+s*t[7],this[2]=e*t[2]+i*t[5]+s*t[8],this}applyMatrix4(t){let e,i,s,r;return e=this[0],i=this[1],s=this[2],r=(r=t[3]*e+t[7]*i+t[11]*s+t[15])||1,this[0]=(t[0]*e+t[4]*i+t[8]*s+t[12])/r,this[1]=(t[1]*e+t[5]*i+t[9]*s+t[13])/r,this[2]=(t[2]*e+t[6]*i+t[10]*s+t[14])/r,this}scaleRotateMatrix4(t){let e,i,s,r;return e=this[0],i=this[1],s=this[2],r=(r=t[3]*e+t[7]*i+t[11]*s+t[15])||1,this[0]=(t[0]*e+t[4]*i+t[8]*s)/r,this[1]=(t[1]*e+t[5]*i+t[9]*s)/r,this[2]=(t[2]*e+t[6]*i+t[10]*s)/r,this}applyQuaternion(t){let e,i,s,r,a,h,n,l,o,u,d,c,f,g;return e=this[0],i=this[1],s=this[2],r=t[0],a=t[1],h=t[2],n=t[3],l=a*s-h*i,o=h*e-r*s,u=r*i-a*e,d=a*u-h*o,c=h*l-r*u,f=r*o-a*l,l*=g=2*n,o*=g,u*=g,d*=2,c*=2,f*=2,this[0]=e+l+d,this[1]=i+o+c,this[2]=s+u+f,this}angle(t){return p(this,t)}lerp(t,e){let i,s,r;return i=this[0],s=this[1],r=this[2],this[0]=i+e*(t[0]-i),this[1]=s+e*(t[1]-s),this[2]=r+e*(t[2]-r),this}smoothLerp(t,e,i){let s,r,a,h;return s=Math.exp(-e*i),r=this[0],a=this[1],h=this[2],this[0]=t[0]+(r-t[0])*s,this[1]=t[1]+(a-t[1])*s,this[2]=t[2]+(h-t[2])*s,this}clone(){return new m(this[0],this[1],this[2])}fromArray(t,e=0){return this[0]=t[e],this[1]=t[e+1],this[2]=t[e+2],this}toArray(t=[],e=0){return t[e]=this[0],t[e+1]=this[1],t[e+2]=this[2],t}transformDirection(t){let e=this[0],i=this[1],s=this[2];return this[0]=t[0]*e+t[4]*i+t[8]*s,this[1]=t[1]*e+t[5]*i+t[9]*s,this[2]=t[2]*e+t[6]*i+t[10]*s,this.normalize()}}let v=new m,x=1;class E{constructor({canvas:t=document.createElement("canvas"),width:e=300,height:i=150,dpr:s=1,alpha:r=!1,depth:a=!0,stencil:h=!1,antialias:n=!1,premultipliedAlpha:l=!1,preserveDrawingBuffer:o=!1,powerPreference:u="default",autoClear:d=!0,webgl:c=2}={}){let f={alpha:r,depth:a,stencil:h,antialias:n,premultipliedAlpha:l,preserveDrawingBuffer:o,powerPreference:u};this.dpr=s,this.alpha=r,this.color=!0,this.depth=a,this.stencil=h,this.premultipliedAlpha=l,this.autoClear=d,this.id=x++,2===c&&(this.gl=t.getContext("webgl2",f)),this.isWebgl2=!!this.gl,this.gl||(this.gl=t.getContext("webgl",f)),this.gl||console.error("unable to create webgl context"),this.gl.renderer=this,this.setSize(e,i),this.state={},this.state.blendFunc={src:this.gl.ONE,dst:this.gl.ZERO},this.state.blendEquation={modeRGB:this.gl.FUNC_ADD},this.state.cullFace=!1,this.state.frontFace=this.gl.CCW,this.state.depthMask=!0,this.state.depthFunc=this.gl.LEQUAL,this.state.premultiplyAlpha=!1,this.state.flipY=!1,this.state.unpackAlignment=4,this.state.framebuffer=null,this.state.viewport={x:0,y:0,width:null,height:null},this.state.textureUnits=[],this.state.activeTextureUnit=0,this.state.boundBuffer=null,this.state.uniformLocations=new Map,this.state.currentProgram=null,this.extensions={},this.isWebgl2?(this.getExtension("EXT_color_buffer_float"),this.getExtension("OES_texture_float_linear")):(this.getExtension("OES_texture_float"),this.getExtension("OES_texture_float_linear"),this.getExtension("OES_texture_half_float"),this.getExtension("OES_texture_half_float_linear"),this.getExtension("OES_element_index_uint"),this.getExtension("OES_standard_derivatives"),this.getExtension("EXT_sRGB"),this.getExtension("WEBGL_depth_texture"),this.getExtension("WEBGL_draw_buffers")),this.getExtension("WEBGL_compressed_texture_astc"),this.getExtension("EXT_texture_compression_bptc"),this.getExtension("WEBGL_compressed_texture_s3tc"),this.getExtension("WEBGL_compressed_texture_etc1"),this.getExtension("WEBGL_compressed_texture_pvrtc"),this.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),this.vertexAttribDivisor=this.getExtension("ANGLE_instanced_arrays","vertexAttribDivisor","vertexAttribDivisorANGLE"),this.drawArraysInstanced=this.getExtension("ANGLE_instanced_arrays","drawArraysInstanced","drawArraysInstancedANGLE"),this.drawElementsInstanced=this.getExtension("ANGLE_instanced_arrays","drawElementsInstanced","drawElementsInstancedANGLE"),this.createVertexArray=this.getExtension("OES_vertex_array_object","createVertexArray","createVertexArrayOES"),this.bindVertexArray=this.getExtension("OES_vertex_array_object","bindVertexArray","bindVertexArrayOES"),this.deleteVertexArray=this.getExtension("OES_vertex_array_object","deleteVertexArray","deleteVertexArrayOES"),this.drawBuffers=this.getExtension("WEBGL_draw_buffers","drawBuffers","drawBuffersWEBGL"),this.parameters={},this.parameters.maxTextureUnits=this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),this.parameters.maxAnisotropy=this.getExtension("EXT_texture_filter_anisotropic")?this.gl.getParameter(this.getExtension("EXT_texture_filter_anisotropic").MAX_TEXTURE_MAX_ANISOTROPY_EXT):0}setSize(t,e){this.width=t,this.height=e,this.gl.canvas.width=t*this.dpr,this.gl.canvas.height=e*this.dpr,this.gl.canvas.style&&Object.assign(this.gl.canvas.style,{width:t+"px",height:e+"px"})}setViewport(t,e,i=0,s=0){(this.state.viewport.width!==t||this.state.viewport.height!==e)&&(this.state.viewport.width=t,this.state.viewport.height=e,this.state.viewport.x=i,this.state.viewport.y=s,this.gl.viewport(i,s,t,e))}setScissor(t,e,i=0,s=0){this.gl.scissor(i,s,t,e)}enable(t){!0!==this.state[t]&&(this.gl.enable(t),this.state[t]=!0)}disable(t){!1!==this.state[t]&&(this.gl.disable(t),this.state[t]=!1)}setBlendFunc(t,e,i,s){(this.state.blendFunc.src!==t||this.state.blendFunc.dst!==e||this.state.blendFunc.srcAlpha!==i||this.state.blendFunc.dstAlpha!==s)&&(this.state.blendFunc.src=t,this.state.blendFunc.dst=e,this.state.blendFunc.srcAlpha=i,this.state.blendFunc.dstAlpha=s,void 0!==i?this.gl.blendFuncSeparate(t,e,i,s):this.gl.blendFunc(t,e))}setBlendEquation(t,e){t=t||this.gl.FUNC_ADD,(this.state.blendEquation.modeRGB!==t||this.state.blendEquation.modeAlpha!==e)&&(this.state.blendEquation.modeRGB=t,this.state.blendEquation.modeAlpha=e,void 0!==e?this.gl.blendEquationSeparate(t,e):this.gl.blendEquation(t))}setCullFace(t){this.state.cullFace!==t&&(this.state.cullFace=t,this.gl.cullFace(t))}setFrontFace(t){this.state.frontFace!==t&&(this.state.frontFace=t,this.gl.frontFace(t))}setDepthMask(t){this.state.depthMask!==t&&(this.state.depthMask=t,this.gl.depthMask(t))}setDepthFunc(t){this.state.depthFunc!==t&&(this.state.depthFunc=t,this.gl.depthFunc(t))}setStencilMask(t){this.state.stencilMask!==t&&(this.state.stencilMask=t,this.gl.stencilMask(t))}setStencilFunc(t,e,i){(this.state.stencilFunc!==t||this.state.stencilRef!==e||this.state.stencilFuncMask!==i)&&(this.state.stencilFunc=t||this.gl.ALWAYS,this.state.stencilRef=e||0,this.state.stencilFuncMask=i||0,this.gl.stencilFunc(t||this.gl.ALWAYS,e||0,i||0))}setStencilOp(t,e,i){(this.state.stencilFail!==t||this.state.stencilDepthFail!==e||this.state.stencilDepthPass!==i)&&(this.state.stencilFail=t,this.state.stencilDepthFail=e,this.state.stencilDepthPass=i,this.gl.stencilOp(t,e,i))}activeTexture(t){this.state.activeTextureUnit!==t&&(this.state.activeTextureUnit=t,this.gl.activeTexture(this.gl.TEXTURE0+t))}bindFramebuffer({target:t=this.gl.FRAMEBUFFER,buffer:e=null}={}){this.state.framebuffer!==e&&(this.state.framebuffer=e,this.gl.bindFramebuffer(t,e))}getExtension(t,e,i){return e&&this.gl[e]?this.gl[e].bind(this.gl):(this.extensions[t]||(this.extensions[t]=this.gl.getExtension(t)),e)?this.extensions[t]?this.extensions[t][i].bind(this.extensions[t]):null:this.extensions[t]}sortOpaque(t,e){return t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.program.id!==e.program.id?t.program.id-e.program.id:t.zDepth!==e.zDepth?t.zDepth-e.zDepth:e.id-t.id}sortTransparent(t,e){return t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.zDepth!==e.zDepth?e.zDepth-t.zDepth:e.id-t.id}sortUI(t,e){return t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.program.id!==e.program.id?t.program.id-e.program.id:e.id-t.id}getRenderList({scene:t,camera:e,frustumCull:i,sort:s}){let r=[];if(e&&i&&e.updateFrustum(),t.traverse(t=>!t.visible||(t.draw?void((!i||!t.frustumCulled||!e||e.frustumIntersectsMesh(t))&&r.push(t)):void 0)),s){let t=[],i=[],s=[];r.forEach(r=>{r.program.transparent?r.program.depthTest?i.push(r):s.push(r):t.push(r),r.zDepth=0,0===r.renderOrder&&r.program.depthTest&&e&&(r.worldMatrix.getTranslation(v),v.applyMatrix4(e.projectionViewMatrix),r.zDepth=v.z)}),t.sort(this.sortOpaque),i.sort(this.sortTransparent),s.sort(this.sortUI),r=t.concat(i,s)}return r}render({scene:t,camera:e,target:i=null,update:s=!0,sort:r=!0,frustumCull:a=!0,clear:h}){null===i?(this.bindFramebuffer(),this.setViewport(this.width*this.dpr,this.height*this.dpr)):(this.bindFramebuffer(i),this.setViewport(i.width,i.height)),(h||this.autoClear&&!1!==h)&&(this.depth&&(!i||i.depth)&&(this.enable(this.gl.DEPTH_TEST),this.setDepthMask(!0)),(this.stencil||!i||i.stencil)&&(this.enable(this.gl.STENCIL_TEST),this.setStencilMask(255)),this.gl.clear((this.color?this.gl.COLOR_BUFFER_BIT:0)|(this.depth?this.gl.DEPTH_BUFFER_BIT:0)|(this.stencil?this.gl.STENCIL_BUFFER_BIT:0))),s&&t.updateMatrixWorld(),e&&e.updateMatrixWorld(),this.getRenderList({scene:t,camera:e,frustumCull:a,sort:r}).forEach(t=>{t.draw({camera:e})})}}let w=1,b={};class M{constructor(t,{vertex:e,fragment:i,uniforms:s={},transparent:r=!1,cullFace:a=t.BACK,frontFace:h=t.CCW,depthTest:n=!0,depthWrite:l=!0,depthFunc:o=t.LEQUAL}={}){t.canvas||console.error("gl not passed as first argument to Program"),this.gl=t,this.uniforms=s,this.id=w++,e||console.warn("vertex shader not supplied"),i||console.warn("fragment shader not supplied"),this.transparent=r,this.cullFace=a,this.frontFace=h,this.depthTest=n,this.depthWrite=l,this.depthFunc=o,this.blendFunc={},this.blendEquation={},this.stencilFunc={},this.stencilOp={},this.transparent&&!this.blendFunc.src&&(this.gl.renderer.premultipliedAlpha?this.setBlendFunc(this.gl.ONE,this.gl.ONE_MINUS_SRC_ALPHA):this.setBlendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA)),this.vertexShader=t.createShader(t.VERTEX_SHADER),this.fragmentShader=t.createShader(t.FRAGMENT_SHADER),this.program=t.createProgram(),t.attachShader(this.program,this.vertexShader),t.attachShader(this.program,this.fragmentShader),this.setShaders({vertex:e,fragment:i})}setShaders({vertex:t,fragment:e}){if(t&&(this.gl.shaderSource(this.vertexShader,t),this.gl.compileShader(this.vertexShader),""!==this.gl.getShaderInfoLog(this.vertexShader)&&console.warn(`${this.gl.getShaderInfoLog(this.vertexShader)}
Vertex Shader
${y(t)}`)),e&&(this.gl.shaderSource(this.fragmentShader,e),this.gl.compileShader(this.fragmentShader),""!==this.gl.getShaderInfoLog(this.fragmentShader)&&console.warn(`${this.gl.getShaderInfoLog(this.fragmentShader)}
Fragment Shader
${y(e)}`)),this.gl.linkProgram(this.program),!this.gl.getProgramParameter(this.program,this.gl.LINK_STATUS))return console.warn(this.gl.getProgramInfoLog(this.program));this.uniformLocations=new Map;let i=this.gl.getProgramParameter(this.program,this.gl.ACTIVE_UNIFORMS);for(let t=0;t<i;t++){let e=this.gl.getActiveUniform(this.program,t);this.uniformLocations.set(e,this.gl.getUniformLocation(this.program,e.name));let i=e.name.match(/(\w+)/g);e.uniformName=i[0],e.nameComponents=i.slice(1)}this.attributeLocations=new Map;let s=[],r=this.gl.getProgramParameter(this.program,this.gl.ACTIVE_ATTRIBUTES);for(let t=0;t<r;t++){let e=this.gl.getActiveAttrib(this.program,t),i=this.gl.getAttribLocation(this.program,e.name);-1!==i&&(s[i]=e.name,this.attributeLocations.set(e,i))}this.attributeOrder=s.join("")}setBlendFunc(t,e,i,s){this.blendFunc.src=t,this.blendFunc.dst=e,this.blendFunc.srcAlpha=i,this.blendFunc.dstAlpha=s,t&&(this.transparent=!0)}setBlendEquation(t,e){this.blendEquation.modeRGB=t,this.blendEquation.modeAlpha=e}setStencilFunc(t,e,i){this.stencilRef=e,this.stencilFunc.func=t,this.stencilFunc.ref=e,this.stencilFunc.mask=i}setStencilOp(t,e,i){this.stencilOp.stencilFail=t,this.stencilOp.depthFail=e,this.stencilOp.depthPass=i}applyState(){this.depthTest?this.gl.renderer.enable(this.gl.DEPTH_TEST):this.gl.renderer.disable(this.gl.DEPTH_TEST),this.cullFace?this.gl.renderer.enable(this.gl.CULL_FACE):this.gl.renderer.disable(this.gl.CULL_FACE),this.blendFunc.src?this.gl.renderer.enable(this.gl.BLEND):this.gl.renderer.disable(this.gl.BLEND),this.cullFace&&this.gl.renderer.setCullFace(this.cullFace),this.gl.renderer.setFrontFace(this.frontFace),this.gl.renderer.setDepthMask(this.depthWrite),this.gl.renderer.setDepthFunc(this.depthFunc),this.blendFunc.src&&this.gl.renderer.setBlendFunc(this.blendFunc.src,this.blendFunc.dst,this.blendFunc.srcAlpha,this.blendFunc.dstAlpha),this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB,this.blendEquation.modeAlpha),this.stencilFunc.func||this.stencilOp.stencilFail?this.gl.renderer.enable(this.gl.STENCIL_TEST):this.gl.renderer.disable(this.gl.STENCIL_TEST),this.gl.renderer.setStencilFunc(this.stencilFunc.func,this.stencilFunc.ref,this.stencilFunc.mask),this.gl.renderer.setStencilOp(this.stencilOp.stencilFail,this.stencilOp.depthFail,this.stencilOp.depthPass)}use({flipFaces:t=!1}={}){let e=-1;this.gl.renderer.state.currentProgram!==this.id&&(this.gl.useProgram(this.program),this.gl.renderer.state.currentProgram=this.id),this.uniformLocations.forEach((t,i)=>{let s=this.uniforms[i.uniformName];for(let t of i.nameComponents){if(!s)break;if(t in s)s=s[t];else if(Array.isArray(s.value))break;else{s=void 0;break}}if(!s)return R(`Active uniform ${i.name} has not been supplied`);if(s&&void 0===s.value)return R(`${i.name} uniform is missing a value parameter`);if(s.value.texture)return e+=1,s.value.update(e),_(this.gl,i.type,t,e);if(s.value.length&&s.value[0].texture){let r=[];return s.value.forEach(t=>{e+=1,t.update(e),r.push(e)}),_(this.gl,i.type,t,r)}_(this.gl,i.type,t,s.value)}),this.applyState(),t&&this.gl.renderer.setFrontFace(this.frontFace===this.gl.CCW?this.gl.CW:this.gl.CCW)}remove(){this.gl.deleteProgram(this.program)}}function _(t,e,i,s){s=s.length?function(t){let e=t.length,i=t[0].length;if(void 0===i)return t;let s=e*i,r=b[s];r||(b[s]=r=new Float32Array(s));for(let s=0;s<e;s++)r.set(t[s],s*i);return r}(s):s;let r=t.renderer.state.uniformLocations.get(i);if(s.length)if(void 0===r||r.length!==s.length)t.renderer.state.uniformLocations.set(i,s.slice(0));else{if(function(t,e){if(t.length!==e.length)return!1;for(let i=0,s=t.length;i<s;i++)if(t[i]!==e[i])return!1;return!0}(r,s))return;r.set?r.set(s):function(t,e){for(let i=0,s=t.length;i<s;i++)t[i]=e[i]}(r,s),t.renderer.state.uniformLocations.set(i,r)}else{if(r===s)return;t.renderer.state.uniformLocations.set(i,s)}switch(e){case 5126:return s.length?t.uniform1fv(i,s):t.uniform1f(i,s);case 35664:return t.uniform2fv(i,s);case 35665:return t.uniform3fv(i,s);case 35666:return t.uniform4fv(i,s);case 35670:case 5124:case 35678:case 36306:case 35680:case 36289:return s.length?t.uniform1iv(i,s):t.uniform1i(i,s);case 35671:case 35667:return t.uniform2iv(i,s);case 35672:case 35668:return t.uniform3iv(i,s);case 35673:case 35669:return t.uniform4iv(i,s);case 35674:return t.uniformMatrix2fv(i,!1,s);case 35675:return t.uniformMatrix3fv(i,!1,s);case 35676:return t.uniformMatrix4fv(i,!1,s)}}function y(t){let e=t.split("\n");for(let t=0;t<e.length;t++)e[t]=t+1+": "+e[t];return e.join("\n")}let T=0;function R(t){!(T>100)&&(console.warn(t),++T>100&&console.warn("More than 100 program warnings - stopping logs."))}function A(t,e,i){let s=e[0],r=e[1],a=e[2],h=e[3],n=i[0],l=i[1],o=i[2],u=i[3];return t[0]=s*u+h*n+r*o-a*l,t[1]=r*u+h*l+a*n-s*o,t[2]=a*u+h*o+s*l-r*n,t[3]=h*u-s*n-r*l-a*o,t}let F=function(t,e){let i=e[0],s=e[1],r=e[2],a=e[3],h=i*i+s*s+r*r+a*a;return h>0&&(h=1/Math.sqrt(h)),t[0]=i*h,t[1]=s*h,t[2]=r*h,t[3]=a*h,t};class S extends Array{constructor(t=0,e=0,i=0,s=1){super(t,e,i,s),this.onChange=()=>{},this._target=this;let r=["0","1","2","3"];return new Proxy(this,{set(t,e){let i=Reflect.set(...arguments);return i&&r.includes(e)&&t.onChange(),i}})}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}get w(){return this[3]}set x(t){this._target[0]=t,this.onChange()}set y(t){this._target[1]=t,this.onChange()}set z(t){this._target[2]=t,this.onChange()}set w(t){this._target[3]=t,this.onChange()}identity(){var t;return(t=this._target)[0]=0,t[1]=0,t[2]=0,t[3]=1,this.onChange(),this}set(t,e,i,s){var r;return t.length?this.copy(t):(r=this._target,r[0]=t,r[1]=e,r[2]=i,r[3]=s,this.onChange(),this)}rotateX(t){var e,i,s;let r,a,h,n,l,o;return e=this._target,i=this._target,s=.5*t,r=i[0],a=i[1],h=i[2],n=i[3],l=Math.sin(s),o=Math.cos(s),e[0]=r*o+n*l,e[1]=a*o+h*l,e[2]=h*o-a*l,e[3]=n*o-r*l,this.onChange(),this}rotateY(t){var e,i,s;let r,a,h,n,l,o;return e=this._target,i=this._target,s=.5*t,r=i[0],a=i[1],h=i[2],n=i[3],l=Math.sin(s),o=Math.cos(s),e[0]=r*o-h*l,e[1]=a*o+n*l,e[2]=h*o+r*l,e[3]=n*o-a*l,this.onChange(),this}rotateZ(t){var e,i,s;let r,a,h,n,l,o;return e=this._target,i=this._target,s=.5*t,r=i[0],a=i[1],h=i[2],n=i[3],l=Math.sin(s),o=Math.cos(s),e[0]=r*o+a*l,e[1]=a*o-r*l,e[2]=h*o+n*l,e[3]=n*o-h*l,this.onChange(),this}inverse(t=this._target){var e;let i,s,r,a,h,n;return e=this._target,i=t[0],s=t[1],n=(h=i*i+s*s+(r=t[2])*r+(a=t[3])*a)?1/h:0,e[0]=-i*n,e[1]=-s*n,e[2]=-r*n,e[3]=a*n,this.onChange(),this}conjugate(t=this._target){var e;return e=this._target,e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=t[3],this.onChange(),this}copy(t){var e;return e=this._target,e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],this.onChange(),this}normalize(t=this._target){return F(this._target,t),this.onChange(),this}multiply(t,e){return e?A(this._target,t,e):A(this._target,this._target,t),this.onChange(),this}dot(t){var e;return e=this._target,e[0]*t[0]+e[1]*t[1]+e[2]*t[2]+e[3]*t[3]}fromMatrix3(t){return!function(t,e){let i,s=e[0]+e[4]+e[8];if(s>0)i=Math.sqrt(s+1),t[3]=.5*i,i=.5/i,t[0]=(e[5]-e[7])*i,t[1]=(e[6]-e[2])*i,t[2]=(e[1]-e[3])*i;else{let s=0;e[4]>e[0]&&(s=1),e[8]>e[3*s+s]&&(s=2);let r=(s+1)%3,a=(s+2)%3;i=Math.sqrt(e[3*s+s]-e[3*r+r]-e[3*a+a]+1),t[s]=.5*i,i=.5/i,t[3]=(e[3*r+a]-e[3*a+r])*i,t[r]=(e[3*r+s]+e[3*s+r])*i,t[a]=(e[3*a+s]+e[3*s+a])*i}}(this._target,t),this.onChange(),this}fromEuler(t,e){return!function(t,e,i="YXZ"){let s=Math.sin(.5*e[0]),r=Math.cos(.5*e[0]),a=Math.sin(.5*e[1]),h=Math.cos(.5*e[1]),n=Math.sin(.5*e[2]),l=Math.cos(.5*e[2]);"XYZ"===i?(t[0]=s*h*l+r*a*n,t[1]=r*a*l-s*h*n,t[2]=r*h*n+s*a*l,t[3]=r*h*l-s*a*n):"YXZ"===i?(t[0]=s*h*l+r*a*n,t[1]=r*a*l-s*h*n,t[2]=r*h*n-s*a*l,t[3]=r*h*l+s*a*n):"ZXY"===i?(t[0]=s*h*l-r*a*n,t[1]=r*a*l+s*h*n,t[2]=r*h*n+s*a*l,t[3]=r*h*l-s*a*n):"ZYX"===i?(t[0]=s*h*l-r*a*n,t[1]=r*a*l+s*h*n,t[2]=r*h*n-s*a*l,t[3]=r*h*l+s*a*n):"YZX"===i?(t[0]=s*h*l+r*a*n,t[1]=r*a*l+s*h*n,t[2]=r*h*n-s*a*l,t[3]=r*h*l-s*a*n):"XZY"===i&&(t[0]=s*h*l-r*a*n,t[1]=r*a*l-s*h*n,t[2]=r*h*n+s*a*l,t[3]=r*h*l+s*a*n)}(this._target,t,t.order),e||this.onChange(),this}fromAxisAngle(t,e){var i,s;let r;return i=this._target,r=Math.sin(s=.5*e),i[0]=r*t[0],i[1]=r*t[1],i[2]=r*t[2],i[3]=Math.cos(s),this.onChange(),this}slerp(t,e){var i,s;let r,a,h,n,l,o,u,d,c,f,g,p,m;return i=this._target,s=this._target,o=s[0],u=s[1],d=s[2],c=s[3],f=t[0],g=t[1],(a=o*f+u*g+d*(p=t[2])+c*(m=t[3]))<0&&(a=-a,f=-f,g=-g,p=-p,m=-m),1-a>1e-6?(h=Math.sin(r=Math.acos(a)),n=Math.sin((1-e)*r)/h,l=Math.sin(e*r)/h):(n=1-e,l=e),i[0]=n*o+l*f,i[1]=n*u+l*g,i[2]=n*d+l*p,i[3]=n*c+l*m,this.onChange(),this}fromArray(t,e=0){return this._target[0]=t[e],this._target[1]=t[e+1],this._target[2]=t[e+2],this._target[3]=t[e+3],this.onChange(),this}toArray(t=[],e=0){return t[e]=this[0],t[e+1]=this[1],t[e+2]=this[2],t[e+3]=this[3],t}}function C(t){let e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],h=t[5],n=t[6],l=t[7],o=t[8],u=t[9],d=t[10],c=t[11],f=t[12],g=t[13],p=t[14],m=t[15];return(e*h-i*a)*(d*m-c*p)-(e*n-s*a)*(u*m-c*g)+(e*l-r*a)*(u*p-d*g)+(i*n-s*h)*(o*m-c*f)-(i*l-r*h)*(o*p-d*f)+(s*l-r*n)*(o*g-u*f)}function D(t,e,i){let s=e[0],r=e[1],a=e[2],h=e[3],n=e[4],l=e[5],o=e[6],u=e[7],d=e[8],c=e[9],f=e[10],g=e[11],p=e[12],m=e[13],v=e[14],x=e[15],E=i[0],w=i[1],b=i[2],M=i[3];return t[0]=E*s+w*n+b*d+M*p,t[1]=E*r+w*l+b*c+M*m,t[2]=E*a+w*o+b*f+M*v,t[3]=E*h+w*u+b*g+M*x,E=i[4],w=i[5],b=i[6],M=i[7],t[4]=E*s+w*n+b*d+M*p,t[5]=E*r+w*l+b*c+M*m,t[6]=E*a+w*o+b*f+M*v,t[7]=E*h+w*u+b*g+M*x,E=i[8],w=i[9],b=i[10],M=i[11],t[8]=E*s+w*n+b*d+M*p,t[9]=E*r+w*l+b*c+M*m,t[10]=E*a+w*o+b*f+M*v,t[11]=E*h+w*u+b*g+M*x,E=i[12],w=i[13],b=i[14],M=i[15],t[12]=E*s+w*n+b*d+M*p,t[13]=E*r+w*l+b*c+M*m,t[14]=E*a+w*o+b*f+M*v,t[15]=E*h+w*u+b*g+M*x,t}function P(t,e){let i=e[0],s=e[1],r=e[2],a=e[4],h=e[5],n=e[6],l=e[8],o=e[9],u=e[10];return t[0]=Math.hypot(i,s,r),t[1]=Math.hypot(a,h,n),t[2]=Math.hypot(l,o,u),t}let B=(s=[1,1,1],function(t,e){P(s,e);let i=1/s[0],r=1/s[1],a=1/s[2],h=e[0]*i,n=e[1]*r,l=e[2]*a,o=e[4]*i,u=e[5]*r,d=e[6]*a,c=e[8]*i,f=e[9]*r,g=e[10]*a,p=h+u+g,m=0;return p>0?(m=2*Math.sqrt(p+1),t[3]=.25*m,t[0]=(d-f)/m,t[1]=(c-l)/m,t[2]=(n-o)/m):h>u&&h>g?(m=2*Math.sqrt(1+h-u-g),t[3]=(d-f)/m,t[0]=.25*m,t[1]=(n+o)/m,t[2]=(c+l)/m):u>g?(m=2*Math.sqrt(1+u-h-g),t[3]=(c-l)/m,t[0]=(n+o)/m,t[1]=.25*m,t[2]=(d+f)/m):(m=2*Math.sqrt(1+g-h-u),t[3]=(n-o)/m,t[0]=(c+l)/m,t[1]=(d+f)/m,t[2]=.25*m),t});function N(t,e,i){return t[0]=e[0]+i[0],t[1]=e[1]+i[1],t[2]=e[2]+i[2],t[3]=e[3]+i[3],t[4]=e[4]+i[4],t[5]=e[5]+i[5],t[6]=e[6]+i[6],t[7]=e[7]+i[7],t[8]=e[8]+i[8],t[9]=e[9]+i[9],t[10]=e[10]+i[10],t[11]=e[11]+i[11],t[12]=e[12]+i[12],t[13]=e[13]+i[13],t[14]=e[14]+i[14],t[15]=e[15]+i[15],t}function k(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t[2]=e[2]-i[2],t[3]=e[3]-i[3],t[4]=e[4]-i[4],t[5]=e[5]-i[5],t[6]=e[6]-i[6],t[7]=e[7]-i[7],t[8]=e[8]-i[8],t[9]=e[9]-i[9],t[10]=e[10]-i[10],t[11]=e[11]-i[11],t[12]=e[12]-i[12],t[13]=e[13]-i[13],t[14]=e[14]-i[14],t[15]=e[15]-i[15],t}class L extends Array{constructor(t=1,e=0,i=0,s=0,r=0,a=1,h=0,n=0,l=0,o=0,u=1,d=0,c=0,f=0,g=0,p=1){return super(t,e,i,s,r,a,h,n,l,o,u,d,c,f,g,p),this}get x(){return this[12]}get y(){return this[13]}get z(){return this[14]}get w(){return this[15]}set x(t){this[12]=t}set y(t){this[13]=t}set z(t){this[14]=t}set w(t){this[15]=t}set(t,e,i,s,r,a,h,n,l,o,u,d,c,f,g,p){return t.length?this.copy(t):(this[0]=t,this[1]=e,this[2]=i,this[3]=s,this[4]=r,this[5]=a,this[6]=h,this[7]=n,this[8]=l,this[9]=o,this[10]=u,this[11]=d,this[12]=c,this[13]=f,this[14]=g,this[15]=p,this)}translate(t,e=this){let i,s,r,a,h,n,l,o,u,d,c,f,g,p,m;return g=t[0],p=t[1],m=t[2],e===this?(this[12]=e[0]*g+e[4]*p+e[8]*m+e[12],this[13]=e[1]*g+e[5]*p+e[9]*m+e[13],this[14]=e[2]*g+e[6]*p+e[10]*m+e[14],this[15]=e[3]*g+e[7]*p+e[11]*m+e[15]):(i=e[0],s=e[1],r=e[2],a=e[3],h=e[4],n=e[5],l=e[6],o=e[7],u=e[8],d=e[9],c=e[10],f=e[11],this[0]=i,this[1]=s,this[2]=r,this[3]=a,this[4]=h,this[5]=n,this[6]=l,this[7]=o,this[8]=u,this[9]=d,this[10]=c,this[11]=f,this[12]=i*g+h*p+u*m+e[12],this[13]=s*g+n*p+d*m+e[13],this[14]=r*g+l*p+c*m+e[14],this[15]=a*g+o*p+f*m+e[15]),this}rotate(t,e,i=this){let s,r,a,h,n,l,o,u,d,c,f,g,p,m,v,x,E,w,b,M,_,y,T,R,A,F,S,C;return A=e[0],1e-6>Math.abs(C=Math.hypot(A,F=e[1],S=e[2]))||(A*=C=1/C,F*=C,S*=C,s=Math.sin(t),a=1-(r=Math.cos(t)),h=i[0],n=i[1],l=i[2],o=i[3],u=i[4],d=i[5],c=i[6],f=i[7],g=i[8],p=i[9],m=i[10],v=i[11],x=A*A*a+r,E=F*A*a+S*s,w=S*A*a-F*s,b=A*F*a-S*s,M=F*F*a+r,_=S*F*a+A*s,y=A*S*a+F*s,T=F*S*a-A*s,R=S*S*a+r,this[0]=h*x+u*E+g*w,this[1]=n*x+d*E+p*w,this[2]=l*x+c*E+m*w,this[3]=o*x+f*E+v*w,this[4]=h*b+u*M+g*_,this[5]=n*b+d*M+p*_,this[6]=l*b+c*M+m*_,this[7]=o*b+f*M+v*_,this[8]=h*y+u*T+g*R,this[9]=n*y+d*T+p*R,this[10]=l*y+c*T+m*R,this[11]=o*y+f*T+v*R,i!==this&&(this[12]=i[12],this[13]=i[13],this[14]=i[14],this[15]=i[15])),this}scale(t,e=this){var i;let s,r,a;return s=(i="number"==typeof t?[t,t,t]:t)[0],r=i[1],a=i[2],this[0]=e[0]*s,this[1]=e[1]*s,this[2]=e[2]*s,this[3]=e[3]*s,this[4]=e[4]*r,this[5]=e[5]*r,this[6]=e[6]*r,this[7]=e[7]*r,this[8]=e[8]*a,this[9]=e[9]*a,this[10]=e[10]*a,this[11]=e[11]*a,this[12]=e[12],this[13]=e[13],this[14]=e[14],this[15]=e[15],this}add(t,e){return e?N(this,t,e):N(this,this,t),this}sub(t,e){return e?k(this,t,e):k(this,this,t),this}multiply(t,e){if(t.length)e?D(this,t,e):D(this,this,t);else this[0]=this[0]*t,this[1]=this[1]*t,this[2]=this[2]*t,this[3]=this[3]*t,this[4]=this[4]*t,this[5]=this[5]*t,this[6]=this[6]*t,this[7]=this[7]*t,this[8]=this[8]*t,this[9]=this[9]*t,this[10]=this[10]*t,this[11]=this[11]*t,this[12]=this[12]*t,this[13]=this[13]*t,this[14]=this[14]*t,this[15]=this[15]*t;return this}identity(){return this[0]=1,this[1]=0,this[2]=0,this[3]=0,this[4]=0,this[5]=1,this[6]=0,this[7]=0,this[8]=0,this[9]=0,this[10]=1,this[11]=0,this[12]=0,this[13]=0,this[14]=0,this[15]=1,this}copy(t){return this[0]=t[0],this[1]=t[1],this[2]=t[2],this[3]=t[3],this[4]=t[4],this[5]=t[5],this[6]=t[6],this[7]=t[7],this[8]=t[8],this[9]=t[9],this[10]=t[10],this[11]=t[11],this[12]=t[12],this[13]=t[13],this[14]=t[14],this[15]=t[15],this}fromPerspective({fov:t,aspect:e,near:i,far:s}={}){let r,a;return r=1/Math.tan(t/2),a=1/(i-s),this[0]=r/e,this[1]=0,this[2]=0,this[3]=0,this[4]=0,this[5]=r,this[6]=0,this[7]=0,this[8]=0,this[9]=0,this[10]=(s+i)*a,this[11]=-1,this[12]=0,this[13]=0,this[14]=2*s*i*a,this[15]=0,this}fromOrthogonal({left:t,right:e,bottom:i,top:s,near:r,far:a}){let h,n,l;return h=1/(t-e),n=1/(i-s),l=1/(r-a),this[0]=-2*h,this[1]=0,this[2]=0,this[3]=0,this[4]=0,this[5]=-2*n,this[6]=0,this[7]=0,this[8]=0,this[9]=0,this[10]=2*l,this[11]=0,this[12]=(t+e)*h,this[13]=(s+i)*n,this[14]=(a+r)*l,this[15]=1,this}fromQuaternion(t){let e,i,s,r,a,h,n,l,o,u,d,c,f,g,p,m;return e=t[0],i=t[1],s=t[2],r=t[3],a=e+e,h=i+i,n=s+s,l=e*a,o=i*a,u=i*h,d=s*a,c=s*h,f=s*n,g=r*a,p=r*h,m=r*n,this[0]=1-u-f,this[1]=o+m,this[2]=d-p,this[3]=0,this[4]=o-m,this[5]=1-l-f,this[6]=c+g,this[7]=0,this[8]=d+p,this[9]=c-g,this[10]=1-l-u,this[11]=0,this[12]=0,this[13]=0,this[14]=0,this[15]=1,this}setPosition(t){return this.x=t[0],this.y=t[1],this.z=t[2],this}inverse(t=this){let e,i,s,r,a,h,n,l,o,u,d,c,f,g,p,m,v,x,E,w,b,M,_,y,T,R,A,F,S;return e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],h=t[5],n=t[6],l=t[7],o=t[8],u=t[9],d=t[10],c=t[11],f=t[12],g=t[13],p=t[14],m=t[15],v=e*h-i*a,x=e*n-s*a,E=e*l-r*a,w=i*n-s*h,b=i*l-r*h,M=s*l-r*n,_=o*g-u*f,y=o*p-d*f,T=o*m-c*f,R=u*p-d*g,A=u*m-c*g,(S=v*(F=d*m-c*p)-x*A+E*R+w*T-b*y+M*_)&&(S=1/S,this[0]=(h*F-n*A+l*R)*S,this[1]=(s*A-i*F-r*R)*S,this[2]=(g*M-p*b+m*w)*S,this[3]=(d*b-u*M-c*w)*S,this[4]=(n*T-a*F-l*y)*S,this[5]=(e*F-s*T+r*y)*S,this[6]=(p*E-f*M-m*x)*S,this[7]=(o*M-d*E+c*x)*S,this[8]=(a*A-h*T+l*_)*S,this[9]=(i*T-e*A-r*_)*S,this[10]=(f*b-g*E+m*v)*S,this[11]=(u*E-o*b-c*v)*S,this[12]=(h*y-a*R-n*_)*S,this[13]=(e*R-i*y+s*_)*S,this[14]=(g*x-f*w-p*v)*S,this[15]=(o*w-u*x+d*v)*S),this}compose(t,e,i){let s,r,a,h,n,l,o,u,d,c,f,g,p,m,v,x,E,w,b;return s=t[0],r=t[1],a=t[2],h=t[3],n=s+s,l=r+r,o=a+a,u=s*n,d=s*l,c=s*o,f=r*l,g=r*o,p=a*o,m=h*n,v=h*l,x=h*o,E=i[0],w=i[1],b=i[2],this[0]=(1-(f+p))*E,this[1]=(d+x)*E,this[2]=(c-v)*E,this[3]=0,this[4]=(d-x)*w,this[5]=(1-(u+p))*w,this[6]=(g+m)*w,this[7]=0,this[8]=(c+v)*b,this[9]=(g-m)*b,this[10]=(1-(u+f))*b,this[11]=0,this[12]=e[0],this[13]=e[1],this[14]=e[2],this[15]=1,this}decompose(t,e,i){let s,r,a,n,l,o,u;return s=h([this[0],this[1],this[2]]),r=h([this[4],this[5],this[6]]),a=h([this[8],this[9],this[10]]),0>C(this)&&(s=-s),e[0]=this[12],e[1]=this[13],e[2]=this[14],n=this.slice(),l=1/s,o=1/r,u=1/a,n[0]*=l,n[1]*=l,n[2]*=l,n[4]*=o,n[5]*=o,n[6]*=o,n[8]*=u,n[9]*=u,n[10]*=u,B(t,n),i[0]=s,i[1]=r,i[2]=a,this}getRotation(t){return B(t,this),this}getTranslation(t){return t[0]=this[12],t[1]=this[13],t[2]=this[14],this}getScaling(t){return P(t,this),this}getMaxScaleOnAxis(){let t,e,i,s,r,a,h,n,l;return t=this[0],e=this[1],i=this[2],s=this[4],r=this[5],a=this[6],h=this[8],Math.sqrt(Math.max(t*t+e*e+i*i,s*s+r*r+a*a,h*h+(n=this[9])*n+(l=this[10])*l))}lookAt(t,e,i){let s,r,a,h,n,l,o,u,d,c,f,g,p;return s=t[0],r=t[1],a=t[2],h=i[0],n=i[1],l=i[2],o=s-e[0],0==(c=o*o+(u=r-e[1])*u+(d=a-e[2])*d)?d=1:(o*=c=1/Math.sqrt(c),u*=c,d*=c),0==(c=(f=n*d-l*u)*f+(g=l*o-h*d)*g+(p=h*u-n*o)*p)&&(l?h+=1e-6:n?l+=1e-6:n+=1e-6,c=(f=n*d-l*u)*f+(g=l*o-h*d)*g+(p=h*u-n*o)*p),f*=c=1/Math.sqrt(c),g*=c,p*=c,this[0]=f,this[1]=g,this[2]=p,this[3]=0,this[4]=u*p-d*g,this[5]=d*f-o*p,this[6]=o*g-u*f,this[7]=0,this[8]=o,this[9]=u,this[10]=d,this[11]=0,this[12]=s,this[13]=r,this[14]=a,this[15]=1,this}determinant(){return C(this)}fromArray(t,e=0){return this[0]=t[e],this[1]=t[e+1],this[2]=t[e+2],this[3]=t[e+3],this[4]=t[e+4],this[5]=t[e+5],this[6]=t[e+6],this[7]=t[e+7],this[8]=t[e+8],this[9]=t[e+9],this[10]=t[e+10],this[11]=t[e+11],this[12]=t[e+12],this[13]=t[e+13],this[14]=t[e+14],this[15]=t[e+15],this}toArray(t=[],e=0){return t[e]=this[0],t[e+1]=this[1],t[e+2]=this[2],t[e+3]=this[3],t[e+4]=this[4],t[e+5]=this[5],t[e+6]=this[6],t[e+7]=this[7],t[e+8]=this[8],t[e+9]=this[9],t[e+10]=this[10],t[e+11]=this[11],t[e+12]=this[12],t[e+13]=this[13],t[e+14]=this[14],t[e+15]=this[15],t}}let I=new L;class O extends Array{constructor(t=0,e=t,i=t,s="YXZ"){super(t,e,i),this.order=s,this.onChange=()=>{},this._target=this;let r=["0","1","2"];return new Proxy(this,{set(t,e){let i=Reflect.set(...arguments);return i&&r.includes(e)&&t.onChange(),i}})}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}set x(t){this._target[0]=t,this.onChange()}set y(t){this._target[1]=t,this.onChange()}set z(t){this._target[2]=t,this.onChange()}set(t,e=t,i=t){return t.length?this.copy(t):(this._target[0]=t,this._target[1]=e,this._target[2]=i,this.onChange(),this)}copy(t){return this._target[0]=t[0],this._target[1]=t[1],this._target[2]=t[2],this.onChange(),this}reorder(t){return this._target.order=t,this.onChange(),this}fromRotationMatrix(t,e=this.order){return!function(t,e,i="YXZ"){"XYZ"===i?(t[1]=Math.asin(Math.min(Math.max(e[8],-1),1)),.99999>Math.abs(e[8])?(t[0]=Math.atan2(-e[9],e[10]),t[2]=Math.atan2(-e[4],e[0])):(t[0]=Math.atan2(e[6],e[5]),t[2]=0)):"YXZ"===i?(t[0]=Math.asin(-Math.min(Math.max(e[9],-1),1)),.99999>Math.abs(e[9])?(t[1]=Math.atan2(e[8],e[10]),t[2]=Math.atan2(e[1],e[5])):(t[1]=Math.atan2(-e[2],e[0]),t[2]=0)):"ZXY"===i?(t[0]=Math.asin(Math.min(Math.max(e[6],-1),1)),.99999>Math.abs(e[6])?(t[1]=Math.atan2(-e[2],e[10]),t[2]=Math.atan2(-e[4],e[5])):(t[1]=0,t[2]=Math.atan2(e[1],e[0]))):"ZYX"===i?(t[1]=Math.asin(-Math.min(Math.max(e[2],-1),1)),.99999>Math.abs(e[2])?(t[0]=Math.atan2(e[6],e[10]),t[2]=Math.atan2(e[1],e[0])):(t[0]=0,t[2]=Math.atan2(-e[4],e[5]))):"YZX"===i?(t[2]=Math.asin(Math.min(Math.max(e[1],-1),1)),.99999>Math.abs(e[1])?(t[0]=Math.atan2(-e[9],e[5]),t[1]=Math.atan2(-e[2],e[0])):(t[0]=0,t[1]=Math.atan2(e[8],e[10]))):"XZY"===i&&(t[2]=Math.asin(-Math.min(Math.max(e[4],-1),1)),.99999>Math.abs(e[4])?(t[0]=Math.atan2(e[6],e[5]),t[1]=Math.atan2(e[8],e[0])):(t[0]=Math.atan2(-e[9],e[10]),t[1]=0))}(this._target,t,e),this.onChange(),this}fromQuaternion(t,e=this.order,i){return I.fromQuaternion(t),this._target.fromRotationMatrix(I,e),i||this.onChange(),this}fromArray(t,e=0){return this._target[0]=t[e],this._target[1]=t[e+1],this._target[2]=t[e+2],this}toArray(t=[],e=0){return t[e]=this[0],t[e+1]=this[1],t[e+2]=this[2],t}}class U{constructor(){this.parent=null,this.children=[],this.visible=!0,this.matrix=new L,this.worldMatrix=new L,this.matrixAutoUpdate=!0,this.worldMatrixNeedsUpdate=!1,this.position=new m,this.quaternion=new S,this.scale=new m(1),this.rotation=new O,this.up=new m(0,1,0),this.rotation._target.onChange=()=>this.quaternion.fromEuler(this.rotation,!0),this.quaternion._target.onChange=()=>this.rotation.fromQuaternion(this.quaternion,void 0,!0)}setParent(t,e=!0){this.parent&&t!==this.parent&&this.parent.removeChild(this,!1),this.parent=t,e&&t&&t.addChild(this,!1)}addChild(t,e=!0){~this.children.indexOf(t)||this.children.push(t),e&&t.setParent(this,!1)}removeChild(t,e=!0){~this.children.indexOf(t)&&this.children.splice(this.children.indexOf(t),1),e&&t.setParent(null,!1)}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.worldMatrixNeedsUpdate||t)&&(null===this.parent?this.worldMatrix.copy(this.matrix):this.worldMatrix.multiply(this.parent.worldMatrix,this.matrix),this.worldMatrixNeedsUpdate=!1,t=!0);for(let e=0,i=this.children.length;e<i;e++)this.children[e].updateMatrixWorld(t)}updateMatrix(){this.matrix.compose(this.quaternion,this.position,this.scale),this.worldMatrixNeedsUpdate=!0}traverse(t){if(!t(this))for(let e=0,i=this.children.length;e<i;e++)this.children[e].traverse(t)}decompose(){this.matrix.decompose(this.quaternion._target,this.position,this.scale),this.rotation.fromQuaternion(this.quaternion)}lookAt(t,e=!1){e?this.matrix.lookAt(this.position,t,this.up):this.matrix.lookAt(t,this.position,this.up),this.matrix.getRotation(this.quaternion._target),this.rotation.fromQuaternion(this.quaternion)}}function z(t,e,i){let s=e[0],r=e[1],a=e[2],h=e[3],n=e[4],l=e[5],o=e[6],u=e[7],d=e[8],c=i[0],f=i[1],g=i[2],p=i[3],m=i[4],v=i[5],x=i[6],E=i[7],w=i[8];return t[0]=c*s+f*h+g*o,t[1]=c*r+f*n+g*u,t[2]=c*a+f*l+g*d,t[3]=p*s+m*h+v*o,t[4]=p*r+m*n+v*u,t[5]=p*a+m*l+v*d,t[6]=x*s+E*h+w*o,t[7]=x*r+E*n+w*u,t[8]=x*a+E*l+w*d,t}class G extends Array{constructor(t=1,e=0,i=0,s=0,r=1,a=0,h=0,n=0,l=1){return super(t,e,i,s,r,a,h,n,l),this}set(t,e,i,s,r,a,h,n,l){return t.length?this.copy(t):(this[0]=t,this[1]=e,this[2]=i,this[3]=s,this[4]=r,this[5]=a,this[6]=h,this[7]=n,this[8]=l,this)}translate(t,e=this){let i,s,r,a,h,n,l,o,u,d,c;return i=e[0],s=e[1],r=e[2],a=e[3],h=e[4],n=e[5],l=e[6],o=e[7],u=e[8],d=t[0],c=t[1],this[0]=i,this[1]=s,this[2]=r,this[3]=a,this[4]=h,this[5]=n,this[6]=d*i+c*a+l,this[7]=d*s+c*h+o,this[8]=d*r+c*n+u,this}rotate(t,e=this){let i,s,r,a,h,n,l,o,u,d,c;return i=e[0],s=e[1],r=e[2],a=e[3],h=e[4],n=e[5],l=e[6],o=e[7],u=e[8],d=Math.sin(t),c=Math.cos(t),this[0]=c*i+d*a,this[1]=c*s+d*h,this[2]=c*r+d*n,this[3]=c*a-d*i,this[4]=c*h-d*s,this[5]=c*n-d*r,this[6]=l,this[7]=o,this[8]=u,this}scale(t,e=this){let i,s;return i=t[0],s=t[1],this[0]=i*e[0],this[1]=i*e[1],this[2]=i*e[2],this[3]=s*e[3],this[4]=s*e[4],this[5]=s*e[5],this[6]=e[6],this[7]=e[7],this[8]=e[8],this}multiply(t,e){return e?z(this,t,e):z(this,this,t),this}identity(){return this[0]=1,this[1]=0,this[2]=0,this[3]=0,this[4]=1,this[5]=0,this[6]=0,this[7]=0,this[8]=1,this}copy(t){return this[0]=t[0],this[1]=t[1],this[2]=t[2],this[3]=t[3],this[4]=t[4],this[5]=t[5],this[6]=t[6],this[7]=t[7],this[8]=t[8],this}fromMatrix4(t){return this[0]=t[0],this[1]=t[1],this[2]=t[2],this[3]=t[4],this[4]=t[5],this[5]=t[6],this[6]=t[8],this[7]=t[9],this[8]=t[10],this}fromQuaternion(t){let e,i,s,r,a,h,n,l,o,u,d,c,f,g,p,m;return e=t[0],i=t[1],s=t[2],r=t[3],a=e+e,h=i+i,n=s+s,l=e*a,o=i*a,u=i*h,d=s*a,c=s*h,f=s*n,g=r*a,p=r*h,m=r*n,this[0]=1-u-f,this[3]=o-m,this[6]=d+p,this[1]=o+m,this[4]=1-l-f,this[7]=c-g,this[2]=d-p,this[5]=c+g,this[8]=1-l-u,this}fromBasis(t,e,i){return this.set(t[0],t[1],t[2],e[0],e[1],e[2],i[0],i[1],i[2]),this}inverse(t=this){let e,i,s,r,a,h,n,l,o,u,d,c,f;return e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],h=t[5],n=t[6],l=t[7],(f=e*(u=(o=t[8])*a-h*l)+i*(d=-o*r+h*n)+s*(c=l*r-a*n))&&(f=1/f,this[0]=u*f,this[1]=(-o*i+s*l)*f,this[2]=(h*i-s*a)*f,this[3]=d*f,this[4]=(o*e-s*n)*f,this[5]=(-h*e+s*r)*f,this[6]=c*f,this[7]=(-l*e+i*n)*f,this[8]=(a*e-i*r)*f),this}getNormalMatrix(t){let e,i,s,r,a,h,n,l,o,u,d,c,f,g,p,m,v,x,E,w,b,M,_,y,T,R,A,F,S;return e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],h=t[5],n=t[6],l=t[7],o=t[8],u=t[9],d=t[10],c=t[11],f=t[12],g=t[13],p=t[14],m=t[15],v=e*h-i*a,x=e*n-s*a,E=e*l-r*a,w=i*n-s*h,b=i*l-r*h,M=s*l-r*n,_=o*g-u*f,y=o*p-d*f,T=o*m-c*f,R=u*p-d*g,A=u*m-c*g,(S=v*(F=d*m-c*p)-x*A+E*R+w*T-b*y+M*_)&&(S=1/S,this[0]=(h*F-n*A+l*R)*S,this[1]=(n*T-a*F-l*y)*S,this[2]=(a*A-h*T+l*_)*S,this[3]=(s*A-i*F-r*R)*S,this[4]=(e*F-s*T+r*y)*S,this[5]=(i*T-e*A-r*_)*S,this[6]=(g*M-p*b+m*w)*S,this[7]=(p*E-f*M-m*x)*S,this[8]=(f*b-g*E+m*v)*S),this}}let q=0;class H extends U{constructor(t,{geometry:e,program:i,mode:s=t.TRIANGLES,frustumCulled:r=!0,renderOrder:a=0}={}){super(),t.canvas||console.error("gl not passed as first argument to Mesh"),this.gl=t,this.id=q++,this.geometry=e,this.program=i,this.mode=s,this.frustumCulled=r,this.renderOrder=a,this.modelViewMatrix=new L,this.normalMatrix=new G,this.beforeRenderCallbacks=[],this.afterRenderCallbacks=[]}onBeforeRender(t){return this.beforeRenderCallbacks.push(t),this}onAfterRender(t){return this.afterRenderCallbacks.push(t),this}draw({camera:t}={}){t&&(this.program.uniforms.modelMatrix||Object.assign(this.program.uniforms,{modelMatrix:{value:null},viewMatrix:{value:null},modelViewMatrix:{value:null},normalMatrix:{value:null},projectionMatrix:{value:null},cameraPosition:{value:null}}),this.program.uniforms.projectionMatrix.value=t.projectionMatrix,this.program.uniforms.cameraPosition.value=t.worldPosition,this.program.uniforms.viewMatrix.value=t.viewMatrix,this.modelViewMatrix.multiply(t.viewMatrix,this.worldMatrix),this.normalMatrix.getNormalMatrix(this.modelViewMatrix),this.program.uniforms.modelMatrix.value=this.worldMatrix,this.program.uniforms.modelViewMatrix.value=this.modelViewMatrix,this.program.uniforms.normalMatrix.value=this.normalMatrix),this.beforeRenderCallbacks.forEach(e=>e&&e({mesh:this,camera:t}));let e=this.program.cullFace&&0>this.worldMatrix.determinant();this.program.use({flipFaces:e}),this.geometry.draw({mode:this.mode,program:this.program}),this.afterRenderCallbacks.forEach(e=>e&&e({mesh:this,camera:t}))}}let X=new m,V=1,W=1,Y=!1;class j{constructor(t,e={}){for(let i in t.canvas||console.error("gl not passed as first argument to Geometry"),this.gl=t,this.attributes=e,this.id=V++,this.VAOs={},this.drawRange={start:0,count:0},this.instancedCount=0,this.gl.renderer.bindVertexArray(null),this.gl.renderer.currentGeometry=null,this.glState=this.gl.renderer.state,e)this.addAttribute(i,e[i])}addAttribute(t,e){if(this.attributes[t]=e,e.id=W++,e.size=e.size||1,e.type=e.type||(e.data.constructor===Float32Array?this.gl.FLOAT:e.data.constructor===Uint16Array?this.gl.UNSIGNED_SHORT:this.gl.UNSIGNED_INT),e.target="index"===t?this.gl.ELEMENT_ARRAY_BUFFER:this.gl.ARRAY_BUFFER,e.normalized=e.normalized||!1,e.stride=e.stride||0,e.offset=e.offset||0,e.count=e.count||(e.stride?e.data.byteLength/e.stride:e.data.length/e.size),e.divisor=e.instanced||0,e.needsUpdate=!1,e.usage=e.usage||this.gl.STATIC_DRAW,e.buffer||this.updateAttribute(e),e.divisor){if(this.isInstanced=!0,this.instancedCount&&this.instancedCount!==e.count*e.divisor)return console.warn("geometry has multiple instanced buffers of different length"),this.instancedCount=Math.min(this.instancedCount,e.count*e.divisor);this.instancedCount=e.count*e.divisor}else"index"===t?this.drawRange.count=e.count:this.attributes.index||(this.drawRange.count=Math.max(this.drawRange.count,e.count))}updateAttribute(t){let e=!t.buffer;e&&(t.buffer=this.gl.createBuffer()),this.glState.boundBuffer!==t.buffer&&(this.gl.bindBuffer(t.target,t.buffer),this.glState.boundBuffer=t.buffer),e?this.gl.bufferData(t.target,t.data,t.usage):this.gl.bufferSubData(t.target,0,t.data),t.needsUpdate=!1}setIndex(t){this.addAttribute("index",t)}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}setInstancedCount(t){this.instancedCount=t}createVAO(t){this.VAOs[t.attributeOrder]=this.gl.renderer.createVertexArray(),this.gl.renderer.bindVertexArray(this.VAOs[t.attributeOrder]),this.bindAttributes(t)}bindAttributes(t){t.attributeLocations.forEach((t,{name:e,type:i})=>{if(!this.attributes[e])return void console.warn(`active attribute ${e} not being supplied`);let s=this.attributes[e];this.gl.bindBuffer(s.target,s.buffer),this.glState.boundBuffer=s.buffer;let r=1;35674===i&&(r=2),35675===i&&(r=3),35676===i&&(r=4);let a=s.size/r,h=1===r?0:r*r*4,n=1===r?0:4*r;for(let e=0;e<r;e++)this.gl.vertexAttribPointer(t+e,a,s.type,s.normalized,s.stride+h,s.offset+e*n),this.gl.enableVertexAttribArray(t+e),this.gl.renderer.vertexAttribDivisor(t+e,s.divisor)}),this.attributes.index&&this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.attributes.index.buffer)}draw({program:t,mode:e=this.gl.TRIANGLES}){this.gl.renderer.currentGeometry!==`${this.id}_${t.attributeOrder}`&&(this.VAOs[t.attributeOrder]||this.createVAO(t),this.gl.renderer.bindVertexArray(this.VAOs[t.attributeOrder]),this.gl.renderer.currentGeometry=`${this.id}_${t.attributeOrder}`),t.attributeLocations.forEach((t,{name:e})=>{let i=this.attributes[e];i.needsUpdate&&this.updateAttribute(i)});let i=2;this.attributes.index?.type===this.gl.UNSIGNED_INT&&(i=4),this.isInstanced?this.attributes.index?this.gl.renderer.drawElementsInstanced(e,this.drawRange.count,this.attributes.index.type,this.attributes.index.offset+this.drawRange.start*i,this.instancedCount):this.gl.renderer.drawArraysInstanced(e,this.drawRange.start,this.drawRange.count,this.instancedCount):this.attributes.index?this.gl.drawElements(e,this.drawRange.count,this.attributes.index.type,this.attributes.index.offset+this.drawRange.start*i):this.gl.drawArrays(e,this.drawRange.start,this.drawRange.count)}getPosition(){let t=this.attributes.position;return t.data?t:Y?void 0:(console.warn("No position buffer data found to compute bounds"),Y=!0)}computeBoundingBox(t){t||(t=this.getPosition());let e=t.data,i=t.size;this.bounds||(this.bounds={min:new m,max:new m,center:new m,scale:new m,radius:1/0});let s=this.bounds.min,r=this.bounds.max,a=this.bounds.center,h=this.bounds.scale;s.set(1/0),r.set(-1/0);for(let t=0,a=e.length;t<a;t+=i){let i=e[t],a=e[t+1],h=e[t+2];s.x=Math.min(i,s.x),s.y=Math.min(a,s.y),s.z=Math.min(h,s.z),r.x=Math.max(i,r.x),r.y=Math.max(a,r.y),r.z=Math.max(h,r.z)}h.sub(r,s),a.add(s,r).divide(2)}computeBoundingSphere(t){t||(t=this.getPosition());let e=t.data,i=t.size;this.bounds||this.computeBoundingBox(t);let s=0;for(let t=0,r=e.length;t<r;t+=i)X.fromArray(e,t),s=Math.max(s,this.bounds.center.squaredDistance(X));this.bounds.radius=Math.sqrt(s)}remove(){for(let t in this.VAOs)this.gl.renderer.deleteVertexArray(this.VAOs[t]),delete this.VAOs[t];for(let t in this.attributes)this.gl.deleteBuffer(this.attributes[t].buffer),delete this.attributes[t]}}class K extends j{constructor(t,{attributes:e={}}={}){Object.assign(e,{position:{size:2,data:new Float32Array([-1,-1,3,-1,-1,3])},uv:{size:2,data:new Float32Array([0,0,2,0,0,2])}}),super(t,e)}}let Z=new Uint8Array(4),$=1;class Q{constructor(t,{image:e,target:i=t.TEXTURE_2D,type:s=t.UNSIGNED_BYTE,format:r=t.RGBA,internalFormat:a=r,wrapS:h=t.CLAMP_TO_EDGE,wrapT:n=t.CLAMP_TO_EDGE,wrapR:l=t.CLAMP_TO_EDGE,generateMipmaps:o=i===(t.TEXTURE_2D||t.TEXTURE_CUBE_MAP),minFilter:u=o?t.NEAREST_MIPMAP_LINEAR:t.LINEAR,magFilter:d=t.LINEAR,premultiplyAlpha:c=!1,unpackAlignment:f=4,flipY:g=i==(t.TEXTURE_2D||t.TEXTURE_3D),anisotropy:p=0,level:m=0,width:v,height:x=v,length:E=1}={}){this.gl=t,this.id=$++,this.image=e,this.target=i,this.type=s,this.format=r,this.internalFormat=a,this.minFilter=u,this.magFilter=d,this.wrapS=h,this.wrapT=n,this.wrapR=l,this.generateMipmaps=o,this.premultiplyAlpha=c,this.unpackAlignment=f,this.flipY=g,this.anisotropy=Math.min(p,this.gl.renderer.parameters.maxAnisotropy),this.level=m,this.width=v,this.height=x,this.length=E,this.texture=this.gl.createTexture(),this.store={image:null},this.glState=this.gl.renderer.state,this.state={},this.state.minFilter=this.gl.NEAREST_MIPMAP_LINEAR,this.state.magFilter=this.gl.LINEAR,this.state.wrapS=this.gl.REPEAT,this.state.wrapT=this.gl.REPEAT,this.state.anisotropy=0}bind(){this.glState.textureUnits[this.glState.activeTextureUnit]!==this.id&&(this.gl.bindTexture(this.target,this.texture),this.glState.textureUnits[this.glState.activeTextureUnit]=this.id)}update(t=0){let e=!(this.image===this.store.image&&!this.needsUpdate);if((e||this.glState.textureUnits[t]!==this.id)&&(this.gl.renderer.activeTexture(t),this.bind()),e){if(this.needsUpdate=!1,this.flipY!==this.glState.flipY&&(this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,this.flipY),this.glState.flipY=this.flipY),this.premultiplyAlpha!==this.glState.premultiplyAlpha&&(this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,this.premultiplyAlpha),this.glState.premultiplyAlpha=this.premultiplyAlpha),this.unpackAlignment!==this.glState.unpackAlignment&&(this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT,this.unpackAlignment),this.glState.unpackAlignment=this.unpackAlignment),this.minFilter!==this.state.minFilter&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_MIN_FILTER,this.minFilter),this.state.minFilter=this.minFilter),this.magFilter!==this.state.magFilter&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_MAG_FILTER,this.magFilter),this.state.magFilter=this.magFilter),this.wrapS!==this.state.wrapS&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_S,this.wrapS),this.state.wrapS=this.wrapS),this.wrapT!==this.state.wrapT&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_T,this.wrapT),this.state.wrapT=this.wrapT),this.wrapR!==this.state.wrapR&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_R,this.wrapR),this.state.wrapR=this.wrapR),this.anisotropy&&this.anisotropy!==this.state.anisotropy&&(this.gl.texParameterf(this.target,this.gl.renderer.getExtension("EXT_texture_filter_anisotropic").TEXTURE_MAX_ANISOTROPY_EXT,this.anisotropy),this.state.anisotropy=this.anisotropy),this.image){if(this.image.width&&(this.width=this.image.width,this.height=this.image.height),this.target===this.gl.TEXTURE_CUBE_MAP)for(let t=0;t<6;t++)this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+t,this.level,this.internalFormat,this.format,this.type,this.image[t]);else if(ArrayBuffer.isView(this.image))this.target===this.gl.TEXTURE_2D?this.gl.texImage2D(this.target,this.level,this.internalFormat,this.width,this.height,0,this.format,this.type,this.image):(this.target===this.gl.TEXTURE_2D_ARRAY||this.target===this.gl.TEXTURE_3D)&&this.gl.texImage3D(this.target,this.level,this.internalFormat,this.width,this.height,this.length,0,this.format,this.type,this.image);else if(this.image.isCompressedTexture)for(let t=0;t<this.image.length;t++)this.gl.compressedTexImage2D(this.target,t,this.internalFormat,this.image[t].width,this.image[t].height,0,this.image[t].data);else this.target===this.gl.TEXTURE_2D?this.gl.texImage2D(this.target,this.level,this.internalFormat,this.format,this.type,this.image):this.gl.texImage3D(this.target,this.level,this.internalFormat,this.width,this.height,this.length,0,this.format,this.type,this.image);if(this.generateMipmaps){var i,s;this.gl.renderer.isWebgl2||((i=this.image.width)&i-1)==0&&((s=this.image.height)&s-1)==0?this.gl.generateMipmap(this.target):(this.generateMipmaps=!1,this.wrapS=this.wrapT=this.gl.CLAMP_TO_EDGE,this.minFilter=this.gl.LINEAR)}this.onUpdate&&this.onUpdate()}else if(this.target===this.gl.TEXTURE_CUBE_MAP)for(let t=0;t<6;t++)this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,this.gl.RGBA,1,1,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,Z);else this.width?this.target===this.gl.TEXTURE_2D?this.gl.texImage2D(this.target,this.level,this.internalFormat,this.width,this.height,0,this.format,this.type,null):this.gl.texImage3D(this.target,this.level,this.internalFormat,this.width,this.height,this.length,0,this.format,this.type,null):this.gl.texImage2D(this.target,0,this.gl.RGBA,1,1,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,Z);this.store.image=this.image}}}class J{constructor(t,{width:e=t.canvas.width,height:i=t.canvas.height,target:s=t.FRAMEBUFFER,color:r=1,depth:a=!0,stencil:h=!1,depthTexture:n=!1,wrapS:l=t.CLAMP_TO_EDGE,wrapT:o=t.CLAMP_TO_EDGE,wrapR:u=t.CLAMP_TO_EDGE,minFilter:d=t.LINEAR,magFilter:c=d,type:f=t.UNSIGNED_BYTE,format:g=t.RGBA,internalFormat:p=g,unpackAlignment:m,premultiplyAlpha:v}={}){this.gl=t,this.width=e,this.height=i,this.depth=a,this.stencil=h,this.buffer=this.gl.createFramebuffer(),this.target=s,this.gl.renderer.bindFramebuffer(this),this.textures=[];let x=[];for(let s=0;s<r;s++)this.textures.push(new Q(t,{width:e,height:i,wrapS:l,wrapT:o,wrapR:u,minFilter:d,magFilter:c,type:f,format:g,internalFormat:p,unpackAlignment:m,premultiplyAlpha:v,flipY:!1,generateMipmaps:!1})),this.textures[s].update(),this.gl.framebufferTexture2D(this.target,this.gl.COLOR_ATTACHMENT0+s,this.gl.TEXTURE_2D,this.textures[s].texture,0),x.push(this.gl.COLOR_ATTACHMENT0+s);x.length>1&&this.gl.renderer.drawBuffers(x),this.texture=this.textures[0],n&&(this.gl.renderer.isWebgl2||this.gl.renderer.getExtension("WEBGL_depth_texture"))?(this.depthTexture=new Q(t,{width:e,height:i,minFilter:this.gl.NEAREST,magFilter:this.gl.NEAREST,format:this.stencil?this.gl.DEPTH_STENCIL:this.gl.DEPTH_COMPONENT,internalFormat:t.renderer.isWebgl2?this.stencil?this.gl.DEPTH24_STENCIL8:this.gl.DEPTH_COMPONENT16:this.gl.DEPTH_COMPONENT,type:this.stencil?this.gl.UNSIGNED_INT_24_8:this.gl.UNSIGNED_INT}),this.depthTexture.update(),this.gl.framebufferTexture2D(this.target,this.stencil?this.gl.DEPTH_STENCIL_ATTACHMENT:this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.texture,0)):(a&&!h&&(this.depthBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_COMPONENT16,e,i),this.gl.framebufferRenderbuffer(this.target,this.gl.DEPTH_ATTACHMENT,this.gl.RENDERBUFFER,this.depthBuffer)),h&&!a&&(this.stencilBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.stencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.STENCIL_INDEX8,e,i),this.gl.framebufferRenderbuffer(this.target,this.gl.STENCIL_ATTACHMENT,this.gl.RENDERBUFFER,this.stencilBuffer)),a&&h&&(this.depthStencilBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthStencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_STENCIL,e,i),this.gl.framebufferRenderbuffer(this.target,this.gl.DEPTH_STENCIL_ATTACHMENT,this.gl.RENDERBUFFER,this.depthStencilBuffer))),this.gl.renderer.bindFramebuffer({target:this.target})}setSize(t,e){if(this.width!==t||this.height!==e){this.width=t,this.height=e,this.gl.renderer.bindFramebuffer(this);for(let i=0;i<this.textures.length;i++)this.textures[i].width=t,this.textures[i].height=e,this.textures[i].needsUpdate=!0,this.textures[i].update(),this.gl.framebufferTexture2D(this.target,this.gl.COLOR_ATTACHMENT0+i,this.gl.TEXTURE_2D,this.textures[i].texture,0);this.depthTexture?(this.depthTexture.width=t,this.depthTexture.height=e,this.depthTexture.needsUpdate=!0,this.depthTexture.update(),this.gl.framebufferTexture2D(this.target,this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.texture,0)):(this.depthBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_COMPONENT16,t,e)),this.stencilBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.stencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.STENCIL_INDEX8,t,e)),this.depthStencilBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthStencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_STENCIL,t,e))),this.gl.renderer.bindFramebuffer({target:this.target})}}}let tt={plasma:{color:"#F25BD0",strands:6,crackle:.85,flares:.65,glow:.9,sparks:.6,particleCount:15e3,fill:.5,motion:"rise",particleShape:"square",depth:.6,sway:.5,twinkle:.5,haze:.7,dustSpeed:1},aurora:{color:"#5CFFC8",strands:5,crackle:.6,flares:.5,glow:.8,sparks:.45,particleCount:15e3,fill:.5,motion:"rise",particleShape:"square",depth:.6,sway:.5,twinkle:.5,haze:.7,dustSpeed:1},nebula:{color:"#9478FF",strands:6,crackle:1,flares:.5,glow:.9,sparks:.6,particleCount:18e3,fill:.45,motion:"rise",particleShape:"square",depth:.5,sway:.4,twinkle:.6,haze:.8,dustSpeed:1.2},ember:{color:"#FF8A2A",strands:5,crackle:.9,flares:.8,glow:1,sparks:.8,particleCount:12e3,fill:.35,motion:"rise",particleShape:"round",depth:.7,sway:.3,twinkle:.7,haze:.9,dustSpeed:1.6},frost:{color:"#BFE6FF",strands:3,crackle:.3,flares:.3,glow:.6,sparks:.2,particleCount:16e3,fill:.6,motion:"fall",particleShape:"round",depth:.8,sway:.4,twinkle:.4,haze:.5,dustSpeed:.7},solar:{color:"#FFD36E",strands:6,crackle:.7,flares:1,glow:1.1,sparks:.5,particleCount:15e3,fill:.55,motion:"orbit",particleShape:"square",depth:.6,sway:.7,twinkle:.5,haze:.8,dustSpeed:1},eclipse:{color:"#FFFFFF",strands:4,crackle:.5,flares:.4,glow:.7,sparks:.35,particleCount:14e3,fill:.5,motion:"drift",particleShape:"square",depth:.7,sway:.5,twinkle:.5,haze:.5,dustSpeed:.8},abyss:{color:"#3F7BFF",strands:5,crackle:.55,flares:.6,glow:.9,sparks:.4,particleCount:2e4,fill:.8,motion:"orbit",particleShape:"round",depth:.8,sway:.8,twinkle:.5,haze:.6,dustSpeed:.9}},te={rise:0,fall:1,drift:2,orbit:3},ti={square:0,round:1},ts=[1,1,1],tr=[0,0,0],ta=(t,e,i)=>Math.min(Math.max(t,e),i),th=(t,e,i)=>{let s=ta((i-t)/(e-t),0,1);return s*s*(3-2*s)},tn=t=>1-Math.pow(1-t,3),tl=(t,e,i)=>t.map((t,s)=>t+(e[s]-t)*i),to=t=>t-2*Math.PI*Math.floor((t+Math.PI)/(2*Math.PI)),tu=t=>t<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4),td=t=>{let[e,i,s]=t.map(tu),r=Math.cbrt(.4122214708*e+.5363325363*i+.0514459929*s),a=Math.cbrt(.2119034982*e+.6806995451*i+.1073969566*s),h=Math.cbrt(.0883024619*e+.2817188376*i+.6299787005*s);return[.2104542553*r+.793617785*a-.0040720468*h,1.9779984951*r-2.428592205*a+.4505937099*h,.0259040371*r+.7827717662*a-.808675766*h]},tc=([t,e,i])=>{let s=Math.pow(t+.3963377774*e+.2158037573*i,3),r=Math.pow(t-.1055613458*e-.0638541728*i,3),a=Math.pow(t-.0894841775*e-1.291485548*i,3);return[4.0767416621*s-3.3077115913*r+.2309699292*a,-1.2684380046*s+2.6097574011*r-.3413193965*a,-.0041960863*s-.7034186147*r+1.707614701*a].map(t=>{let e;return ta((e=ta(t,0,1))<=.0031308?12.92*e:1.055*Math.pow(e,1/2.4)-.055,0,1)})},tf=(t,e,i)=>tc(tl(td(t),td(e),i)),tg=(t,e,i,s)=>{let[r,a,h]=td(t),n=Math.hypot(a,h)*s,l=Math.atan2(h,a)+e*Math.PI/180;return tc([ta(r+i,0,1),n*Math.cos(l),n*Math.sin(l)])},tp=(t,e,i,s)=>{let[,r,a]=td(t),h=Math.max(Math.hypot(r,a)*s,.02),n=Math.atan2(a,r)+e*Math.PI/180;return tc([ta(i,0,1),h*Math.cos(n),h*Math.sin(n)])},tm=t=>{let e=t>>>0;return()=>{let t=e=e+0x6d2b79f5>>>0;return t=Math.imul(t^t>>>15,1|t),(((t^=t+Math.imul(t^t>>>7,61|t))^t>>>14)>>>0)/0x100000000}},tv=`#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,tx=`
uint scramble(uint v) {
  v = v * 747796405u + 2891336453u;
  uint w = ((v >> ((v >> 28u) + 4u)) ^ v) * 277803737u;
  return (w >> 22u) ^ w;
}

float random(uint v) {
  return float(scramble(v)) * (1.0 / 4294967295.0);
}
`,tE=`
uniform float uDustTime;
uniform vec2 uTurn;
uniform float uMotion;
uniform float uFill;

vec3 settle(vec3 p, out float spread) {
  float bend = exp2((0.5 - uFill) * 1.8);
  float h = clamp((p.y + 1.0) * 0.5, 0.0, 1.0);
  float y = 2.0 * pow(h, bend) - 1.0;
  float from = sqrt(max(1.0 - p.y * p.y, 1e-4));
  float to = sqrt(max(1.0 - y * y, 0.0));
  spread = clamp(bend * pow(max(h, 1e-3), bend - 1.0) * to / from, 0.25, 1.0);
  return vec3(p.xz * (to / from), y).xzy;
}

vec3 drift(vec4 home, vec4 seed, uint id, out float life, out float spread) {
  vec3 p = settle(home.xyz, spread);
  float t = uDustTime;
  float u = fract(t / seed.z + seed.y);
  life = sin(3.14159265 * u);
  float travel = seed.w;
  if (uMotion < 0.5) {
    p.y += travel * (u - 0.5);
  } else if (uMotion < 1.5) {
    p.y -= travel * (u - 0.5);
  } else if (uMotion < 2.5) {
    p += 0.045 * vec3(
      sin(t * 0.37 + seed.y * 17.0) + 0.5 * sin(t * 0.83 + seed.z * 5.0),
      sin(t * 0.29 + seed.z * 11.0) + 0.5 * sin(t * 0.61 + seed.w * 7.0),
      sin(t * 0.33 + seed.w * 23.0)
    );
  } else {
    float loop = t * (0.6 + 0.9 * random(id * 7u + 3u)) * (random(id * 7u + 10u) < 0.5 ? -1.0 : 1.0) + seed.y * 6.2831853;
    p.xy += (0.025 + 0.05 * random(id * 7u + 16u)) * vec2(cos(loop), sin(loop));
  }
  float wobble = 0.002 + 0.006 * random(id * 7u + 1u);
  float w1 = 0.8 + 2.4 * random(id * 7u + 2u);
  float w2 = 0.8 + 2.4 * random(id * 7u + 4u);
  p += wobble * vec3(sin(t * w1 + seed.y * 40.0), cos(t * w2 + seed.z * 30.0), sin(t * (w1 + w2) * 0.5 + seed.w * 20.0));
  float cy = cos(uTurn.x);
  float sy = sin(uTurn.x);
  p.xz = mat2(cy, -sy, sy, cy) * p.xz;
  float cx = cos(uTurn.y);
  float sx = sin(uTurn.y);
  p.yz = mat2(cx, -sx, sx, cx) * p.yz;
  return p;
}
`,tw=`#version 300 es
precision highp float;

uniform vec2 uCenter;
uniform float uRadius;
uniform float uDpr;
uniform float uLine;
uniform float uTime;
uniform float uFrame;
uniform float uBins;
uniform float uStrands;
uniform float uCrackle;
uniform float uFlares;
uniform float uGlow;
uniform float uHaze;
uniform float uFill;
uniform float uPresence;
uniform float uUnfold;
uniform float uBloom;
uniform float uInside;
uniform float uEncode;
uniform vec3 uRim;
uniform vec3 uRimHot;
uniform vec3 uRimMid;
uniform vec3 uRimDeep;
uniform vec3 uSpark;
uniform vec3 uSparkGlow;
uniform vec3 uHazeColor;
uniform vec3 uEdgeColor;
uniform vec4 uHeat;
uniform vec4 uHarmonics[8];
uniform vec4 uRates[8];
uniform vec4 uPhases[8];
uniform vec4 uFlareHarmonics[8];
uniform vec4 uFlareRates[8];
uniform vec4 uFlarePhases[8];
uniform vec4 uArcs[4];

out vec4 fragColor;
${tx}
const float PI = 3.14159265;
const float TAU = 6.28318531;
const vec4 AMPS = vec4(0.35, 0.3, 0.22, 0.13);

float bell(float d, float w) {
  float x = d / w;
  return exp(-x * x);
}

float segment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-5), 0.0, 1.0);
  return length(pa - ba * h);
}

float pool(vec2 q) {
  float t = length(q - vec2(0.0, mix(-1.0, -0.66, uFill))) / mix(0.8, 1.35, uFill);
  return t < 0.6 ? mix(0.5, 0.22, t / 0.6) : mix(0.22, 0.0, clamp((t - 0.6) / 0.4, 0.0, 1.0));
}

void main() {
  vec2 p = gl_FragCoord.xy / uDpr - uCenter;
  float r = length(p);
  float R = uRadius;
  float theta = atan(p.y, p.x);
  float lift = p.y / max(r, 1e-3);
  float topDim = 1.0 - 0.35 * pow(max(lift, 0.0), 1.5);
  vec3 col = vec3(0.0);
  float hot = 0.0;
  uint frame = uint(uFrame);

  if (r < R) {
    vec2 q = p / R;
    float chord = sqrt(max(1.0 - dot(q, q), 0.0));
    float haze = pool(q) * (0.55 + 0.45 * chord);
    col += uHazeColor * haze * uHaze * uInside;
    float e = length(q - vec2(0.0, 0.2)) / 1.2;
    float edge = 0.5 * pow(smoothstep(0.62, 1.0, e), 1.4);
    col += uEdgeColor * edge * uInside * (0.5 + 0.5 * uHaze);
  }

  float dr = r - R;
  float halo = 1.0 - smoothstep(R * 0.05, R * 0.105, abs(dr - R * 0.0213));
  col += uRimDeep * 0.18 * halo * topDim * uGlow * uBloom;
  col += uRim * 0.12 * bell(dr + R * 0.0383, R * 0.032) * uGlow * uBloom;
  col += uRim * 0.32 * bell(dr, max(R * 0.0117, uLine)) * uPresence * uUnfold;

  float delta = mod(theta - uHeat.x + PI, TAU) - PI;
  float heat = uHeat.z * uHeat.y * exp(-delta * delta / 0.3);
  float crackle = uCrackle + heat * 0.9;
  float amp = R * 0.016 * (0.3 + 1.4 * crackle) * uUnfold;
  float jitterAmp = R * 0.0048 * (0.3 + 1.4 * uCrackle) * uUnfold * (1.0 + heat * 0.3);
  float flareAmp = R * 0.064 * (0.4 + 1.2 * crackle) * uFlares * 1.6 * uUnfold;

  if (abs(dr) < amp * 2.0 + flareAmp + R * 0.3) {
    float step = TAU / uBins;
    float binPos = (theta + PI) / step;
    float bin0 = floor(binPos);
    float binF = binPos - bin0;
    float th0 = bin0 * step - PI;
    float th1 = th0 + step;
    uint b0 = uint(mod(bin0, uBins));
    uint b1 = uint(mod(bin0 + 1.0, uBins));
    float gain = min(1.0, 2.4 / max(uStrands, 1.0));
    for (int k = 0; k < 8; k++) {
      if (float(k) >= uStrands) break;
      vec4 m = uHarmonics[k];
      vec4 lead = uRates[k] * uTime + uPhases[k];
      float wave0 = dot(AMPS, sin(m * th0 + lead));
      float wave1 = dot(AMPS, sin(m * th1 + lead));
      uint salt = uint(k) * 1013u + frame * 7919u;
      vec4 shape = uFlareHarmonics[k];
      vec4 look = uFlareRates[k];
      vec4 tone = uFlarePhases[k];
      float a = amp * shape.w;
      float off0 = a * wave0 + jitterAmp * (random(b0 + salt) - 0.5);
      float off1 = a * wave1 + jitterAmp * (random(b1 + salt) - 0.5);
      float rc = R + mix(off0, off1, binF);
      float grade = (off1 - off0) / (step * max(r, 1.0));
      float d = abs(r - rc) * inversesqrt(1.0 + grade * grade);
      float swell = 0.8 + 0.4 * (0.5 + 0.5 * sin(3.0 * theta + uTime * 0.7 + tone.x * 1.7));
      float width = uLine * look.w * swell * (1.0 + heat * 0.25);
      float core = exp(-d * d / (width * width));
      float sheath = exp(-d * d / (width * width * 3.0));
      float bright = tone.w * (1.0 + heat * 0.45) * uPresence;
      col += (uRimHot * core * 0.8 + uRim * sheath * 0.32) * bright;
      hot += core * bright;
      vec3 fargs = shape.xyz * theta + look.xyz * uTime + tone.xyz;
      float flare = max(0.0, (sin(fargs.x) + sin(fargs.y) + sin(fargs.z)) / 3.0);
      flare = (flare * flare + heat * 0.35) * flareAmp;
      float dw = abs(r - rc - flare);
      float dm = abs(r - rc - flare * 0.6);
      float dn = abs(r - rc - flare * 0.25);
      vec3 glow = uRimDeep * (0.07 * bell(dw, R * 0.09) + 0.16 * bell(dw, R * 0.05));
      glow += uRimMid * 0.28 * bell(dm, R * 0.027) + uRim * 0.38 * bell(dn, R * 0.013);
      col += glow * gain * topDim * uGlow * uBloom * (1.0 + heat * 1.4);
    }
  }

  for (int i = 0; i < 4; i++) {
    vec4 arc = uArcs[i];
    if (arc.w <= 0.002) continue;
    float mid = arc.x + arc.y * 0.5;
    vec2 center = R * 0.93 * vec2(cos(mid), sin(mid));
    if (distance(p, center) > R * (abs(arc.y) * 0.6 + 0.1) + 12.0) continue;
    float ar = R * 0.955;
    vec2 a0 = ar * vec2(cos(arc.x), sin(arc.x));
    vec2 a2 = ar * vec2(cos(arc.x + arc.y), sin(arc.x + arc.y));
    vec2 a1 = R * (0.955 - arc.z) * vec2(cos(mid), sin(mid));
    float dmin = 1e5;
    float along = 0.0;
    vec2 prev = a0;
    for (int s = 1; s <= 10; s++) {
      float u = float(s) / 10.0;
      vec2 b = mix(mix(a0, a1, u), mix(a1, a2, u), u);
      vec2 pa = p - prev;
      vec2 ba = b - prev;
      float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-5), 0.0, 1.0);
      float dist = length(pa - ba * h);
      if (dist < dmin) {
        dmin = dist;
        along = (float(s) - 1.0 + h) / 10.0;
      }
      prev = b;
    }
    float taper = sqrt(max(sin(PI * along), 0.0));
    float arcWidth = uLine * (0.55 + 0.6 * taper);
    float arcCore = exp(-dmin * dmin / (arcWidth * arcWidth));
    float arcGlow = exp(-dmin * dmin / (arcWidth * arcWidth * 12.0));
    col += (uSpark * 0.95 * arcCore + uSparkGlow * 0.4 * arcGlow) * arc.w * taper;
    hot += arcCore * arc.w * taper * 0.6;
  }

  fragColor = vec4(col, hot) * uEncode;
}
`,tb=`#version 300 es
precision highp float;

in float aIndex;

uniform sampler2D tHome;
uniform sampler2D tSeed;
uniform sampler2D tOffset;
uniform float uStirred;
uniform vec2 uCenter;
uniform vec2 uViewport;
uniform float uRadius;
uniform float uDpr;
uniform float uDepth;
uniform float uTwinkle;
uniform float uPointScale;
uniform float uReveal;
uniform float uEncode;
uniform vec3 uTones[5];
uniform vec3 uRimTone;

out vec3 vColor;
out float vSize;
${tx}
${tE}
void main() {
  ivec2 cell = ivec2(int(mod(aIndex, 256.0)), int(floor(aIndex / 256.0)));
  uint id = uint(aIndex);
  vec4 home = texelFetch(tHome, cell, 0);
  vec4 seed = texelFetch(tSeed, cell, 0);
  float life;
  float spread;
  vec3 p = drift(home, seed, id, life, spread);
  if (uStirred > 0.5) p += texelFetch(tOffset, cell, 0).xyz;
  float len = length(p);
  float inside = 1.0 - smoothstep(0.955, 0.985, length(p.xy));
  if (len > 0.975) p *= 0.975 / len;

  float front = p.z * 0.5 + 0.5;
  float depthSize = mix(1.0, 0.7 + 0.6 * front, uDepth);
  float depthLight = mix(1.0, 0.35 + 0.8 * front, uDepth);
  float blink = sin(uDustTime * (2.0 + 6.0 * random(id * 7u + 5u)) + random(id * 7u + 6u) * 6.2831853);
  float twinkle = mix(1.0, smoothstep(-0.9, -0.6, blink), uTwinkle);
  float fade = smoothstep(0.04, 0.12, life);
  float order = (home.y + 1.0) * 0.5 * 0.55 + random(id * 7u + 8u) * 0.25;
  float reveal = smoothstep(order, order + 0.2, uReveal * 1.0);
  float alpha = random(id * 7u + 9u) < 0.5 || home.w > 3.5 ? 1.0 : 0.6;

  float size = seed.x * uPointScale * (0.35 + 0.95 * life) * depthSize * mix(0.5, 1.0, reveal);
  vec2 screen = uCenter + p.xy * uRadius;
  gl_Position = vec4(screen / uViewport * 2.0 - 1.0, 0.0, 1.0);
  float px = size * uDpr;
  gl_PointSize = px + 2.0;
  vSize = px;

  int tone = int(home.w + 0.5);
  float rimLit = smoothstep(0.8, 0.97, length(p.xy));
  vec3 color = uTones[tone] + uRimTone * rimLit * rimLit * 0.12;
  vColor = color * alpha * fade * twinkle * depthLight * reveal * inside * sqrt(spread) * uEncode;
}
`,tM=`#version 300 es
precision highp float;

uniform float uShape;

in vec3 vColor;
in float vSize;

out vec4 fragColor;

void main() {
  vec2 q = (gl_PointCoord - 0.5) * (vSize + 2.0);
  float half_ = max(vSize * 0.5, 0.5);
  float cover;
  if (uShape < 0.5) {
    vec2 c = clamp(half_ - abs(q) + 0.5, 0.0, 1.0);
    cover = c.x * c.y;
  } else {
    cover = clamp(half_ - length(q) + 0.5, 0.0, 1.0);
  }
  if (cover <= 0.0) discard;
  fragColor = vec4(vColor * cover, 0.0);
}
`,t_=`#version 300 es
precision highp float;

uniform sampler2D tHome;
uniform sampler2D tSeed;
uniform sampler2D tOffset;
uniform sampler2D tVelocity;
uniform float uDt;
uniform float uReset;
uniform vec4 uBrush;
uniform float uBrushPower;
uniform vec4 uKick;

layout(location = 0) out vec4 outOffset;
layout(location = 1) out vec4 outVelocity;
${tx}
${tE}
vec3 swirl(vec3 p) {
  float t = uDustTime * 0.15;
  vec3 a = vec3(1.7, 1.9, 1.5) * p.yzx + vec3(t, 1.2, 2.1);
  vec3 b = vec3(2.3, 2.1, 2.7) * p.zxy + vec3(0.4, t * 1.3, 0.9);
  vec3 ca = cos(a) * vec3(1.7, 1.9, 1.5);
  vec3 cb = cos(b) * vec3(2.3, 2.1, 2.7);
  return vec3(ca.z - cb.x, cb.y - ca.x, ca.y - cb.z);
}

void main() {
  ivec2 cell = ivec2(gl_FragCoord.xy);
  if (uReset > 0.5) {
    outOffset = vec4(0.0);
    outVelocity = vec4(0.0);
    return;
  }
  uint id = uint(cell.y * 256 + cell.x);
  vec4 home = texelFetch(tHome, cell, 0);
  vec4 seed = texelFetch(tSeed, cell, 0);
  vec3 o = texelFetch(tOffset, cell, 0).xyz;
  vec3 v = texelFetch(tVelocity, cell, 0).xyz;
  float life;
  float spread;
  vec3 base = drift(home, seed, id, life, spread);
  vec3 p = base + o;

  float k = mix(0.8, 2.2, random(id * 7u + 11u));
  vec3 acc = -k * o - 1.5 * sqrt(k) * v;

  vec2 gap = p.xy - uBrush.xy;
  float touch = exp(-dot(gap, gap) / 0.07) * uBrushPower;
  acc += (vec3(uBrush.zw, 0.0) - v) * touch * 14.0;
  float pace = length(v);
  if (pace > 1e-4) {
    vec3 heading = v / pace;
    vec3 curl = swirl(p * 1.6);
    acc += (curl - heading * dot(curl, heading)) * min(pace, 2.0) * 1.8;
  }

  if (uKick.z > 0.0) {
    vec3 jolt = vec3(random(id * 7u + 12u), random(id * 7u + 13u), random(id * 7u + 14u)) - 0.5;
    float near = exp(-dot(p.xy - uKick.xy, p.xy - uKick.xy) / 0.4);
    vec3 spinKick = vec3(-p.z, 0.0, p.x) * 0.9;
    vec3 lift = vec3(0.0, 0.5 + 0.8 * random(id * 7u + 15u), 0.0) * (0.3 + 0.7 * smoothstep(0.2, -0.8, p.y));
    v += (jolt * 0.8 + spinKick + lift) * uKick.z * (0.4 + 0.45 * near);
  }

  v += acc * uDt;
  o += v * uDt;
  vec3 q = base + o;
  float len = length(q);
  if (len > 0.97) {
    vec3 n = q / len;
    o -= n * (len - 0.97);
    v -= n * max(dot(v, n), 0.0) * 1.5;
  }
  outOffset = vec4(o, 1.0);
  outVelocity = vec4(v, 1.0);
}
`,ty=`#version 300 es
precision highp float;

uniform sampler2D tScene;
uniform float uLight;
uniform float uDecode;

in vec2 vUv;
out vec4 fragColor;

vec3 soften(vec3 x) {
  vec3 over = max(x - 0.6, 0.0);
  return min(x, 0.6) + 0.4 * (1.0 - exp(-over / 0.4));
}

void main() {
  vec4 scene = texture(tScene, vUv) * uDecode;
  vec3 light = max(scene.rgb, 0.0);
  float peak = max(light.r, max(light.g, light.b));
  if (uLight > 0.5) {
    vec3 hue = light / max(peak, 1e-4);
    float cover = 1.0 - exp(-peak * 2.4);
    vec3 ink = hue * mix(0.92, 0.72, cover);
    float core = clamp(scene.a * 0.7, 0.0, 1.0) * cover;
    vec3 tint = mix(vec3(1.0), hue, 0.22);
    fragColor = vec4(tint * core + ink * cover * (1.0 - core), core + cover * (1.0 - core));
    return;
  }
  light += vec3(max(peak - 1.8, 0.0) * 0.25);
  vec3 shown = soften(light);
  fragColor = vec4(shown, max(shown.r, max(shown.g, shown.b)));
}
`;t.s(["default",0,({preset:t="plasma",color:e,theme:i="dark",size:s=.7,strands:h,crackle:n,flares:l,glow:o,sparks:u,particleCount:d,fill:c,motion:f,particleShape:g,depth:p,sway:m,twinkle:v,haze:x,speed:w=1,dustSpeed:b,interactive:_=!0,hoverStrength:y=.7,intro:T=!0,paused:R=!1,className:A="",style:F})=>{let S=(0,a.useRef)(null),C=(0,a.useRef)(null),D=(0,a.useRef)(null),P=tt[t]||tt.plasma,B=(t,e)=>null==t?P[e]:t,N=B(e,"color"),k=(0,a.useMemo)(()=>{let t="light"===i;return{light:t,palette:((t,e)=>{if(e){let e=tp(t,0,Math.min(td(t)[0],.62),1.15);return{rim:e,rimHot:e,rimMid:e,rimDeep:tp(t,0,.72,.8),spark:tp(t,0,.6,1.2),sparkGlow:tp(t,0,.78,.8),haze:tp(t,0,.8,.6),edge:tp(t,0,.72,.8),tones:[tp(t,0,.56,1.1),tp(t,16,.6,1.05),tp(t,-16,.5,1.1),tp(t,0,.66,.9),tp(t,0,.74,.7)]}}return{rim:t,rimHot:tl(t,ts,.72),rimMid:tl(t,tr,.15),rimDeep:tl(t,tr,.45),spark:tl(t,ts,.45),sparkGlow:tg(t,0,-.15,1),haze:tl(t,tr,.6),edge:tg(t,0,-.3,.9),tones:[tg(t,0,-.06,1),tg(t,16,-.02,1),tg(t,-16,-.12,1.05),tg(tf(t,ts,.25),0,.04,1),tf(t,ts,.7)]}})(((t,e)=>{try{let i=document.createElement("canvas").getContext("2d");if(!i)return e;i.fillStyle="#000000",i.fillStyle=t;let s=i.fillStyle;if(s.startsWith("#")){let t=parseInt(s.slice(1),16);return[(t>>16&255)/255,(t>>8&255)/255,(255&t)/255]}let r=s.match(/[\d.]+/g);if(!r||r.length<3)return e;return[Number(r[0])/255,Number(r[1])/255,Number(r[2])/255]}catch{return e}})(N,[.95,.36,.82]),t)}},[N,i]);return(0,a.useEffect)(()=>{C.current={...k,size:s,strands:B(h,"strands"),crackle:B(n,"crackle"),flares:B(l,"flares"),glow:B(o,"glow"),sparks:B(u,"sparks"),particleCount:B(d,"particleCount"),fill:B(c,"fill"),motion:B(f,"motion"),particleShape:B(g,"particleShape"),depth:B(p,"depth"),sway:B(m,"sway"),twinkle:B(v,"twinkle"),haze:B(x,"haze"),dustSpeed:B(b,"dustSpeed"),speed:w,interactive:_,hoverStrength:y,intro:T,paused:R},D.current?.()}),(0,a.useEffect)(()=>{let t=S.current;if(!t)return;let e=new E({alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1}),i=e.gl;if(!e.isWebgl2)return void i.getExtension("WEBGL_lose_context")?.loseContext();let s=i.canvas;s.style.display="block",s.style.width="100%",s.style.height="100%",s.setAttribute("aria-hidden","true"),t.appendChild(s);let r=!!i.getExtension("EXT_color_buffer_float"),a=r||!!i.getExtension("EXT_color_buffer_half_float"),h=a?1:.25,n=new K(i),l=new Q(i),o=(()=>{let t=tm(99),e=[[6,12,.6,1.6],[18,34,1.5,3.5],[40,70,3,7],[80,130,6,12]],i={harmonics:[],rates:[],phases:[],flareHarmonics:[],flareRates:[],flarePhases:[]};for(let s=0;s<8;s++){e.forEach(([e,s,r,a])=>{i.harmonics.push(Math.round(e+t()*(s-e))),i.rates.push((r+t()*(a-r))*(.5>t()?-1:1)),i.phases.push(t()*Math.PI*2)});for(let e=0;e<3;e++)i.flareHarmonics.push(4+Math.floor(6*t())),i.flareRates.push((.4+.8*t())*(.5>t()?-1:1)),i.flarePhases.push(t()*Math.PI*2);let r=0===s;i.flareHarmonics.push(r?.75:.95+.3*t()),i.flareRates.push(r?1.15:.8+.2*t()),i.flarePhases.push(r?1:.7+.25*t())}return i})(),u=new J(i,{width:1,height:1,depth:!1,type:a?i.HALF_FLOAT:i.UNSIGNED_BYTE,format:i.RGBA,internalFormat:a?i.RGBA16F:i.RGBA,minFilter:i.NEAREST,magFilter:i.NEAREST}),d=Array(16).fill(0),c={uCenter:{value:[0,0]},uRadius:{value:1},uDpr:{value:1},uLine:{value:.6},uTime:{value:0},uFrame:{value:0},uBins:{value:420},uStrands:{value:5},uCrackle:{value:.6},uFlares:{value:.5},uGlow:{value:.8},uHaze:{value:.7},uFill:{value:.5},uPresence:{value:0},uUnfold:{value:0},uBloom:{value:0},uInside:{value:0},uEncode:{value:h},uRim:{value:[1,1,1]},uRimHot:{value:[1,1,1]},uRimMid:{value:[1,1,1]},uRimDeep:{value:[1,1,1]},uSpark:{value:[1,1,1]},uSparkGlow:{value:[1,1,1]},uHazeColor:{value:[0,0,0]},uEdgeColor:{value:[0,0,0]},uHeat:{value:[0,0,0,0]},uHarmonics:{value:o.harmonics},uRates:{value:o.rates},uPhases:{value:o.phases},uFlareHarmonics:{value:o.flareHarmonics},uFlareRates:{value:o.flareRates},uFlarePhases:{value:o.flarePhases},uArcs:{value:d}},f={uDustTime:{value:0},uTurn:{value:[0,0]},uMotion:{value:0},uFill:c.uFill,tHome:{value:l},tSeed:{value:l}},g={...f,tOffset:{value:l},uStirred:{value:0},uCenter:c.uCenter,uViewport:{value:[1,1]},uRadius:c.uRadius,uDpr:c.uDpr,uDepth:{value:.6},uTwinkle:{value:.5},uPointScale:{value:1},uReveal:{value:0},uEncode:{value:h},uTones:{value:Array(15).fill(1)},uRimTone:{value:[1,1,1]},uShape:{value:0}},p={...f,tOffset:{value:l},tVelocity:{value:l},uDt:{value:.016},uReset:{value:1},uBrush:{value:[0,0,0,0]},uBrushPower:{value:0},uKick:{value:[0,0,0,0]}},m={tScene:{value:u.texture},uLight:{value:0},uDecode:{value:1/h}},v=t=>(t.setBlendFunc(i.ONE,i.ONE),t),x=new H(i,{geometry:n,program:v(new M(i,{vertex:tv,fragment:tw,uniforms:c,transparent:!0,depthTest:!1,depthWrite:!1}))}),w=v(new M(i,{vertex:tb,fragment:tM,uniforms:g,transparent:!0,depthTest:!1,depthWrite:!1})),b=a?new H(i,{geometry:n,program:new M(i,{vertex:tv,fragment:t_,uniforms:p,depthTest:!1,depthWrite:!1})}):null,_=new H(i,{geometry:n,program:new M(i,{vertex:tv,fragment:ty,uniforms:m,depthTest:!1,depthWrite:!1})}),y=t=>{t&&(i.deleteFramebuffer(t.buffer),t.textures.forEach(t=>i.deleteTexture(t.texture)))},T=t=>new J(i,{width:256,height:t,color:2,depth:!1,type:r?i.FLOAT:i.HALF_FLOAT,format:i.RGBA,internalFormat:r?i.RGBA32F:i.RGBA16F,minFilter:i.NEAREST,magFilter:i.NEAREST}),R=(t,e)=>new Q(i,{image:t,width:256,height:e,type:i.FLOAT,format:i.RGBA,internalFormat:i.RGBA32F,minFilter:i.NEAREST,magFilter:i.NEAREST,generateMipmaps:!1,flipY:!1}),A=null,F=()=>{A&&(A.mesh.geometry.remove(),i.deleteTexture(A.home.texture),i.deleteTexture(A.seed.texture),y(A.read),y(A.write),A=null)},P=()=>{b&&A&&A.read&&A.write&&(p.tOffset.value=l,p.tVelocity.value=l,p.uReset.value=1,e.render({scene:b,target:A.read,clear:!1}),e.render({scene:b,target:A.write,clear:!1}),p.uReset.value=0)},B=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,N=tm(913),k=1,L=1,I=0,O=performance.now(),U=0,z=0,G=0,q=0,X=!0,V=!0,W=0,Y=0,Z=0,$=null,tt=.3,ts=[],tr={x:0,y:0,inside:!1,fresh:!0},tl={angle:0,velocity:0,power:0,near:0},tu={x:0,y:0,vx:0,vy:0},td={x:0,y:0,vx:0,vy:0},tc=()=>{k=Math.max(1,t.clientWidth),L=Math.max(1,t.clientHeight),e.dpr=Math.min(window.devicePixelRatio||1,2,Math.sqrt(45e5/(k*L))),e.setSize(k,L),u.setSize(i.canvas.width,i.canvas.height),tp()},tf=(t,e)=>{ts.length>=4||ts.push({start:t,span:(.05+.07*N())*(.5>N()?-1:1),curl:.02+.04*N(),life:0,duration:.2+.2*N(),drift:(N()-.5)*.3,strength:e})},tg=t=>{if(I=0,!V)return;let s=C.current,r=Math.min(.05,Math.max(1/240,(t-O)/1e3));if(O=t,!s)return;let a=!s.paused&&!B,h=tn(th(0,.42,q=s.intro&&!B?Math.min(1,q+r/2.2):1)),n=tn(th(0,.32,q)),o=.35*Math.sin(Math.PI*th(.22,.78,q)),v=Math.max(8,ta(s.size,.1,1.5)*Math.min(k,L)/2),E=s.interactive&&!B?ta(s.hoverStrength,0,1):0,M=tr.x-k/2,y=L/2-tr.y,S=Math.hypot(M,y),D=tr.inside?E:0;tl.power<.02&&(tl.angle=Math.atan2(y,M),tl.velocity=0);let K=to(Math.atan2(y,M)-tl.angle);tl.velocity+=(120*K-19*tl.velocity)*r,tl.angle=to(tl.angle+tl.velocity*r),tl.power+=(D-tl.power)*(1-Math.exp(-r/(D>tl.power?.3:.55)));let Q=Math.exp(-Math.pow((S-v)/(.45*v),2));tl.near+=(Q-tl.near)*(1-Math.exp(-r/.15)),W*=Math.exp(-r/.7);let J=M/v,tc=y/v;Math.hypot(J-tu.x,tc-tu.y)>.6&&(tr.fresh=!0),tr.fresh&&(tu.x=J,tu.y=tc,tu.vx=0,tu.vy=0,tr.fresh=!1);let tp=1-Math.exp(-r/.05);tu.vx+=((J-tu.x)/r-tu.vx)*tp,tu.vy+=((tc-tu.y)/r-tu.vy)*tp,tu.x=J,tu.y=tc;let tv=Math.hypot(tu.vx,tu.vy),tx=tv>4?4/tv:1,tE=Math.exp(-(6*Math.max(0,Math.hypot(J,tc)-1))),tw=tr.inside?E*tE*h:0;if(Z=Z*Math.exp(-r/1.2)+tw*Math.min(tv,4)*r,a){let t=1+.6*W+tl.power*tl.near*.3,e=r*Math.max(0,s.speed)*2*t;U+=e,z+=r*Math.max(0,s.dustSpeed)*(1+.4*W),G+=r*Math.max(0,s.dustSpeed);let i=ta(s.crackle+.5*W,0,1.5);if(s.sparks>.01&&q>.55&&(tt-=e*s.sparks*2*(.6+.6*i))<=0){let t=tl.power*tl.near;tf(N()<.7*t?tl.angle+(N()-.5)*.8:.7>N()?Math.PI/2+(N()-.5)*1.5:N()*Math.PI*2,.8+.6*t+.4*W),tt=.15+.6*N()}for(let t=ts.length-1;t>=0;t--){let i=ts[t];i.life+=e,i.start+=i.drift*e,i.life>=i.duration&&ts.splice(t,1)}}else ts.length=0;for(let t=0;t<4;t++){let e=ts[t];d[4*t]=e?e.start:0,d[4*t+1]=e?e.span:0,d[4*t+2]=e?e.curl:0,d[4*t+3]=e?Math.sin(Math.PI*e.life/e.duration)*e.strength:0}(t=>{let e=ta(100*Math.round(t/100),0,4e4);if(A&&A.requested===e)return;if(F(),!e){A=null;return}let s=(t=>{let e=tm(1337),i=Math.max(1,Math.ceil(t/256)),s=new Float32Array(256*i*4),r=new Float32Array(256*i*4),a=0,h=0;for(;a<t&&h<80*t;){let t,i,n;if(h++,.28>e()){let s=e()*Math.PI*2,r=.87+.105*Math.sqrt(e());if(t=Math.cos(s)*r,i=Math.sin(s)*r,e()>th(-.6,.3,-i))continue;let a=e();n=a<.5?3:a<.8?2:1}else{let s=Math.hypot(t=2*e()-1,i=2*e()-1);if(s>.975)continue;let r=Math.max(Math.pow(th(-.25,.85,-i),1.3),.9*(th(.66,.96,s)*th(-.7,.3,-i)));if(e()>.012+.988*r)continue;if(r<.12)n=4;else{let t=e();n=t<.32?0:t<.52?1:t<.8?2:3}}let l=Math.sqrt(Math.max(0,.95-t*t-i*i));s[4*a]=t,s[4*a+1]=i,s[4*a+2]=(2*e()-1)*l,s[4*a+3]=n,r[4*a]=4===n?1.8:.22>e()?2.1:1.3,r[4*a+1]=e(),r[4*a+2]=2.5+3.5*e(),r[4*a+3]=.16+.26*e(),a++}return{home:s,seed:r,count:a,rows:i}})(e),r=new Float32Array(s.count);for(let t=0;t<s.count;t++)r[t]=t;let a=new j(i,{aIndex:{size:1,data:r}});A={requested:e,rows:s.rows,home:R(s.home,s.rows),seed:R(s.seed,s.rows),mesh:new H(i,{mode:i.POINTS,geometry:a,program:w}),read:b?T(s.rows):null,write:b?T(s.rows):null},f.tHome.value=A.home,f.tSeed.value=A.seed,P(),Y=0})(s.particleCount);let tb=s.palette;c.uCenter.value=[k/2,L/2],c.uRadius.value=v,c.uDpr.value=e.dpr,c.uLine.value=Math.max(.6,.0035*v),c.uTime.value=U,c.uFrame.value=Math.floor(24*U)%1e5,c.uBins.value=ta(Math.round(2*Math.PI*v/2.6),240,900),c.uStrands.value=Math.round(ta(s.strands,1,8)),c.uCrackle.value=ta(s.crackle,0,1)+.5*W+o,c.uFlares.value=ta(s.flares,0,1),c.uGlow.value=ta(s.glow,0,2)*(1+.5*W+o)*(s.light?.35:1),c.uHaze.value=ta(s.haze,0,2)*(s.light?.6:1),c.uFill.value=ta(s.fill,0,1),c.uPresence.value=h,c.uUnfold.value=n,c.uBloom.value=h*h,c.uInside.value=th(.2,.95,q),c.uRim.value=tb.rim,c.uRimHot.value=tb.rimHot,c.uRimMid.value=tb.rimMid,c.uRimDeep.value=tb.rimDeep,c.uSpark.value=tb.spark,c.uSparkGlow.value=tb.sparkGlow,c.uHazeColor.value=tb.haze,c.uEdgeColor.value=tb.edge,c.uHeat.value=[tl.angle,tl.near,tl.power*h,0],f.uDustTime.value=z;let tM=tr.inside?E*h:0,t_=ta(J,-1.6,1.6)*tM,ty=ta(tc,-1.6,1.6)*tM;td.vx+=(40*(t_-td.x)-11*td.vx)*r,td.vy+=(40*(ty-td.y)-11*td.vy)*r,td.x+=td.vx*r,td.y+=td.vy*r;let tT=ta(s.sway,0,1);f.uTurn.value=[.42*tT*Math.sin(.23*G)+.3*td.x,.12*tT*Math.sin(.17*G+1.3)-.16*td.y],f.uMotion.value=te[s.motion]??0,g.uViewport.value=[k,L],g.uDepth.value=ta(s.depth,0,1),g.uTwinkle.value=ta(s.twinkle,0,1),g.uPointScale.value=Math.max(1,v/491),g.uReveal.value=th(.18,1,q),g.uTones.value=tb.tones.flat(),g.uRimTone.value=tb.rim,g.uShape.value=ti[s.particleShape]??0;let tR=A;tR&&b&&(Z>.002||$)&&(Y=7);let tA=!1;if(tR&&tR.read&&tR.write&&b&&Y>0){p.uDt.value=Math.min(r,1/30),p.uBrush.value=[tu.x,tu.y,tu.vx*tx,tu.vy*tx],p.uBrushPower.value=tw,p.uKick.value=$?[$.x,$.y,$.strength,0]:[0,0,0,0],p.tOffset.value=tR.read.textures[0],p.tVelocity.value=tR.read.textures[1],e.render({scene:b,target:tR.write,clear:!1});let t=tR.read;tR.read=tR.write,tR.write=t,Y-=r,(tA=Y>0)||(Y=0,P())}$=null,g.uStirred.value=+!!tA,g.tOffset.value=tR&&tR.read?tR.read.textures[0]:l,i.clearColor(0,0,0,0),e.render({scene:x,target:u,clear:!0}),A&&e.render({scene:A.mesh,target:u,clear:!1}),m.uLight.value=+!!s.light,e.render({scene:_,clear:!1});let tF=Math.abs(D-tl.power)>.002||W>.002||Y>0||Math.abs(tl.velocity)>.01||Math.hypot(td.vx,td.vy,td.x-t_,td.y-ty)>.001;X&&(a||q<1||tF)&&(I=requestAnimationFrame(tg))},tp=()=>{!I&&X&&V&&(O=performance.now(),I=requestAnimationFrame(tg))},tx=e=>{let i=t.getBoundingClientRect(),s=e.clientX-i.left,r=e.clientY-i.top;return{x:s,y:r,inside:s>=0&&r>=0&&s<=i.width&&r<=i.height}},tE=t=>{let e=tx(t);e.inside&&!tr.inside&&(tr.fresh=!0),tr.x=e.x,tr.y=e.y,tr.inside=e.inside,e.inside&&tp()},tT=t=>{let e=C.current,i=tx(t);if(!e||!e.interactive||B||!i.inside)return;tr.inside||(tr.fresh=!0),tr.x=i.x,tr.y=i.y,tr.inside=!0;let s=Math.max(8,ta(e.size,.1,1.5)*Math.min(k,L)/2),r=(i.x-k/2)/s,a=(L/2-i.y)/s;if(Math.hypot(r,a)>1.3)return;let h=ta(e.hoverStrength,0,1);$={x:r,y:a,strength:1.2*h},W=Math.max(W,h);let n=Math.atan2(a,r);tf(n+(N()-.5)*.5,1.3),tf(n+Math.PI+(N()-.5)*1.2,1.1),tp()},tR=()=>{tr.inside=!1,tp()},tA=t=>{t.relatedTarget||tR()},tF=t=>{"touch"===t.pointerType&&tR()},tS=()=>{document.hidden||tp()};window.addEventListener("pointermove",tE,{passive:!0}),window.addEventListener("pointerdown",tT,{passive:!0}),window.addEventListener("pointerout",tA,{passive:!0}),window.addEventListener("pointerup",tF,{passive:!0}),window.addEventListener("blur",tR),document.addEventListener("visibilitychange",tS);let tC=new ResizeObserver(tc);tC.observe(t);let tD=new IntersectionObserver(([t])=>{X=t.isIntersecting,tp()});return tD.observe(t),D.current=tp,tc(),()=>{V=!1,X=!1,cancelAnimationFrame(I),tC.disconnect(),tD.disconnect(),window.removeEventListener("pointermove",tE),window.removeEventListener("pointerdown",tT),window.removeEventListener("pointerout",tA),window.removeEventListener("pointerup",tF),window.removeEventListener("blur",tR),document.removeEventListener("visibilitychange",tS),D.current=null,F(),y(u),i.getExtension("WEBGL_lose_context")?.loseContext(),s.parentNode&&s.parentNode.removeChild(s)}},[]),(0,r.jsx)("div",{ref:S,className:`crystalized-ball ${A}`.trim(),style:F})}],70307)}]);