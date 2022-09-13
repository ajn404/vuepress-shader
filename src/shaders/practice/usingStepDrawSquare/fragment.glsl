
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform int u_frame;
varying vec3 v_position;


float rect(vec2 pt, vec2 size ,vec2 center){
  vec2 p = pt - center;
  vec2 halfSize = size * 0.5;
  float horz = step(-halfSize.x, p.x ) - step(halfSize.x,p.x ) ;
  float vert = step(-halfSize.y,p.y) - step(halfSize.y,p.y);
  return horz*vert;
}

void main(){
  float inRect = rect(v_position.xy,vec2(1.0),vec2(0.0));
  vec3 color = vec3(0.4157, 0.2941, 0.2941) * inRect;
  gl_FragColor=vec4(color,1.0);
}