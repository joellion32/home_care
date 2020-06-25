

export interface User {
        status?: boolean;
        _id?: string;
        name?: string;
        email?: string;
        password: string,
        telephone?: string,
        country?: string;
        city?: string;
        location?: string,
        zip_code?: number,
        date_of_register?: Date;
        token?: string;
        profession?: Array<String>,
        description?: string,
        id_suscription?: string
}


