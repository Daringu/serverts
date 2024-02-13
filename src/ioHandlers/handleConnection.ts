import { Server, Socket } from "socket.io"
import { ICreateDTO } from "./todoHandlers";
const {handlers}= require('./todoHandlers')
const {handleCreateTodo,handleJoinBoard,handleCreateBoard,handleUpdateTodo,handleDelteTodo}=handlers;

interface IDataBoard{
    id:string
}

export const handleConnection=(io:Server,socket:Socket)=>{
    socket.on('join-board',(data:IDataBoard)=>{
        handleJoinBoard(io,socket,data.id)
    })
    socket.on('create-board',()=>{
        handleCreateBoard(io,socket)
    })
    socket.on('created-todo',(data:ICreateDTO)=>{
        handleCreateTodo(io,socket,data)
    })
    socket.on('update-todo',(data:ICreateDTO)=>{
        handleUpdateTodo(io,socket,data)
    })
    socket.on('delete-todo',(data:{todoId:string,boardId:string})=>{
        handleDelteTodo(io,socket,data)
    })
}

exports.handleConnection = handleConnection