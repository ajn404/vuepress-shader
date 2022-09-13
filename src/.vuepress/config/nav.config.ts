import { NavbarConfig, NavbarGroup } from 'vuepress';


const practiceBaseUrl: string = '/markdown/practice/'
const practice: NavbarGroup[] = [
    {
        text: '练习',
        children: [
            {
                text: '刚开始',
                children: [
                    {
                        text: '第一个Shader练习',
                        link: `${practiceBaseUrl}firstShader`
                    },
                    {
                        text: '鼠标绘制平面颜色',
                        link: `${practiceBaseUrl}changeColorMouse`
                    },
                    {
                        text: '时间绘制平面颜色',
                        link: `${practiceBaseUrl}changeColorTime`
                    },
                    {
                        text: 'uniforms混合颜色(渐变色)',
                        link: `${practiceBaseUrl}blendingColorUniforms`
                    },
                    {
                        text: 'varyings混合颜色(渐变色)',
                        link: `${practiceBaseUrl}blendingColorVaryings`
                    },
                    {
                        text: '旋转和缩放',
                        link: `${practiceBaseUrl}shapingFunction`
                    }
                ]
            },
            {
                text:'glsl functions',
                children:[
                    {
                        text:'clamp',
                        link:`${practiceBaseUrl}usingClamp`
                    },
                    {
                        text:'step circle',
                        link:`${practiceBaseUrl}usingStep`,
                    },
                    {
                        text:'step square',
                        link:`${practiceBaseUrl}stepDrawSquare`
                    }
                ]
            }
        ]
    }
]

const exampleBaseUrl: string = '/markdown/example/'
const examples: NavbarGroup[] = [
    {
        text: '示例',
        children: [
            {
                text: '搬运',
                children: [
                    {
                        text: '光剑(被注释了)=>窗边的坤坤',
                        link: `${exampleBaseUrl}lightSaberDuel`
                    }
                ]
            }
        ]
    }
]

const noteBaseUrl: string = '/markdown/notes/'
const note: NavbarGroup[] = [
    {
        text: '笔记',
        children: [
            {
                text: 'glsl基础注解',
                link: `${noteBaseUrl}basic`
            }, {
                text: 'js基础（ecma）',
                link: `${noteBaseUrl}js`
            },{
                text: '命令行注释',
                link: `${noteBaseUrl}shell`
            }
        ]
    }
]

const beforeBlog: NavbarGroup[] = [
    {
        text: '之前的博客',
        children: [
            {
                text: 'vuepress',
                children: [
                    {
                        text: 'rengm(p5,threejs,echarts等)',
                        link: 'https://ajn404.github.io/rengm/'
                    },
                    {
                        text: '国内版rengm',
                        link: 'https://ajn404.gitee.io/rengm/'
                    },
                    {
                        text: 'ngm(前端笔记)',
                        link: 'https://ajn404.github.io/ngm.github.io/'
                    },
                    {
                        text: '国内版ngm',
                        link: 'http://ajn404.gitee.io/ngm.github.io/'
                    },
                ]
            },
            {
                text: 'hexo',
                children: [
                    {
                        text: 'md博客(学生时代)',
                        link: 'https://ajn404.github.io/log.github.io/'
                    }
                ]
            }
        ]
    }
]

const navbar: NavbarConfig =
    [
        ...practice,
        ...examples,
        ...note,
        ...beforeBlog
    ]

export default navbar

