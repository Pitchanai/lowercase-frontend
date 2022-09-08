import { flatten } from "lodash";
import Web3 from "web3";

import { registryService } from "services/registryService";

import { web3Store } from "stores/web3Store";

import Multicall2 from "ABI/Multicall2.json";
import Multicall from "ABI/Multicall.json";

const BATCH_SIZE = 50;

class ContractService {
  getContract = (abi, address: string) => {
    const web3 = web3Store.instance;
    if (!web3) return;
    return new web3.eth.Contract(abi, address);
  };

  encodeParameters = (types, value): string => {
    const web3 = web3Store?.instance ?? new Web3();
    return web3.eth.abi.encodeParameters(types, value);
  };

  makeMulticall = async (addresses, data, types = null, blockNumber = null) => {
    const { multicallAddress } = registryService.getRegistry();
    if (!web3Store.instance) return [];

    try {
      const web3 = web3Store.instance;

      let returnData = [];
      const requests = [];

      const multicall = new web3.eth.Contract(Multicall.abi as any, multicallAddress);

      for (let i = 0; i < Math.ceil(addresses.length / BATCH_SIZE); i++) {
        const batchAddresses = addresses.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);

        const batchData = data.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);

        const callObj = multicall.methods.aggregate(
          batchAddresses.map((address, idx) => ({
            target: address,
            callData: batchData[idx].encodeABI(),
          }))
        );

        if (blockNumber) {
          requests.push(callObj.call({}, blockNumber) as never);
        } else {
          requests.push(callObj.call() as never);
        }
      }

      let results = await Promise.all(requests);

      results = results.map(({ returnData }) => returnData);

      for (const result of results) {
        returnData = returnData.concat(result);
      }

      if (types) {
        returnData = returnData.map((result) => web3.eth.abi.decodeParameters(types, result)) as never[];
      } else {
        returnData = returnData.map((result, idx) =>
          web3.eth.abi.decodeParameters(data[idx]._method.outputs, result)
        ) as never[];
      }

