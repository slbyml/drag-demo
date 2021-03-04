<template>
  <div class="animates">
    <el-button-group style="margin:0 auto">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="onSelectDialog">添加动画</el-button>
      <el-button type="primary" size="small" @click="onRunAnimate">运行动画 <i class="el-icon-video-play"></i></el-button>
    </el-button-group>
    <el-collapse class="lists" accordion v-if="currentComponent.animates.length">
      <el-collapse-item v-for="(item, index) in currentComponent.animates" :name="item.id">
        <template #title>
          {{item.label}}<i class="el-icon-delete delete" @click="deleteAnimate(index)"></i>
        </template> 
        <el-form size="mini" label-width="96px">
          <el-form-item label="开始时间(秒):" >
            <el-tooltip class="item" effect="light" content="此时间是基于上个动画结束时间算起" placement="top">
                <el-input-number v-model="item.delay" :min="0" label="开始时间"></el-input-number>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="起始样式:" >
            <el-select v-model="item.mode" placeholder="起始样式">
              <el-option v-for="item in mode" :label="item" :value="item"></el-option>s
            </el-select>
          </el-form-item>
          <el-form-item label="无限循环:" >
            <el-switch v-model="item.infinite"></el-switch>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
  <el-dialog
    append-to-body
    v-model="dialogVisible"
    width="341px"
    :show-close="false"
    custom-class="animateSelect"
    top="0">
    <el-tabs v-model="activePane" >
      <el-tab-pane :label="item.label" :name="key" v-for="(item, key) in animationTabs" :key="key" class="animate-box">
        <div v-for="val in item.value" :key="val.value" class="animate animate__animated" @mouseenter="onAnimation($event, val)" @click="onAddAnimation(val)">{{val.label}}</div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent,ref } from 'vue'
import {useStore} from 'vuex'
import animationTabs, {animationItemTs} from '../../config/animate'
import runAnimation from '../../utils/runAnimate'
const mode = ['none', 'forwards', 'backwards', 'both']


export default defineComponent({
  name: "rightAnimate",
  setup () {
    const store = useStore()
    const dialogVisible = ref(false)
    const currentComponent = computed(() => store.getters.getCurrentComponent)
    const onSelectDialog = () => {
      dialogVisible.value = true
    }
    const onAnimation = (event:MouseEvent, opt:animationItemTs,) => {
      if (event.target) {
          (event.target as HTMLElement).classList.add(`animate__${opt.value}`)
          setInterval(() => {
            (event.target as HTMLElement).classList.remove(`animate__${opt.value}`)
          },3000)
      }
    }
    const onAddAnimation = (opt:animationItemTs) => {
      store.commit('addCurrentAnimation', opt)
      dialogVisible.value=false
    }

    const onRunAnimate = () => {
      runAnimation(currentComponent.value, store, document.querySelector('.activeComponent'))
    }

    const deleteAnimate = (index:number) => {
      store.commit('delCurrentAnimation', index)
    }

    return {
      activePane: 'in',
      currentComponent,
      onSelectDialog,
      animationTabs,
      onAnimation,
      onAddAnimation,
      dialogVisible,
      onRunAnimate,
      deleteAnimate,
      mode
    }
  }
})
</script>

<style lang="scss">
.animates{
  .lists{
    margin-top: 20px;
  }
  
  .delete{
    margin-left: 10px;
    cursor: pointer;
    height: 48px;
    width: 38px;
    text-align: center;
    line-height: 48px;
  }
}
.animateSelect{
  margin-left: 0;
  height: 100%;
  overflow-y: auto;
  .el-dialog__header{
    padding:0;
  }
  .el-dialog__body{
    padding:5px 10px 10px;
  }
  .animate-box{
    display: flex;
    flex-wrap:wrap;
    margin: 0 -5px;
  }
  .animate{
    margin: 5px;
    padding: 0 8px;
    box-sizing: border-box;
    font-size: 12px;
    width: 100px;
    height: 50px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    background-color: #f1f1f1;
    border-radius: 3px;
    cursor: pointer;
  }
}

</style>