/**
 * 操作类
 */

import DataHelper from './DataHepler';
import ItemData from '../model/ItemData';
import Categroy from '@/model/CateEnum';

class ActionHelper{
    dateHelper: DataHelper;
    memoList!: Array<ItemData>;

    constructor(){
        // 读取数据
        this.dateHelper = new DataHelper('data');
        this.memoList = this.readData();
    }

    /**读取数据 */
    readData(): Array<ItemData>{
        // 读取缓存中的数据
        let arrObj = this.dateHelper.readData();
        // 转换成itemData类型
        let item: ItemData;
        let arrItem = arrObj.map((ele: any) => {
            item = new ItemData();
            item.id = ele.id;
            item.cateId = ele.cateId;
            item.title = ele.title;
            item.content = ele.content;
            item.createTime = ele.createTime;
            return item;
        })
        return arrItem;
    }

    /**添加数据 */
    addData(item:ItemData):number{
        // 1.保存到本地缓存中
        item.id = this.dateHelper.addData(item);
        // 2.添加到列表中
        this.memoList.push(item);
        // 3.更新
        // this.dateHelper.saveData(this.memoList);
        return item.id;
    }

    /**修改数据 */
    editData(item:ItemData):boolean{
        //1.在列表中找到对应的item;
        let editItem: ItemData | undefined = this.memoList.find((ele:any) => {
            return ele.id === item.id;
        });
        // 2.修改数据
        if(editItem){
            editItem.cateId = item.cateId;
            editItem.title = item.title;
            editItem.content = item.content;
            // 3.更新缓存数据
            this.dateHelper.saveData(this.memoList);
            return true;
        }
        return false;
    }

    /**删除数据 */
    removeData(id:number):boolean{
        // 1.根据id找到需要删除的item的下标
        let index: number = this.memoList.findIndex((ele:any) => {
            return ele.id === id;
        });
        // 2.删除列表中对应下标的item
        if(index != -1){
            this.memoList.splice(index, 1);
            // 3.更新缓存数据
            this.dateHelper.saveData(this.memoList);
            return true;
        }
        return false;
    }

    /**获取分类名称 */
    getCateName(tag: Categroy):string{
        let names: Array<string> = ['工作', '生活', '学习'];
        return names[tag];
    }
}

export default ActionHelper;