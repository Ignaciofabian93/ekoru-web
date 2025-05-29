"use client";
import useSessionStore from "@/store/session";
import clsx from "clsx";
import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";

type UserData = {
  navigateToProfile: () => void;
};

export default function UserData({ navigateToProfile }: UserData) {
  const { data } = useSessionStore();
  const router = useRouter();

  return (
    <div className="flex items-start justify-start">
      <div className="mr-4 ml-2 lg:hidden cursor-pointer" onClick={() => router.push("/profile")}>
        <CircleUserRound size={26} />
      </div>
      <div className={clsx("hidden lg:flex flex-col", "mx-4", "min-w-[140px]")}>
        <p className="text-[16px] font-semibold cursor-pointer" onClick={navigateToProfile}>
          {data.name}
        </p>
        <p className="text-[12px] font-semibold cursor-pointer">{data.userCategory?.name ?? "Reciclador amateur"}</p>
      </div>
    </div>
  );
}
