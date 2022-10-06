import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Draggable } from "components/Draggable/Draggable";
import { Droppable } from "components/Droppable";
import { ProductCard } from "components/ProductCard";
import { Row } from "types/Grid";
import { UniqueIdentifier } from "@dnd-kit/core";
import { productsFixture } from "fixtures/Products";
import styles from "./DraggableRow.module.css";
import { useFetchTemplates } from "hooks/useFetchTemplates";
import { useState } from "react";

type DraggableRowProps = {
  row: Row;
  containerId: UniqueIdentifier;
  rowItemsIds: UniqueIdentifier[];
  handleRemove: (containerId: UniqueIdentifier) => void;
};

export const DraggableRow = ({
  row,
  containerId,
  rowItemsIds,
  handleRemove,
}: DraggableRowProps) => {
  const { templates } = useFetchTemplates();
  const [template, setTemplate] = useState<string>(
    templates?.find((template) => template.id === row.templateId)?.alignment ||
      ""
  );

  if (!row || !rowItemsIds) return null;

  return (
    <div key={containerId}>
      <button onClick={() => handleRemove(containerId)}>X</button>
      <select onChange={(e) => setTemplate(e.target.value)}>
        <option value="">---</option>
        {templates?.map((template) => (
          <option key={template.id} value={template.alignment}>
            {template.name}
          </option>
        ))}
      </select>
      <Draggable draggableId={containerId.toString()}>
        <Droppable droppableId={containerId.toString()}>
          <SortableContext
            items={rowItemsIds}
            strategy={horizontalListSortingStrategy}
            id={containerId.toString()}
          >
            <ul
              className={styles.row}
              style={{
                justifyContent: template !== "" ? template : "space-around",
              }}
            >
              {rowItemsIds.map((productId) => (
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
