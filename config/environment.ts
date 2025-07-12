type Environment = "development" | "qa" | "production";

export const ENVIRONMENT: Environment = (process.env.ENVIRONMENT as Environment) || "development";

const gatewayUrls: Record<Environment, string> = {
  development: "http://localhost:4000",
  qa: "https://gateway_qa.ekoru.cl",
  production: "https://gateway_prod.ekoru.cl",
};

export const GRAPHQL_URL = `${gatewayUrls[ENVIRONMENT]}/graphql`;
export const REST_URL = `${gatewayUrls[ENVIRONMENT]}/session`;
