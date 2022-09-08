export enum ChainId {
  ETH = 1,
  RINKEBY = 4,
  KOVAN = 42,
  BSC = 56,
  AVAX = 43114,
  FTM = 250,
  OPTIMISM = 10,
}

export enum TaskPriority {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export default {
  blockTime: {
    [ChainId.ETH]: 15,
    [ChainId.RINKEBY]: 15,
    [ChainId.KOVAN]: 4,
    [ChainId.BSC]: 3,
    [ChainId.AVAX]: 3,
    [ChainId.FTM]: 1,
    [ChainId.OPTIMISM]: 10,
  },
  coingeckoId: {
    [ChainId.ETH]: "ethereum",
    [ChainId.RINKEBY]: "ethereum",
    [ChainId.KOVAN]: "ethereum",
    [ChainId.BSC]: "binancecoin",
    [ChainId.AVAX]: "avalanche-2",
    [ChainId.FTM]: "fantom",
    [ChainId.OPTIMISM]: "ethereum",
  },
  defaultGasPrice: {
    [ChainId.ETH]: 25,
    [ChainId.RINKEBY]: 25,
    [ChainId.KOVAN]: 25,
    [ChainId.BSC]: 5,
    [ChainId.AVAX]: 25,
    [ChainId.FTM]: 500,
    [ChainId.OPTIMISM]: 0.1,
  },
  multicallAddress: {
    [ChainId.ETH]: "0xeefba1e63905ef1d7acba5a8513c70307c1ce441",
    [ChainId.RINKEBY]: "", //'0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
    [ChainId.KOVAN]: "", //'0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
    [ChainId.BSC]: "", //'0x20114aa39cbed48697c5e1ce9f81b39dea1b1541',
    [ChainId.AVAX]: "",
    [ChainId.FTM]: "",
    [ChainId.OPTIMISM]: "",
  },
  multicall2Address: {
    [ChainId.ETH]: "0x5ba1e12693dc8f9c48aad8770482f4739beed696",
    [ChainId.RINKEBY]: "0x5ba1e12693dc8f9c48aad8770482f4739beed696",
    [ChainId.KOVAN]: "0x5ba1e12693dc8f9c48aad8770482f4739beed696",
    [ChainId.BSC]: "",
    [ChainId.AVAX]: "",
    [ChainId.FTM]: "",
    [ChainId.OPTIMISM]: "",
  },
  nativePriceEndpoint: {
    [ChainId.ETH]: "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
    [ChainId.RINKEBY]: "", //'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
    [ChainId.KOVAN]: "", //'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
    [ChainId.BSC]: "", //'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd',
    [ChainId.AVAX]: "",
    [ChainId.FTM]: "",
    [ChainId.OPTIMISM]: "",
  },
  wNativeAddress: {
    [ChainId.ETH]: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    [ChainId.RINKEBY]: "",
    [ChainId.KOVAN]: "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
    [ChainId.BSC]: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    [ChainId.AVAX]: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
    [ChainId.FTM]: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
    [ChainId.OPTIMISM]: "",
  },
  taskPriority: {
    [ChainId.ETH]: {
      [TaskPriority.HIGH]: 1,
      [TaskPriority.MEDIUM]: 5,
      [TaskPriority.LOW]: 50,
    },
    [ChainId.RINKEBY]: {
      [TaskPriority.HIGH]: 1,
      [TaskPriority.MEDIUM]: 5,
      [TaskPriority.LOW]: 50,
    },
    [ChainId.KOVAN]: {
      [TaskPriority.HIGH]: 1,
      [TaskPriority.MEDIUM]: 5,
      [TaskPriority.LOW]: 50,
    },
    [ChainId.BSC]: {
      [TaskPriority.HIGH]: 1,
      [TaskPriority.MEDIUM]: 5,
      [TaskPriority.LOW]: 50,
    },
    [ChainId.AVAX]: {
      [TaskPriority.HIGH]: 1,
      [TaskPriority.MEDIUM]: 5,
      [TaskPriority.LOW]: 50,
    },
    [ChainId.FTM]: {
      [TaskPriority.HIGH]: 3,
      [TaskPriority.MEDIUM]: 10,
      [TaskPriority.LOW]: 200,
    },
    [ChainId.OPTIMISM]: {
      [TaskPriority.HIGH]: 3,
      [TaskPriority.MEDIUM]: 10,
      [TaskPriority.LOW]: 200,
    },
  },
};
