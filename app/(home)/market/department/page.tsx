"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { RenderDepartments } from "./_ui/renderDepartments";
import { Department, Product } from "@/types/product";
import { DepartmentSkeleton } from "../_components/skeletons";
import PageWrapper from "../../_components/pageWrapper";
import MarketHeader from "../_components/header";
import ContentWrapper from "../_components/contentWrapper";
import useDepartments from "../_hooks/useDepartment";
import Banner from "@/components/banner/banner";
import CategorySection from "./_ui/categorySection";

export default function BrowseDepartmentsPage() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { departments, selectedDepartment, departmentsLoading, selectDepartment } = useDepartments();

  function getProductsByDepartment(departments: Department[]) {
    const productsByDepartment: Record<string, Product[]> = {};

    departments.forEach((department) => {
      const departmentName = department.departmentName;
      department.departmentCategories.forEach((deptCategory) => {
        deptCategory.productCategories.forEach((prodCategory) => {
          prodCategory.products.forEach((product) => {
            if (!productsByDepartment[departmentName]) {
              productsByDepartment[departmentName] = [];
            }
            productsByDepartment[departmentName].push(product);
          });
        });
      });
    });

    return productsByDepartment;
  }

  const productsByDepartment = getProductsByDepartment(departments);

  const redirectToDepartment = (departmentId: number) => {
    router.push(`/market/department/${departmentId}`);
  };

  const handleDepartmentSelect = (dept: Department) => {
    const scrollLeft = scrollRef.current?.scrollLeft ?? 0;
    selectDepartment(dept);
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollLeft;
      }
    }, 0);
  };

  const DepartmentNames = {
    AUTOMOTRIZ: "Automotriz",
    BEBES: "Bebés",
    DEPORTES: "Deportes y Outdoor",
    ELECTROHOGAR: "Electrohogar",
    ENTRETENCION: "Entretención",
    HERRAMIENTAS: "Herramientas y Maquinaria",
    HOGAR: "Hogar y Decoración",
    INSTRUMENTOSMUSICALES: "Instrumentos Musicales",
    JARDIN: "Jardín y Terraza",
    MASCOTAS: "Mascotas",
    ROPA: "Ropa, Calzado y Accesorios",
    SERVICIOS: "Servicios",
    TECNOLOGIA: "Tecnología",
  };

  return (
    <PageWrapper>
      <MarketHeader />
      <ContentWrapper>
        <Banner
          title="Explora los departamentos"
          description="Encuentra tus productos dentro de tus categorías favoritas y dales una nueva vida"
        />
      </ContentWrapper>
      <ContentWrapper>
        <section className="mb-8 mt-10">
          <h2 className="text-xl font-semibold mb-4 text-main flex items-center gap-2">
            <ChevronRight className="text-primary" size={20} />
            Departamentos
          </h2>
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-6 px-2 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent"
          >
            {departmentsLoading ? (
              Array.from({ length: 10 }).map((_, i) => <DepartmentSkeleton key={i} />)
            ) : (
              <RenderDepartments
                departments={departments}
                selectedDepartment={selectedDepartment}
                handleDepartmentSelect={handleDepartmentSelect}
                redirectToDepartment={redirectToDepartment}
              />
            )}
          </div>
        </section>
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          sectionName="Automotriz"
          title="Potencia y estilo."
          subtitle="Siente la fuerza en cada viaje."
          products={productsByDepartment[DepartmentNames.AUTOMOTRIZ]}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          sectionName="Bebés"
          title="Lo mejor para los más pequeños."
          subtitle="Cuida su mundo con amor."
          products={productsByDepartment[DepartmentNames.BEBES]}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          sectionName="Deportes y Outdoor"
          title="Energía circular."
          subtitle="Sigue tu ritmo sin dejar huella."
          products={productsByDepartment[DepartmentNames.DEPORTES]}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          sectionName="Electrohogar"
          title="Tecnología al servicio del hogar."
          subtitle="Haz de tu hogar un lugar más sustentable."
          products={productsByDepartment[DepartmentNames.ELECTROHOGAR]}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          sectionName="Entretención"
          title="Eco aventuras en marcha."
          subtitle="¡El planeta también quiere que te diviertas!"
          products={productsByDepartment[DepartmentNames.ENTRETENCION]}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          sectionName="Herramientas y Maquinaria"
          title="Potencia y precisión."
          subtitle="Las mejores herramientas para tus proyectos."
          products={productsByDepartment[DepartmentNames.HERRAMIENTAS]}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          sectionName="Muebles de hogar"
          title="Renueva con propósito."
          subtitle="Piezas únicas que vuelven a la vida."
          products={productsByDepartment[DepartmentNames.HOGAR]}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          sectionName="Instrumentos Musicales"
          title="De segunda mano, de primera nota."
          subtitle="Deja que el pasado suene como nuevo."
          products={productsByDepartment[DepartmentNames.INSTRUMENTOSMUSICALES]}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          sectionName="Jardín y Terraza"
          title="Naturaleza en casa."
          subtitle="Crea tu oasis verde."
          products={productsByDepartment[DepartmentNames.JARDIN]}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          sectionName="Mascotas"
          title="Sustentabilidad con cola."
          subtitle="Cuidemos el entorno de quienes más queremos."
          products={productsByDepartment[DepartmentNames.MASCOTAS]}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          sectionName="Ropa, Calzado y Accesorios"
          title="Tu ropa, tu revolución verde."
          subtitle="Transforma tu clóset en un acto consciente."
          products={productsByDepartment[DepartmentNames.ROPA]}
        />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection sectionName="Servicios" products={productsByDepartment[DepartmentNames.SERVICIOS]} />
      </ContentWrapper>
      <ContentWrapper>
        <CategorySection
          sectionName="Tecnología"
          title="Innovación que transforma."
          subtitle="Comodidad y eficiencia que nos hace avanzar."
          products={productsByDepartment[DepartmentNames.TECNOLOGIA]}
        />
      </ContentWrapper>
    </PageWrapper>
  );
}
