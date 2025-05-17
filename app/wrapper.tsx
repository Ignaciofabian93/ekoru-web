import Providers from "./providers";
import { cookies } from "next/headers";

export default async function AppWrapper({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get("token")?.value;
  console.log("WRAPPER TOKEN::", token);

  return <Providers token={token}>{children}</Providers>;
}
