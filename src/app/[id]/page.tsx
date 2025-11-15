'use client';

import { useEffect, useState, use } from 'react';
import { useAccount } from 'wagmi';
import { WalletConnectButton } from '@/components/WalletConnectButton';
import { NetworkSwitcher } from '@/components/NetworkSwitcher';
import { DonationButtons } from '@/components/DonationButtons';
import { getCampaign } from '@/lib/campaign-storage';
import type { Campaign } from '@/lib/campaign-storage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Heart, ArrowLeft, Share2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'sonner';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CampaignPage({ params }: PageProps): JSX.Element {
  const resolvedParams = use(params);
  const { chain } = useAccount();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [showQR, setShowQR] = useState<boolean>(false);

  useEffect(() => {
    const loadedCampaign = getCampaign(resolvedParams.id);
    setCampaign(loadedCampaign);
  }, [resolvedParams.id]);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const handleShare = async (): Promise<void> => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: campaign?.title || 'Support my campaign',
          text: `Help me reach my goal! ${campaign?.title}`,
          url: shareUrl,
        });
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = async (): Promise<void> => {
    await navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied to clipboard!');
  };

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Campaign not found</p>
          <Link href="/">
            <Button className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const progress = (parseFloat(campaign.currentAmount) / parseFloat(campaign.goalAmount)) * 100;
  const networkName = campaign.chainId === 42220 ? 'Celo Mainnet' : 'Alfajores Testnet';
  const wrongNetwork = chain && chain.id !== campaign.chainId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <NetworkSwitcher />
              <WalletConnectButton />
            </div>
          </div>
        </div>
      </header>

      {/* Campaign Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-6">
          {/* Campaign Image */}
          {campaign.imageUrl && (
            <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden bg-gray-200">
              <img
                src={campaign.imageUrl}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Campaign Info */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-3xl">{campaign.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Network: {networkName}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-4xl font-bold text-green-600">
                    {campaign.currentAmount} cUSD
                  </span>
                  <span className="text-lg text-muted-foreground">
                    of {campaign.goalAmount} cUSD
                  </span>
                </div>
                <Progress value={Math.min(progress, 100)} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  {campaign.donations.length} donation{campaign.donations.length !== 1 ? 's' : ''}
                  {' • '}
                  {progress.toFixed(1)}% funded
                </p>
              </div>

              {/* Description */}
              {campaign.description && (
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">About this campaign</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {campaign.description}
                  </p>
                </div>
              )}

              {/* Network Warning */}
              {wrongNetwork && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Please switch to {networkName} to donate
                  </p>
                </div>
              )}

              {/* Donation Buttons */}
              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-4">Support this campaign</h3>
                <DonationButtons campaign={campaign} />
              </div>

              {/* QR Code Section */}
              <div className="pt-4 border-t">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowQR(!showQR)}
                >
                  {showQR ? 'Hide' : 'Show'} QR Code
                </Button>
                {showQR && (
                  <div className="mt-4 flex justify-center p-6 bg-white rounded-lg border">
                    <QRCodeSVG value={shareUrl} size={200} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Donations */}
          {campaign.donations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {campaign.donations.slice(-5).reverse().map((donation, index: number) => {
                    const explorerUrl =
                      campaign.chainId === 42220
                        ? `https://celoscan.io/tx/${donation.txHash}`
                        : `https://alfajores.celoscan.io/tx/${donation.txHash}`;
                    
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 border-b last:border-0"
                      >
                        <div>
                          <p className="font-medium">{donation.amount} cUSD</p>
                          <p className="text-xs text-muted-foreground">
                            {donation.donor.slice(0, 6)}...{donation.donor.slice(-4)}
                          </p>
                        </div>
                        <a
                          href={explorerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-green-600 hover:underline flex items-center gap-1"
                        >
                          View Tx
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
