import { Image as ImageIcon } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { useRef, useState } from "react";

type ImageUploader = {
  handleImage: (image: string) => void;
  image: string | null;
};

export default function ImageUploader({ image, handleImage }: ImageUploader) {
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>(image || "/brandIcon.webp");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
        handleImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const openFilePicker = () => {
    galleryInputRef.current?.click();
  };

  return (
    <div
      className={clsx(
        "min-w-[250px] w-full max-w-[400px] min-h-[250px] h-full max-h-[250px]",
        "bg-white",
        "rounded-[11px]",
        "flex items-center justify-center",
        "cursor-pointer",
        "transition-all duration-300 ease-in-out",
        "shadow-md shadow-slate-950/10",
        "overflow-hidden",
        "border-[2px] border-primary"
      )}
    >
      {image ? (
        <Image src={previewImage} alt="product" className="w-full h-full object-cover" width={40} height={40} />
      ) : (
        <div
          className="w-full h-full overflow-hidden bg-white flex items-center justify-center"
          onClick={openFilePicker}
        >
          <ImageIcon className="w-8 h-8 text-primary" />
          <input ref={galleryInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </div>
      )}
    </div>
  );
}
