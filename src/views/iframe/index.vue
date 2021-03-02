<template>
  <div class="page">
    <component-box v-for="(item, key) in components" :key="item.id" :components-config="item" :index='key'>
      <component :is="item.component" v-bind="item.props" />
    </component-box>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import {useStore} from 'vuex'
import componentBox from '../../components/component-box/index.vue'

export default defineComponent({
  components: {
    componentBox,
  },
  setup () {
    const store = useStore()
    return {
      components: computed(() => store.getters.getComponents)
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
</style>