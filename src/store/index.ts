/**
 * 数据共享文件
 */
import Vuex from 'vuex';
import Vue from 'vue';
import ActionHelper from './ActionHelper';

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        aHelper: new ActionHelper(),
        isShowEditor: false,//是否显示编辑区
        memoData: null,//新建和修改日记时，两个组件之间传递数据的桥梁
        filterCateId: -1, //获取对应分类id的列表， 同上
    },
    mutations: {
        showEditor(state:any, is: boolean):void{
            state.isShowEditor = is;
        },
        editMemo(state:any, memo:any):void{
            state.memoData = memo;
            this.commit('showEditor', true);
        },
        setCateId(state:any, cateId: any):void{
            state.filterCateId = cateId;
        },
    }
});

export default store;