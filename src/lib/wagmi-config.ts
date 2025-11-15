import { createConfig, http } from 'wagmi';
import { celoMainnet, celoAlfajores } from './celo-config';
import { walletConnect, injected, coinbaseWallet } from '@wagmi/connectors';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id';

export const config = createConfig({
  chains: [celoMainnet, celoAlfajores],
  connectors: [
    walletConnect({
      projectId,
      metadata: {
        name: 'Celo Fundraiser',
        description: 'Create and support fundraising campaigns on Celo',
        url: typeof window !== 'undefined' ? window.location.origin : '',
        icons: ['https://celoscan.io/images/svg/brands/main.svg'],
      },
      showQrModal: true,
    }),
    injected(),
    coinbaseWallet({
      appName: 'Celo Fundraiser',
      appLogoUrl: 'https://celoscan.io/images/svg/brands/main.svg',
    }),
  ],
  transports: {
    [celoMainnet.id]: http(),
    [celoAlfajores.id]: http(),
  },
});
