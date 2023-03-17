export interface LoginData {
    correo: string,
    pass: string
}

export interface Message {
    id?: number;
    contenido: string;
    id_usuario_env: number;
    id_conversacion: number;
    fecha: string
}

export interface RegisterData {
    user_id?: number,
    nombre?: string,
    apellido_p?: string,
    apellido_m?: string,
    pass?: string,
    correo?: string,
    foto?: string,
    status?: boolean
}

export interface getId {
    id: number,
    status: boolean;
}


