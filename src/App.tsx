import {
  TransformComponent,
  TransformWrapper,
} from "@pronestor/react-zoom-pan-pinch";

import { DraggableGrid } from "components/DraggableGrid";
import { createGridFromProducts } from "utils/grid";
import { queryStringToObject } from "utils/query";
import styles from "./App.module.css";
import { useFetchProducts } from "hooks/useFetchProducts";
import { useLocation } from "react-router-dom";

function App() {
  const { search } = useLocation();
  const parsedQuery = queryStringToObject(search);

  const { products } = useFetchProducts(parsedQuery);

  if (!products) return null;

  const grid = createGridFromProducts(products);

  return (
    <div className={styles.root}>
      <div className={styles.topbar}></div>
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
              <DraggableGrid grid={grid} products={products} />
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
}

export default App;
