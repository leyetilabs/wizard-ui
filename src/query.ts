import { RequestDocument, Variables } from "graphql-request/dist/types";
import { fetchMantle } from "./graphql";

/* native */
export const getNativeQuery = async <T extends unknown>(params: {
  url: string;
  document: RequestDocument;
  variables?: Variables;
}) => {
  const { url, document, variables } = params;
  const response = await fetchMantle(url, document, variables);
  const { data } = await response.json();
  return data as T;
};
