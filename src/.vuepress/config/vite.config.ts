import { defineConfig, loadEnv } from 'vite'

//@ts-ignore
import glsl from 'rollup-plugin-glsl';


export const viteConfig = {
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