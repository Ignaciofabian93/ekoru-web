"use client";
import clsx from "clsx";
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  UserRound,
  // Star
} from "lucide-react";
import { User } from "@/types/user";

type Props = {
  user: User;
};

const InfoRow = ({ icon, field, value }: { icon?: React.ReactNode; field: string; value: string }) => (
  <div className={clsx("w-full flex flex-col items-start gap-0 md:gap-1 py-2 border-b border-slate-200")}>
    <div className="flex flex-row items-center gap-2 mb-1">
      {icon && <span className="text-primary shrink-0 flex items-center">{icon}</span>}
      <span className="text-base font-semibold text-primary min-w-[170px] md:min-w-[200px] max-w-full md:max-w-[200px]">
        {field}:
      </span>
    </div>
    <span className="text-base font-normal break-words w-full md:w-auto md:flex-1 pl-0 md:pl-2">{value}</span>
  </div>
);

export default function PersonalInformation({ user }: Props) {
  // const accountTypes: { [key: string]: string } = {
  //   FREE: "Gratis",
  //   PLUS: "Plus",
  //   PREMIUM: "Premium",
  // };

  return (
    <div
      className={clsx("w-full min-h-[400px] flex flex-col items-center justify-start", "mx-auto px-3 mb-8")}
    >
      <div
        className={clsx(
          "w-full max-w-[900px] flex flex-col md:flex-row md:justify-between mt-6 gap-0 md:gap-8",
          "bg-white/90 rounded-xl shadow-md p-6 border border-slate-100"
        )}
      >
        <div className="w-full flex flex-col gap-1 mb-4 md:mb-0">
          <InfoRow icon={<Calendar size={18} />} field="Fecha de nacimiento" value={user.birthday || "-"} />
          <InfoRow icon={<Mail size={18} />} field="Email" value={user.email || "-"} />
          <InfoRow
            icon={<Phone size={18} />}
            field="Teléfono"
            value={user.phone ? `+56${user.phone}` : "-"}
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <InfoRow
            icon={<MapPin size={18} />}
            field="Dirección"
            value={[user.address, user.county?.county, user.city?.city].filter(Boolean).join(", ") || "-"}
          />
          {user.createdAt && (
            <InfoRow
              icon={<UserRound size={18} />}
              field="Miembro desde"
              value={new Date(user.createdAt).toLocaleDateString()}
            />
          )}
        </div>
      </div>
    </div>
  );
}
