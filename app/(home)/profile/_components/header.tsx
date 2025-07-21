"use client";
import { useState } from "react";
import { Pencil, Mail, Phone } from "lucide-react";
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

  const contactMethods = {
    EMAIL: data.email,
    WHATSAPP: data.phone,
  };

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

  const ProfileImage = () => {
    const containerClass = clsx(
      "w-[90%] max-w-[250px] h-full max-h-[250px] flex items-center justify-center",
      "rounded-full overflow-hidden cursor-pointer",
      "mb-4",
      "transition-all duration-300 ease-in-out"
    );
    return (
      <div className={containerClass} onClick={toggleExpandImage}>
        <Image
          src={image}
          alt="perfil"
          className="w-full h-full object-cover"
          width={90}
          height={90}
          priority
        />
      </div>
    );
  };

  const UserResume = () => {
    const containerClass = clsx("w-full flex flex-col items-center justify-start", "px-4 py-2");
    const contactContainerClass = clsx("w-full flex flex-col items-center justify-center");
    const contactClass = clsx("text-base font-semibold flex items-center gap-2");
    return (
      <div className={containerClass}>
        <span className="text-2xl font-semibold">
          {data?.name?.split(" ")[0]} {data?.surnames?.split(" ")[0]}
        </span>
        <span className="text-lg font-semibold mb-1">
          {data?.address || "Sin dirección"}, {data?.county?.county || ""}, {data?.city?.city || ""}
        </span>
        {data?.preferredContactMethod === "EMAIL" && (
          <div className={contactContainerClass}>
            <span className={contactClass}>
              <Mail size={16} className="text-primary" />
              {contactMethods[data.preferredContactMethod]}
            </span>
          </div>
        )}
        {data.preferredContactMethod === "WHATSAPP" && (
          <div className={contactContainerClass}>
            <span className={contactClass}>
              <Phone size={16} className="text-primary" />
              {contactMethods[data?.preferredContactMethod]}
            </span>
          </div>
        )}
        {data?.preferredContactMethod === "ALL" && (
          <div className={contactContainerClass}>
            <span className={contactClass}>
              <Mail size={16} className="text-primary" /> {data?.email}
            </span>
            <span className={contactClass}>
              <Phone size={16} className="text-primary" /> +56{data?.phone}
            </span>
          </div>
        )}
        <div className="w-full flex items-center justify-center gap-2 mt-2">
          <span className="text-base font-semibold">Puntos: </span>
          <span className="text-lg font-semibold text-primary">{data?.points}</span>
        </div>
      </div>
    );
  };

  const AccountEdit = () => {
    const containerClass = clsx("w-full flex items-center justify-center gap-4");
    const actionClass = clsx("flex items-center mt-2");
    const textClass = clsx("text-base font-semibold text-primary cursor-pointer mr-2");
    return (
      <div className={containerClass}>
        <div className={actionClass} onClick={toggleEdit}>
          <span className={textClass}>Editar perfil</span>
          <Pencil size={16} className="text-primary" />
        </div>
        <div className={actionClass} onClick={() => {}}>
          <span className={textClass}>Editar suscripción</span>
          <Pencil size={16} className="text-primary" />
        </div>
      </div>
    );
  };

  return (
    <div className={clsx("relative w-full flex flex-col items-center justify-start", "px-4 py-2 mt-4 mb-8")}>
      <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-start md:justify-center gap-2">
        <ProfileImage />
        <div className="flex flex-col items-center justify-start">
          <UserResume />
          <AccountEdit />
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
