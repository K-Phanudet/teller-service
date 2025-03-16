export const config = {
    JWT_SECRET: process.env.JWT_SECRET ?? "",
    JWT_EXPIRATION: process.env.JWT_EXPIRATION ?? "1"
}