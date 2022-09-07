---
title : clamp
---

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