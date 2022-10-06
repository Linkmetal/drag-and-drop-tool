import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { Grid } from "types/Grid";
import { GridRepository } from "network/repositories/GridRepository";

export namespace SaveGrid {
  export type Response = void;
  export type Variables = Grid;
  export type Error = string;
  export type Options = UseMutationOptions<Response, Error, Variables>;
}

export const useSaveGrid = (options?: SaveGrid.Options) => {
  const mutationFn = async (data: SaveGrid.Variables) => {
    return GridRepository.saveGrid(data);
  };

  const mutation = useMutation<
    SaveGrid.Response,
    SaveGrid.Error,
    SaveGrid.Variables
  >(mutationFn, options);

  return { ...mutation, saveGrid: mutation.mutate };
};
