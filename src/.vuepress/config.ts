import { defineUserConfig } from '@vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite';

import { head } from './config/head';
import { viteConfig } from './config/vite.config';

export default defineUserConfig({
    title: " ",
    description: "shader!",
    head,
    base: "/",
    open: true,    
    host: '0.0.0.0',
    port: 9999,

    bundler:viteBundler(
        {
            viteOptions:viteConfig
        }
    )
});