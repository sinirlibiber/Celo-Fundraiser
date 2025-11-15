'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { getCUSDAddress } from '@/lib/celo-config';
import { addDonation } from '@/lib/campaign-storage';
import type { Campaign } from '@/lib/campaign-storage';
import { toast } from 'sonner';

const ERC20_ABI = [
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
] as const;

interface DonationButtonsProps {
  campaign: Campaign;
}

const DONATION_AMOUNTS = ['0.1', '0.5', '1', '5'];

export function DonationButtons({ campaign }: DonationButtonsProps): JSX.Element {
  const { address, chain } = useAccount();
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const handleDonate = async (amount: string): Promise<void> => {
    if (!address || !chain) {
      toast.error('Please connect your wallet');
      return;
    }

    if (chain.id !== campaign.chainId) {
      toast.error('Please switch to the correct network');
      return;
    }

    setSelectedAmount(amount);

    try {
      const cUSDAddress = getCUSDAddress(chain.id);
      const amountInWei = parseUnits(amount, 18);

      writeContract(
        {
          address: cUSDAddress as `0x${string}`,
          abi: ERC20_ABI,
          functionName: 'transfer',
          args: [campaign.creatorAddress as `0x${string}`, amountInWei],
        },
        {
          onSuccess: (txHash: string) => {
            addDonation(campaign.id, {
              donor: address,
              amount,
              timestamp: Date.now(),
              txHash,
            });
            toast.success(`Donated ${amount} cUSD! Thank you! 💚`);
            setSelectedAmount(null);
            
            // Refresh page to show updated amount
            setTimeout(() => window.location.reload(), 2000);
          },
          onError: (error: Error) => {
            console.error('Donation error:', error);
            toast.error('Donation failed. Please try again.');
            setSelectedAmount(null);
          },
        }
      );
    } catch (error: unknown) {
      console.error('Donation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Error: ${errorMessage}`);
      setSelectedAmount(null);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {DONATION_AMOUNTS.map((amount: string) => (
        <Button
          key={amount}
          size="lg"
          onClick={() => handleDonate(amount)}
          disabled={!address || isConfirming || selectedAmount === amount}
        >
          {selectedAmount === amount && isConfirming ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            `${amount} cUSD`
          )}
        </Button>
      ))}
    </div>
  );
}
