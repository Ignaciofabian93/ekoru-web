import { DocumentNode, OperationVariables, TypedDocumentNode, useLazyQuery, useQuery } from "@apollo/client";

export function useLazyQueryWithVariables(
  query: DocumentNode | TypedDocumentNode<unknown, OperationVariables>,
  variables: OperationVariables | undefined,
) {
  const [fetchData, { loading, error, data }] = useLazyQuery(query, {
    variables: variables,
  });

  return { fetchData, loading, error, data };
}

export function useLazyQueryWithoutVariables(query: DocumentNode | TypedDocumentNode<unknown, OperationVariables>) {
  const [fetchData, { loading, error, data }] = useLazyQuery(query);

  return { fetchData, loading, error, data };
}

export function useQueryWithVariables(
  query: DocumentNode | TypedDocumentNode<unknown, OperationVariables>,
  variables: OperationVariables | undefined,
) {
  const { loading, error, data } = useQuery(query, {
    variables: variables,
  });

  return { loading, error, data };
}

export function useQueryWithoutVariables(query: DocumentNode | TypedDocumentNode<unknown, OperationVariables>) {
  const { loading, error, data } = useQuery(query);

  return { loading, error, data };
}
