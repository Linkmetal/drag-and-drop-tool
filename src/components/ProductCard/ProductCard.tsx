import { Draggable } from "components/Draggable";
import { Product } from "types/Product";
import { numberToEuros } from "utils/money";
import styles from "./ProductCard.module.css";

type DroppableProps = {
  product: Product;
};

export const ProductCard = ({ product }: DroppableProps) => {
  return (
    <Draggable draggableId={product.id}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={product.imageUrl} alt={`${product.name}`} />
        </div>
        <div>
          <p>{product.name}</p>
          <p>{numberToEuros(product.price)}</p>
        </div>
      </div>
    </Draggable>
  );
};
