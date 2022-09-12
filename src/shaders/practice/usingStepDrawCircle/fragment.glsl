
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform int u_frame;
varying vec3 v_position;

void main(){
  float inCircle = 1.0 - step(1.0,length(v_position.xy));
  vec3 color = vec3(1.0,0,0) * inCircle;
  gl_FragColor=vec4(color,1.0);
}