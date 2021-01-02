export type User = {
    email: string,
    password: string,
    admin?: boolean,
    createdAt: Date,
    notes: [{
        title: string,
        content: string
    }]
}