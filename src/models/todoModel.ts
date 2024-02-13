import { Schema, model } from "mongoose";

export const Todo = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    order:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true
    }
})
const todoModel = model('todo',Todo)
export default todoModel