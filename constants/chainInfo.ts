import { ChainInfo } from "types/ChainInfo";

export const ALL_CHAINS: Record<number, ChainInfo> = {
  1: {
    name: "Ethereum Mainnet",
    shortName: "Ethereum",
    logo: "/static/logos/eth.png",
    explorer: "https://etherscan.io",
    explorerName: "Etherscan",
    rpcEndpoint: "https://mainnet.infura.io/v3/7b8814ab9d304ceab6c258300e5f93e0",
    isSupported: true,
  },
  3: {
    name: "Ropsten Test Network",
    shortName: "Ropsten",
    logo: "/static/logos/eth.png",
    explorer: "https://ropsten.etherscan.io",
    explorerName: "Etherscan",
    rpcEndpoint: "https://mainnet.infura.io/v3/7b8814ab9d304ceab6c258300e5f93e0",
    isSupported: false,
  },
  4: {
    name: "Rinkeby Test Network",
    shortName: "Rinkeby",
    logo: "/static/logos/eth.png",
    explorer: "https://rinkeby.etherscan.io",
    explorerName: "Etherscan",
    rpcEndpoint: "https://rinkeby.infura.io/v3/7b8814ab9d304ceab6c258300e5f93e0",
    isSupported: true,
  },
  5: {
    name: "Goerli Test Network",
    shortName: "Goerli",
    logo: "/static/logos/eth.png",
    explorer: "https://goerli.etherscan.io",
    explorerName: "Etherscan",
    rpcEndpoint: "https://mainnet.infura.io/v3/7b8814ab9d304ceab6c258300e5f93e0",
    isSupported: false,
  },
  10: {
    name: "Optimism",
    shortName: "Optimism",
    logo: "/static/tokens/optimism.svg",
    explorer: "https://optimistic.etherscan.io",
    explorerName: "The Optimistic Ethereum Explorer",
    rpcEndpoint: "https://mainnet.optimism.io",
    isSupported: false,
  },
  42: {
    name: "Kovan Test Network",
    shortName: "Kovan",
    logo: "/static/logos/eth.png",
    explorer: "https://kovan.etherscan.io",
    explorerName: "Etherscan",
    rpcEndpoint: "https://kovan.infura.io/v3/7b8814ab9d304ceab6c258300e5f93e0",
    isSupported: false,
  },
  56: {
    name: "Binance Smart Chain Mainnet",
    shortName: "BSC",
    logo: "/static/logos/binance.png",
    explorer: "https://bscscan.com",
    explorerName: "Bscscan",
    rpcEndpoint: "https://bsc-dataseed1.ninicoin.io",
    isSupported: false,
  },
  69: {
    name: "Optimistic Ethereum",
    shortName: "Optimism",
    logo: "/static/logos/eth.png",
    explorer: "https://optimistic.etherscan.io",
    explorerName: "Optimistic Explorer",
    rpcEndpoint: "https://mainnet.optimism.io",
    isSupported: false,
  },
  137: {
    name: "Matic(Polygon) Mainnet",
    shortName: "Matic",
    logo: "/static/logos/eth.png",
    explorer: "https://polygonscan.com",
    explorerName: "Matic(Polygon) Explorer",
    rpcEndpoint: "https://rpc-mainnet.matic.quiknode.pro",
    isSupported: false,
  },
  250: {
    name: "Fantom Opera Mainnet",
    shortName: "FTM",
    logo: "/static/logos/eth.png",
    explorer: "https://ftmscan.com",
    explorerName: "Fantom Explorer",
    rpcEndpoint: "https://rpc.ftm.tools/",
    isSupported: false,
  },
  42161: {
    name: "Arbitrum One",
    shortName: "Arbitrum",
    logo: "/static/logos/eth.png",
    explorer: "https://arbiscan.io",
    explorerName: "Arbitrum Explorer",
    rpcEndpoint: "https://arb1.arbitrum.io/rpc",
    isSupported: false,
  },
  43113: {
    name: "Avalanche FUJI Testnet",
    shortName: "AVAX",
    logo: "/static/logos/eth.png",
    explorer: "https://testnet.snowtrace.io",
    explorerName: "Avalanche Explorer",
    rpcEndpoint: "https://api.avax-test.network/ext/bc/C/rpc",
    isSupported: false,
  },
  43114: {
    name: "Avalanche Mainnet",
    shortName: "AVAX",
    logo: "/static/logos/eth.png",
    explorer: "https://snowtrace.io",
    explorerName: "Avalanche Explorer",
    rpcEndpoint: "https://api.avax.network/ext/bc/C/rpc",
    isSupported: false,
  },
};

export const ALL_CHAIN_IDS: number[] = Object.keys(ALL_CHAINS).map((chainId) => Number(chainId));

export const SUPPORTED_CHAINS: Record<number, ChainInfo> = Object.values(ALL_CHAINS).reduce(
  (accumulated, current, idx) => {
    if (current.isSupported) {
      return {
        ...accumulated,
        [ALL_CHAIN_IDS[idx]]: current,
      };
    } else {
      return { ...accumulated };
    }
  },
  {}
);

export const SUPPORTED_CHAIN_IDS: number[] = Object.keys(SUPPORTED_CHAINS).map((chainId) => Number(chainId));
