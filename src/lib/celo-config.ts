import type { Chain } from 'viem';

export const celoMainnet: Chain = {
  id: 42220,
  name: 'Celo Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'CELO',
    symbol: 'CELO',
  },
  rpcUrls: {
    default: { http: ['https://forno.celo.org'] },
    public: { http: ['https://forno.celo.org'] },
  },
  blockExplorers: {
    default: { name: 'CeloScan', url: 'https://celoscan.io' },
  },
};

export const celoAlfajores: Chain = {
  id: 44787,
  name: 'Celo Alfajores Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'CELO',
    symbol: 'CELO',
  },
  rpcUrls: {
    default: { http: ['https://alfajores-forno.celo-testnet.org'] },
    public: { http: ['https://alfajores-forno.celo-testnet.org'] },
  },
  blockExplorers: {
    default: { name: 'CeloScan', url: 'https://alfajores.celoscan.io' },
  },
  testnet: true,
};

export const cUSD_MAINNET = '0x765DE816845861e75A25fCA122bb6898B8B1282a';
export const cUSD_ALFAJORES = '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1';

export const getCUSDAddress = (chainId: number): string => {
  return chainId === celoMainnet.id ? cUSD_MAINNET : cUSD_ALFAJORES;
};

export const SUPPORTED_CHAINS = [celoMainnet, celoAlfajores];
