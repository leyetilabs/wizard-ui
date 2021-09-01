import { gql } from "graphql-request";
import { ContractVariables } from "./types";

interface Query extends Partial<ContractVariables> {
  name: string;
}

export const stringify = (msg: object) => {
  return JSON.stringify(msg).replace(/"/g, '\\"');
};

const getDocument = ({ name, contract, msg }: Query) =>
  !msg
    ? ``
    : `
    ${name}: WasmContractsContractAddressStore(
      ContractAddress: "${contract}"
      QueryMsg: "${stringify(msg)}"
    ) {
      height: Height
      result: Result
    }`;

const alias = (queries: Query[], name: string) => {
  return gql`
    query ${name} {
      ${queries.map(getDocument)}
    }
  `;
};

export default alias;
