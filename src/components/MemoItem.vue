<template>
    <div class="memo-container">
    <div class="memo">
      <div class="mark"></div>
      <div class="memo-heading">
        <h5 class="title">{{data.title}}</h5>
        <ul class="tools">
          <li class="edit" @click="doEdit"></li>
          <li class="delete" @click="doDel"></li>
        </ul>
      </div>
      <h6 class="memo-info">
        <span class="timeStamp">{{data.createTime}}</span>
        <span class="category">分类: {{$store.state.aHelper.getCateName(data.cateId)}}</span>
      </h6>
      <div class="content">
        <div class="text">{{data.content}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ItemData from '@/model/ItemData'
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component
export default class MemoItem extends Vue {
    //*** 父子组件中相互传值使用的注解
    @Prop() data!: ItemData;

    /**删除日记 */
    doDel():void{
      if(!window.confirm(`是否要删除【${this.data.title}】日记？`)) return;

      this.$store.state.aHelper.removeData(this.data.id);
    }

    /**编辑日记 */
    doEdit():void{
      // 1.创建数据副本
      let newData: ItemData = JSON.parse(JSON.stringify(this.data));
      // 2.传递给桥梁
      this.$store.commit('editMemo', newData);
    }
}
</script>