<template>
  <div class="right">
    <el-tabs v-model="activePane" >
      <el-tab-pane label="属性" name="sx">
        <right-style />
      </el-tab-pane>
      <el-tab-pane label="动画" name="dh" v-if="currentComponent">
        <right-animate />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import {useStore} from 'vuex'
import rightStyle from './style.vue'
import rightAnimate from './animate.vue'

export default defineComponent({
  name: 'tzRight',
  components: {
    rightStyle,
    rightAnimate
  },
  setup () {
    const activePane = ref('sx')
    const store = useStore()
    return {
      currentComponent: computed(() => store.getters.getCurrentComponent),
      activePane
    }
  }
})
</script>

<style scoped>
.right{
  flex-basis:300px;
  border-left: 1px #f1f1f1 solid;
  background-color: #fff;
  box-sizing: border-box;
  padding:10px 15px;
  overflow-y: auto;
}
</style>