import Image from "next/image";
import Link from "next/link";
import { InstagramIcon, LinkedinIcon } from "@/assets/icons";

const IconLink = ({ children, url }: { children: React.ReactNode; url: string }) => (
  <Link href={url} target="_blank" rel="noopener noreferrer" aria-label="Social Link">
    {children}
  </Link>
);

export default function Footer() {
  return (
    <footer className="w-full footer-gradient px-4 py-8 mt-8 text-main">
      <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-center md:text-left">
        {/* Legal Section */}
        <div>
          <h3 className="text-lg font-semibold mb-1">Infórmate más en nuestro sitio web</h3>
          <Link
            href="https://www.ekoru.cl"
            className="text-base font-semibold block mb-4 hover:text-primary transition-colors"
          >
            https://www.ekoru.cl
          </Link>
        </div>

        {/* Logo Section */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-48 md:w-56 mb-4">
            <Image
              src="/branding/logo.webp"
              alt="EKORU Logo"
              width={4096}
              height={996}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
          <p className="text-sm text-main italic">
            Lo cotidiano <span className="text-primary font-bold uppercase">cambia el mundo</span>
          </p>
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
              <InstagramIcon
                width={36}
                height={36}
                className="hover:scale-125 transition-transform duration-300"
              />
            </IconLink>
            <IconLink url="https://www.linkedin.com/company/ekoru-chile/">
              <LinkedinIcon
                width={36}
                height={36}
                className="hover:scale-125 transition-transform duration-300"
              />
            </IconLink>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center mt-6 text-sm font-semibold text-main">
        &copy; 2025 EKORU. Todos los derechos reservados.
      </p>
    </footer>
  );
}
