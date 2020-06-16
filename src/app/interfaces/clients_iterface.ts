export interface Client {
        status?: boolean;
        _id?: string;
        name?: string;
        email?: string;
        password: string,
        country?: string;
        city?: string;
        location?: string,
        zip_code?: number,
        date_of_register?: Date;
        token?: string;
}


