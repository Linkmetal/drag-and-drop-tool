import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Draggable } from "components/Draggable/Draggable";
import { Droppable } from "components/Droppable";
import { Product } from "types/Product";
import { ProductCard } from "components/ProductCard";
import { Row } from "types/Grid";
import { TemplateAlignmentToFlex } from "utils/grid";
import { UniqueIdentifier } from "@dnd-kit/core";
import styles from "./DraggableRow.module.css";
import { useFetchTemplates } from "hooks/useFetchTemplates";
import { useState } from "react";

type DraggableRowProps = {
  row: Row;
  products: Product[];
  itemsIds: UniqueIdentifier[]; // NOTE: This prop is needed because the row change will cause the component to lose the productId while is still on the product, the id array handled by the library handles this
  onRemoveRow: (containerId: UniqueIdentifier) => void;
  onTemplateChange: (containerId: string, templateId: string) => void;
};

export const DraggableRow = ({
  row,
  products,
  onRemoveRow,
  onTemplateChange,
  itemsIds,
}: DraggableRowProps) => {
  const { templates } = useFetchTemplates();
  const [templateAlignment, setTemplateAlignment] = useState<string>(
    templates?.find((template) => template.id === row.templateId)?.alignment ||
      ""
  );

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const templateId =
      templates?.find((template) => template.alignment === e.target.value)
        ?.id || "";

    setTemplateAlignment(e.target.value);
    onTemplateChange(row.id, templateId);
  };

  if (!row) return null;

  return (
    <div key={row.id}>
      <button aria-label="Delete row" onClick={() => onRemoveRow(row.id)}>
        X
      </button>

      <select aria-label="Select template" onChange={handleTemplateChange}>
        <option value="">---</option>
        {templates?.map((template) => (
          <option key={template.id} value={template.alignment}>
            {template.name}
          </option>
        ))}
      </select>

      <Draggable draggableId={row.id}>
        <Droppable droppableId={row.id}>
          <SortableContext
            items={itemsIds}
            strategy={horizontalListSortingStrategy}
            id={row.id}
          >
            <ul
              className={styles.row}
              style={{
                justifyContent:
                  templateAlignment !== ""
                    ? TemplateAlignmentToFlex[templateAlignment]
                    : "space-evenly",
              }}
            >
              {itemsIds.map((itemId) => (
                <ProductCard
                  key={itemId}
                  product={
                    products.find((product) => product.id === itemId) ||
                    ({} as Product)
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
