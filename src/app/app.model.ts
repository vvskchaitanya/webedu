export interface User{
    id:string,
    name:string,
    firstName:string,
    lastName:string,
    phoneNumber:string,
    email:string,
    image:string
}

export interface Assessment{
    id:string,
    name:string,
    course:string,
    duration:number,
    questions:Question[],
}

export interface Question{
    id:string,
    question:string,
    options:Option[];
}

export interface Option{
    id:string,
    correct:boolean,
    selected:boolean
}

export interface Course{
    id?:string,
    name:string,
    description:string,
    category:string,
    image:string,
    route?:string
}