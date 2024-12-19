export const env = {
    server: {
        port: process.env.SERVER_PORT
            ? parseInt(process.env.SERVER_PORT)
            : 4001,
    },
};
