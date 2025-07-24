type Environment = "development" | "qa" | "production";

// Remove quotes from env values if present (Docker sometimes passes them as strings)
function cleanEnv(env: string | undefined): Environment {
  if (!env) return "development";
  return env.replace(/['"]/g, "") as Environment;
}

export const ENVIRONMENT: Environment = cleanEnv(process.env.ENVIRONMENT) || "development";
console.log(`Current environment: ${ENVIRONMENT}`);

const gatewayUrls: Record<Environment, string> = {
  development: "http://localhost:4000",
  qa: "https://qa.gateway.ekoru.cl",
  production: "https://gateway.ekoru.cl",
};

export const GRAPHQL_URL = `${gatewayUrls[ENVIRONMENT]}/graphql`;
export const REST_URL = `${gatewayUrls[ENVIRONMENT]}/session`;
