export const ENVIRONMENT: "development" | "QA" | "production" = "production";
export const GRAPHQL_URL = ENVIRONMENT === "production" ? "http://69.48.204.85:4000" : "http://localhost:4000";
export const REST_URL = ENVIRONMENT === "production" ? "http://69.48.204.85:4000/auth" : "http://localhost:4000/auth";
