"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import NewLink from "./NewLink";
import styles from "@/styles/links.module.css";

export default function DragAndDropWrapper({
  links,
  setLinks,
  deleteLink,
  updateLink,
  platforms,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setLinks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        return newItems.map((item, index) => ({
          ...item,
          sequence: index,
        }));
      });
    }
  }

  return (
    <div className={styles.linksList}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={links} strategy={verticalListSortingStrategy}>
          {links?.map((x) => (
            <NewLink
              key={x.id}
              link={x}
              index={x.sequence}
              deleteLink={deleteLink}
              updateLink={updateLink}
              platforms={platforms}
              isDragDisabled={false}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
