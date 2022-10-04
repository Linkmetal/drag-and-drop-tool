import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Draggable } from "components/Draggable/Draggable";
import { Droppable } from "components/Droppable";
import { ProductCard } from "components/ProductCard";
import { UniqueIdentifier } from "@dnd-kit/core";
import { productsFixture } from "fixtures/Products";
import styles from "./DraggableRow.module.css";

type DraggableRowProps = {
  containerId: UniqueIdentifier;
  rowItems: UniqueIdentifier[];
  handleRemove: (containerId: UniqueIdentifier) => void;
};

export const DraggableRow = ({
  containerId,
  rowItems,
  handleRemove,
}: DraggableRowProps) => {
  return (
    <div key={containerId}>
      <button onClick={() => handleRemove(containerId)}>X</button>
      <Draggable draggableId={containerId.toString()}>
        <Droppable droppableId={containerId.toString()}>
          <SortableContext
            items={rowItems}
            strategy={horizontalListSortingStrategy}
            id={containerId.toString()}
          >
            <ul className={styles.row}>
              {rowItems.map((productId) => (
                <ProductCard
                  key={productId}
                  // TODO: change this to take the product from parent
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
      </Draggable>
    </div>
  );
};
