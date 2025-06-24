import Image from "next/image";
import Link from "next/link";
import { InstagramIcon, LinkedinIcon } from "@/assets/icons";

const IconLink = ({ children, url }: { children: React.ReactNode; url: string }) => (
  <Link href={url} target="_blank" rel="noopener noreferrer" aria-label="Social Link">
    {children}
  </Link>
);

const LawLink = ({ lawName, url }: { lawName: string; url: string }) => (
  <Link href={url} target="_blank" rel="noopener noreferrer">
    <p className="text-main text-sm font-semibold my-2 hover:text-primary transition-colors ease-in-out duration-300">
      {lawName}
    </p>
  </Link>
);

export default function Footer() {
  return (
    <footer className="w-full footer-gradient px-4 py-10 mt-8 text-main">
      <div className="w-full max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-center md:text-left">
        {/* Legal Section */}
        <div>
          <h3 className="text-lg font-semibold mb-1">Artículos y Leyes</h3>
          <p className="text-sm mb-4 font-medium">Biblioteca del Congreso Nacional</p>
          <div className="max-h-60 overflow-y-auto pr-2">
            <LawLink url="https://www.bcn.cl/leychile/navegar?idNorma=30667" lawName="Ley 19300" />
            <LawLink
              url="https://www.bcn.cl/leychile/navegar?idNorma=1010459&idVersion=2023-09-06&idParte=8848208"
              lawName="Ley 20417"
            />
            <LawLink
              url="https://www.bcn.cl/leychile/navegar?idNorma=1090894&idParte=9705129&idVersion=2016-06-01"
              lawName="Ley 20920"
            />
            <LawLink
              url="https://www.bcn.cl/leychile/navegar?idNorma=1177286&idParte=10341102&idVersion=2022-06-13"
              lawName="Ley 21455"
            />
            <LawLink url="https://www.bcn.cl/leychile/navegar?idNorma=1121380&buscar=21100" lawName="Ley 21100" />
            <LawLink
              url="https://www.bcn.cl/leychile/navegar?idNorma=1163603&idVersion=2024-08-12&idParte=10259809"
              lawName="Ley 21368"
            />
          </div>
        </div>

        {/* Logo Section */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-48 md:w-56 mb-4">
            <Image
              src="/logo.png"
              alt="Ekoru Logo"
              width={4096}
              height={996}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
          <p className="text-sm text-main italic">Juntos por un futuro más sostenible</p>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contáctanos</h3>
          <Link
            href="mailto:contacto@ekoru.cl"
            className="text-base font-semibold block mb-4 hover:text-primary transition-colors"
          >
            contacto@ekoru.cl
          </Link>
          <p className="text-main text-sm font-semibold mb-2">Síguenos en nuestras redes sociales:</p>
          <div className="flex justify-center md:justify-start gap-4">
            <IconLink url="https://www.instagram.com/ekoru_chile?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
              <InstagramIcon width={36} height={36} className="hover:scale-125 transition-transform duration-300" />
            </IconLink>
            <IconLink url="https://www.linkedin.com/company/ekoru-chile/">
              <LinkedinIcon width={36} height={36} className="hover:scale-125 transition-transform duration-300" />
            </IconLink>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center mt-6 text-sm font-semibold text-main">
        &copy; 2025 Ekoru. Todos los derechos reservados.
      </p>
    </footer>
  );
}
