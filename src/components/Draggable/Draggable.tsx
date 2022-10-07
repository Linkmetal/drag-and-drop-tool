import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

type DraggableProps = {
  children: JSX.Element;
  draggableId: string;
};

export const Draggable = ({ children, draggableId }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: draggableId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <li ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </li>
  );
};
