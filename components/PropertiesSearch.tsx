"use client";

import { useMemo, useState } from "react";
import PropertyCard from "./PropertyCard";

type Property = {
  id: number;
  type: string;
  title: string;
  description: string | null;
  image?: string[] | null;
  images?: string[] | null;
  operations?: string[] | null;
};

type Props = {
  properties: Property[];
};

const propertyTypes = ["الكل", "أرض", "شقة", "فيلا", "عمارة"];
const operationTypes = ["الكل", "بيع", "إيجار"];

export default function PropertiesSearch({ properties }: Props) {
  const [selectedType, setSelectedType] = useState("الكل");
  const [selectedOperation, setSelectedOperation] = useState("الكل");

  const filtered = useMemo(() => {
    return properties.filter((property) => {
      const typeMatch =
        selectedType === "الكل" || property.type === selectedType;

      const operationMatch =
        selectedOperation === "الكل" ||
        property.operations?.includes(selectedOperation);

      return typeMatch && operationMatch;
    });
  }, [selectedType, selectedOperation, properties]);

  return (
    <>
      <div className="mb-5">
        <p className="mb-2 text-right text-sm font-bold text-[#d6a642]">
          العقار
        </p>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {propertyTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`min-w-fit rounded-full border px-5 py-2.5 text-sm font-bold transition ${
                selectedType === type
                  ? "border-[#d6a642] bg-[#d6a642] text-[#061d26]"
                  : "border-[#d6a642]/40 bg-white/5 text-white/80"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-2 text-right text-sm font-bold text-[#d6a642]">
          العملية
        </p>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {operationTypes.map((operation) => (
            <button
              key={operation}
              onClick={() => setSelectedOperation(operation)}
              className={`min-w-fit rounded-full border px-5 py-2.5 text-sm font-bold transition ${
                selectedOperation === operation
                  ? "border-[#d6a642] bg-[#d6a642] text-[#061d26]"
                  : "border-[#d6a642]/40 bg-white/5 text-white/80"
              }`}
            >
              {operation}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {filtered.length > 0 ? (
          filtered.map((property) => {
            const propertyImages = Array.isArray(property.images)
              ? property.images
              : Array.isArray(property.image)
              ? property.image
              : [];

            return (
              <PropertyCard
                key={property.id}
                id={property.id}
                type={property.type}
                title={property.title}
                images={propertyImages}
                operations={property.operations}
              />
            );
          })
        ) : (
          <p className="rounded-2xl bg-white/5 p-6 text-center text-white/60">
            لا توجد إعلانات مطابقة حاليًا
          </p>
        )}
      </div>
    </>
  );
}