      return returnData;
    } catch (e) {
      console.error("Make multicall failed.");
      console.error(e);
      console.log(data);
    }

    return [];
  };

  makeMulticallNoAddress = async (data, types: any = null, blockNumber = null, id = "") => {
    const { multicallAddress } = registryService.getRegistry();

    if (!web3Store.instance || data.length === 0) return [];

    try {
      const web3 = web3Store.instance;

      let returnData = [];
      const requests = [];

      const multicall = new web3.eth.Contract(Multicall.abi as any, multicallAddress);

      for (let i = 0; i < Math.ceil(data.length / BATCH_SIZE); i++) {
        const batchData = data.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);

        const callObj = multicall.methods.aggregate(
          batchData.map((data) => ({
            target: data._parent._address,
            callData: data.encodeABI(),
          }))
        );

        if (blockNumber) {
          requests.push(callObj.call({}, blockNumber) as never);
        } else {
          requests.push(callObj.call() as never);
        }
      }

      let results = await Promise.all(requests);

      results = results.map(({ returnData }) => returnData);

      for (const result of results) {
        returnData = returnData.concat(result);
      }

      if (types) {
        returnData = returnData.map((result) => web3.eth.abi.decodeParameters(types, result)) as never[];
        if (types.length === 1) {
          returnData = returnData.map((data) => data["0"]);
        }
      } else {
        returnData = returnData
          .map((result, idx) => web3.eth.abi.decodeParameters(data[idx]._method.outputs, result))
          .map((result, idx) => (data[idx]._method.outputs.length === 1 ? result[0] : result)) as never[];
      }

      return returnData;
    } catch (e) {
      console.error("Make multicall no addr failed.", id);
      console.error(`${id}: error`, e);
      console.log("no addr", data);
    }

    return [];
  };

  /**
   * return undefined only for failed request
   * https://github.com/makerdao/multicall
   * Multicall2 is the same as Multicall, but provides addition functions that allow calls within the batch to fail. Useful for situations where a call may fail depending on the state of the contract.
   * @param data contract call methods
   * @param types
   * @param blockNumber
   * @returns Should handle undefined case after getting the results
   */

  makeMulticallNullable = async (data, types: any = null, blockNumber = null, id = "") => {
    const registry = registryService.getRegistry();
    if (!web3Store.instance) return [];

    try {
      const web3 = web3Store.instance;

      let returnData = [];
      const requests = [];

      const multicall = new web3.eth.Contract(Multicall2.abi as any, registry.multicall2Address);

      for (let i = 0; i < Math.ceil(data.length / BATCH_SIZE); i++) {
        const batchData = data.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);

        const callObj = multicall.methods.aggregate(
          batchData.map((data) => ({
            target: data._parent._address,
            callData: data.encodeABI(),
          }))
        );

        if (blockNumber) {
          requests.push(callObj.call({}, blockNumber) as never);
        } else {
          requests.push(callObj.call() as never);
        }
      }

      let results = await Promise.all(requests);

      results = results.map(({ returnData }) => returnData);

      for (const result of results) {
        returnData = returnData.concat(result);
      }

      if (types) {
        returnData = returnData.map((result) => web3.eth.abi.decodeParameters(types, result)) as never;
        if (types.length === 1) {
          returnData = returnData.map((data) => data["0"]);
        }
      } else {
        returnData = returnData
          .map((result, idx) =>
            result === "0x" ? undefined : web3.eth.abi.decodeParameters(data[idx]._method.outputs, result)
          )
          .map((result, idx) =>
            result === undefined ? undefined : data[idx]._method.outputs.length === 1 ? result[0] : result
          ) as never;
      }

      return returnData;
    } catch (e) {
      console.error("Make makeMulticallNullable failed.", id);
      console.error(e);
    }

    return [];
  };

  /**
   * return undefined only for failed request
   * https://github.com/makerdao/multicall
   * Multicall2 is the same as Multicall, but provides addition functions that allow calls within the batch to fail. Useful for situations where a call may fail depending on the state of the contract.
   * @param data contract call methods
   * @param types
   * @param blockNumber
   * @returns Should handle undefined case after getting the results
   */
  makeMulticallTryAggregate = async (
    data,
    types: any[] | undefined = undefined,
    blockNumber: number | undefined = undefined,
    id = ""
  ): Promise<(any | undefined)[]> => {
    const registry = registryService.getRegistry();

    const web3 = web3Store.instance;
    if (!web3) return [];

    try {
      let returnData: string[] = [];
      const requests: { success: boolean; returnData: string }[][] = [];

      const multicall = this.getContract(Multicall2.abi as any, registry.multicall2Address);

      for (let i = 0; i < Math.ceil(data.length / BATCH_SIZE); i++) {
        const batchData = data.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);

        const callObj = multicall?.methods.tryAggregate(
          false, // * false -> accept that the result can be unsuccess.
          batchData.map((data) => ({
            target: data._parent._address,
            callData: data.encodeABI(),
          }))
        );

        if (blockNumber) {
          requests.push(callObj.call({}, blockNumber));
        } else {
          requests.push(callObj.call());
        }
      }

      const _results = await Promise.all(requests);

      // * Example returned data
      // * _results = [batch1, batch2, batch3, ...]
      // * batch = [ {success, returnData}, {success, returnData}, {success, returnData}, ... ]
      // * NOTE: `success` is boolean and `returnData` is the data (not the array of data)
      const results = _results.map((batchResult) =>
        batchResult.map(({ success, returnData }) => (success ? returnData : "0x"))
      );

      returnData = flatten(results);

      let returnDataDecoded: (any | undefined)[];
      if (types) {
        returnDataDecoded = returnData.map((result) => web3.eth.abi.decodeParameters(types, result));
        if (types.length === 1) {
          returnDataDecoded = returnData.map((data) => data["0"]);
        }
      } else {
        returnDataDecoded = returnData
          .map((result, idx) =>
            result === "0x" ? undefined : web3.eth.abi.decodeParameters(data[idx]._method.outputs, result)
          )
          .map((result, idx) =>
            result === undefined ? undefined : data[idx]._method.outputs.length === 1 ? result[0] : result
          );
      }

      return returnDataDecoded;
    } catch (e) {
      console.error("makeMulticallTryAggregate failed." + id);
      console.log(data);
      console.error(e);
    }

    return [];
  };
}

export const contractService = new ContractService();
