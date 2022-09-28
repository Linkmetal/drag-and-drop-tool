import { FetchTemplates } from "hooks/useFetchTemplates";
import { templatesFixture } from "fixtures/Templates";

export const TemplateRepository = {
  fetchTemplates(): Promise<FetchTemplates.Response> {
    return Promise.resolve(templatesFixture);
  },
};
