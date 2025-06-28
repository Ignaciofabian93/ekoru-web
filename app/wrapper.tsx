import Providers from "./providers";
import { cookies } from "next/headers";

export default async function AppWrapper({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get("token")?.value;
  const refreshToken = (await cookies()).get("refreshToken")?.value;
  console.log("token:", token);
  console.log("refreshToken:", refreshToken);

  return (
    <Providers token={token} refreshToken={refreshToken}>
      {children}
    </Providers>
  );
}
