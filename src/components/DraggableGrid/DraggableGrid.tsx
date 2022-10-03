import {
  CollisionDetection,
  DndContext,
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
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useCallback, useRef, useState } from "react";

import { Droppable } from "components/Droppable";
import { Grid } from "types/Grid";
import { Product } from "types/Product";
import { ProductCard } from "components/ProductCard";
import { productsFixture } from "fixtures/Products";
import styles from "./DraggableGrid.module.css";

type GridProps = {
  grid?: Grid;
};

export const DraggableGrid = ({
  grid = {
    id: "asd",
    rows: [
      {
        id: "r1",
        productIds: [
          "63342dacc3764d72ac356d74",
          "63342dac204a7b6b2e64a1d1",
          "63342dac671db7974686b9f1",
          "63342dac6f23396fbe4ab785",
        ],
        templateId: "",
      },
      { id: "r2", productIds: [], templateId: "" },
      { id: "r3", productIds: [], templateId: "" },
    ],
  },
}: GridProps) => {
  const [items, setItems] = useState<{
    [key: UniqueIdentifier]: UniqueIdentifier[];
  }>(
    grid.rows.reduce(
      (accumulator, value) => ({
        ...accumulator,
        [value.id as UniqueIdentifier]: value.productIds as UniqueIdentifier[],
      }),
      {} as { [key: UniqueIdentifier]: UniqueIdentifier[] }
    )
  );

  console.log("🚀 ~ file: DraggableGrid.tsx ~ line 43 ~ items", items);
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

  const findContainer = (id: UniqueIdentifier) => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key: string) =>
      items[key].includes(id as string)
    );
  };

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
      console.log("🚀 ~ file: DraggableGrid.tsx ~ line 70 ~ overId", overId);

      if (overId != null) {
        if (overId in items) {
          const containerItems = items[overId];

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
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

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetectionStrategy}
        onDragStart={({ active }) => {
          setActiveId(active.id);
          setClonedItems(items);
        }}
        onDragEnd={({ active, over }) => {
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

          // if (overId === PLACEHOLDER_ID) {
          //   const newContainerId = getNextContainerId();

          //   unstable_batchedUpdates(() => {
          //     setContainers((containers) => [...containers, newContainerId]);
          //     setItems((items) => ({
          //       ...items,
          //       [activeContainer]: items[activeContainer].filter(
          //         (id) => id !== activeId
          //       ),
          //       [newContainerId]: [active.id],
          //     }));
          //     setActiveId(null);
          //   });
          //   return;
          // }

          const overContainer = findContainer(overId);
          console.log(
            "🚀 ~ file: DraggableGrid.tsx ~ line 202 ~ overContainer",
            overContainer
          );

          if (overContainer) {
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
        }}
        onDragOver={({ active, over }) => {
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
        }}
      >
        <>
          <SortableContext
            items={containers}
            strategy={horizontalListSortingStrategy}
            id={grid.id}
          >
            {containers.map((containerId) => (
              <Droppable droppableId={containerId.toString()} key={containerId}>
                <SortableContext
                  items={items[containerId]}
                  strategy={horizontalListSortingStrategy}
                  id={containerId.toString()}
                >
                  <ul className={styles.row}>
                    {items[containerId].map((productId, index) => (
                      <ProductCard
                        key={productId}
                        product={
                          productsFixture.find(
                            (product) => product.id === productId
                          ) ?? productsFixture[0]
                        }
                      />
                    ))}
                  </ul>
                </SortableContext>
              </Droppable>
            ))}
          </SortableContext>
        </>
      </DndContext>
    </div>
  );
};
