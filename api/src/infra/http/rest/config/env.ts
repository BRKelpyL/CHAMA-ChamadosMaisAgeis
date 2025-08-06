export const env = {
    server: {
        port: process.env.SERVER_PORT
            ? parseInt(process.env.SERVER_PORT)
            : 4001,
    },
    auth: {
        secret: process.env.AUTH_SECRET
            ? process.env.AUTH_SECRET
            : "CanYouPleasePassAKey",
    },
    root_user:{
        name: process.env.ROOT_USER_NAME ? process.env.ROOT_USER_NAME : "admin",
        email: process.env.ROOT_USER_EMAIL ? process.env.ROOT_USER_EMAIL : "admin@admin.com",
        password: process.env.ROOT_USER_PASSWORD ? process.env.ROOT_USER_PASSWORD : "admin"
    }
};
