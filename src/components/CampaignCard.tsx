'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import type { Campaign } from '@/lib/campaign-storage';
import Link from 'next/link';

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps): JSX.Element {
  const progress = (parseFloat(campaign.currentAmount) / parseFloat(campaign.goalAmount)) * 100;
  const networkName = campaign.chainId === 42220 ? 'Mainnet' : 'Alfajores';

  return (
    <Card className="overflow-hidden">
      {campaign.imageUrl && (
        <div className="w-full h-48 bg-gray-200 relative">
          <img
            src={campaign.imageUrl}
            alt={campaign.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="line-clamp-2">{campaign.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{networkName}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {campaign.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {campaign.description}
          </p>
        )}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-semibold">
              {campaign.currentAmount} cUSD
            </span>
            <span className="text-muted-foreground">
              of {campaign.goalAmount} cUSD
            </span>
          </div>
          <Progress value={Math.min(progress, 100)} />
          <p className="text-xs text-muted-foreground">
            {campaign.donations.length} donation{campaign.donations.length !== 1 ? 's' : ''}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/campaign/${campaign.id}`} className="w-full">
          <Button className="w-full gap-2">
            <ExternalLink className="h-4 w-4" />
            View Campaign
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
