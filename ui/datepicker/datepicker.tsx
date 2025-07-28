import { useState } from "react";
import CustomSelect from "../select/select";

type DateInputProps = {
  onChange: (value: string) => void; // value in "YYYY-MM-DD" format
  value?: string;
  disabled?: boolean;
  hasLabel?: boolean;
  labelText?: string;
};

const getDays = (month: number, year: number) => {
  return new Array(new Date(year, month, 0).getDate())
    .fill(null)
    .map((_, i) => ({ label: String(i + 1), value: i + 1 }));
};

export default function DateSelectInput({ onChange, value, disabled, labelText, hasLabel = false }: DateInputProps) {
  const normalizeDate = (val?: string) => {
    if (!val) return new Date();
    const [y, m, d] = val.split("-");
    return new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
  };

  const currentDate = normalizeDate(value);
  const [day, setDay] = useState(currentDate.getUTCDate());
  const [month, setMonth] = useState(currentDate.getUTCMonth() + 1);
  const [year, setYear] = useState(currentDate.getUTCFullYear());

  const years = Array.from({ length: 100 }, (_, i) => ({
    label: String(currentDate.getFullYear() - i),
    value: currentDate.getFullYear() - i,
  }));

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ].map((label, index) => ({ label, value: index + 1 }));

  const days = getDays(month, year);

  const handleChange = (newDay: number, newMonth: number, newYear: number) => {
    const formatted = `${newYear}-${String(newMonth).padStart(2, "0")}-${String(newDay).padStart(2, "0")}`;
    onChange(formatted);
  };

  return (
    <div className="w-full flex flex-col gap-1 mt-2 mb-4">
      {hasLabel && <span className="text-[14px] font-semibold">{labelText}</span>}
      <div className="flex gap-2 w-full">
        <CustomSelect
          name="day"
          options={days}
          value={day}
          onChange={(val) => {
            setDay(Number(val));
            handleChange(Number(val), month, year);
          }}
          size="sm"
          disabled={disabled}
          omitSpacing
        />
        <CustomSelect
          name="month"
          options={months}
          value={month}
          onChange={(val) => {
            setMonth(Number(val));
            // Adjust day in case new month has fewer days
            const maxDay = new Date(year, Number(val), 0).getDate();
            const newDay = Math.min(day, maxDay);
            setDay(newDay);
            handleChange(newDay, Number(val), year);
          }}
          size="sm"
          disabled={disabled}
          omitSpacing
        />
        <CustomSelect
          name="year"
          options={years}
          value={year}
          onChange={(val) => {
            setYear(Number(val));
            const maxDay = new Date(Number(val), month, 0).getDate();
            const newDay = Math.min(day, maxDay);
            setDay(newDay);
            handleChange(newDay, month, Number(val));
          }}
          size="sm"
          disabled={disabled}
          omitSpacing
        />
      </div>
    </div>
  );
}
