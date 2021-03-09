<template>
    <!-- 菜单栏 -->
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <a class="navbar-brand">
          <img height="40" src="../assets/logo.png" /></a>
        <button type="button"
                class="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target=".navbar-collapse"
                aria-expanded="false">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse navbar-right">
        <ul class="nav navbar-nav">
          <li class="add dropdown">
            <a class="create-new dropdown-toggle"
               data-toggle="dropdown">新建</a>
            <ul class="dropdown-menu">
              <li>
                <a @click="addText">文本便签</a>
              </li>
            </ul>
          </li>
          <li class="categories dropdown">
            <a class="current-category dropdown-toggle"
               data-toggle="dropdown">
              全部
              <span class="count badge">{{getCountByCateId(-1)}}</span>
            </a>
            <ul class="dropdown-menu">
              <li class="total" @click="setCateId(-1)">
                <a>
                  全部
                  <span class="count badge">{{getCountByCateId(-1)}}</span>
                </a>
              </li>
              <li class="divider"></li>
              <li v-for="item in this.$store.state.aHelper.getCateEnumData()" :key="item.id" @click="setCateId(item.id)">
                <a>
                  {{item.value}}
                  <span class="count badge">{{getCountByCateId(item.id)}}</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import ItemData from '@/model/ItemData';
import { Component, Vue } from 'vue-property-decorator';

// ***子组件注解
@Component
export default class MenuBar extends Vue{
  /**新建标签 */
  addText():void{
    let item:ItemData = new ItemData(-1, 0);
    this.$store.commit('editMemo', item);
  }

  /**根据分类获取日记的数量 */
  getCountByCateId(cid:number):any{
    let list:Array<any> = this.$store.state.aHelper.memoList;
    if(cid <= -1){
      return list.length;
    }else{
      return list.filter((ele:any) => {
        return ele.cateId == cid;
      }).length;
    }
  }

  /**获取分类id */
  setCateId(cid: any):void{
    this.$store.commit('setCateId', cid);
  }

}
</script>