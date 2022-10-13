import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Button } from "components/Button";
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
    <div className={styles.container} key={row.id}>
      <Draggable draggableId={row.id}>
        <>
          <div className={styles.actionBar}>
            <div style={{ width: "32px" }}>
              <Button
                onlyIcon
                color="#ed6366"
                label="Delete row"
                iconName="xmark"
                onClick={() => onRemoveRow(row.id)}
              />
            </div>
            <div className={styles.rowName}>{`${row.id}`}</div>

            <select
              className={styles.select}
              aria-label="Select template"
              onChange={handleTemplateChange}
            >
              <option value="">Select template</option>
              {templates?.map((template) => (
                <option key={template.id} value={template.alignment}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>
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
        </>
      </Draggable>
    </div>
  );
};
