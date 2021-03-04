<template>
  <el-form size="mini" label-position="right" label-width="76px">
      <!-- 配置组件外层盒子的样式 -->
      <template v-for="item in Object.keys(currentConfig.style)">
        <el-form-item v-if="getConfigMap[item]"  :key="item" :label="`${getConfigMap[item].value}:`" >
          <el-color-picker v-model="currentConfig.style[item]" v-if="getConfigMap[item].type === 'color'" />
          <el-input v-model.lazy.trim='currentConfig.style[item]' v-else></el-input>
        </el-form-item>
      </template>
      <!-- 配置组件的样式 -->
      <template v-for="item in Object.keys(currentConfig.props)">
        <el-form-item v-if="getConfigMap[item]" :key="item" :label="`${getConfigMap[item].value}:`">
          <!-- 颜色选择 -->
          <el-color-picker v-model="currentConfig.props[item]" v-if="getConfigMap[item].type === 'color'" />
          <!-- true|false切换 -->
          <el-switch v-model="currentConfig.props[item]" v-else-if="getConfigMap[item].type === 'switch'" />
          <!-- 数字选择 -->
          <el-input-number v-model="currentConfig.props[item]" :min="0" :max="999" label="描述文字" v-else-if="getConfigMap[item].type === 'number'"/>
          <!-- 下拉框选择 -->
          <el-select v-model="currentConfig.props[item]" placeholder="请选择" v-else-if="getConfigMap[item].type === 'select'">
            <el-option
              v-for="item in getConfigMap[item].options"
              :key="item"
              :value="item">
            </el-option>
          </el-select>
          <el-input v-model.lazy.trim='currentConfig.props[item]' v-else :type="getConfigMap[item].type || 'text'"/>
        </el-form-item>
      </template>
    </el-form>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import {useStore} from 'vuex'
import {configKeyMap, componentConfigMap} from '../../config/mainConfig'

export default defineComponent({
  name: 'rightStyle',
  setup () {
    const store = useStore()
    const currentConfig = computed(() => {
      return store.getters.getCurrentComponent ? store.getters.getCurrentComponent : store.getters.getCanvas
    })
    
    // 获取当前组件的配置信息
    const getConfigMap = computed(() => {
      const name = store.getters.getCurrentComponent?.component
      return {
        ...configKeyMap,
        ...componentConfigMap[name]
      }
    })

    return {
      currentConfig,
      getConfigMap
      
    }
  }
})
</script>

<style scoped>

</style>