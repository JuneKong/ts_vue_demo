<template>
    <div id="memos" class="container">
        <MemoItem v-for="item in filterList()" :key="item.id" :data="item"/>
    </div>
</template>

<script lang="ts">
import ItemData from '@/model/ItemData'
import MemoItem from './MemoItem.vue'
import {Component, Vue} from 'vue-property-decorator'

@Component({
    components: {
        MemoItem
    }
})
export default class ItemList extends Vue{
    dataList: Array<ItemData> = this.$store.state.aHelper.memoList;

    /**筛选列表 */
    filterList():Array<ItemData>{
        let cid = this.$store.state.filterCateId;
        if(cid <= -1){
            return this.dataList;
        }else{
            return this.dataList.filter((ele:any) => {
                return ele.cateId == cid;
            });
        }
    }
}
</script>