import type { Property } from "./types";
import PropertyCard from "./PropertyCard";

type Props = {
  properties: Property[];
  onEdit: (property: Property) => void;
  onToggleHidden: (property: Property) => void;
  onDelete: (id: number) => void;
};

export default function PropertyList({
  properties,
  onEdit,
  onToggleHidden,
  onDelete,
}: Props) {
  if (properties.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-white/60">
        لا توجد إعلانات حالياً.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onEdit={onEdit}
          onToggleHidden={onToggleHidden}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}