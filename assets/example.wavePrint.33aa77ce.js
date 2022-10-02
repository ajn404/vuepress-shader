import{C as f,P as m,S as x,D as y,M as u,a as h,b}from"./practice.setup.0dbf3b95.js";import{_ as g,d as z,r as k,n as q,g as C,h as _,i as w}from"./app.d44df62d.js";var i="varying vec3 v_position;uniform float u_time;uniform vec2 u_resolution;void main(){vec2 uv=gl_FragCoord.xy/u_resolution;vec3 col=0.5+0.5*cos(u_time+uv.xyx+vec3(0,2,4));float cd=40.0;float lw=500.0;float a=sin(u_time/20.0)*1.0;float r=ceil(uv.x*cd)+ceil(uv.y*cd);vec3 col2=vec3(sin(((uv.x*lw*sin(r*a))+(uv.y*lw*cos(r*a)))));gl_FragColor=vec4(ceil((0.3-col.rrr-col2)),1.0);}",l="varying vec3 v_position;void main(){v_position=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position*0.4,1.0);}",U=`uniform float u_time;uniform vec2 u_resolution;uniform float u_frame;varying vec3 v_position;varying vec2 vUv;
#define R u_resolution
#define repeat(p,r)(mod(p,r)-r/2.)
mat2 rot(float a){return mat2(cos(a),-sin(a),sin(a),cos(a));}vec3 look(vec3 from,vec3 at,vec2 uv,float fov){vec3 z=normalize(at-from);vec3 x=normalize(cross(z,vec3(0,1,0)));vec3 y=cross(x,z);return normalize(z*fov+uv.x*x+uv.y*y);}const uint k=1103515245U;vec3 hash(uvec3 x){x=((x>>8U)^x.yzx)*k;x=((x>>8U)^x.yzx)*k;x=((x>>8U)^x.yzx)*k;return vec3(x)*(1./float(0xffffffffU));}const float speed=.05;const float falloff=1.75;const float range=.5;const float count=8.;vec3 pp,ppp;float mat,glow;float map(vec3 p){float dist=100.;float shape=100.;vec3 pos=p;pp=p;ppp=p;float px=p.x-u_time*speed;float ix=floor(px);p.x=repeat(px,1.);float a=1.;float angle=196.+ix;for(float i=0.;i<count;++i){p.xz*=rot(angle/a);p=abs(p)-range*a;shape=max(p.x,max(p.y,p.z));mat=shape<dist?i:mat;pp=i==7.?p:pp;ppp=i==6.?p:ppp;dist=min(dist,shape);a/=falloff;}dist=-dist;shape=max(length(pp.xz)-.001,dist-.005);dist=min(dist,shape);shape=max(length(ppp.xy)-.001,dist-.001);glow+=.0001/max(.0005,shape);dist=max(dist,abs(pos.y-.1)-.2);return dist;}float shadow(vec3 pos,vec3 at,float k){vec3 dir=normalize(at-pos);float maxt=length(at-pos);float f=1.;float t=.002;for(float i=0.;i<=1.;i+=1./30.){float dist=map(pos+dir*t);if(dist<.001)return 0.;f=min(f,k*dist/t);t+=dist;if(t>=maxt)break;}return f;}void rect(out vec4 fragColor,in vec2 fragCoord){fragColor=vec4(0.,0.,0.,0.);const float frames=3.;for(float frame=0.;frame<frames;++frame){vec2 uv=fragCoord/R.xy;vec2 p=2.*(fragCoord-R.xy/2.)/R.y;float aa=6.28*frame/frames;p+=vec2(cos(aa),sin(aa))/R.xy;vec3 pos=vec3(.04,-.02,.09);vec3 ray=look(pos,vec3(0,0,0),p,4.);vec3 rng=hash(uvec3(fragCoord,float(u_frame)+frame*196.));glow=0.;mat=0.;float total=0.;float steps=0.;const float count=100.;const float max_dist=4.;for(steps=count;steps>0.;--steps){float dist=map(pos);if(dist<.001*total||total>max_dist)break;dist*=.9+.1*rng.z;total+=dist;pos+=ray*dist;}vec4 result;if(total<max_dist){float shade=steps/count;vec3 sun=normalize(vec3(0,1,.2));vec3 palette=.5+.5*cos(vec3(1,2,3)*5.+pos.z*6.+pos.y*6.);vec3 color=vec3(1.5);color*=sin(mat+1.)*.25+.75;color*=step(.01,ppp.z)*.25+.75;color*=step(pp.y,-.005)*.25+.75;color+=palette*clamp(.1/abs(mat-10.),0.,1.)*.9;color+=palette*glow;color*=shade;color*=.4+.6*shadow(pos,sun,100.);result=vec4(color,1);}else{vec3 color=.5+.5*cos(vec3(1,2,3)*5.+uv.y*2.+2.);result=vec4(color,1);}fragColor+=result/frames;}}void main(){rect(gl_FragColor,vUv*u_resolution.xy);}`,S="varying vec3 v_position;varying vec2 vUv;void main(){vUv=uv;v_position=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position*0.4,1.0);}",M=`uniform vec3 u_color;uniform float u_frame;uniform vec2 u_mouse;uniform vec2 u_resolution;uniform float u_time;varying vec2 vUv;
#define AA 3
float dot2(in vec2 v){return dot(v,v);}float dot2(in vec3 v){return dot(v,v);}float ndot(in vec2 a,in vec2 b){return a.x*b.x-a.y*b.y;}float sdPlane(vec3 p){return p.y;}float sdSphere(vec3 p,float s){return length(p)-s;}float sdBox(vec3 p,vec3 b){vec3 d=abs(p)-b;return min(max(d.x,max(d.y,d.z)),0.0)+length(max(d,0.0));}float sdBoxFrame(vec3 p,vec3 b,float e){p=abs(p)-b;vec3 q=abs(p+e)-e;return min(min(length(max(vec3(p.x,q.y,q.z),0.0))+min(max(p.x,max(q.y,q.z)),0.0),length(max(vec3(q.x,p.y,q.z),0.0))+min(max(q.x,max(p.y,q.z)),0.0)),length(max(vec3(q.x,q.y,p.z),0.0))+min(max(q.x,max(q.y,p.z)),0.0));}float sdEllipsoid(in vec3 p,in vec3 r){float k0=length(p/r);float k1=length(p/(r*r));return k0*(k0-1.0)/k1;}float sdTorus(vec3 p,vec2 t){return length(vec2(length(p.xz)-t.x,p.y))-t.y;}float sdCappedTorus(in vec3 p,in vec2 sc,in float ra,in float rb){p.x=abs(p.x);float k=(sc.y*p.x>sc.x*p.y)? dot(p.xy,sc): length(p.xy);return sqrt(dot(p,p)+ra*ra-2.0*ra*k)-rb;}float sdHexPrism(vec3 p,vec2 h){vec3 q=abs(p);const vec3 k=vec3(-0.8660254,0.5,0.57735);p=abs(p);p.xy-=2.0*min(dot(k.xy,p.xy),0.0)*k.xy;vec2 d=vec2(length(p.xy-vec2(clamp(p.x,-k.z*h.x,k.z*h.x),h.x))*sign(p.y-h.x),p.z-h.y);return min(max(d.x,d.y),0.0)+length(max(d,0.0));}float sdOctogonPrism(in vec3 p,in float r,float h){const vec3 k=vec3(-0.9238795325,0.3826834323,0.4142135623);p=abs(p);p.xy-=2.0*min(dot(vec2(k.x,k.y),p.xy),0.0)*vec2(k.x,k.y);p.xy-=2.0*min(dot(vec2(-k.x,k.y),p.xy),0.0)*vec2(-k.x,k.y);p.xy-=vec2(clamp(p.x,-k.z*r,k.z*r),r);vec2 d=vec2(length(p.xy)*sign(p.y),p.z-h);return min(max(d.x,d.y),0.0)+length(max(d,0.0));}float sdCapsule(vec3 p,vec3 a,vec3 b,float r){vec3 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/dot(ba,ba),0.0,1.0);return length(pa-ba*h)-r;}float sdRoundCone(in vec3 p,in float r1,float r2,float h){vec2 q=vec2(length(p.xz),p.y);float b=(r1-r2)/h;float a=sqrt(1.0-b*b);float k=dot(q,vec2(-b,a));if(k<0.0)return length(q)-r1;if(k>a*h)return length(q-vec2(0.0,h))-r2;return dot(q,vec2(a,b))-r1;}float sdRoundCone(vec3 p,vec3 a,vec3 b,float r1,float r2){vec3 ba=b-a;float l2=dot(ba,ba);float rr=r1-r2;float a2=l2-rr*rr;float il2=1.0/l2;vec3 pa=p-a;float y=dot(pa,ba);float z=y-l2;float x2=dot2(pa*l2-ba*y);float y2=y*y*l2;float z2=z*z*l2;float k=sign(rr)*rr*rr*x2;if(sign(z)*a2*z2>k)return sqrt(x2+z2)*il2-r2;if(sign(y)*a2*y2<k)return sqrt(x2+y2)*il2-r1;return(sqrt(x2*a2*il2)+y*rr)*il2-r1;}float sdTriPrism(vec3 p,vec2 h){const float k=sqrt(3.0);h.x*=0.5*k;p.xy/=h.x;p.x=abs(p.x)-1.0;p.y=p.y+1.0/k;if(p.x+k*p.y>0.0)p.xy=vec2(p.x-k*p.y,-k*p.x-p.y)/2.0;p.x-=clamp(p.x,-2.0,0.0);float d1=length(p.xy)*sign(-p.y)*h.x;float d2=abs(p.z)-h.y;return length(max(vec2(d1,d2),0.0))+min(max(d1,d2),0.);}float sdCylinder(vec3 p,vec2 h){vec2 d=abs(vec2(length(p.xz),p.y))-h;return min(max(d.x,d.y),0.0)+length(max(d,0.0));}float sdCylinder(vec3 p,vec3 a,vec3 b,float r){vec3 pa=p-a;vec3 ba=b-a;float baba=dot(ba,ba);float paba=dot(pa,ba);float x=length(pa*baba-ba*paba)-r*baba;float y=abs(paba-baba*0.5)-baba*0.5;float x2=x*x;float y2=y*y*baba;float d=(max(x,y)<0.0)?-min(x2,y2):(((x>0.0)?x2:0.0)+((y>0.0)?y2:0.0));return sign(d)*sqrt(abs(d))/baba;}float sdCone(in vec3 p,in vec2 c,float h){vec2 q=h*vec2(c.x,-c.y)/c.y;vec2 w=vec2(length(p.xz),p.y);vec2 a=w-q*clamp(dot(w,q)/dot(q,q),0.0,1.0);vec2 b=w-q*vec2(clamp(w.x/q.x,0.0,1.0),1.0);float k=sign(q.y);float d=min(dot(a,a),dot(b,b));float s=max(k*(w.x*q.y-w.y*q.x),k*(w.y-q.y));return sqrt(d)*sign(s);}float sdCappedCone(in vec3 p,in float h,in float r1,in float r2){vec2 q=vec2(length(p.xz),p.y);vec2 k1=vec2(r2,h);vec2 k2=vec2(r2-r1,2.0*h);vec2 ca=vec2(q.x-min(q.x,(q.y<0.0)?r1:r2),abs(q.y)-h);vec2 cb=q-k1+k2*clamp(dot(k1-q,k2)/dot2(k2),0.0,1.0);float s=(cb.x<0.0&&ca.y<0.0)?-1.0 : 1.0;return s*sqrt(min(dot2(ca),dot2(cb)));}float sdCappedCone(vec3 p,vec3 a,vec3 b,float ra,float rb){float rba=rb-ra;float baba=dot(b-a,b-a);float papa=dot(p-a,p-a);float paba=dot(p-a,b-a)/baba;float x=sqrt(papa-paba*paba*baba);float cax=max(0.0,x-((paba<0.5)?ra:rb));float cay=abs(paba-0.5)-0.5;float k=rba*rba+baba;float f=clamp((rba*(x-ra)+paba*baba)/k,0.0,1.0);float cbx=x-ra-f*rba;float cby=paba-f;float s=(cbx<0.0&&cay<0.0)?-1.0 : 1.0;return s*sqrt(min(cax*cax+cay*cay*baba,cbx*cbx+cby*cby*baba));}float sdSolidAngle(vec3 pos,vec2 c,float ra){vec2 p=vec2(length(pos.xz),pos.y);float l=length(p)-ra;float m=length(p-c*clamp(dot(p,c),0.0,ra));return max(l,m*sign(c.y*p.x-c.x*p.y));}float sdOctahedron(vec3 p,float s){p=abs(p);float m=p.x+p.y+p.z-s;
#if 0
vec3 o=min(3.0*p-m,0.0);o=max(6.0*p-m*2.0-o*3.0+(o.x+o.y+o.z),0.0);return length(p-s*o/(o.x+o.y+o.z));
#endif
#if 1
vec3 q;if(3.0*p.x<m)q=p.xyz;else if(3.0*p.y<m)q=p.yzx;else if(3.0*p.z<m)q=p.zxy;else return m*0.57735027;float k=clamp(0.5*(q.z-q.y+s),0.0,s);return length(vec3(q.x,q.y-s+k,q.z-k));
#endif
#if 0
return m*0.57735027;
#endif
}float sdPyramid(in vec3 p,in float h){float m2=h*h+0.25;p.xz=abs(p.xz);p.xz=(p.z>p.x)? p.zx : p.xz;p.xz-=0.5;vec3 q=vec3(p.z,h*p.y-0.5*p.x,h*p.x+0.5*p.y);float s=max(-q.x,0.0);float t=clamp((q.y-0.5*p.z)/(m2+0.25),0.0,1.0);float a=m2*(q.x+s)*(q.x+s)+q.y*q.y;float b=m2*(q.x+0.5*t)*(q.x+0.5*t)+(q.y-m2*t)*(q.y-m2*t);float d2=min(q.y,-q.x*m2-q.y*0.5)>0.0 ? 0.0 : min(a,b);return sqrt((d2+q.z*q.z)/m2)*sign(max(q.z,-p.y));;}float sdRhombus(vec3 p,float la,float lb,float h,float ra){p=abs(p);vec2 b=vec2(la,lb);float f=clamp((ndot(b,b-2.0*p.xz))/dot(b,b),-1.0,1.0);vec2 q=vec2(length(p.xz-0.5*b*vec2(1.0-f,1.0+f))*sign(p.x*b.y+p.z*b.x-b.x*b.y)-ra,p.y-h);return min(max(q.x,q.y),0.0)+length(max(q,0.0));}float sdHorseshoe(in vec3 p,in vec2 c,in float r,in float le,vec2 w){p.x=abs(p.x);float l=length(p.xy);p.xy=mat2(-c.x,c.y,c.y,c.x)*p.xy;p.xy=vec2((p.y>0.0||p.x>0.0)?p.x:l*sign(-c.x),(p.x>0.0)?p.y:l);p.xy=vec2(p.x,abs(p.y-r))-vec2(le,0.0);vec2 q=vec2(length(max(p.xy,0.0))+min(0.0,max(p.x,p.y)),p.z);vec2 d=abs(q)-w;return min(max(d.x,d.y),0.0)+length(max(d,0.0));}float sdU(in vec3 p,in float r,in float le,vec2 w){p.x=(p.y>0.0)? abs(p.x): length(p.xy);p.x=abs(p.x-r);p.y=p.y-le;float k=max(p.x,p.y);vec2 q=vec2((k<0.0)?-k : length(max(p.xy,0.0)),abs(p.z))-w;return length(max(q,0.0))+min(max(q.x,q.y),0.0);}vec2 opU(vec2 d1,vec2 d2){return(d1.x<d2.x)? d1 : d2;}
#define ZERO 0
vec2 map(in vec3 pos){vec2 res=vec2(pos.y,0.0);if(sdBox(pos-vec3(-2.0,0.3,0.25),vec3(0.3,0.3,1.0))<res.x){res=opU(res,vec2(sdSphere(pos-vec3(-2.0,0.25,0.0),0.25),26.9));res=opU(res,vec2(sdRhombus((pos-vec3(-2.0,0.25,1.0)).xzy,0.15,0.25,0.04,0.08),17.0));}if(sdBox(pos-vec3(0.0,0.3,-1.0),vec3(0.35,0.3,2.5))<res.x){res=opU(res,vec2(sdCappedTorus((pos-vec3(0.0,0.30,1.0))*vec3(1,-1,1),vec2(0.866025,-0.5),0.25,0.05),25.0));res=opU(res,vec2(sdBoxFrame(pos-vec3(0.0,0.25,0.0),vec3(0.3,0.25,0.2),0.025),16.9));res=opU(res,vec2(sdCone(pos-vec3(0.0,0.45,-1.0),vec2(0.6,0.8),0.45),55.0));res=opU(res,vec2(sdCappedCone(pos-vec3(0.0,0.25,-2.0),0.25,0.25,0.1),13.67));res=opU(res,vec2(sdSolidAngle(pos-vec3(0.0,0.00,-3.0),vec2(3,4)/5.0,0.4),49.13));}if(sdBox(pos-vec3(1.0,0.3,-1.0),vec3(0.35,0.3,2.5))<res.x){res=opU(res,vec2(sdTorus((pos-vec3(1.0,0.30,1.0)).xzy,vec2(0.25,0.05)),7.1));res=opU(res,vec2(sdBox(pos-vec3(1.0,0.25,0.0),vec3(0.3,0.25,0.1)),3.0));res=opU(res,vec2(sdCapsule(pos-vec3(1.0,0.00,-1.0),vec3(-0.1,0.1,-0.1),vec3(0.2,0.4,0.2),0.1),31.9));res=opU(res,vec2(sdCylinder(pos-vec3(1.0,0.25,-2.0),vec2(0.15,0.25)),8.0));res=opU(res,vec2(sdHexPrism(pos-vec3(1.0,0.2,-3.0),vec2(0.2,0.05)),18.4));}if(sdBox(pos-vec3(-1.0,0.35,-1.0),vec3(0.35,0.35,2.5))<res.x){res=opU(res,vec2(sdPyramid(pos-vec3(-1.0,-0.6,-3.0),1.0),13.56));res=opU(res,vec2(sdOctahedron(pos-vec3(-1.0,0.15,-2.0),0.35),23.56));res=opU(res,vec2(sdTriPrism(pos-vec3(-1.0,0.15,-1.0),vec2(0.3,0.05)),43.5));res=opU(res,vec2(sdEllipsoid(pos-vec3(-1.0,0.25,0.0),vec3(0.2,0.25,0.05)),43.17));res=opU(res,vec2(sdHorseshoe(pos-vec3(-1.0,0.25,1.0),vec2(cos(1.3),sin(1.3)),0.2,0.3,vec2(0.03,0.08)),11.5));}if(sdBox(pos-vec3(2.0,0.3,-1.0),vec3(0.35,0.3,2.5))<res.x){res=opU(res,vec2(sdOctogonPrism(pos-vec3(2.0,0.2,-3.0),0.2,0.05),51.8));res=opU(res,vec2(sdCylinder(pos-vec3(2.0,0.14,-2.0),vec3(0.1,-0.1,0.0),vec3(-0.2,0.35,0.1),0.08),31.2));res=opU(res,vec2(sdCappedCone(pos-vec3(2.0,0.09,-1.0),vec3(0.1,0.0,0.0),vec3(-0.2,0.40,0.1),0.15,0.05),46.1));res=opU(res,vec2(sdRoundCone(pos-vec3(2.0,0.15,0.0),vec3(0.1,0.0,0.0),vec3(-0.1,0.35,0.1),0.15,0.05),51.7));res=opU(res,vec2(sdRoundCone(pos-vec3(2.0,0.20,1.0),0.2,0.1,0.3),37.0));}return res;}vec2 iBox(in vec3 ro,in vec3 rd,in vec3 rad){vec3 m=1.0/rd;vec3 n=m*ro;vec3 k=abs(m)*rad;vec3 t1=-n-k;vec3 t2=-n+k;return vec2(max(max(t1.x,t1.y),t1.z),min(min(t2.x,t2.y),t2.z));}vec2 raycast(in vec3 ro,in vec3 rd){vec2 res=vec2(-1.0,-1.0);float tmin=1.0;float tmax=20.0;float tp1=(0.0-ro.y)/rd.y;if(tp1>0.0){tmax=min(tmax,tp1);res=vec2(tp1,1.0);}vec2 tb=iBox(ro-vec3(0.0,0.4,-0.5),rd,vec3(2.5,0.41,3.0));if(tb.x<tb.y&&tb.y>0.0&&tb.x<tmax){tmin=max(tb.x,tmin);tmax=min(tb.y,tmax);float t=tmin;for(int i=0;i<70&&t<tmax;i++){vec2 h=map(ro+rd*t);if(abs(h.x)<(0.0001*t)){res=vec2(t,h.y);break;}t+=h.x;}}return res;}float calcSoftshadow(in vec3 ro,in vec3 rd,in float mint,in float tmax){float tp=(0.8-ro.y)/rd.y;if(tp>0.0)tmax=min(tmax,tp);float res=1.0;float t=mint;for(int i=ZERO;i<24;i++){float h=map(ro+rd*t).x;float s=clamp(8.0*h/t,0.0,1.0);res=min(res,s);t+=clamp(h,0.01,0.2);if(res<0.004||t>tmax)break;}res=clamp(res,0.0,1.0);return res*res*(3.0-2.0*res);}vec3 calcNormal(in vec3 pos){
#if 0
vec2 e=vec2(1.0,-1.0)*0.5773*0.0005;return normalize(e.xyy*map(pos+e.xyy).x+e.yyx*map(pos+e.yyx).x+e.yxy*map(pos+e.yxy).x+e.xxx*map(pos+e.xxx).x);
#else
vec3 n=vec3(0.0);for(int i=ZERO;i<4;i++){vec3 e=0.5773*(2.0*vec3((((i+3)>>1)&1),((i>>1)&1),(i&1))-1.0);n+=e*map(pos+0.0005*e).x;}return normalize(n);
#endif
}float calcAO(in vec3 pos,in vec3 nor){float occ=0.0;float sca=1.0;for(int i=ZERO;i<5;i++){float h=0.01+0.12*float(i)/4.0;float d=map(pos+h*nor).x;occ+=(h-d)*sca;sca*=0.95;if(occ>0.35)break;}return clamp(1.0-3.0*occ,0.0,1.0)*(0.5+0.5*nor.y);}float checkersGradBox(in vec2 p,in vec2 dpdx,in vec2 dpdy){vec2 w=abs(dpdx)+abs(dpdy)+0.001;vec2 i=2.0*(abs(fract((p-0.5*w)*0.5)-0.5)-abs(fract((p+0.5*w)*0.5)-0.5))/w;return 0.5-0.5*i.x*i.y;}vec3 render(in vec3 ro,in vec3 rd,in vec3 rdx,in vec3 rdy){vec3 col=vec3(0.7,0.7,0.9)-max(rd.y,0.0)*0.3;vec2 res=raycast(ro,rd);float t=res.x;float m=res.y;if(m>-0.5){vec3 pos=ro+t*rd;vec3 nor=(m<1.5)? vec3(0.0,1.0,0.0): calcNormal(pos);vec3 ref=reflect(rd,nor);col=0.2+0.2*sin(m*2.0+vec3(0.0,1.0,2.0));float ks=1.0;if(m<1.5){vec3 dpdx=ro.y*(rd/rd.y-rdx/rdx.y);vec3 dpdy=ro.y*(rd/rd.y-rdy/rdy.y);float f=checkersGradBox(3.0*pos.xz,3.0*dpdx.xz,3.0*dpdy.xz);col=0.15+f*vec3(0.05);ks=0.4;}float occ=calcAO(pos,nor);vec3 lin=vec3(0.0);{vec3 lig=normalize(vec3(-0.5,0.4,-0.6));vec3 hal=normalize(lig-rd);float dif=clamp(dot(nor,lig),0.0,1.0);dif*=calcSoftshadow(pos,lig,0.02,2.5);float spe=pow(clamp(dot(nor,hal),0.0,1.0),16.0);spe*=dif;spe*=0.04+0.96*pow(clamp(1.0-dot(hal,lig),0.0,1.0),5.0);lin+=col*2.20*dif*vec3(1.30,1.00,0.70);lin+=5.00*spe*vec3(1.30,1.00,0.70)*ks;}{float dif=sqrt(clamp(0.5+0.5*nor.y,0.0,1.0));dif*=occ;float spe=smoothstep(-0.2,0.2,ref.y);spe*=dif;spe*=0.04+0.96*pow(clamp(1.0+dot(nor,rd),0.0,1.0),5.0);spe*=calcSoftshadow(pos,ref,0.02,2.5);lin+=col*0.60*dif*vec3(0.40,0.60,1.15);lin+=2.00*spe*vec3(0.40,0.60,1.30)*ks;}{float dif=clamp(dot(nor,normalize(vec3(0.5,0.0,0.6))),0.0,1.0)*clamp(1.0-pos.y,0.0,1.0);dif*=occ;lin+=col*0.55*dif*vec3(0.25,0.25,0.25);}{float dif=pow(clamp(1.0+dot(nor,rd),0.0,1.0),2.0);dif*=occ;lin+=col*0.25*dif*vec3(1.00,1.00,1.00);}col=lin;col=mix(col,vec3(0.7,0.7,0.9),1.0-exp(-0.0001*t*t*t));}return vec3(clamp(col,0.0,1.0));}mat3 setCamera(in vec3 ro,in vec3 ta,float cr){vec3 cw=normalize(ta-ro);vec3 cp=vec3(sin(cr),cos(cr),0.0);vec3 cu=normalize(cross(cw,cp));vec3 cv=(cross(cu,cw));return mat3(cu,cv,cw);}void mainImage(out vec4 fragColor,in vec2 fragCoord){vec2 mo=u_mouse.xy/u_resolution.xy;float time=32.0+u_time*1.5;vec3 ta=vec3(0.25,-0.75,-0.75);vec3 ro=ta+vec3(4.5*cos(0.1*time+7.0*mo.x),2.2,4.5*sin(0.1*time+7.0*mo.x));mat3 ca=setCamera(ro,ta,0.0);vec3 tot=vec3(0.0);for(int m=ZERO;m<AA;m++)for(int n=ZERO;n<AA;n++){vec2 o=vec2(float(m),float(n))/float(AA)-0.5;vec2 p=(2.0*(fragCoord+o)-u_resolution.xy)/u_resolution.y;const float fl=2.5;vec3 rd=ca*normalize(vec3(p,fl));vec2 px=(2.0*(fragCoord+vec2(1.0,0.0))-u_resolution.xy)/u_resolution.y;vec2 py=(2.0*(fragCoord+vec2(0.0,1.0))-u_resolution.xy)/u_resolution.y;vec3 rdx=ca*normalize(vec3(px,fl));vec3 rdy=ca*normalize(vec3(py,fl));vec3 col=render(ro,rd,rdx,rdy);col=pow(col,vec3(0.4545));tot+=col;
#if AA>1
}tot/=float(AA*AA);
#endif
fragColor=vec4(tot,1.0);}void main(){mainImage(gl_FragColor,vUv*u_resolution.xy);}`,A="varying vec3 v_position;varying vec2 vUv;void main(){vUv=uv;v_position=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position*0.4,1.0);}",B=`varying vec3 v_position;varying vec2 vUv;uniform float u_time;uniform vec2 u_resolution;uniform float u_frame;
#define HPI 1.57079632679
#define tiles 10.0
float hash21(in vec2 st){return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);}float sdfTile(in vec2 p,float r,float t,int rot){p-=0.5;p*=mat2(cos(float(rot)*HPI),-sin(float(rot)*HPI),sin(float(rot)*HPI),cos(float(rot)*HPI));p+=0.5;return abs(min(length(p),length(p-vec2(1.0)))-r)-t;}vec2 stepPoint(vec2 p,float c){return vec2(floor(p.x*c)/c,floor(p.y*c)/c);}void mainImage(out vec4 fragColor,in vec2 fragCoord){vec2 uv=fragCoord/u_resolution.xy;uv-=0.5;uv.x*=u_resolution.x/u_resolution.y;uv+=0.5;uv.x+=u_time*0.1;float px=tiles/u_resolution.y;vec2 titleUv=fract(uv*tiles);float tile=hash21(stepPoint(uv,tiles));float col=smoothstep(0.0,px,sdfTile(titleUv,0.5,0.05,int(round(tile))));fragColor=vec4(vec3(col),1.0);}void main(){mainImage(gl_FragColor,vUv*u_resolution.xy);}`,D="varying vec3 v_position;varying vec2 vUv;void main(){vUv=uv;v_position=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position*0.4,1.0);}",P=`uniform vec2 u_resolution;varying vec2 vUv;uniform float u_time;float stretch,gunsUp,gunsForward,edWalk,edTwist,edDown,edShoot,doorOpen,glow=0.0;struct MarchData{float d;vec3 mat;float specPower;};mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,s,-s,c);}float remap(float f,float in1,float in2,float out1,float out2){return mix(out1,out2,clamp((f-in1)/(in2-in1),0.,1.));}float sdBox(vec3 p,vec3 b){vec3 q=abs(p)-b;return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.);}float sdChamferedCube(vec3 p,vec3 r,float c){float cube=sdBox(p,r);p.xz*=rot(.78525);r.xz*=-c/1.41+1.41;return max(cube,sdBox(p,r));}float sdTriPrism(vec3 p,vec2 h){vec3 q=abs(p);return max(q.z-h.y,max(q.x*.866025+p.y*.5,-p.y)-h.x*.5);}float sdCappedCone(vec3 p,vec3 a,vec3 b,float ra,float rb){float rba=rb-ra,baba=dot(b-a,b-a),papa=dot(p-a,p-a),paba=dot(p-a,b-a)/baba,x=sqrt(papa-paba*paba*baba),cax=max(0.,x-((paba<.5)? ra : rb)),cay=abs(paba-.5)-.5,f=clamp((rba*(x-ra)+paba*baba)/(rba*rba+baba),0.,1.),cbx=x-ra-f*rba,cby=paba-f;return((cbx<0.&&cay<0.)?-1. : 1.)*sqrt(min(cax*cax+cay*cay*baba,cbx*cbx+cby*cby*baba));}float sdCappedCylinder(vec3 p,float h,float r){vec2 d=abs(vec2(length(p.xy),p.z))-vec2(h,r);return min(max(d.x,d.y),0.)+length(max(d,0.));}float sdCapsule(vec3 p,vec3 a,vec3 b,float r){vec3 pa=p-a,ba=b-a;return length(pa-ba*clamp(dot(pa,ba)/dot(ba,ba),0.,1.))-r;}float sdOctogon(vec2 p,float r){const vec3 k=vec3(-.92387953,.38268343,.41421356);p=abs(p);p-=2.*min(dot(k.xy,p),0.)*k.xy;p-=2.*min(dot(vec2(-k.x,k.y),p),0.)*vec2(-k.x,k.y);p-=vec2(clamp(p.x,-k.z*r,k.z*r),r);return length(p)*sign(p.y);}vec3 getRayDir(vec3 ro,vec3 lookAt,vec2 uv){vec3 forward=normalize(lookAt-ro),right=normalize(cross(vec3(0,1,0),forward));return normalize(forward+right*uv.x+cross(forward,right)*uv.y);}MarchData minResult(MarchData a,MarchData b){if(a.d<b.d)return a;return b;}void setBodyMaterial(inout MarchData mat){mat.mat=vec3(.36,.45,.5);mat.specPower=30.;}float legWalkAngle(float f){return sin(edWalk*3.141*6.*f)*.2;}float edZ(){return mix(5.,-2.,edWalk);}float fireShock(){return abs(sin(edShoot*78.5375));}float headSphere(vec3 p){return(length(p/vec3(1,.8,1))-1.)*.8;}MarchData headVisor(vec3 p,float h,float bump){bump*=sin(p.x*150.)*sin(p.y*150.)*.002;MarchData result;result.d=sdBox(p,vec3(1,h,2));result.d=max(mix(result.d,headSphere(p),.57),-p.y)-bump;result.mat=vec3(.05);result.specPower=30.;return result;}MarchData headLower(vec3 p){vec3 op=p;MarchData r=headVisor(p*vec3(.95,-1.4,.95),1.,0.);r.d=min(r.d,max(max(headVisor((p+vec3(0,.01,0))*vec3(.95),1.,0.).d,p.y-.35),p.y*.625-p.z-.66));p.xy*=rot(.075*(gunsUp-1.)*sign(p.x));p.x=abs(p.x)-1.33;p.y-=.1-p.x*.1;r.d=min(r.d,sdBox(p,vec3(.4,.06*(1.-p.x),.3-p.x*.2)));p=op;p.y=abs(abs(p.y+.147)-.0556)-.0278;r.d=max(r.d,-sdBox(p+vec3(0,0,1.5),vec3(mix(.25,.55,-op.y),.015,.1)));p=op;p.y=abs(p.y+.16)-.06;p.z-=-1.1;r.d=max(r.d,-max(max(sdCappedCylinder(p.xzy,1.,.03),-sdCappedCylinder(p.xzy,.55,1.)),p.z+.2));setBodyMaterial(r);return r;}MarchData gunPod(vec3 p){MarchData r;setBodyMaterial(r);p.yz+=vec2(.1,.45);vec3 pp=p;pp.z=abs(pp.z)-.5;r.d=sdCappedCone(pp,vec3(0),vec3(0,0,-.1),.35-.1,.35);r.d=min(r.d,sdCappedCylinder(p,.35,.4));pp=vec3(p.x,.28-p.y,p.z);r.d=min(r.d,sdTriPrism(pp,vec2(.1,.5)));pp=p;pp.x=abs(p.x);pp.xy*=rot(.78525);float fs,bump=sign(sin(pp.z*33.3))*.003,d=sdBox(pp,vec3(.1-bump,.38-bump,.34))-.02;pp=p-vec3(0,0,-.6);pp.x=abs(pp.x)-.1;d=min(min(min(d,sdCappedCylinder(pp,.06,.15)),sdCappedCylinder(pp+vec3(0,.12,-.05),.06,.05)),sdBox(p+vec3(0,0,.54),vec3(.1,.06,.04)));if(d<r.d){d=max(d,-sdCappedCylinder(pp+vec3(0,0,.1),.03,.2));r.d=d;r.mat=vec3(.02);}fs=fireShock();if(fs>.5){d=sdCappedCylinder(pp,.01+pp.z*.05,fract(fs*3322.423)*.5+.9);if(d<r.d){r.d=d;r.mat=vec3(1);glow+=.1/(.01+d*d*4e2);}}return r;}MarchData arms(vec3 p){const vec3 wrist=vec3(1.5,0,0)-vec3(0,0,.3);MarchData r;setBodyMaterial(r);p.x=abs(p.x);p.yz+=vec2(.24,0);p.xy*=rot(.15*(gunsUp-1.));r.d=min(sdCapsule(p,vec3(0),vec3(1.5,0,0),.2),sdCapsule(p,vec3(1.5,0,0),wrist,.2));p-=wrist;p.z-=gunsForward*.15;return minResult(r,gunPod(p));}float toe(vec3 p){p.yz+=vec2(.1,.32);return max(sdBox(p,vec3(.3+.2*(p.z-.18)-p.y*.228,.3+.2*cos((p.z-.18)*3.69),.35)),.1-p.y);}float foot(vec3 p){p.z+=.8;p.yz*=rot(.86);float d=toe(p);p.xz*=rot(1.57);p.x-=.43;p.z=.25-abs(p.z);return min(d,toe(p));}MarchData waist(vec3 p){MarchData r;setBodyMaterial(r);p.y+=.65;p.yz*=rot(-.2);float bump,d,legAngle=legWalkAngle(1.);p.xy*=rot(legAngle*.3);vec3 pp=p;pp.y+=.3;r.d=max(sdCappedCylinder(pp.zyx,.5,.5),p.y+.15);bump=.5-abs(sin(p.y*40.))*.03;d=sdBox(p,vec3(bump,.15,bump));bump=.3-abs(sin(p.x*40.))*.03;pp.y+=.18;d=min(d,sdCappedCylinder(pp.zyx,bump,.75));pp.x=abs(pp.x);pp.yz*=rot(-.58525+legAngle*sign(p.x));pp.x-=.98;r.d=min(r.d,max(sdCappedCylinder(pp.zyx,.4,.24),-pp.y));r.d=min(r.d,sdBox(pp,vec3(.24,.2,.14+.2*pp.y)));p=pp;pp.xz=abs(pp.xz)-vec2(.12,.25);r.d=min(r.d,max(min(sdCappedCylinder(pp.xzy,.1,.325),sdCappedCylinder(pp.xzy,.05,.5)),pp.y));p.y+=.68;r.d=min(r.d,sdBox(p,vec3(sign(abs(p.y)-.04)*.005+.26,.2,.34)));if(d<r.d){r.d=d;r.mat=vec3(.02);}return r;}MarchData legs(vec3 p){MarchData r;setBodyMaterial(r);float silver,legAngle=legWalkAngle(1.);p.z+=.27;p.yz*=rot(legAngle*sign(p.x));p.z-=.27;p.y+=.65;p.yz*=rot(-.2);p.xy*=rot(legAngle*.3);vec3 cp,pp=p;pp.x=abs(pp.x);pp.y+=.48;pp.yz*=rot(-.58525);pp.x-=.98;cp=pp;p=pp;pp.xz=abs(pp.xz)-vec2(.12,.25);p.y+=.68;p.xy=abs(p.xy)-.12;silver=sdBox(p,vec3(.07,.05,1.2));cp-=vec3(0,-.7,0);r.d=sdBox(cp-vec3(0,0,1.15),vec3(.17,.17,.07))-.04;cp.z++;r.d=min(r.d,sdChamferedCube(cp.xzy,vec2(.28-sign(abs(cp.z)-.3)*.01,.5).xyx,.18));r.d=min(r.d,foot(cp));if(silver<r.d){r.d=silver;r.mat=vec3(.8);}return r;}MarchData ed209(vec3 p){p.yz+=vec2(legWalkAngle(2.)*.2+.1,-edZ());MarchData r=legs(p);float f=min(stretch*2.,1.),slide=f<.5 ? smoothstep(0.,.5,f):(1.-smoothstep(.5,1.,f)*.2);p.yz-=slide*.5;gunsUp=smoothstep(0.,1.,clamp((stretch-.66)*6.,0.,1.));gunsForward=smoothstep(0.,1.,clamp((stretch-.83)*6.,0.,1.))+fireShock()*.5;r=minResult(r,waist(p));p.yz*=rot(.1*(-edDown+legWalkAngle(2.)+smoothstep(0.,1.,clamp((stretch-.5)*6.,0.,1.))-1.));p.xz*=rot(edTwist*.2);return minResult(minResult(minResult(r,headLower(p)),headVisor(p,.8,1.)),arms(p));}MarchData room(vec3 p){const vec3 frameInner=vec3(2.8,2.6,.1);MarchData r;r.mat=vec3(.4);r.specPower=1e7;vec2 xy=p.xy-vec2(0,2);p.x=abs(p.x);p.yz+=vec2(.5,-3.4);float doorFrame,doorWidth,door,d,doorHole=sdBox(p,frameInner+vec3(0,0,1)),backWall=length(p.z-8.);r.d=min(backWall,max(length(p.z),-doorHole+.1));if(r.d==backWall){float ocp=min(abs(sdOctogon(xy,2.6)),abs(sdOctogon(xy,1.9)));ocp=min(max(ocp,min(.7-abs(xy.x+1.2),-xy.y)),max(abs(sdOctogon(xy,1.2)),min(xy.x,.7-abs(xy.y))));if(ocp<.3)r.mat=vec3(.39,.57,.71);}doorFrame=max(sdBox(p,frameInner+vec3(.4,.4,.1)),-doorHole);doorWidth=frameInner.x*.5;p.x-=frameInner.x;p.xz*=rot(doorOpen*2.1);p.x+=doorWidth;door=sdBox(p,vec3(doorWidth,frameInner.yz));p=abs(p)-vec3(doorWidth*.5,1.1,.14);d=min(doorFrame,max(door,-max(sdBox(p,vec3(.45,.9,.1)),-sdBox(p,vec3(.35,.8,1)))));if(d<r.d){r.d=d;r.mat=vec3(.02,.02,.024);r.specPower=10.;}return r;}MarchData map(vec3 p){MarchData r=minResult(room(p),ed209(p));float gnd=length(p.y+3.);if(gnd<r.d){r.d=gnd;r.mat=vec3(.1);}return r;}float calcShadow(vec3 p,vec3 lightPos){vec3 rd=normalize(lightPos-p);float res=1.,t=.1;for(float i=0.;i<30.;i++){float h=map(p+rd*t).d;res=min(res,12.*h/t);t+=h;if(res<.001||t>25.)break;}return clamp(res,0.,1.);}vec3 calcNormal(vec3 p,float t){float d=.01*t*.33;vec2 e=vec2(1,-1)*.5773*d;return normalize(e.xyy*map(p+e.xyy).d+e.yyx*map(p+e.yyx).d+e.yxy*map(p+e.yxy).d+e.xxx*map(p+e.xxx).d);}float ao(vec3 p,vec3 n,float h){return map(p+h*n).d/h;}vec3 vignette(vec3 col,vec2 fragCoord){vec2 q=fragCoord.xy/u_resolution.xy;col*=.5+.5*pow(16.*q.x*q.y*(1.-q.x)*(1.-q.y),.4);return col;}vec3 applyLighting(vec3 p,vec3 rd,float d,MarchData data){vec3 sunDir=normalize(vec3(10,10,-10)-p),n=calcNormal(p,d);float primary=max(0.,dot(sunDir,n)),bounce=max(0.,dot(-sunDir,n))*.2,spe=pow(max(0.,dot(rd,reflect(sunDir,n))),data.specPower)*2.,fre=smoothstep(.7,1.,1.+dot(rd,n)),fog=exp(-length(p)*.05);primary*=mix(.2,1.,calcShadow(p,vec3(10,10,-10)));return mix(data.mat*((primary+bounce)*ao(p,n,.33)+spe)*vec3(2,1.6,1.7),vec3(.01),fre)*fog;}vec3 getSceneColor(vec3 ro,vec3 rd){vec3 p;float g,d=.01;MarchData h;for(float steps=0.;steps<120.;steps++){p=ro+rd*d;h=map(p);if(abs(h.d)<.0015*d)break;if(d>64.)return vec3(0);d+=h.d;}g=glow;return applyLighting(p,rd,d,h)+fireShock()*.3+g;}void mainImage(out vec4 fragColor,vec2 fragCoord){edWalk=1.;edTwist=0.;edDown=0.;edShoot=0.;doorOpen=1.;stretch=1.;vec3 ro,lookAt,col;float startScene,endScene,dim,time=mod(u_time,55.);if(time<12.){startScene=0.;endScene=12.;edWalk=0.;ro=vec3(0,-1.5,-.625);lookAt=vec3(0,-1,edZ());doorOpen=smoothstep(0.,1.,time/5.);stretch=remap(time,7.,10.,0.,1.);}else if(time<25.){startScene=12.;endScene=25.;float t=time-startScene;edWalk=smoothstep(0.,1.,remap(t,3.,8.,0.,1.));ro=vec3(-.5*cos(t*.7),.5-t*.1,edZ()-3.);lookAt=vec3(0,0,edZ());}else if(time<29.){startScene=25.;endScene=29.;ro=vec3(-2,.5+(time-startScene)*.1,edZ()-3.);lookAt=vec3(0,0,edZ());}else if(time<37.){startScene=29.;endScene=37.;float t=time-startScene;ro=vec3(1.5,-1.-t*.05,edZ()-5.);lookAt=vec3(0,-1,edZ());stretch=remap(t,2.,5.,1.,0.);}else if(time<55.){startScene=37.;endScene=55.;float t=time-startScene;ro=vec3(-1.8,-.5,edZ()-2.5);stretch=remap(t,2.,3.,0.,1.)-remap(t,11.5,14.5,0.,1.);lookAt=vec3(0,stretch*.5-.5,edZ());edTwist=remap(t,3.,3.2,0.,1.)*stretch;edDown=remap(t,3.2,3.4,0.,1.)*stretch;edShoot=t<=9.5 ? remap(t,4.,9.5,0.,1.): 0.;}dim=1.-cos(min(1.,2.*min(abs(time-startScene),abs(time-endScene)))*1.5705);col=vec3(0);
#ifdef AA
for(float dx=0.;dx<=1.;dx++){for(float dy=0.;dy<=1.;dy++){vec2 coord=fragCoord+vec2(dx,dy)*.5;
#else
vec2 coord=fragCoord;
#endif
coord+=(fract(fireShock()*vec2(23242.232,978.23465))-.5)*10.;vec2 uv=(coord-.5*u_resolution.xy)/u_resolution.y;col+=getSceneColor(ro,getRayDir(ro,lookAt,uv));
#ifdef AA
}}col/=4.;
#endif
fragColor=vec4(vignette(pow(col*dim,vec3(.4545)),fragCoord),1);}void main(){mainImage(gl_FragColor,vUv*u_resolution.xy);}`,R="varying vec3 v_position;varying vec2 vUv;void main(){vUv=uv;v_position=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position*0.4,1.0);}";const O=z({__name:"example.wavePrint",props:{type:String},setup(v){const s=v;let t=i,r=l,p=6,c=5;if(s.type)switch(s.type){case"Default":{t=i,r=l;break}case"fractalCity":{t=U,r=S,c=2;break}case"primitives":{t=M,r=A,p=1.92,c=1.08;break}case"simpleTruchetPattern":{t=B,r=D,p=5.6,c=3;break}case"ed209":{t=P,r=R,p=5.12,c=2.88;break}}const n=k(null),e={u_time:{value:0},u_mouse:{value:{x:0,y:0}},u_resolution:{value:{x:0,y:0}},u_color:{value:new f(65520)},u_frame:{type:"i",value:-1},iChannel0:{type:"t",value:""},iChannel1:{type:"t",value:""}},d=new h,o=new b;return o.animate=function(){if(this.render(),e.u_time.value=d.getElapsedTime(),e.u_frame.value++,this.container.getBoundingClientRect().width>0)requestAnimationFrame(this.animate.bind(this));else return},o.move=function(a){e.u_mouse.value.x=a.touches?a.touches[0].clientX:a.clientX,e.u_mouse.value.y=a.touches?a.touches[0].clientY:a.clientY},"ontouchstart"in window?document.addEventListener("touchmove",o.move):document.addEventListener("mousemove",o.move),o.resize=function(){e.u_resolution!==void 0&&(e.u_resolution.value.x=this.width,e.u_resolution.value.y=this.height),e.u_frame.value=0,this.camera.aspect=this.container.clientWidth/this.container.clientHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.container.clientWidth,this.container.clientHeight),this.render()},o.addObject=function(){this.geometry=new m(p,c),this.material=new x({uniforms:e,side:y,fragmentShader:t,vertexShader:r}),this.mesh=new u(this.geometry,this.material),this.scene.add(this.mesh)},q(()=>{const a={container:n.value||document.body};o.init(a)}),C(()=>{o.beforeDestroy()}),(a,W)=>(_(),w("div",{class:"example_lightSaberDuel fullscreen",ref_key:"container",ref:n},null,512))}});var T=g(O,[["__file","example.wavePrint.vue"]]);export{T as _};
