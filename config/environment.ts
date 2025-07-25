type Environment = "development" | "qa" | "production";

export const ENVIRONMENT: Environment = (process.env.ENVIRONMENT as Environment) || "development";
console.log(`Current environment: ${ENVIRONMENT}`);

const gatewayUrls: Record<Environment, string> = {
  development: "http://localhost:4000",
  // development: "https://gateway.ekoru.cl",
  qa: "https://qa.gateway.ekoru.cl",
  production: "https://gateway.ekoru.cl",
};

export const GRAPHQL_URL = `${gatewayUrls[ENVIRONMENT]}/graphql`;
export const REST_URL = `${gatewayUrls[ENVIRONMENT]}/session`;
