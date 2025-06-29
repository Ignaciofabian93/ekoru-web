"use client";
import Select from "@/components/select/select";
import TextInput from "@/components/textInput/input";
import useProduct from "../_hooks/useProduct";
import Button from "@/components/buttons/button";
import ImageUploader from "./imageUploader";
import BadgeSelector from "@/components/badges/badgeSelector";
import CheckBox from "@/components/checkbox/checkbox";
import { useState } from "react";
import Modal from "@/components/modal/modal";
import ProductCard from "@/components/cards/productCard";

export default function ProductForm() {
  const [previewProduct, setPreviewProduct] = useState<boolean>(false);
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
    handleBadges,
    data,
    handleImageRemove,
  } = useProduct();

  const rowClassname = "w-full flex flex-col lg:flex-row lg:gap-4 transition-all duration-300 ease-in-out";
  const alternativeRowClassname =
    "w-full flex flex-wrap gap-4 items-center justify-around transition-all duration-300 ease-in-out";

  return (
    <div className="w-full max-w-[800px] h-full flex flex-col items-center px-4 py-2 mx-auto">
      <form className="w-full h-full">
        <div className={rowClassname}>
          <Select
            name="department"
            value={department.id}
            options={departments.map((d) => ({ label: d.departmentName, value: d.id }))}
            onChange={selectDepartment}
            labelText="Departamento"
            hasLabel
          />
          <Select
            name="departmentCategory"
            value={departmentCategory.id}
            options={departmentCategories.map((d) => ({ label: d.departmentCategoryName, value: d.id }))}
            onChange={selectDepartmentCategory}
            labelText="Categoría"
            hasLabel
            disabled={!department.id}
          />
          <Select
            name="productCategory"
            value={productCategory.id}
            options={productCategories.map((d) => ({ label: d.productCategoryName, value: d.id }))}
            onChange={selectProductCategory}
            labelText="Tipo de producto"
            hasLabel
            disabled={!departmentCategory.id}
          />
        </div>
        <div className={rowClassname}>
          <TextInput
            name="brand"
            placeholder="Marca del producto"
            hasLabel
            labelText="Marca"
            value={product.brand}
            onChange={handleProduct}
            disabled={!productCategory.id}
          />
          <TextInput
            name="name"
            placeholder="Producto"
            hasLabel
            labelText="Nombre del producto"
            value={product.name}
            onChange={handleProduct}
            disabled={!product.brand}
          />
          <TextInput
            name="price"
            placeholder="precio"
            hasLabel
            labelText="Precio"
            infoIcon
            infoText="Ingresa el precio sin puntos ni signos"
            value={product.price}
            onChange={handleProduct}
            disabled={!product.name}
          />
        </div>
        <div className={alternativeRowClassname}>
          <CheckBox id="hasOffer" name="hasOffer" checked={product.hasOffer} label="Oferta" onChange={handleProduct} />
          <CheckBox
            id="isExchangeable"
            name="isExchangeable"
            checked={product.isExchangeable}
            label="Intercambiable"
            onChange={handleProduct}
          />
          <CheckBox
            id="isActive"
            name="isActive"
            checked={product.isActive}
            label="Publicar"
            onChange={handleProduct}
          />
        </div>
        <div className={rowClassname}>
          <TextInput
            name="offerPrice"
            placeholder="Precio de oferta"
            hasLabel
            labelText="Precio de oferta (opcional)"
            infoIcon
            infoText="Al ingresar precio oferta este será el precio principal mientras se muestra el precio original tachado"
            value={product.offerPrice}
            onChange={handleProduct}
            disabled={!product.hasOffer}
          />
          <TextInput
            type="number"
            name="stock"
            placeholder="Unidades"
            hasLabel
            labelText="Unidades"
            value={product.stock}
            onChange={handleProduct}
            disabled={!product.name}
          />
          <TextInput
            type="text"
            name="color"
            placeholder="Color"
            hasLabel
            labelText="Color del producto"
            value={product.color}
            onChange={handleProduct}
            disabled={!product.name}
          />
        </div>
        {data.isCompany && (
          <div className={rowClassname}>
            <TextInput
              name="sku"
              placeholder="SKU"
              hasLabel
              labelText="SKU (opcional)"
              value={product.sku || ""}
              onChange={handleProduct}
              disabled={!product.name}
            />
            <TextInput
              name="barcode"
              placeholder="Código de barras"
              hasLabel
              labelText="Código de barras (opcional)"
              value={product.barcode || ""}
              onChange={handleProduct}
              disabled={!product.name}
            />
          </div>
        )}
        <div className={rowClassname}>
          <TextInput
            name="description"
            placeholder="Descripción"
            hasLabel
            labelText="Descripción"
            value={product.description}
            onChange={handleProduct}
            disabled={!product.name}
          />
        </div>
        <div className={rowClassname}>
          <div className="w-full mt-8">
            <p className="leading-relaxed font-semibold text-md">
              Selecciona hasta 3 etiquetas para resaltar tu producto
            </p>
            <BadgeSelector value={product.badges} onChange={handleBadges} isCompany={data.isCompany} />
          </div>
        </div>
        <div className="w-full mt-8">
          <p className="text-md font-semibold leading-relaxed">Sube imágenes de tu producto</p>
          <div className="w-full min-h-[300px] flex items-center justify-evenly gap-2 overflow-x-scroll no-scrollbar">
            <ImageUploader handleImage={handleImageUpload} image={product.images[0]} removeImage={handleImageRemove} />
            <ImageUploader handleImage={handleImageUpload} image={product.images[1]} removeImage={handleImageRemove} />
            <ImageUploader handleImage={handleImageUpload} image={product.images[2]} removeImage={handleImageRemove} />
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-8">
          <Button
            text="Previsualizar producto"
            onClick={() => setPreviewProduct(true)}
            type="button"
            variant="secondary"
            isLoading={ProductLoading}
          />
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
      <Modal title="Previsualización del producto" isOpen={previewProduct} close={() => setPreviewProduct(false)}>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <p className="font-semibold text-md leading-relaxed mb-2">*Así se verá tu producto en las búsquedas*</p>
          <ProductCard
            id={product.id}
            title={product.name}
            price={product.price}
            seller={data.name.split(" ")[0]}
            location={`${data.address}, ${data.county.county}`}
            images={product.images}
            sellerImage={data.profileImage}
            description={product.description}
          />
        </div>
      </Modal>
    </div>
  );
}
