import LoginLayout from "./_ui/loginLayout";
import Image from "next/image";
import ActionPanel from "./_ui/actionPanel";

export default function LoginPage() {
  return (
    <LoginLayout>
      <section className="w-full h-[30%] flex items-center justify-center">
        <div className="w-[80%] max-w-[240px] h-auto md:w-[50%] transition-all duration-300 ease-in-out">
          <Image
            src={"/branding/logo.webp"}
            alt="EKORU"
            className="w-full h-full"
            width={4096}
            height={996}
            priority
          />
        </div>
      </section>
      <section className="w-full h-[60%] flex flex-col items-center justify-start p-4 md:justify-center transition-all duration-300 ease-in-out">
        <ActionPanel />
      </section>
    </LoginLayout>
  );
}
