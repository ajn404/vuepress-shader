import { defineUserConfig } from '@vuepress/cli';
import { viteBundler } from '@vuepress/bundler-vite';
import head from './config/head.config';
import viteConfig from './config/vite.config';
import navbar from './config/nav.config';
import localTheme from './theme';
const { path } = require('@vuepress/utils')

export default defineUserConfig({
    title: 'glsl',
    description: 'shader!',
    base: '/vuepress-shader/',
    open: true,
    host: '0.0.0.0',
    port: 9999,
    head,
    clientConfigFile: path.resolve(
        __dirname,
        './config/clientConfig.ts'
    ),
    bundler: viteBundler(
        {
            viteOptions: viteConfig
        }
    ),
    theme: localTheme({
        navbar: navbar,
        sidebar: false,
        logo: '',
        logoDark: ''
    })

});