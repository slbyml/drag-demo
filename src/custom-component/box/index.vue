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
  width: 100px;
  height: 100px;
  background-color: #ccc;
}
</style>