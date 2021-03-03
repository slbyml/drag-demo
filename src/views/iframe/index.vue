<template>
  <div class="page">
    <div v-for="(item, key) in components" :key="item.id" class="item" :style="item.style">
      <component :is="item.component" v-bind="item.props" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue'
import componentBox from '../../components/component-box/index.vue'

export default defineComponent({
  components: {
    componentBox,
  },
  setup () {
    const parentMessage:any = reactive([])
    
    window.addEventListener('message', function(e) {
      parentMessage.value = e.data
    })
    const components = computed(() => {
      return parentMessage.value
      
    })
    return {
      components,
    }
  }
})
</script>

<style scoped>
.page{
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  position: relative;
}
.item {
  position: absolute;
}
</style>