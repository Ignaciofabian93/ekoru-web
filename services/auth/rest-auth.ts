import { REST_URL } from "@/config/environment";

export default async function Login({ email, password }: { email: string; password: string }) {
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  };
  const response = await fetch(REST_URL, options);
  const data = await response.json();
  return data;
}
