//@ts-ignore
import glsl from 'rollup-plugin-glsl';
import Components from 'unplugin-vue-components/vite';
const { path } = require('@vuepress/utils');
const resolve = (dir:any) => {
    return path.resolve(__dirname, dir)
};
export const viteConfig = {
    resolve:{
        alias:{
            '@':resolve('../'),
            'components':resolve('../../components'),
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
            include: './**/*.glsl',
            exclude: ['**/index.html'],
            sourceMap: false
        }),
        Components({
            dirs:[resolve('../../components')],
            allowOverrides: true,
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        }),
    ],
    
}