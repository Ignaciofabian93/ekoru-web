"use client";
import Select from "@/components/select/select";
import TextInput from "@/components/textInput/input";
import useProduct from "../_hooks/useProduct";
import Button from "@/components/buttons/button";
import ImageUploader from "./imageUploader";
import CheckBox from "@/components/checkbox/checkbox";

export default function ProductForm() {
  const {
    departments,
    department,
    selectDepartment,
    departmentCategories,
    departmentCategory,
    selectDepartmentCategory,
    productCategories,
    productCategory,
    selectProductCategory,
    handleProduct,
    product,
    handleImageUpload,
    handleSubmit,
    ProductLoading,
  } = useProduct();

  const rowClassname = "w-full flex flex-col lg:flex-row lg:gap-4 transition-all duration-300 ease-in-out";

  return (
    <div className="w-full h-full flex flex-col items-center px-4 py-2">
      <form className="w-full h-full">
        <div className={rowClassname}>
          <Select
            name="department"
            value={department.id}
            options={departments.map((d) => ({ label: d.department, value: d.id }))}
            onChange={selectDepartment}
            labelText="Departamento"
            hasLabel
          />
          <Select
            name="departmentCategory"
            value={departmentCategory.id}
            options={departmentCategories.map((d) => ({ label: d.departmentCategory, value: d.id }))}
            onChange={selectDepartmentCategory}
            labelText="Categoría"
            hasLabel
            disabled={!department.id}
          />
        </div>
        <div className={rowClassname}>
          <Select
            name="productCategory"
            value={productCategory.id}
            options={productCategories.map((d) => ({ label: d.productCategory, value: d.id }))}
            onChange={selectProductCategory}
            labelText="Tipo de producto"
            hasLabel
            disabled={!departmentCategory.id}
          />
          <TextInput
            name="name"
            placeholder="Nombre del producto"
            hasLabel
            labelText="Producto"
            value={product.name}
            onChange={handleProduct}
          />
        </div>
        <div className={rowClassname}>
          <TextInput
            name="price"
            placeholder="precio"
            hasLabel
            labelText="Precio"
            infoIcon
            infoText="Ingresa el precio sin puntos ni signos"
            value={product.price}
            onChange={handleProduct}
          />

          <TextInput
            name="offerPrice"
            placeholder="Precio de oferta"
            hasLabel
            labelText="Precio de oferta (opcional)"
            infoIcon
            infoText="Al ingresar precio oferta este será el precio principal mientras se muestra el precio original tachado"
            value={product.offerPrice}
            onChange={handleProduct}
          />
        </div>
        <TextInput
          name="stock"
          placeholder="Unidades"
          hasLabel
          labelText="Unidades"
          value={product.stock}
          onChange={handleProduct}
        />
        <TextInput
          name="description"
          placeholder="Descripción"
          hasLabel
          labelText="Descripción"
          value={product.description}
          onChange={handleProduct}
        />
        <div className="w-full mt-8">
          <p className="text-[18px] font-semibold leading-0">Sube imágenes de tus productos</p>
          <div className="w-full min-h-[300px] flex items-center justify-evenly gap-2 overflow-x-scroll no-scrollbar">
            <ImageUploader handleImage={handleImageUpload} image={product.images[0]} />
            <ImageUploader handleImage={handleImageUpload} image={product.images[1]} />
            <ImageUploader handleImage={handleImageUpload} image={product.images[2]} />
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-8">
          <Button
            text="Guardar producto"
            onClick={handleSubmit}
            type="submit"
            variant="primary"
            isLoading={ProductLoading}
          />
        </div>
      </form>
    </div>
  );
}
