---
title : clamp
---
<style>
.practice + .language-glsl,.language-glsl{
    filter: opacity(0.7);
}
</style>

<ClientOnly>
<practice.clamp></practice.clamp>
</ClientOnly>

```glsl
template<class T>
T Clamp(T x, T min, T max)
{
    if (x > max)
        return max;
    if (x < min)
        return min;
    return x;
}
```