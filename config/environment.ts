export const ENVIRONMENT = process.env.ENVIRONMENT || "development";
export const GRAPHQL_URL = ENVIRONMENT !== "development" ? "https://gateway.ekoru.cl" : "http://localhost:4000";
export const REST_URL = ENVIRONMENT !== "development" ? "https://gateway.ekoru.cl/auth" : "http://localhost:4000/auth";
