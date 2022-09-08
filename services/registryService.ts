import { web3Store } from "stores/web3Store";

import baseRegistry from "constants/registry";
import { ALL_CHAINS } from "constants/chainInfo";

import { ChainId } from "constants/registry";

type BaseRegistryType = typeof baseRegistry;
type Registry = {
  [key in keyof BaseRegistryType]: BaseRegistryType[key][ChainId];
};

class RegistryService {
  registries: Record<number, Registry> = {};

  constructor() {
    const supportedChainIds = Object.keys(ALL_CHAINS);
    const registryKeys = Object.keys(baseRegistry);

    for (let i = 0; i < supportedChainIds.length; i++) {
      const chainId = parseInt(supportedChainIds[i]);
      const _registry = registryKeys.reduce((accumulated, key) => {
        accumulated[key] = baseRegistry[key][chainId];
        return accumulated;
      }, {} as Registry);

      this.registries[chainId] = _registry;
    }
  }

  getRegistry = () => {
    const { chainId, defaultChainId } = web3Store;

    return this.registries[chainId ?? defaultChainId];
  };
}

export const registryService = new RegistryService();
