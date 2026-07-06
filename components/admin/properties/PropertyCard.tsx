import type { Property } from "./types";

type Props = {
  property: Property;
  onEdit: (property: Property) => void;
  onToggleHidden: (property: Property) => void;
  onDelete: (id: number) => void;
};

export default function PropertyCard({
  property,
  onEdit,
  onToggleHidden,
  onDelete,
}: Props) {
  return (
    <div className="rounded-2xl border border-[#d6a642]/20 bg-white/5 p-4">
      <div
        className="mb-3 h-32 rounded-2xl bg-black/30 bg-cover bg-center"
        style={{
          backgroundImage: property.images?.[0]
            ? `url(${property.images[0]})`
            : "",
        }}
      />

      <p className="text-sm text-[#d6a642]">{property.type}</p>

      {property.operations && property.operations.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {property.operations.map((operation) => (
            <span
              key={operation}
              className="rounded-full bg-[#d6a642]/20 px-3 py-1 text-xs text-[#d6a642]"
            >
              {operation}
            </span>
          ))}
        </div>
      )}

      <h3 className="mt-2 font-bold">{property.title}</h3>

      <p className="mt-1 text-sm text-white/50">
        {property.hidden ? "مخفي" : "ظاهر"}
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <button
          onClick={() => onEdit(property)}
          className="rounded-xl bg-white/10 py-3"
        >
          تعديل
        </button>

        <button
          onClick={() => onToggleHidden(property)}
          className="rounded-xl bg-[#d6a642] py-3 text-[#061d26]"
        >
          {property.hidden ? "إظهار" : "إخفاء"}
        </button>

        <button
          onClick={() => onDelete(property.id)}
          className="rounded-xl bg-red-500/80 py-3"
        >
          حذف
        </button>
      </div>
    </div>
  );
}