"use client";

import {
  DndContext,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type SortableMediaProps = {
  items: {
    id: string;
    url: string;
    type?: "image" | "video";
  }[];
  onChange: (items: SortableMediaProps["items"]) => void;
  onRemove: (index: number) => void;
};

function SortableItem({
  item,
  index,
  onRemove,
}: {
  item: SortableMediaProps["items"][number];
  index: number;
  onRemove: (index: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isVideo =
    item.type === "video" ||
    /\.(mp4|mov|webm|m4v)$/i.test(item.url.split("?")[0]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative h-24 touch-none overflow-hidden rounded-2xl bg-black/30"
    >
      {isVideo ? (
        <video
          src={item.url}
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${item.url})` }}
        />
      )}

      {index === 0 && (
        <div className="absolute bottom-1 left-1 rounded-full bg-[#d6a642] px-2 py-1 text-xs font-bold text-[#061d26]">
          الغلاف
        </div>
      )}

      {isVideo && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-[#d6a642]">
            فيديو
          </div>
        </div>
      )}

      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => onRemove(index)}
        className="absolute right-1 top-1 rounded-full bg-red-500 px-2 text-sm text-white"
      >
        ×
      </button>
    </div>
  );
}

export default function SortableMedia({
  items,
  onChange,
  onRemove,
}: SortableMediaProps) {
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    onChange(arrayMove(items, oldIndex, newIndex));
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-3 gap-3">
          {items.map((item, index) => (
            <SortableItem
              key={item.id}
              item={item}
              index={index}
              onRemove={onRemove}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}