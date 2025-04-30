import LoginLayout from "./components/loginLayout";
import Image from "next/image";
import ActionPanel from "./components/actionPanel";
import Wrapper from "./components/wrapper";

export default function LoginPage() {
  return (
    <LoginLayout>
      <Wrapper>
        <div className="w-[380px] h-[90px]">
          <Image src={"/logo.png"} alt="Ekoru" className="w-full h-full" width={4096} height={996} />
        </div>
      </Wrapper>
      <Wrapper>
        <ActionPanel />
      </Wrapper>
    </LoginLayout>
  );
}
