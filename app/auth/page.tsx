import LoginLayout from "./_layout";
import Wrapper from "./_components/wrapper";
import Image from "next/image";
import ActionPanel from "./_components/actionPanel";

export default function LoginPage() {
  return (
    <LoginLayout>
      <Wrapper>
        <div className="w-[380px] h-[90px]">
          <Image src={"/logo.png"} alt="ekoru" className="w-full h-full" width={4096} height={996} />
        </div>
      </Wrapper>
      <Wrapper>
        <ActionPanel />
      </Wrapper>
    </LoginLayout>
  );
}
