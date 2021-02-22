<template>
  <div class="left">
    {{num}}
    <tz-button></tz-button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'tz-list',
  setup() {
    const num = ref<number>(0)
    return {
      num
    }
  }
})
</script>

<style scoped>
  .left{
    flex:1;
    width:200px;
    border-right: 1px #f1f1f1 solid;
  }
</style>