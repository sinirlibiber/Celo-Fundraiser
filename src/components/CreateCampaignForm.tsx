'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { saveCampaign, generateCampaignId } from '@/lib/campaign-storage';
import type { Campaign } from '@/lib/campaign-storage';
import { toast } from 'sonner';

export function CreateCampaignForm(): JSX.Element {
  const { address, chain } = useAccount();
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [goalAmount, setGoalAmount] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (!address || !chain) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!title || !goalAmount) {
      toast.error('Please fill in all required fields');
      return;
    }

    const campaign: Campaign = {
      id: generateCampaignId(),
      title,
      description,
      goalAmount,
      currentAmount: '0',
      creatorAddress: address,
      chainId: chain.id,
      imageUrl: imageUrl || undefined,
      createdAt: Date.now(),
      donations: [],
    };

    saveCampaign(campaign);
    toast.success('Campaign created successfully! 🎉');
    
    // Reset form
    setTitle('');
    setDescription('');
    setGoalAmount('');
    setImageUrl('');
    setOpen(false);

    // Refresh page to show new campaign
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Create Campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Fundraising Campaign</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Campaign Title *</Label>
            <Input
              id="title"
              placeholder="My dog needs surgery"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Tell your story..."
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">Goal Amount (cUSD) *</Label>
            <Input
              id="goal"
              type="number"
              step="0.1"
              min="0.1"
              placeholder="50"
              value={goalAmount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGoalAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL (optional)</Label>
            <Input
              id="image"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            Create Campaign
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
