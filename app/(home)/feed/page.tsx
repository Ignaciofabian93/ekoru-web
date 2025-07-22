"use client";
import PageWrapper from "../_components/pageWrapper";
import Hero from "./_components/hero";
import Banner from "../../../components/banner/banner";
import useStoreProducts from "./_hooks/useStoreProducts";
import useMarketProducts from "./_hooks/useMarketProducts";
import useExchangeableProducts from "./_hooks/useExchangeableProducts";
import FeedProducts from "./_components/productListing";
import Modal from "@/components/modal/modal";
import useTransactionStore from "../transaction/_store/transaction";
import useMyProductsStore from "@/store/myProducts";

export default function FeedPage() {
  const { products: storeProducts, loading: storeLoading } = useStoreProducts({
    scope: "STORE",
    exchange: false,
  });
  const { products: marketProducts, loading: marketLoading } = useMarketProducts({
    scope: "MARKET",
    exchange: false,
  });
  const { products: exchangeableProducts, loading: exchangeableLoading } = useExchangeableProducts({
    scope: "MARKET",
    exchange: true,
  });
  const { isModalOpened, closeModal } = useTransactionStore();
  const { myProducts } = useMyProductsStore();

  return (
    <PageWrapper>
      <Hero />
      <Banner
        title="tiendas con propósito"
        description="Apoya marcas que respeten el planeta, las personas y tus valores."
        variant="filled"
      />
      <FeedProducts
        title="Productos innovadores que salvan el medio ambiente"
        description="Busca tus productos favoritos mientras reduces tu huella."
        products={storeProducts}
        isLoading={storeLoading}
      />
      <Banner
        title="dale una segunda vida"
        description="¡Tu elección hace la diferencia! Reduce, reutiliza, impacta."
        variant="accented"
      />
      <FeedProducts
        title="Productos reciclados y de segunda mano"
        description="Descubre productos únicos y ayuda al planeta. ¡Sube el tuyo o encuentra algo especial!"
        products={marketProducts}
        isLoading={marketLoading}
      />
      <Banner
        title="¿hasta dónde llega tu impacto?"
        description="Pequeños retos, grandes cambios. ¡Empieza hoy a descubrirlos!"
        variant="bordered"
      />
      <FeedProducts
        title="Productos intercambiables"
        description="Explora productos que puedes intercambiar. ¡Haz tu parte por un mundo más sostenible!"
        products={exchangeableProducts}
        isLoading={exchangeableLoading}
      />
      <Modal isOpen={isModalOpened} close={closeModal} title="Intercambiar Producto" size="md">
        <h2>Intercambiar Producto</h2>
        <p>Selecciona un producto para intercambiar.</p>
        {myProducts?.length > 0 ? (
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              gap: "1rem",
              padding: "1rem 0",
              scrollbarWidth: "thin",
              scrollbarColor: "#ccc #f5f5f5",
            }}
          >
            {myProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  minWidth: 160,
                  background: "#fff",
                  borderRadius: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "1rem",
                  transition: "box-shadow 0.2s",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)")}
                onMouseOut={(e) => (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)")}
              >
                <img
                  src={
                    product.images && product.images.length > 0 ? product.images[0] : "/products_cover.jpg"
                  }
                  alt={product.name}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 8,
                    marginBottom: 12,
                    background: "#f5f5f5",
                  }}
                />
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: 16,
                    textAlign: "center",
                    color: "#222",
                    maxWidth: 120,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {product.name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p>No tienes productos para intercambiar.</p>
        )}
      </Modal>
    </PageWrapper>
  );
}
