<template>
  <div class="text" :style="style">
    {{text}}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'tzText',
  props: {
    text: {
      type: String,
      default: '请输入文字'
    },
    color: {
      type: String,
      default: '#333'
    },
    align: {
      type: String,
      default: "left"
    },
    lineHeight: {
      type: String,
      default:'20px'
    }
  },
  setup (prop) {
    const style = computed(() => {
      return {
        color: prop.color,
        textAlign: prop.align,
        lineHeight: prop.lineHeight
      }
    })
    return {
      style
    }
  }
})
</script>

<style scoped>
.text{
  overflow: hidden;
  word-break: break-all;
  height: 100%;
}
</style>