import { useEffect } from "react";

import useMergeState, { UseMergeState } from "./use-merge-state";

interface ResponseFetching<T> {
  loading: boolean;
  data: T | null;
}

export default function useFetch<T>(
  callback: () => void,
  initialState: null | T = null
): UseMergeState<ResponseFetching<T>> {
  const [response, setResponse] = useMergeState<ResponseFetching<T>>({
    loading: true,
    data: initialState,
  });

  useEffect(() => {
    callback();
  }, []);

  return [response, setResponse];
}