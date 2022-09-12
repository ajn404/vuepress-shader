---
title : clamp
---

<style>
.practice + .language-glsl,.language-glsl{
    filter: opacity(0.7);
}
</style>

<ClientOnly>
<practice.step></practice.step>
</ClientOnly>

```glsl

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform int u_frame;
varying vec3 v_position;

void main(){
  float inCircle = 1.0 - step(0.5,length(v_position.xy));
  vec3 color = vec3(0.5,0.4,0.1) * inCircle;
  gl_FragColor=vec4(color,1.0);
}
```


```glsl
float step(float a, float x)
{
    if ( x<a)
    {
        return 0.0;
    }
    else
    {
        return 1.0;
    }
}
```
