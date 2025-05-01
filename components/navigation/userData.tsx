"use client";
import useSessionStore from "@/store/session";

type UserData = {
  navigateToProfile: () => void;
};

export default function UserData({ navigateToProfile }: UserData) {
  const { data } = useSessionStore();
  return (
    <div className="flex flex-col items-start justify-start">
      <p className="text-[16px] font-semibold cursor-pointer" onClick={navigateToProfile}>
        {data.name}
      </p>
      <p className="text-[12px] font-semibold cursor-pointer">{data.userCategory.name}</p>
    </div>
  );
}
