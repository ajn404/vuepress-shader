import {NavbarConfig,NavbarGroup} from 'vuepress';


const practiceBaseUrl : string= '/markdown/practice/'
const practice : NavbarGroup [] = [
    {
        text:'练习',
        children:[
            {
                text:'刚开始',
                children:[
                    {
                        text:'第一个Shader练习',
                        link:`${practiceBaseUrl}firstShader`
                    },
                    {
                        text:'鼠标绘制平面颜色',
                        link:`${practiceBaseUrl}changeColor_mouse`
                    },
                    {
                        text:'时间绘制平面颜色',
                        link:`${practiceBaseUrl}changeColor_time`
                    },
                    {
                        text:'uniforms混合颜色(渐变色)',
                        link:`${practiceBaseUrl}blendingColorUniforms`
                    },
                    {
                        text:'varyings混合颜色(渐变色)',
                        link:`${practiceBaseUrl}blendingColorVaryings`
                    }
                ]
            }
        ]
    }
]

const examples : NavbarGroup [] = [
    {
        text:'示例',
        children:[

        ]
    }
]

const navbar : NavbarConfig = 
[
    ...practice
]

export default navbar

