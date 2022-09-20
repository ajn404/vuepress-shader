<template>

  <div class="codemirror-tool-box">
    <codemirror v-model="code" placeholder="快写代码吧,帅哥..." :style="{ padding: '10px 0' ,margin:'20px 0 0'}"
      :autofocus="true" :indent-with-tab="true" :tab-size="2" :extensions="extensions" @ready="handleReady"
      @change="handelChange" />

    <div class="run">
      <button class="btn" @click="run">运行</button>
      <div class="result">
        <div class="run-result" v-if="codeRes" v-html="codeRes">
        </div>

      </div>
    </div>

  </div>


</template>
  
<script>
//简易试炼场
import { defineComponent } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { ref, shallowRef } from 'vue'

export default defineComponent({
  components: {
    Codemirror
  },
  props: {
    codes: String
  },
  setup(props) {
    const extensions = [javascript(), oneDark]
    //input
    const code = ref(props.codes || "")

    // Codemirror EditorView instance ref
    const view = shallowRef()
    const res = ref(code.value);
    const codeRes = ref(null)
    const handleReady = (payload) => {
      view.value = payload.view
    }

    const handelChange = (e) => {
      res.value = e;
    }

    // Status is available at all times via Codemirror EditorView
    const getCodemirrorStates = () => {
      const state = view.value.state
      const ranges = state.selection.ranges
      const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
      const cursor = ranges[0].anchor
      const length = state.doc.length
      const lines = state.doc.lines
      // more state info ...
      // return ...
    }

    // let reWrite = console.log;
    console.reWriteLog = function () {
      let t = []
      for (let n = 0, o = arguments.length; n < o; n++) {
        let i = arguments[n];
        t.push(i)
      }
      codeRes.value = `${codeRes.value}${t.join("<br/>")}<br/>`;
      // reWrite.apply(console, arguments)
    }

    //output
    const run = () => {
      codeRes.value = "";
      try {
        if (!res.value) {
          codeRes.value = "不要偷懒哦,帅哥! "
          return;
        }
        //codeRes.value = eval(res.value)
        //eval=>new Function
        res.value = `console.reWriteLog("运行成功啦! ");${res.value.replaceAll('console\.log', 'console\.reWriteLog')}`;
        const func = new Function(res.value);
        func();
      }
      catch (err) {
        codeRes.value = `出错喽，帅哥！<br/>${err}`;
      }
    }

    const clear = () => {
      res.value = "";
      codeRes.value = "";
    }

    return {
      extensions,
      code,
      res,
      codeRes,
      handleReady,
      handelChange,
      run,
      clear,
    }
  }
})
</script>

<style scoped lang="scss">
.run {

  .btn {
    border: none;
    padding: 5px;
    margin: 10px 0 20px;
    color: #2a2a99;
    background-color: #aeddff;
    font-weight: bold;
    border-radius: 20%;
    width: 50px;
    height: 40px;
    margin: 10px 0 20px;
    cursor: pointer;

    // &:hover {
    //   animation: hoverAni 1s linear infinite;
    // }
  }

  @keyframes hoverAni {
    0% {
      font-size: 1.0em;
    }

    100% {
      font-size: 1.2em;
      width: 60px;
      height: 50px;
      margin: 10px 0;
      box-shadow: 10px 5px 5px #2a2a99;
    }
  }

  .result {
    display: flex;
    flex-direction: column;
    flex: 1;

    .result-tag {
      color: black;

    }

    .run-result {
      padding: 5px;
      background-color: #282c34;
      color: #98c379;
    }
  }
}
</style>