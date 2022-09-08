import { AbstractConnector } from "@web3-react/abstract-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

import { ALL_CHAINS, ALL_CHAIN_IDS } from "constants/chainInfo";

export type Connector = {
  logo?: string;
  instance: AbstractConnector;
};

const RPC_URLS: { [chainId: number]: string } = {};
ALL_CHAIN_IDS.forEach((chainId) => (RPC_URLS[chainId] = ALL_CHAINS[chainId].rpcEndpoint));

/**
 * * ############################################################################################
 * * #                                    connectors objects                                    #
 * * ############################################################################################
 */

export const injectedConnector = new InjectedConnector({ supportedChainIds: ALL_CHAIN_IDS });
