export const ENVIRONMENT = process.env.ENVIRONMENT || "development";
export const GRAPHQL_URL = ENVIRONMENT !== "development" ? "http://gateway:4000" : "http://localhost:4000";
export const REST_URL = ENVIRONMENT !== "development" ? "http://gateway:4000/auth" : "http://localhost:4000/auth";
