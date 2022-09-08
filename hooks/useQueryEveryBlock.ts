import { isEqual } from "lodash";
import { useEffect, useState } from "react";

import { web3Store } from "stores/web3Store";

type useQueryEveryBlockResult<T> = {
  isReady: boolean;
  isFetching: boolean;
  queryResult: T | undefined;
};

/**
 * useQueryEveryBlock will always query when one of the dependencies is changed but will only query every time the block number changes except when the query hasn't been done yet.
 * @param queryFunction
 * @param dependencies
 * @returns
 */

export const useQueryEveryBlock = <T>(
  queryFunction: () => Promise<T>,
  dependencies: any[]
): useQueryEveryBlockResult<T> => {
  const [isReady, setIsReady] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [queryResult, setQueryResult] = useState<T | undefined>(undefined);

  const [isQueryOnce, setIsQueryOnce] = useState(false);

  const query = async () => {
    setIsFetching(true);
    try {
      const result = await queryFunction();

      const isQueryEqual = isEqual(queryResult, result);

      if (!isQueryEqual) setQueryResult(result);
      if (!isReady) setIsReady(true);
    } catch (e) {
      console.log("useQueryEveryBlock error", e);
    }
    setIsFetching(false);
    if (!isQueryOnce) setIsQueryOnce(true);
  };

  /**
   * This useEffect will always query data no matter the latest query is still querying.
   */

  useEffect(() => {
    query();
  }, [...dependencies]);

  /**
   * This useEffect will query every time the block number changed expect when there's no query happened in this hook yet or the last query hasn't done yet.
   */
  useEffect(() => {
    if (!isQueryOnce) return;
    if (isFetching) return;
    try {
      query();
    } catch (e) {
      console.log("useQueryEveryBlock error", e);
    }
  }, [web3Store.blockNumber]);

  return { isReady, isFetching, queryResult };
};
