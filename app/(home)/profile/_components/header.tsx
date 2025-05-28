"use client";
import { Pencil } from "lucide-react";
import Modal from "@/components/modal/modal";
import useSessionStore from "@/store/session";
import clsx from "clsx";
import Image from "next/image";
import ProfileForm from "./form";

export default function ProfileHeader() {
  const { data, edit, toggleEdit } = useSessionStore();
  const image = data?.profileImage || "/brandIcon.webp";

  return (
    <div className={clsx("relative w-full flex items-center justify-start", "px-8 py-2 mt-4 mb-8")}>
      <div className={clsx("w-[90px] h-[90px] rounded-full overflow-hidden", "mr-8", "bg-white")}>
        <Image src={image} alt="perfil" className="w-full h-full object-cover" width={90} height={90} />
      </div>
      <div className="flex flex-col items-start justify-center">
        <span className="text-[20px] font-semibold">
          {data.name.split(" ")[0]} {data?.surnames.split(" ")[0]}
        </span>
        <span className="text-[14px] font-semibold">
          {data.address || "Sin dirección"}, {data?.county?.county || ""}, {data?.city?.city || ""}
        </span>
        <div className="flex items-center mt-2" onClick={toggleEdit}>
          <span className="text-[14px] font-semibold text-primary cursor-pointer mr-2">Editar perfil</span>
          <Pencil size={16} className="text-primary" />
        </div>
      </div>
      {edit && (
        <Modal title="Editar Perfil" close={toggleEdit}>
          <ProfileForm />
        </Modal>
      )}
    </div>
  );
}
