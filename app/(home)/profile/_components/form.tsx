import Button from "@/components/buttons/button";
import TextInput from "@/components/textInput/input";
import { colors } from "@/constants/colors";
import { UserData } from "@/store/session";
import clsx from "clsx";
import Image from "next/image";
import { useRef, useState } from "react";
import useProfile from "../_hooks/useProfile";
import Select from "@/components/select/select";
import DateInput from "@/components/datepicker/datepicker";
import PhoneInput from "@/components/textInput/phone";

export default function ProfileForm() {
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const {
    formData,
    handleFormData,
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

  const FormField = ({ children, field }: { children: React.ReactNode; field: string }) => {
    return (
      <div className="w-full">
        <span className="text-[14px] font-semibold">{field}</span>
        {children}
      </div>
    );
  };

  const FormRowWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="w-full flex flex-col md:flex-row md:gap-4 transition-all duration-300 ease-in-out">
        {children}
      </div>
    );
  };

  return (
    <div className="w-full min-h-fit h-full flex flex-col items-start justify-start mt-8 pb-8">
      <ProfileImage />
      <form className="w-full">
        {/* NAMES */}
        <FormRowWrapper>
          {formData.isCompany ? (
            <FormField field="Razón Social">
              <TextInput
                key={"businessName"}
                name="businessName"
                placeholder="Razón Social"
                type="text"
                value={formData.businessName}
                onChange={handleFormData}
                // errorMessage={errors.businessName}
              />
            </FormField>
          ) : (
            <>
              <FormField field="Nombre">
                <TextInput
                  key={"name"}
                  name="name"
                  placeholder="Nombre"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleFormData(e)}
                  // errorMessage={errors.name}
                />
              </FormField>
              <FormField field="Apellido(s)">
                <TextInput
                  key={"surnames"}
                  name="surnames"
                  placeholder="Apellido(s)"
                  type="text"
                  value={formData.surnames}
                  onChange={handleFormData}
                  // errorMessage={errors.surnames}
                />
              </FormField>
            </>
          )}
        </FormRowWrapper>

        {/* EMAIL & PHONE */}
        <FormRowWrapper>
          <FormField field="Correo">
            <TextInput
              key={"email"}
              name="email"
              placeholder="Correo"
              type="text"
              value={formData.email}
              onChange={handleFormData}
            />
          </FormField>
          <FormField field="Teléfono">
            <PhoneInput name="phone" value={formData.phone} onChange={handleFormData} />
          </FormField>
        </FormRowWrapper>

        {/* COUNTRY & REGION */}
        <FormRowWrapper>
          <FormField field="País">
            <Select
              name="country"
              options={countries.map((c) => ({ label: c.country, value: c.id }))}
              value={formData.country.id}
              onChange={handleCountry}
              label="País"
              disabled
            />
          </FormField>
          <FormField field="Región">
            <Select
              name="region"
              options={regions.map((r) => ({ label: r.region, value: r.id }))}
              value={formData.region.id}
              onChange={handleRegion}
              label="Region"
            />
          </FormField>
        </FormRowWrapper>

        {/* CITY & COUNTY */}
        <FormRowWrapper>
          <FormField field="Ciudad">
            <Select
              name="city"
              options={cities.map((c) => ({ label: c.city, value: c.id }))}
              value={formData.city.id}
              onChange={handleCity}
              label="Ciudad"
            />
          </FormField>
          <FormField field="Comuna">
            <Select
              name="county"
              options={counties.map((c) => ({ label: c.county, value: c.id }))}
              value={formData.county.id}
              onChange={handleCounty}
              label="Comuna"
            />
          </FormField>
        </FormRowWrapper>

        {/* ADDRESS & BIRTHDAY */}
        <FormRowWrapper>
          <FormField field="Dirección">
            <TextInput
              key={"address"}
              name="address"
              placeholder="Dirección"
              type="text"
              value={formData.address}
              onChange={handleFormData}
              // errorMessage={errors.surnames}
            />
          </FormField>
          <FormField field="Fecha de nacimiento">
            <DateInput
              name="birthDate"
              value={formData.birthday}
              onChange={handleFormData}
              label="Fecha de nacimiento"
            />
          </FormField>
        </FormRowWrapper>
        <div className="w-full flex items-center justify-center mt-8">
          <Button text="Guardar" variant="primary" size="full" />
        </div>
      </form>
    </div>
  );
}
