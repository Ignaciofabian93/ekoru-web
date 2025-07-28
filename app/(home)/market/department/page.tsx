"use client";
import { Departments } from "@/constants/departments";
import { ChevronRight } from "lucide-react";
import PageWrapper from "../../_ui/pageWrapper";
import ContentWrapper from "../../_ui/catalog/contentWrapper";
import Banner from "@/ui/banner/banner";
import CategorySection from "./_ui/categorySection";
import PageHeader from "../../_ui/catalog/pageHeader";
import wallpaper from "@/assets/images/market.jpg";
import useProductsByDepartment from "../_hooks/useProductsByDepartment";
import RenderCircularOptions from "../../_ui/catalog/renderCircularOptions";

export default function BrowseDepartmentsPage() {
  // Fetch products for each department
  const automotriz = useProductsByDepartment({ id: Departments.AUTOMOTRIZ.id });
  const bebes = useProductsByDepartment({ id: Departments.BEBES.id });
  const deportes = useProductsByDepartment({ id: Departments.DEPORTES.id });
  const electrohogar = useProductsByDepartment({ id: Departments.ELECTROHOGAR.id });
  const entretencion = useProductsByDepartment({ id: Departments.ENTRETENCION.id });
  const herramientas = useProductsByDepartment({ id: Departments.HERRAMIENTAS.id });
  const hogar = useProductsByDepartment({ id: Departments.HOGAR.id });
  const instrumentos = useProductsByDepartment({ id: Departments.INSTRUMENTOSMUSICALES.id });
  const jardin = useProductsByDepartment({ id: Departments.JARDIN.id });
  const mascotas = useProductsByDepartment({ id: Departments.MASCOTAS.id });
  const ropa = useProductsByDepartment({ id: Departments.ROPA.id });
  const tecnologia = useProductsByDepartment({ id: Departments.TECNOLOGIA.id });

  const circularOptionsData = Object.values(Departments).map((dept) => ({
    id: dept.id,
    name: dept.name,
    href: dept.href,
  }));

  return (
    <PageWrapper>
      <PageHeader
        image={wallpaper}
        alt="Portada de departamentos"
        message="Encuentra los mejores productos en cada categoría"
      />
      <ContentWrapper>
        <Banner
          title="Explora los departamentos"
          description="Encuentra tus productos dentro de tus categorías favoritas y dales una nueva vida"
          variant="accented"
        />
      </ContentWrapper>
      <ContentWrapper>
        <div className="flex items-center gap-2 mb-4">
          <ChevronRight className="text-primary" size={20} />
          <span className="text-xl font-semibold text-main">Departamentos</span>
        </div>
        <RenderCircularOptions data={circularOptionsData} />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          productsLoading={automotriz.productsLoading}
          sectionName="Automotriz"
          title="Potencia y estilo."
          subtitle="Siente la fuerza en cada viaje."
          products={automotriz?.products}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          productsLoading={bebes.productsLoading}
          sectionName="Bebés"
          title="Lo mejor para los más pequeños."
          subtitle="Cuida su mundo con amor."
          products={bebes?.products}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          productsLoading={deportes.productsLoading}
          sectionName="Deportes y Outdoor"
          title="Energía circular."
          subtitle="Sigue tu ritmo sin dejar huella."
          products={deportes?.products}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          productsLoading={electrohogar.productsLoading}
          sectionName="Electrohogar"
          title="Tecnología al servicio del hogar."
          subtitle="Haz de tu hogar un lugar más sustentable."
          products={electrohogar?.products}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          productsLoading={entretencion.productsLoading}
          sectionName="Entretención"
          title="Eco aventuras en marcha."
          subtitle="¡El planeta también quiere que te diviertas!"
          products={entretencion?.products}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          productsLoading={herramientas.productsLoading}
          sectionName="Herramientas y Maquinaria"
          title="Potencia y precisión."
          subtitle="Las mejores herramientas para tus proyectos."
          products={herramientas?.products}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          productsLoading={hogar.productsLoading}
          sectionName="Muebles de hogar"
          title="Renueva con propósito."
          subtitle="Piezas únicas que vuelven a la vida."
          products={hogar?.products}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          productsLoading={instrumentos.productsLoading}
          sectionName="Instrumentos Musicales"
          title="De segunda mano, de primera nota."
          subtitle="Deja que el pasado suene como nuevo."
          products={instrumentos?.products}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          productsLoading={jardin.productsLoading}
          sectionName="Jardín y Terraza"
          title="Naturaleza en casa."
          subtitle="Crea tu oasis verde."
          products={jardin?.products}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          productsLoading={mascotas.productsLoading}
          sectionName="Mascotas"
          title="Sustentabilidad con cola."
          subtitle="Cuidemos el entorno de quienes más queremos."
          products={mascotas?.products}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          productsLoading={ropa.productsLoading}
          sectionName="Ropa, Calzado y Accesorios"
          title="Tu ropa, tu revolución verde."
          subtitle="Transforma tu clóset en un acto consciente."
          products={ropa?.products}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          productsLoading={tecnologia.productsLoading}
          sectionName="Tecnología"
          title="Innovación que transforma."
          subtitle="Comodidad y eficiencia que nos hace avanzar."
          products={tecnologia?.products}
        />
      </ContentWrapper>
    </PageWrapper>
  );
}
