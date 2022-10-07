import { SaveGrid } from "hooks/useSaveGrid";

export const GridRepository = {
  saveGrid(data: SaveGrid.Variables): Promise<SaveGrid.Response> {
    return Promise.resolve().then(() => {
      localStorage.setItem(`grid-${data.id}`, JSON.stringify(data));
    });
  },
};
