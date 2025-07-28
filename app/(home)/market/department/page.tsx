"use client";
import { DepartmentNames } from "@/constants/departments";
import { Department } from "@/types/product";
import { RenderCategories } from "../../_ui/categoriesRow";
import PageWrapper from "../../_ui/pageWrapper";
import ContentWrapper from "../../_ui/contentWrapper";
import useDepartments from "../_hooks/useDepartment";
import Banner from "@/ui/banner/banner";
import CategorySection from "./_ui/categorySection";
import PageHeader from "../../_ui/pageHeader";
import wallpaper from "@/assets/images/market.jpg";

export default function BrowseDepartmentsPage() {
  const {
    departments,
    selectedDepartment,
    departmentsLoading,
    selectDepartment,
    productsByDepartment,
    redirectToDepartment,
  } = useDepartments();

  return (
    <PageWrapper>
      <PageHeader
        image={wallpaper}
        alt="Portada de departamentos"
        message="Encuentra los mejores productos en cada categoría"
      />
      <ContentWrapper>
        <Banner
          isLoading={departmentsLoading}
          title="Explora los departamentos"
          description="Encuentra tus productos dentro de tus categorías favoritas y dales una nueva vida"
        />
      </ContentWrapper>
      <ContentWrapper>
        <RenderCategories
          moduleName="Departamentos"
          data={departments}
          selectObject={(e) => selectDepartment(e as Department)}
          selectedObject={selectedDepartment}
          redirect={(e) => redirectToDepartment(e)}
          isLoading={departmentsLoading}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          departmentsLoading={departmentsLoading}
          sectionName="Automotriz"
          title="Potencia y estilo."
          subtitle="Siente la fuerza en cada viaje."
          products={productsByDepartment[DepartmentNames.AUTOMOTRIZ]}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          departmentsLoading={departmentsLoading}
          sectionName="Bebés"
          title="Lo mejor para los más pequeños."
          subtitle="Cuida su mundo con amor."
          products={productsByDepartment[DepartmentNames.BEBES]}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          departmentsLoading={departmentsLoading}
          sectionName="Deportes y Outdoor"
          title="Energía circular."
          subtitle="Sigue tu ritmo sin dejar huella."
          products={productsByDepartment[DepartmentNames.DEPORTES]}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          departmentsLoading={departmentsLoading}
          sectionName="Electrohogar"
          title="Tecnología al servicio del hogar."
          subtitle="Haz de tu hogar un lugar más sustentable."
          products={productsByDepartment[DepartmentNames.ELECTROHOGAR]}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          departmentsLoading={departmentsLoading}
          sectionName="Entretención"
          title="Eco aventuras en marcha."
          subtitle="¡El planeta también quiere que te diviertas!"
          products={productsByDepartment[DepartmentNames.ENTRETENCION]}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          departmentsLoading={departmentsLoading}
          sectionName="Herramientas y Maquinaria"
          title="Potencia y precisión."
          subtitle="Las mejores herramientas para tus proyectos."
          products={productsByDepartment[DepartmentNames.HERRAMIENTAS]}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          departmentsLoading={departmentsLoading}
          sectionName="Muebles de hogar"
          title="Renueva con propósito."
          subtitle="Piezas únicas que vuelven a la vida."
          products={productsByDepartment[DepartmentNames.HOGAR]}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          departmentsLoading={departmentsLoading}
          sectionName="Instrumentos Musicales"
          title="De segunda mano, de primera nota."
          subtitle="Deja que el pasado suene como nuevo."
          products={productsByDepartment[DepartmentNames.INSTRUMENTOSMUSICALES]}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          departmentsLoading={departmentsLoading}
          sectionName="Jardín y Terraza"
          title="Naturaleza en casa."
          subtitle="Crea tu oasis verde."
          products={productsByDepartment[DepartmentNames.JARDIN]}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          departmentsLoading={departmentsLoading}
          sectionName="Mascotas"
          title="Sustentabilidad con cola."
          subtitle="Cuidemos el entorno de quienes más queremos."
          products={productsByDepartment[DepartmentNames.MASCOTAS]}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          departmentsLoading={departmentsLoading}
          sectionName="Ropa, Calzado y Accesorios"
          title="Tu ropa, tu revolución verde."
          subtitle="Transforma tu clóset en un acto consciente."
          products={productsByDepartment[DepartmentNames.ROPA]}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          departmentsLoading={departmentsLoading}
          sectionName="Tecnología"
          title="Innovación que transforma."
          subtitle="Comodidad y eficiencia que nos hace avanzar."
          products={productsByDepartment[DepartmentNames.TECNOLOGIA]}
        />
      </ContentWrapper>
    </PageWrapper>
  );
}
