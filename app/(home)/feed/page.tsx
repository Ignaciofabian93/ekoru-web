"use client";
import PageWrapper from "../_ui/pageWrapper";
import Hero from "./_ui/hero";
import Banner from "../../../ui/banner/banner";
import useStoreProducts from "./_hooks/useStoreProducts";
import useMarketProducts from "./_hooks/useMarketProducts";
import useExchangeableProducts from "./_hooks/useExchangeableProducts";
import FeedProducts from "./_ui/productListing";
import FeedStores from "./_ui/storeListing";
import Modal from "@/ui/modal/modal";
import useTransactionStore from "../transaction/_store/transaction";
import useMyProductsStore from "@/store/myProducts";
import MyProductsList from "./_ui/myProductsList";
import ContentWrapper from "../_ui/contentWrapper";
import useStores from "../stores/_hooks/useStores";

export default function FeedPage() {
  const { products: storeProducts, loading: storeLoading } = useStoreProducts({
    scope: "STORE",
    isExchangeable: false,
  });
  const { products: marketProducts, loading: marketLoading } = useMarketProducts({
    scope: "MARKET",
    isExchangeable: false,
  });
  const { products: exchangeableProducts, loading: exchangeableLoading } =
    useExchangeableProducts({
      scope: "MARKET",
      isExchangeable: true,
    });
  const { stores, storesLoading } = useStores();
  const { isModalOpened, closeModal } = useTransactionStore();

  // Products for exchange modal
  // These products are loaded from card exchange button
  const { myProducts } = useMyProductsStore();

  return (
    <PageWrapper>
      <Hero />
      <ContentWrapper>
        <Banner
          title="tiendas con propósito"
          description="Apoya marcas que respeten el planeta, las personas y tus valores."
          variant="filled"
        />
        <FeedStores
          title="Tiendas sustentables destacadas"
          description="Conoce las tiendas que están haciendo la diferencia por el medio ambiente."
          stores={stores}
          isLoading={storesLoading}
        />
        <Banner
          title="Productos destacados"
          description="Explora productos que marcan la diferencia."
          variant="bordered"
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
      </ContentWrapper>
      <Modal
        isOpen={isModalOpened}
        close={closeModal}
        title="Intercambiar Producto"
        size="md"
      >
        <MyProductsList products={myProducts} />
      </Modal>
    </PageWrapper>
  );
}
