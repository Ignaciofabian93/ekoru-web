"use client";
import PageHeader from "../../_components/pageHeader";
import PageWrapper from "../../_components/pageWrapper";
import useStoreList from "../_hooks/useStores";
import StoreCard from "@/components/cards/storeCard/storeCard";
import storesWallpaper from "@/assets/images/stores.jpg";

export default function SelectedStorePage() {
  const { selectedStore, storeLoading } = useStoreList();

  if (storeLoading || !selectedStore) {
    return (
      <PageWrapper>
        <div style={{ padding: 40, textAlign: "center" }}>
          <span style={{ color: "#4CAF50", fontWeight: 600 }}>Cargando tienda...</span>
        </div>
      </PageWrapper>
    );
  }

  // Fallbacks for possibly undefined values
  const businessName = selectedStore.businessName || "Tienda";
  const profileImage = selectedStore.profileImage || "/branding/covers/default-store.jpg";
  const userCategory = selectedStore.userCategory?.name || "Tienda sustentable";
  const email = selectedStore.email || "No disponible";
  const phone = selectedStore.phone || null;
  const address = selectedStore.address || "Dirección no disponible";
  const city = selectedStore.city?.city || "";
  const region = selectedStore.region?.region || "";
  const country = selectedStore.country?.country || "";

  // Use static image for PageHeader (required type)
  const headerImage = selectedStore.profileImage ? storesWallpaper : storesWallpaper;

  return (
    <PageWrapper>
      <PageHeader image={headerImage} alt={businessName} message={businessName} />
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: -60,
          marginBottom: 32,
        }}
      >
        <StoreCard
          name={businessName}
          description={userCategory}
          brandLogo={profileImage}
          coverImage={profileImage}
          onClick={() => {}}
        />
      </section>
      <section
        style={{
          maxWidth: 600,
          margin: "0 auto",
          background: "linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)",
          borderRadius: 16,
          boxShadow: "0 2px 12px rgba(76,175,80,0.08)",
          padding: 32,
          color: "#2e7d32",
        }}
      >
        <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 12 }}>Sobre la tienda</h2>
        <p style={{ fontSize: 16, marginBottom: 20 }}>
          Esta tienda es parte de la comunidad EKORU y promueve prácticas sustentables.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          <div>
            <h3 style={{ fontWeight: 600, fontSize: 16, margin: 0 }}>Contacto</h3>
            <p style={{ margin: 0 }}>{email}</p>
            {phone && <p style={{ margin: 0 }}>{phone}</p>}
          </div>
          <div>
            <h3 style={{ fontWeight: 600, fontSize: 16, margin: 0 }}>Dirección</h3>
            <p style={{ margin: 0 }}>
              {address}
              <br />
              {[city, region, country].filter(Boolean).join(", ")}
            </p>
          </div>
        </div>
        <div style={{ marginTop: 24 }}>
          <span
            style={{
              background: "#a5d6a7",
              color: "#1b5e20",
              borderRadius: 8,
              padding: "4px 12px",
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            {userCategory}
          </span>
        </div>
      </section>
    </PageWrapper>
  );
}
