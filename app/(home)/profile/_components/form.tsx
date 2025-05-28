import { useRef, useState } from "react";
import Button from "@/components/buttons/button";
import TextInput from "@/components/textInput/input";
import clsx from "clsx";
import Image from "next/image";
import useProfile from "../_hooks/useProfile";
import Select from "@/components/select/select";
import DateInput from "@/components/datepicker/datepicker";
import PhoneInput from "@/components/textInput/phone";

export default function ProfileForm() {
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const {
    formData,
    handleFormData,
    handleDate,
    handleProfileImage,
    handleSubmit,
    counties,
    countries,
    cities,
    regions,
    handleCountry,
    handleCounty,
    handleCity,
    handleRegion,
    updateLoading,
  } = useProfile();
  const [previewImage, setPreviewImage] = useState<string>(formData.profileImage || "/brandIcon.webp");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
        handleProfileImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const openFilePicker = () => {
    galleryInputRef.current?.click();
  };

  const ProfileImage = () => {
    return (
      <div className="w-full flex flex-col items-center justify-center mb-8">
        <div className={clsx("w-[100px] h-[100px] rounded-full overflow-hidden", "bg-white", "mb-4")}>
          <Image src={previewImage} alt="perfil" className="w-full h-full object-cover" width={100} height={100} />
        </div>
        <div className="px-4 py-1 border-[2px] border-primary bg-white rounded-[11px] shadow-md shadow-slate-950/10 cursor-pointer">
          <span onClick={openFilePicker}>Cambiar foto</span>
          <input ref={galleryInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </div>
      </div>
    );
  };

  const rowClassname = "w-full flex flex-col lg:flex-row lg:gap-4 transition-all duration-300 ease-in-out";

  return (
    <div className="w-full min-h-fit h-full flex flex-col items-start justify-start">
      <ProfileImage />
      <form className="w-full" onSubmit={handleSubmit}>
        {/* NAMES */}
        <div className={rowClassname}>
          {formData.isCompany ? (
            <TextInput
              key={"businessName"}
              name="businessName"
              placeholder="Razón Social"
              type="text"
              value={formData.businessName}
              onChange={handleFormData}
              hasLabel
              labelText="Razón social"
            />
          ) : (
            <>
              <TextInput
                key={"name"}
                name="name"
                placeholder="Nombre"
                type="text"
                value={formData.name}
                onChange={(e) => handleFormData(e)}
                hasLabel
                labelText="Nombre"
              />

              <TextInput
                key={"surnames"}
                name="surnames"
                placeholder="Apellido(s)"
                type="text"
                value={formData.surnames}
                onChange={handleFormData}
                hasLabel
                labelText="Apellido(s)"
              />
            </>
          )}
        </div>

        {/* EMAIL & PHONE */}
        <div className={rowClassname}>
          <TextInput
            key={"email"}
            name="email"
            placeholder="Email"
            type="text"
            value={formData.email}
            onChange={handleFormData}
            hasLabel
            labelText="Email"
          />
          <PhoneInput
            key={"phone"}
            name="phone"
            value={formData.phone}
            onChange={handleFormData}
            hasLabel
            labelText="Celular"
          />
        </div>

        {/* COUNTRY & REGION */}
        <div className={rowClassname}>
          <Select
            name="country"
            options={countries.map((c) => ({ label: c.country, value: c.id }))}
            value={formData.country.id}
            onChange={handleCountry}
            hasLabel
            labelText="País"
            disabled
          />
          <Select
            name="region"
            options={regions.map((r) => ({ label: r.region, value: r.id }))}
            value={formData.region.id}
            onChange={handleRegion}
            labelText="Region"
            hasLabel
          />
        </div>

        {/* CITY & COUNTY */}
        <div className={rowClassname}>
          <Select
            name="city"
            options={cities.map((c) => ({ label: c.city, value: c.id }))}
            value={formData.city.id}
            onChange={handleCity}
            labelText="Ciudad"
            hasLabel
          />
          <Select
            name="county"
            options={counties.map((c) => ({ label: c.county, value: c.id }))}
            value={formData.county.id}
            onChange={handleCounty}
            labelText="Comuna"
            hasLabel
          />
        </div>

        {/* ADDRESS & BIRTHDAY */}
        <div className={rowClassname}>
          <TextInput
            key={"address"}
            name="address"
            placeholder="Dirección"
            type="text"
            value={formData.address}
            onChange={handleFormData}
            hasLabel
            labelText="Dirección"
          />
          <DateInput hasLabel labelText="Fecha de nacimiento" value={formData.birthday} onChange={handleDate} />
        </div>
        <div className="w-full flex items-center justify-center mt-8">
          <Button text="Guardar" variant="primary" size="full" type="submit" isLoading={updateLoading} />
        </div>
      </form>
    </div>
  );
}
