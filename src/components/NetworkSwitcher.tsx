'use client';

import { useAccount, useSwitchChain } from 'wagmi';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Network } from 'lucide-react';
import { celoMainnet, celoAlfajores } from '@/lib/celo-config';

export function NetworkSwitcher(): JSX.Element {
  const { chain } = useAccount();
  const { switchChain } = useSwitchChain();

  const currentNetwork = chain?.id === celoMainnet.id ? 'Mainnet' : 'Alfajores';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Network className="h-4 w-4" />
          {currentNetwork}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => switchChain({ chainId: celoMainnet.id })}
          disabled={chain?.id === celoMainnet.id}
        >
          Celo Mainnet
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => switchChain({ chainId: celoAlfajores.id })}
          disabled={chain?.id === celoAlfajores.id}
        >
          Alfajores Testnet
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
