import boardModel from "../models/boardModel";
import { Server, Socket } from "socket.io"; 
import TodoDto from "../dtos/TodoDto";
import todoModel from "../models/todoModel";

export type cardType = 'todo' | 'inprogress' | 'done';
export interface CardDto {
    title: string;
    description: string;
    order: number;
    type: cardType;
    id: string;
}

export interface ICreateDTO {
    todo:CardDto,
    boardId:string
}

 const handleCreateTodo = async (io:Server,socket:Socket,data:ICreateDTO)=>{
    const todo = await todoModel.create({
        ...data.todo
    })
    await boardModel.findByIdAndUpdate(data.boardId,{
        $push:{
            todos:todo._id
        }
    })
    
    io.to(data.boardId).emit('new-todo',{todo:new TodoDto(todo as CardDto)})
}
const handleUpdateTodo = async (io:Server,socket:Socket,data:ICreateDTO)=>{
    
    const todo = await todoModel.findByIdAndUpdate(data.todo.id,{
        ...data.todo
    })
    const updatedTodo = await todoModel.findById(data.todo.id)
    
    io.to(data.boardId).emit('updated-todo',{todo:new TodoDto(updatedTodo as CardDto)})
}
const handleJoinBoard=async (io:Server,socket:Socket,boardId:string) =>{
    socket.join(boardId)
    const todos:{todos:[any]} = await boardModel.findById(boardId).populate('todos')
    
    socket.emit('populated-todos',{todos:todos.todos.map(e=>new TodoDto(e))})
}

const handleCreateBoard = async (io:Server,socket:Socket)=>{
    const board = await boardModel.create({
    })
    
    socket.emit('board-created',{id:board.id});
}
const handleDelteTodo = async (io:Server,socket:Socket,data:{todoId:string,boardId:string})=>{
    await todoModel.findByIdAndDelete(data.todoId)
    await boardModel.findByIdAndUpdate(data.boardId,{
        $pull:{
            todos:data.todoId
        }
    })
    
    io.to(data.boardId).emit('deleted-todo',{todoId:data.todoId})
}
exports.handlers = {
    handleCreateTodo,
    handleJoinBoard,
    handleCreateBoard,
    handleUpdateTodo,
    handleDelteTodo
}