import {
  TransformComponent,
  TransformWrapper,
} from "@pronestor/react-zoom-pan-pinch";

import { DraggableGrid } from "components/DraggableGrid";
import { Grid } from "types/Grid";
import { Toolbar } from "components/Toolbar";
import { createGridFromProducts } from "utils/grid";
import { queryStringToObject } from "utils/query";
import styles from "./App.module.css";
import { useFetchProducts } from "hooks/useFetchProducts";
import { useLocation } from "react-router-dom";
import { useSaveGrid } from "hooks/useSaveGrid";
import { useState } from "react";

function App() {
  const { search } = useLocation();
  const parsedQuery = queryStringToObject(search);

  const { saveGrid } = useSaveGrid();

  const { products } = useFetchProducts(parsedQuery, {
    onSuccess: (res) => setGrid(createGridFromProducts(res)),
  });

  const [grid, setGrid] = useState<Grid>({} as Grid);

  if (!products) return null;

  const handleSave = () => {
    const canSave = !grid.rows.find(
      (row) => row.templateId === "" || row.productIds.length === 0
    );

    if (!canSave) return;

    saveGrid(grid);
  };

  return (
    <div className={styles.root}>
      <div className={styles.toolbarContainer}>
        <Toolbar onHelp={() => undefined} onSave={handleSave} />
      </div>
      <div className={styles.container}>
        <TransformWrapper
          initialScale={1}
          minScale={0.2}
          maxScale={1}
          wheel={{
            step: 0.05,
            activationKeys: ["Meta", "Control"],
          }}
          panning={{ disabled: true, excluded: ["select"] }}
          doubleClick={{ disabled: true }}
          centerZoomedOut
        >
          <TransformComponent
            wrapperStyle={{ width: "100%", overflowY: "auto" }}
            contentStyle={{ width: "100%" }}
          >
            <div className={styles.gridContainer}>
              <DraggableGrid
                grid={grid}
                products={products}
                onGridChange={setGrid}
              />
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
}

export default App;
