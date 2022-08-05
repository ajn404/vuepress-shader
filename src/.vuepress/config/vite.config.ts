// import { defineConfig, loadEnv } from 'vite'

//@ts-ignore
import glsl from 'rollup-plugin-glsl';


const { path } = require('@vuepress/utils')

const resolve = (dir:any) => {
    return path.resolve(__dirname, dir)
}

export const viteConfig = {
    resolve:{
        alias:{
            '@':resolve('')
        }
    },
    css: {
        postcss: {
            plugins: [
                {
                    postcssPlugin: 'charset-removal',
                    AtRule: {
                        charset: (atRule:any) => {
                            atRule.remove()
                        }
                    }
                }
            ]
        }

    },
    plugins:[
        glsl({
            // By default, everything gets included
            include: './**/*.glsl',
            exclude: ['**/index.html'],

            // Source maps are on by default
            sourceMap: false
        })
    ]
}