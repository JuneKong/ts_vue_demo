<template>
    <!-- 便签新增/编辑区 -->
  <div>
    <div class="cover-layer"></div>
    <div id="new-markdown"
         class="editor-layer">
      <div class="editor-top">
        <input class="editor-title form-control"
               type="text"
               placeholder="标题" v-model="data.title"/>
        <div class="dropdown select-category">
          <button class="btn btn-default dropdown-toggle"
                  data-toggle="dropdown">
            <span class="category">{{this.$store.state.aHelper.getCateName(data.cateId > -1 ? data.cateId: 0)}}</span>
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li @click="setCateId(0)">
              <a>工作</a>
            </li>
            <li @click="setCateId(1)">
              <a>生活</a>
            </li>
            <li @click="setCateId(2)">
              <a>学习</a>
            </li>
          </ul>
        </div>
        <ul class="tools">
          <li class="save" @click="saveDiary"></li>
          <li class="cancel" @click="closeEditor"></li>
        </ul>
      </div>
      <textarea class="text-content form-control"
                placeholder="内容" v-model="data.content"></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import Categroy from '@/model/CateEnum';
import ItemData from '@/model/ItemData'
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class MemoEditor extends Vue{
    data!: ItemData;

    /**钩子函数---创建时触发 */
    created():void{
        this.data = this.$store.state.memoData;
        this.$store.commit('showEditor', true);
    }

    /**关闭编辑区 */
    closeEditor():void{
        this.$store.commit('showEditor', false);
    }

    /**设置分类id */
    setCateId(cateId: Categroy){
        if(this.data){
            this.data.cateId = cateId;
        }
    }

    /**保存日记 */
    saveDiary():void{
        // 检查日记对象的数据是否合理
        if(this.data && this.data.cateId > -1 && this.data.title.trim().length > 0 && this.data.content.trim().length > 0){
            // 保存数据
            if(this.data.id > -1){//编辑
                this.$store.state.aHelper.editData(this.data);
            }else{//新增
                this.$store.state.aHelper.addData(this.data);
            }
            this.closeEditor();
        }else{
            window.alert('输入数据有误，请重新输入！');
        }
    }

}
</script>