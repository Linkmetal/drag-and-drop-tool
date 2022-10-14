import {
  TransformComponent,
  TransformWrapper,
} from "@pronestor/react-zoom-pan-pinch";

import { DraggableGrid } from "components/DraggableGrid";
import { Grid } from "types/Grid";
import { Modal } from "components/Modal";
import { Toolbar } from "components/Toolbar";
import { createGridFromProducts } from "utils/grid";
import { queryStringToObject } from "utils/query";
import styles from "./App.module.css";
import { useFetchProducts } from "hooks/useFetchProducts";
import { useLocation } from "react-router-dom";
import { useSaveGrid } from "hooks/useSaveGrid";
import { useState } from "react";
import { useToastMessageContext } from "contexts/ToastContext";

function App() {
  const { search } = useLocation();
  const parsedQuery = queryStringToObject(search);

  const { saveGrid } = useSaveGrid();

  const { products } = useFetchProducts(parsedQuery, {
    onSuccess: (res) => setGrid(createGridFromProducts(res)),
  });

  const [grid, setGrid] = useState<Grid | undefined>(undefined);
  const [isHelpModalVisible, setIsHelpModalVisible] = useState<boolean>(false);

  const { setToastMessage } = useToastMessageContext();

  const handleSave = () => {
    const canSave = !grid?.rows.find(
      (row) => row.templateId === "" || row.productIds.length === 0
    );

    if (!canSave || !grid)
      return setToastMessage({
        title: "Error while saving the Grid",
        description:
          "You can't save a Grid with empty rows or without a template setted in every row",
        variant: "error",
      });

    saveGrid(grid);
    setToastMessage({
      title: "Success",
      description: "Your grid has been succefully saved",
      variant: "success",
    });
  };

  if (!products) return null;

  return (
    <div className={styles.root}>
      <div className={styles.toolbarContainer}>
        <Toolbar
          onHelp={() => setIsHelpModalVisible(true)}
          onSave={handleSave}
        />
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
        >
          <TransformComponent
            wrapperStyle={{ width: "100%", overflowY: "auto" }}
            contentStyle={{ width: "100%" }}
          >
            {grid && (
              <div className={styles.gridContainer}>
                <DraggableGrid
                  grid={grid}
                  products={products}
                  onGridChange={setGrid}
                />
              </div>
            )}
          </TransformComponent>
        </TransformWrapper>
      </div>
      <Modal
        open={isHelpModalVisible}
        onClose={() => setIsHelpModalVisible(false)}
      >
        <div>
          <h1 style={{ marginTop: "0" }}>Help</h1>
          <div>
            <h3>Zoom</h3>
            <p>
              To zoom the grid hold either <b>Command</b> or <b>Control</b> key
              and use the mousewheel or touchpad to change it.
            </p>
          </div>
          <div>
            <h3>Saving the grid</h3>
            <p>
              In order to save the grid, you will need to have all the rows with
              at least 1 item and a template selected.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
