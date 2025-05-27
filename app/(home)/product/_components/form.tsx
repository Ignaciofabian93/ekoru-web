"use client";
import Select from "@/components/select/select";
import TextInput from "@/components/textInput/input";

export default function ProductForm() {
  return (
    <div>
      <form>
        <Select name="category" onChange={() => {}} label="Categoría" />
        <Select name="subcategory" onChange={() => {}} label="SubCategoría" />
        <TextInput name="price" placeholder="Precio" />
        <TextInput name="name" placeholder="Nombre de producto" />
        <TextInput name="description" placeholder="Descripción" />
      </form>
    </div>
  );
}
