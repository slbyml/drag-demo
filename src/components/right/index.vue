<template>
  <div class="right">
    <el-form v-if="currentConfig" size="mini" label-position="left">
      <!-- 配置组件外层盒子的样式 -->
      <template v-for="item in Object.keys(currentConfig.style)">
        <el-form-item v-if="configKeyMap[item]"  :key="item" :label="`${configKeyMap[item].value}:`">
          <el-input v-model='currentConfig.style[item]'></el-input>
        </el-form-item>
      </template>
      <!-- 配置组件的样式 -->
      <template v-for="item in Object.keys(currentConfig.props)">
        <el-form-item v-if="configKeyMap[item]"  :key="item" :label="`${configKeyMap[item].value}:`">
          <el-color-picker v-model="currentConfig.props[item]" v-if="configKeyMap[item].type === 'color'" />
          <el-switch v-model="currentConfig.props[item]" v-else-if="configKeyMap[item].type === 'switch'" />
          <el-input-number v-model="currentConfig.props[item]" :min="0" :max="999" label="描述文字" v-else-if="configKeyMap[item].type === 'number'"/>
          <el-select v-model="currentConfig.props[item]" placeholder="请选择" v-else-if="configKeyMap[item].type === 'select'">
            <el-option
              v-for="item in componentConfigMap[currentConfig.component][item]"
              :key="item"
              :value="item">
            </el-option>
          </el-select>
          <el-input v-model='currentConfig.props[item]' v-else />
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent,toRefs } from 'vue'
import {useStore} from 'vuex'
import {configKeyMap, componentConfigMap} from '../../config/mainConfig'

export default defineComponent({
  name: 'tzRight',
  setup () {
    const store = useStore()
    const defaultConfig = computed(() => store.getters.getCanvas)
    const currentConfig = computed(() => store.getters.getCurrentComponent)
    console.log(currentConfig);
    
    return {
      defaultConfig,
      currentConfig,
      configKeyMap,
      componentConfigMap
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
  padding:15px;
  overflow-y: auto;
}
</style>