import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { Template } from "types/Template";
import { TemplateRepository } from "network/repositories/TemplateRepository";

export namespace FetchTemplates {
  export type Response = Template[];
  export type Error = string;
  export type Options = UseQueryOptions<Response, Error>;
}

const createKey = () => ["fetch-templates"];

const queryFetcher = () => () => {
  return TemplateRepository.fetchTemplates();
};

export const useFetchTemplates = (options?: FetchTemplates.Options) => {
  const { data, ...rest } = useQuery<
    FetchTemplates.Response,
    FetchTemplates.Error
  >(createKey(), queryFetcher(), options);

  return { templates: data, ...rest };
};
