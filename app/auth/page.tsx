import LoginLayout from "./components/loginLayout";
import Image from "next/image";
import ActionPanel from "./components/actionPanel";
import Wrapper from "./components/wrapper";

export default function LoginPage() {
  return (
    <LoginLayout>
      <section className="w-full h-1/4 flex items-center justify-center">
        <div className="w-[80%] h-auto md:w-[50%]">
          <Image src={"/logo.png"} alt="Ekoru" className="w-full h-full" width={4096} height={996} />
        </div>
      </section>
      <Wrapper>
        <ActionPanel />
      </Wrapper>
    </LoginLayout>
  );
}
