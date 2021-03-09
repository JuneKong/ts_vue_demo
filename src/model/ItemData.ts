/**
 * 列表子项模型
 */

import Categroy from './CateEnum';

class ItemData{
    id: number;
    cateId: Categroy;
    title: string;
    content: string;
    createTime: string;

    constructor(id:number = -1, cateId: Categroy = -1, title: string = '', content: string = ''){
        this.id = id;
        this.cateId = cateId;
        this.title = title;
        this.content = content;
        this.createTime = this.getDate(Date.now());
    }

    getDate(date:number): string{
        let currDate = new Date(date);
        let str = currDate.getFullYear() +'-'+ (currDate.getMonth() + 1) +'-'+ currDate.getDate() +' '+ currDate.getHours() +':'+currDate.getMinutes();
        return str;
    }
}

export default ItemData;