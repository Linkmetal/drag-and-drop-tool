import {
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCenter,
  getFirstCollision,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Grid, Row } from "types/Grid";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useCallback, useRef, useState } from "react";

import { DraggableRow } from "./components/DraggableRow/DraggableRow";
import { Product } from "types/Product";
import { gridFixture } from "fixtures/Grid";
import { nanoid } from "nanoid";
import styles from "./DraggableGrid.module.css";

type GridProps = {
  grid?: Grid;
  products: Product[];
};

export const DraggableGrid = ({ grid = gridFixture, products }: GridProps) => {
  const [items, setItems] = useState<{
    [key: UniqueIdentifier]: UniqueIdentifier[];
  }>(
    grid.rows.reduce(
      (acc, value) => ({
        ...acc,
        [value.id as UniqueIdentifier]: value.productIds as UniqueIdentifier[],
      }),
      {} as { [key: UniqueIdentifier]: UniqueIdentifier[] }
    )
  );

  const [clonedItems, setClonedItems] = useState<{
    [key: UniqueIdentifier]: UniqueIdentifier[];
  } | null>(null);

  const [containers, setContainers] = useState(
    Object.keys(items) as UniqueIdentifier[]
  );
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const recentlyMovedToNewContainer = useRef(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in items
          ),
        });
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args);
      let overId = getFirstCollision(intersections, "id");

      if (overId != null) {
        if (overId in items) {
          const containerItems = items[overId];

          if (containerItems.length > 0) {
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  containerItems.includes(container.id as string)
              ),
            })[0]?.id;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, items]
  );

  const findContainer = (id: UniqueIdentifier) => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key: string) =>
      items[key].includes(id as string)
    );
  };

  const onDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id;

    if (overId == null || active.id in items) {
      return;
    }

    const overContainer = findContainer(overId);
    const activeContainer = findContainer(active.id);

    if (!overContainer || !activeContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      setItems((items) => {
        const activeItems = items[activeContainer];
        const overItems = items[overContainer];
        const overIndex = overItems.indexOf(overId);
        const activeIndex = activeItems.indexOf(active.id);

        let newIndex: number;

        if (overId in items) {
          newIndex = overItems.length + 1;
        } else {
          const isBelowOverItem =
            over &&
            active.rect.current.translated &&
            active.rect.current.translated.top >
              over.rect.top + over.rect.height;

          const modifier = isBelowOverItem ? 1 : 0;

          newIndex =
            overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        }

        recentlyMovedToNewContainer.current = true;

        return {
          ...items,
          [activeContainer]: items[activeContainer].filter(
            (item) => item !== active.id
          ),
          [overContainer]: [
            ...items[overContainer].slice(0, newIndex),
            items[activeContainer][activeIndex],
            ...items[overContainer].slice(
              newIndex,
              items[overContainer].length
            ),
          ],
        };
      });
    }
  };

  const onDragCancel = () => {
    if (clonedItems) {
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    // Drag row
    if (active.id in items && over?.id) {
      setContainers((containers) => {
        const activeIndex = containers.indexOf(active.id);
        const overIndex = containers.indexOf(over.id);

        return arrayMove(containers, activeIndex, overIndex);
      });
    }

    const activeContainer = findContainer(active.id);

    if (!activeContainer) {
      setActiveId(null);
      return;
    }

    const overId = over?.id;

    if (overId == null) {
      setActiveId(null);
      return;
    }

    const overContainer = findContainer(overId);

    // Drag item to another row
    if (overContainer) {
      // Cancel the drag if there is more than 3 items in a row
      if (items[overContainer].length >= 4) return onDragCancel();

      const activeIndex = items[activeContainer].indexOf(active.id);

      const overIndex = items[overContainer].indexOf(overId);

      if (activeIndex !== overIndex) {
        setItems((items) => ({
          ...items,
          [overContainer]: arrayMove(
            items[overContainer],
            activeIndex,
            overIndex
          ),
        }));
      }
    }

    setActiveId(null);
  };

  const handleAddRow = () => {
    const newContainerId = nanoid(10);

    setItems({
      ...items,
      [newContainerId]: [],
    });
    setContainers((containers) => [...containers, newContainerId]);
  };

  const handleRemoveRow = (containerId: UniqueIdentifier) => {
    if (items[containerId].length > 0) return;

    setContainers((containers) =>
      containers.filter((id) => id !== containerId)
    );
    const newItems = items;
    delete newItems[containerId];
    setItems(newItems);
  };

  return (
    <div className={styles.container}>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetectionStrategy}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        onDragStart={({ active }) => {
          setActiveId(active.id);
          setClonedItems(items);
        }}
        onDragCancel={onDragCancel}
      >
        <SortableContext
          items={containers}
          strategy={horizontalListSortingStrategy}
          id={grid.id}
        >
          <ul className={styles.grid}>
            {containers.map((containerId) => (
              <DraggableRow
                key={containerId}
                handleRemove={handleRemoveRow}
                row={
                  grid.rows.find((row) => row.id === containerId) ||
                  ({
                    id: containerId,
                    productIds: items[containerId],
                    templateId: "",
                  } as Row)
                }
                products={products.filter((product) =>
                  items[containerId].includes(product.id)
                )}
              />
            ))}
          </ul>
          <button onClick={handleAddRow}>Add row</button>
        </SortableContext>
      </DndContext>
    </div>
  );
};
