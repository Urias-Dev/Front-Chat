import axios from "axios";
import {LoginData, Message, RegisterData} from "./interfaces" ;

const API = axios.create({baseURL: 'http://localhost:3000'})

export const createUser = async (formData: RegisterData) => {
    const query = await API.post('/user-create', formData);
    return query
}

export const findUser = async () => {
    const query = await API.get('/find_all')
    return query.data.data;
}

export const login = (data: LoginData) => {
    return API.post('/login', data)
}

export const finUserById = (id: number) => {
    return API.get('/findone_user/' + id)
}

export const updateUser = (user_id: number, data: RegisterData) => {
    return API.put('/update_user/' + user_id, data)
}

export const sendMessage = async (messages: Message) => {
    return await API.post('/create_messages', messages)
}

export const getChatId = async (id1: number, id2: number) => {
    const query = await API.get('/findChat/' + id1 + '/' + id2)
    const id = query.data.id_conversacion;
    console.log(id)
    return id
}

export const findChat = async (id1: number, id2: number) => {
    const query = await API.get('/findChat/' + id1 + '/' + id2)
    return query.data
}

