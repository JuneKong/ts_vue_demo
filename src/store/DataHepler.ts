/**
 * 缓存
 */
class DataHelper{
    key!: string;
    primaryKey!: string;

    constructor(key:string, pKey: string = 'id'){
        this.key = key;
        this.primaryKey = pKey;
    }

    /**读取数据 */
    readData(): any{
        let data: string | null = localStorage.getItem(this.key);
        let list: any = [];
        if(data != null){
            list = JSON.parse(data as string);
        }
        return list;
    }

    /**保存数据 */
    saveData(list:any): void{
        let str:string = JSON.stringify(list);
        localStorage.setItem(this.key, str);
    }

    /**添加数据 */
    addData(item:any):number{
        //1.读取数据
        let data: Array<any> = this.readData() || [];
        //2.创建新对象数据
        let id = data.length > 0 ? (data[data.length - 1][this.primaryKey] + 1) : 1;
        item[this.primaryKey] = id;
        //3.添加到列表中
        data.push(item);
        //4.更新缓存中的数据
        this.saveData(data);
        return id;
    }

    /**根据id删除缓存数据 */
    removeDataById(id:string | number):boolean{
        let data = this.readData() || [];
        let idx = data.findIndex((ele:any) => {
            return ele[this.primaryKey] == id;
        })
        if(idx > -1){
            data.splice(idx, 1);
            this.saveData(data);
            return true;
        }
        return false;
    }

}

export default DataHelper;