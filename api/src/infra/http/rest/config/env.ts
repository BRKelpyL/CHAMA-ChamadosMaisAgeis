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
};
