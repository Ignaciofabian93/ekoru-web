"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Pencil, Trash } from "lucide-react";
import useProfile from "../_hooks/useProfile";
import ProductCard from "@/components/cards/product/productCard";
import ProductsSkeleton from "../../_components/productsSkeleton";
import SmallButton from "@/components/buttons/smallButton";
import useProfileProducts from "../_hooks/useProfileProducts";
import Button from "@/components/buttons/button";
import Modal from "@/components/modal/modal";
import ProductForm from "./productForm";
import clsx from "clsx";

export default function MyProducts() {
  const { myProducts, myProductsLoading, refetchMyProducts } = useProfile();
  const {
    enableEditing,
    openForm,
    closeForm,
    handleDeleteProduct,
    showForm,
    openConfirmModal,
    closeConfirmModal,
    isDeleting,
    data,
    newProductLoading,
    handleImageUpload,
    handleImageRemove,
    isEditing,
    product,
    handleProduct,
    handleInterests,
    handleBadges,
    handleUpdateProduct,
    handleAddProduct,
    departments,
    departmentCategories,
    productCategories,
    department,
    departmentCategory,
    productCategory,
    selectDepartment,
    selectDepartmentCategory,
    selectProductCategory,
    departmentCategoriesLoading,
    departmentsLoading,
    productCategoriesLoading,
  } = useProfileProducts();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className={clsx(
        "w-[95%] min-h-[400px] flex flex-col relative items-center justify-start",
        "mx-auto mb-8"
      )}
    >
      <div className="w-full flex items-center justify-end">
        <Button text="Subir producto" onClick={openForm} size="md" className="w-[200px]" />
      </div>
      {myProductsLoading ? (
        <div className="relative w-full">
          <div className="w-full flex overflow-x-auto gap-x-4 pb-4 mt-12 py-4 no-scrollbar">
            <ProductsSkeleton />
          </div>
        </div>
      ) : (
        myProducts.length > 0 && (
          <div className="relative w-full">
            {/* Left/Right buttons only for web (hidden on mobile) */}
            <button
              className="hidden md:flex absolute -left-4 top-[45%] -translate-y-1/2 z-10 bg-primary/50 rounded-full p-2 shadow hover:bg-primary/90 transition-all duration-200 ease-in-out"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              type="button"
            >
              <ChevronLeft className="text-white" />
            </button>
            <div
              ref={scrollRef}
              className="w-full flex overflow-x-auto gap-x-4 pb-4 no-scrollbar md:no-scrollbar mt-4 py-4"
              style={{ scrollBehavior: "smooth" }}
            >
              {myProducts.map((product) => (
                <div key={product.id} className="flex flex-col items-center gap-2">
                  <div className="flex gap-2 mb-1">
                    <SmallButton
                      icon={Pencil}
                      text="Editar"
                      variant="primary"
                      aria-label="Editar producto"
                      onClick={() => {
                        enableEditing(product);
                      }}
                    />
                    <SmallButton
                      icon={Trash}
                      text="Eliminar"
                      variant="danger"
                      aria-label="Eliminar producto"
                      onClick={() => {
                        openConfirmModal(product);
                      }}
                    />
                  </div>
                  <ProductCard
                    id={product.id}
                    key={product.id}
                    title={product.name}
                    images={product.images}
                    price={product.price}
                    seller={product.user?.name?.split(" ")[0]}
                    interests={product.interests}
                    isExchangeable={product.isExchangeable}
                    hasOffer={product.hasOffer}
                    offerPrice={product.offerPrice}
                    badges={product.badges}
                    isFavoriteEnabled={false}
                    isSharedEnabled={true}
                    isSelectionButtonEnabled={false}
                    productCategory={product.productCategory}
                    sellerImage={product.user?.profileImage}
                    description={product.description}
                    location={`${product.user?.county?.county}, ${product.user?.city?.city}`}
                    isCTAClickEnabled={false}
                  />
                </div>
              ))}
            </div>
            <button
              className="hidden md:flex absolute -right-4 top-[45%] -translate-y-1/2 z-10 bg-primary/50 rounded-full p-2 shadow hover:bg-primary/90 transition-all duration-200 ease-in-out"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              type="button"
            >
              <ChevronRight className="text-white" />
            </button>
          </div>
        )
      )}
      {!myProductsLoading && myProducts.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-[18px] font-semibold">No tienes productos</p>
        </div>
      )}
      <Modal
        title={isEditing ? "Editar producto" : "Añadir producto"}
        isOpen={showForm}
        close={closeForm}
        size="lg"
      >
        <ProductForm
          data={data}
          newProductLoading={newProductLoading}
          handleImageUpload={handleImageUpload}
          handleImageRemove={handleImageRemove}
          isEditing={isEditing}
          product={product}
          handleProduct={handleProduct}
          handleInterests={handleInterests}
          handleBadges={handleBadges}
          handleUpdateProduct={handleUpdateProduct}
          handleAddProduct={handleAddProduct}
          departments={departments}
          departmentCategories={departmentCategories}
          productCategories={productCategories}
          department={department}
          departmentCategory={departmentCategory}
          productCategory={productCategory}
          selectDepartment={selectDepartment}
          selectDepartmentCategory={selectDepartmentCategory}
          selectProductCategory={selectProductCategory}
          submitAction={isEditing ? handleUpdateProduct : handleAddProduct}
          departmentsLoading={departmentsLoading}
          departmentCategoriesLoading={departmentCategoriesLoading}
          productCategoriesLoading={productCategoriesLoading}
          onSuccess={() => {
            closeForm();
            refetchMyProducts();
          }}
        />
      </Modal>
      <Modal title="Confirmar eliminación" isOpen={isDeleting} close={closeConfirmModal} size="sm">
        <div className="flex flex-col items-center rounded-md">
          <div className="flex items-center gap-2 mb-3">
            <Trash className="text-red-500 w-6 h-6" />
            <span className="text-red-700 font-semibold text-lg">¡Atención!</span>
          </div>
          <p className="text-center text-red-600 font-medium mb-4">
            ¿Estás seguro de que deseas eliminar <span className="font-bold">{product.name}</span>?
            <br />
            Esta acción no se puede deshacer.
          </p>
          <div className="flex justify-end gap-2 w-full">
            <Button
              aria-label={`Eliminar ${product.name}`}
              text="Eliminar"
              variant="danger"
              className="font-bold shadow-md"
              onClick={async () => {
                await handleDeleteProduct(product.id);
                closeConfirmModal();
                refetchMyProducts();
              }}
            />
          </div>
        </div>
      </Modal>
    </section>
  );
}
