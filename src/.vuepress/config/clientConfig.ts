import "@/public/styles/index.scss"
import { defineClientConfig } from '@vuepress/client'
// console.log('%cshader!\n%ci love you','color:yellow;font-size:3em;','color:red;font-size:1.5em')

export default defineClientConfig({
    enhance({ app, router, siteData }){
        // router.beforeEach(()=>{
        // })
        
    },
    setup(){
        return {
        }
    },
    rootComponents: [
        
    ],
  })