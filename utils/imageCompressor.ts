export const compressImage = (file: File, maxWidth = 300, quality = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = Math.min(maxWidth / img.width, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("No canvas context");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(dataUrl);
    };
    img.onerror = reject;
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
