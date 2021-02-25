<template>
  <div class="box"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'tzBox',
  setup () {
    return {}
  }
})
</script>

<style scoped>
.box{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #ccc;
}
</style>