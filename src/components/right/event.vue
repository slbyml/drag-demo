<template>
  <el-button type="primary" size="mini" @click="addEvent">添加事件</el-button>
  <el-card v-for="(item, index) in currentComponent.events" :key="item.id" class="event" :body-style="{padding: '15px 15px 5px'}">
    <el-form label-width="80px" size="mini">
      <el-form-item label="事件名称">
        <el-select v-model="item.event" placeholder="请选择事件">
          <el-option v-for="(ev, i) in eventsSelect" :key="i" :label="ev.label" :value="ev.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="执行事件">
        <el-select v-model="item.method" placeholder="请选择执行事件">
          <el-option v-for="(ev, i) in eventMethod" :key="i" :label="ev.label" :value="ev.value"></el-option>
        </el-select>
      </el-form-item>
      <!-- 配置跳转链接 -->
      <el-form-item label="跳转链接" v-if="item.method === 'href'">
        <el-input v-model="item.href" placeholder="请输入跳转链接"/>
      </el-form-item>
      <!-- 配置弹窗信息 -->
      <template v-if="item.method === 'alert'">
        <el-divider content-position="center"><span style="color:#606266;font-size:13px">弹窗信息</span></el-divider>
        <el-form-item label="标题">
          <el-input v-model="item.dialog.title" placeholder="请输入弹窗标题"/>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="item.dialog.message" type="textarea" placeholder="请输入弹窗内容"/>
        </el-form-item>
        <el-form-item label="取消按钮">
          <el-switch v-model="item.dialog.showCancelButton" />
        </el-form-item>
      </template>
    </el-form>
    <i class="el-icon-delete del" @click="onRemoveEvent(index)"></i>
  </el-card>
  <!-- <el-button type="primary" size="mini" class="submit" @click="onSaveEvent">保存事件</el-button> -->
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import {deepClone, generateID} from '../../utils'

interface itemTs {
  event: string
}
// 可选的事件类型
const eventsSelect = [
  {
    label: '点击',
    value: 'click'
  }
]
// 可选的事件执行结果
const eventMethod = [
  {
    label: '跳转',
    value: 'href'
  },{
    label: '弹窗',
    value:'alert'
  }
]
// 事件的默认参数类型
const defaultEvent = {
  event: 'click',
  method: 'href',
  href:'',
  dialog: {
    title: '',
    message: '',
    showCancelButton: true
  }
}

export default defineComponent({
  name: 'rightEvent',
  setup () {
    const store = useStore()
    const dialogVisible = ref(false)
    const currentComponent = computed(() => store.getters.getCurrentComponent)
    // 添加事件 
    const addEvent = () => {
      store.commit('addCurrentEvent', deepClone({...defaultEvent,id:generateID()}))
    }
    // 删除事件
    const onRemoveEvent = (index:number) => {
      store.commit('delCurrentEvent', index)
    }
    return {
      currentComponent,
      eventsSelect,
      eventMethod,
      dialogVisible,
      addEvent,
      onRemoveEvent,
    }
  }
})
</script>

<style scoped>
.event{
  margin-top: 10px;
  position: relative;
}
.submit{
  margin-top: 10px;
  width: 100%;
}
.del{
  position: absolute;
  left: 6px;
  top:6px;
  cursor: pointer;
}
.del:hover{
  color: #409EFF;
}
</style>