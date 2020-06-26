import Realm from 'realm'
import { rejects } from 'assert'
//Scema name
export const TODOLIST_SCEMA= "TodoList"
export const TODO_SCEMA="Todo"

//Define your models and their properties
export const TodoScema={
    name:TODO_SCEMA,
    primaryKey:"id",
    properties:{
        id:"int",
        name:{type:"string",indexed:true},
        done:{type:"bool",default:false}

    }
}
export const TodoScemaList ={
    name:TODOLIST_SCEMA,
    primaryKey:"id",
    properties:{
        id:"int",
        name:"string",
        createDate:"date",
        todos:{type:'list',objectType:TODO_SCEMA}

    }
}

const DatabaseOptions ={
    path: "todoListApp.realm",
    schema:[TodoScemaList,TodoScema],
    schemaVersion:0 //optional
}

export const insertTodoList = newTodoList => new Promise((resolve,reject)=>{
    Realm.open(DatabaseOptions).then(realm=>{
        realm.write(()=>{
            realm.create(TODO_SCEMA,newTodoList)
            resolve(newTodoList)
        })
    }).catch((err)=>reject(err))
})

export let todoudpatedList = {
    id:Number,
    name:String,
    done:Boolean

}
export const updateTodoList = newTodoList => new Promise((resolve,reject)=>{
   Realm.open(DatabaseOptions).then(realm=>{
       realm.write(()=>{
           
         todoudpatedList = realm.objectForPrimaryKey(TODOLIST_SCEMA,newTodoList.id)
         todoudpatedList.name = newTodoList.name
        resolve()
       })
   }).catch((err)=>reject(err))
})

export const deletTodoItem = todolistid => new Promise((resolve,reject)=>{
    Realm.open(DatabaseOptions).then(realm=>{
        realm.write(()=>{
            let deletTodoItem = realm.objectForPrimaryKey(TODOLIST_SCEMA,todolistid)
            realm.delete(deletTodoItem)
            resolve()
        })
    }).catch((err)=>reject(err))
})

export const deletAllTodoItem = () => new Promise((resolve,reject)=>{
    Realm.open(DatabaseOptions).then(realm=>{
        realm.write(()=>{
            let deletAllItems = realm.objects(TODOLIST_SCEMA)
            realm.delete(deletAllItems)
            resolve()
        })
    }).catch((err)=>reject(err))
})

export const queryTodoItem = () => new Promise((resolve,reject)=>{
    Realm.open(DatabaseOptions).then(realm=>{
        realm.write(()=>{
            let allTodoList = realm.objects(TODOLIST_SCEMA)
            resolve(allTodoList)
        })
    }).catch((err)=>reject(err))
})

export default new Realm(DatabaseOptions)