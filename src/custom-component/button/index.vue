<template>
  <button class="btn">
    按钮
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'tzButton',
  setup () {
    

    return {}
  }
})
</script>

<style scoped>
.btn{
  width: 100px;
  height: 30px;
  line-height: 30px;
  border: none;
  background-color: bisque;
  cursor: pointer;
}
.btn:focus {
  outline: none;
}
</style>