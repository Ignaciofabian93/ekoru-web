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
import useMyProducts from "../profile/_hooks/useMyProducts";

export default function FeedPage() {
  const { products: storeProducts, loading: storeLoading } = useStoreProducts({ scope: "STORE", exchange: false });
  const { products: marketProducts, loading: marketLoading } = useMarketProducts({ scope: "MARKET", exchange: false });
  const { products: exchangeableProducts, loading: exchangeableLoading } = useExchangeableProducts({
    scope: "MARKET",
    exchange: true,
  });
  const { isModalOpened, closeModal } = useTransactionStore();
  const { myProducts } = useMyProducts();

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
        {myProducts.length > 0 ? (
          <ul>
            {myProducts.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        ) : (
          <p>No tienes productos para intercambiar.</p>
        )}
      </Modal>
    </PageWrapper>
  );
}
