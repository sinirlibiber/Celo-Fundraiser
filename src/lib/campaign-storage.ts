export interface Campaign {
  id: string;
  title: string;
  description: string;
  goalAmount: string;
  currentAmount: string;
  creatorAddress: string;
  chainId: number;
  imageUrl?: string;
  createdAt: number;
  donations: Donation[];
}

export interface Donation {
  donor: string;
  amount: string;
  timestamp: number;
  txHash: string;
}

const STORAGE_KEY = 'celo_campaigns';

export const saveCampaign = (campaign: Campaign): void => {
  if (typeof window === 'undefined') return;
  
  const campaigns = getAllCampaigns();
  const existingIndex = campaigns.findIndex((c: Campaign) => c.id === campaign.id);
  
  if (existingIndex >= 0) {
    campaigns[existingIndex] = campaign;
  } else {
    campaigns.push(campaign);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
};

export const getCampaign = (id: string): Campaign | null => {
  if (typeof window === 'undefined') return null;
  
  const campaigns = getAllCampaigns();
  return campaigns.find((c: Campaign) => c.id === id) || null;
};

export const getAllCampaigns = (): Campaign[] => {
  if (typeof window === 'undefined') return [];
  
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getCampaignsByChain = (chainId: number): Campaign[] => {
  return getAllCampaigns().filter((c: Campaign) => c.chainId === chainId);
};

export const addDonation = (campaignId: string, donation: Donation): void => {
  const campaign = getCampaign(campaignId);
  if (!campaign) return;
  
  campaign.donations.push(donation);
  campaign.currentAmount = (
    parseFloat(campaign.currentAmount) + parseFloat(donation.amount)
  ).toString();
  
  saveCampaign(campaign);
};

export const generateCampaignId = (): string => {
  return `campaign_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
