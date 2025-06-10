import { Image as ImageIcon, XCircle } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { useRef, useState } from "react";
import { compressImage } from "@/utils/imageCompressor";

type ImageUploader = {
  handleImage: (image: string | null) => void;
  image: string | null;
  removeImage: (image: string) => void;
};

export default function ImageUploader({ image, handleImage, removeImage }: ImageUploader) {
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(image);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64Image = await compressImage(file);
      setPreviewImage(base64Image);
      handleImage(base64Image);
    }
  };

  const openFilePicker = () => {
    galleryInputRef.current?.click();
  };

  const handleRemoveImage = (image: string) => {
    setPreviewImage(null);
    handleImage(null);
    removeImage(image);
  };

  const hasImage = !!previewImage;

  return (
    <div
      className={clsx(
        "bg-white border-[0.5px] border-primary rounded-[11px] mt-2 mb-6",
        "flex flex-col items-center justify-center min-w-[250px] w-full max-w-[400px] min-h-[250px] h-[250px] max-h-[250px]",
        "relative transition-all duration-300 ease-in-out shadow-md shadow-slate-950/10 overflow-hidden"
      )}
    >
      {hasImage ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={previewImage as string}
            alt="product"
            className="object-cover w-full h-full rounded-[8px] border"
            width={400}
            height={200}
            style={{ objectFit: "cover" }}
          />
          <button
            type="button"
            onClick={() => handleRemoveImage(image as string)}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-100 transition"
            title="Eliminar imagen"
          >
            <XCircle className="w-6 h-6 text-red-500" />
          </button>
          <input ref={galleryInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </div>
      ) : (
        <div
          className="w-full h-[200px] flex flex-col items-center justify-center cursor-pointer"
          onClick={openFilePicker}
        >
          <ImageIcon className="w-12 h-12 text-primary mb-2" />
          <span className="text-gray-400 text-xs">Haz clic para subir una imagen</span>
          <input ref={galleryInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </div>
      )}
    </div>
  );
}
