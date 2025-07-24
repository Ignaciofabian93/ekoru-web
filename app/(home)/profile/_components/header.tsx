"use client";
import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/modal/modal";
import useSessionStore from "@/store/session";
import clsx from "clsx";
import Image from "next/image";
import ProfileForm from "./form";
import Button from "@/components/buttons/button";

export default function ProfileHeader() {
  const { data, edit, toggleEdit } = useSessionStore();
  const [expandImage, setExpandImage] = useState<boolean>(false);
  const image = data?.profileImage || "/brandIcon.webp";
  const coverImage = data?.coverImage || null;

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
            className="w-[220px] h-[220px] md:w-[260px] md:h-[260px] lg:w-[320px] lg:h-[320px] rounded-full overflow-hidden relative shadow-xl border-4 border-white"
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
    <div className={clsx("relative w-full flex flex-col items-center justify-start p-0 mb-8")}>
      {/* Cover Image Section */}
      <div
        className={clsx(
          "w-[95%] min-h-[300px] h-full max-h-[400px] relative flex items-center justify-center mb-8 mt-4",
          "rounded-[11px] overflow-hidden",
          coverImage ? "bg-transparent" : "bg-gradient-to-r from-primary/30 to-secondary/30"
        )}
      >
        {coverImage ? (
          <Image src={coverImage} alt="cover" fill className="object-cover w-full h-full" priority />
        ) : (
          <div className="w-full h-full" />
        )}
      </div>
      {/* Profile Card overlays the cover */}
      <div
        className={clsx(
          "w-[80%] max-w-[740px] mx-auto -mt-14 z-10 relative",
          "bg-white rounded-2xl shadow-xl flex flex-col md:flex-row items-center px-6 py-8 gap-6"
        )}
      >
        {/* Profile Image - centered left, smaller, no dark classes */}
        <div className="flex-shrink-0 flex items-center justify-center md:justify-start w-full md:w-auto md:mr-8">
          <div
            className={clsx(
              "w-[180px] h-[180px]",
              "rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer bg-neutral-200"
            )}
            onClick={toggleExpandImage}
          >
            <Image
              src={image}
              alt="perfil"
              className="object-cover w-full h-full"
              width={280}
              height={280}
              priority
            />
          </div>
        </div>
        {/* User Info and Actions */}
        <div className="flex flex-col items-center md:items-start flex-1 gap-2">
          {/* Name and location */}
          <span className="text-2xl font-bold text-primary mb-1">
            {data?.name?.split(" ")[0]} {data?.surnames?.split(" ")[0]}
          </span>
          <span className="text-base font-medium text-main mb-1">
            {data?.address || "Sin dirección"}
            {data?.county?.county ? `, ${data.county.county}` : ""}
            {data?.city?.city ? `, ${data.city.city}` : ""}
          </span>
          {/* Contact */}
          <div className="flex flex-col md:flex-row items-center gap-2">
            {data?.preferredContactMethod === "EMAIL" && (
              <span className="flex items-center gap-2 text-base font-semibold">
                <Mail size={16} className="text-primary" />
                {contactMethods[data.preferredContactMethod]}
              </span>
            )}
            {data?.preferredContactMethod === "WHATSAPP" && (
              <span className="flex items-center gap-2 text-base font-semibold">
                <Phone size={16} className="text-primary" />
                {contactMethods[data?.preferredContactMethod]}
              </span>
            )}
            {data?.preferredContactMethod === "ALL" && (
              <>
                <span className="flex items-center gap-2 text-base font-semibold">
                  <Mail size={16} className="text-primary" /> {data?.email}
                </span>
                <span className="flex items-center gap-2 text-base font-semibold">
                  <Phone size={16} className="text-primary" /> +56{data?.phone}
                </span>
              </>
            )}
          </div>
          {/* Actions */}
          <div className="flex items-center gap-4 mt-4 w-[140px]">
            <Button text="Editar perfil" variant="primary" onClick={toggleEdit} size="full" />
          </div>
        </div>
      </div>
      {/* Modal and Expanded Image */}
      {edit && (
        <Modal title="Editar Perfil" close={toggleEdit}>
          <ProfileForm />
        </Modal>
      )}
      <AnimatePresence>{expandImage && <ExpandedImageView />}</AnimatePresence>
    </div>
  );
}
