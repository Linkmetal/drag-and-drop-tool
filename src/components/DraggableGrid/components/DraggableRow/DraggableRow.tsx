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
  onRemoveRow: (containerId: UniqueIdentifier) => void;
  onTemplateChange: (containerId: string, templateId: string) => void;
};

export const DraggableRow = ({
  row,
  products,
  onRemoveRow,
  onTemplateChange,
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
      <button onClick={() => onRemoveRow(row.id)}>X</button>

      <select onChange={handleTemplateChange}>
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
            items={products.map((product) => product.id)}
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
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ul>
          </SortableContext>
        </Droppable>
      </Draggable>
    </div>
  );
};
