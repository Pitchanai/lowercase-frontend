import BigNumber from "bignumber.js";
import { makeAutoObservable } from "mobx";
import Web3 from "web3";

import { SUPPORTED_CHAINS } from "constants/chainInfo";

import { WalletType } from "data/enums";
import { ChainInfo } from "types/ChainInfo";

export class Web3Store {
  active: boolean;
  instance: Web3 | undefined;
  chainId: number | undefined;
  blockNumber = new BigNumber(0);
  blockTimestamp = new BigNumber(0);
  walletType: WalletType | undefined;

  readonly defaultChainId = 43114;

  constructor() {
    this.active = false;
    this.instance = undefined;
    this.chainId = undefined;
    this.walletType = undefined;

    makeAutoObservable(this);
  }

  setInstance = (instance: Web3 | undefined) => {
    this.instance = instance;
  };

  setActive = (value: boolean) => {
    this.active = value;
  };

  setChainId = (value: number | undefined) => {
    this.chainId = value;
  };

  setBlockNumber = (value: number) => {
    if (this.blockNumber.eq(value)) return;
    this.blockNumber = new BigNumber(value);
  };

  setBlockTimestamp = (value: number) => {
    if (this.blockTimestamp.eq(value)) return;
    this.blockTimestamp = new BigNumber(value);
  };

  setWalletType = (value: WalletType) => {
    this.walletType = value;
  };

  get chainInfo(): ChainInfo | undefined {
    return SUPPORTED_CHAINS[this.chainId ?? 0];
  }

  get isCorrectedChain() {
    return this.chainId ?? 0 in SUPPORTED_CHAINS;
  }
}

export const web3Store = new Web3Store();
