class TodoDto {
    id:string;
    description:string;
    order:number;
    type:string;
    title:string
    constructor({id,description,order,type,title}:{id:string,description:string,order:number,type:string,title:string}){
        this.id = id;
        this.description = description
        this.order = order
        this.type = type
        this.title = title
    }
}

export default TodoDto