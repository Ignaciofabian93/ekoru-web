"use client";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/modal/modal";
import useSessionStore from "@/store/session";
import clsx from "clsx";
import Image from "next/image";
import ProfileForm from "./form";

export default function ProfileHeader() {
  const { data, edit, toggleEdit } = useSessionStore();
  const [expandImage, setExpandImage] = useState<boolean>(false);
  const image = data?.profileImage || "/brandIcon.webp";

  const toggleExpandImage = () => setExpandImage(!expandImage);

  const ExpandedImageView = () => {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={toggleExpandImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-[260px] h-[260px] md:w-[320px] md:h-[320px] lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden relative shadow-xl border-4 border-white"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Image src={image} alt="perfil" className="object-cover" fill priority />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className={clsx("relative w-full flex items-center justify-start", "px-8 py-2 mt-4 mb-8")}>
      <div
        className={clsx("w-[90px] h-[90px] rounded-full overflow-hidden", "mr-8", "bg-white", "cursor-pointer")}
        onClick={toggleExpandImage}
      >
        <Image src={image} alt="perfil" className="w-full h-full object-cover" width={90} height={90} priority />
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
      <AnimatePresence>{expandImage && <ExpandedImageView />}</AnimatePresence>
    </div>
  );
}
