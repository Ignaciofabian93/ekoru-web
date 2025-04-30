export const ENVIRONMENT = "development";
export const GRAPHQL_URL = ENVIRONMENT !== "development" ? "http://74.208.96.137:4000" : "http://localhost:4000";
export const REST_URL = ENVIRONMENT !== "development" ? "http://74.208.96.137:4000/auth" : "http://localhost:4000/auth";
