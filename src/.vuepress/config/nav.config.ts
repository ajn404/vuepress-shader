import {NavbarConfig,NavbarGroup} from 'vuepress';


const practiceBaseUrl : string= '/markdown/practice/'
const practice : NavbarGroup [] = [
    {
        text:'练习',
        children:[
            {
                text:'鼠标绘制平面颜色',
                link:`${practiceBaseUrl}changeColor`
            }
        ]
    }
]

const navbar : NavbarConfig = 
[
    ...practice
]

export default navbar

