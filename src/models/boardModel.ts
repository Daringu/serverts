import { Schema, model } from "mongoose";

export const Board = new Schema({
 
    todos:[{
        type:Schema.Types.ObjectId,
        ref:'todo',
    }]
})

export default model('board',Board)
