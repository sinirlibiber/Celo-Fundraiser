'use client'
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { WalletConnectButton } from '@/components/WalletConnectButton';
import { NetworkSwitcher } from '@/components/NetworkSwitcher';
import { CreateCampaignForm } from '@/components/CreateCampaignForm';
import { CampaignCard } from '@/components/CampaignCard';
import { getCampaignsByChain } from '@/lib/campaign-storage';
import type { Campaign } from '@/lib/campaign-storage';
import { Sparkles, Heart } from 'lucide-react';
import { sdk } from "@farcaster/miniapp-sdk";
import { useAddMiniApp } from "@/hooks/useAddMiniApp";
import { useQuickAuth } from "@/hooks/useQuickAuth";
import { useIsInFarcaster } from "@/hooks/useIsInFarcaster";

export default function HomePage(): JSX.Element {
    const { addMiniApp } = useAddMiniApp();
    const isInFarcaster = useIsInFarcaster()
    useQuickAuth(isInFarcaster)
    useEffect(() => {
      const tryAddMiniApp = async () => {
        try {
          await addMiniApp()
        } catch (error) {
          console.error('Failed to add mini app:', error)
        }

      }

    

      tryAddMiniApp()
    }, [addMiniApp])
    useEffect(() => {
      const initializeFarcaster = async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, 100))
          
          if (document.readyState !== 'complete') {
            await new Promise<void>(resolve => {
              if (document.readyState === 'complete') {
                resolve()
              } else {
                window.addEventListener('load', () => resolve(), { once: true })
              }

            })
          }

    

          await sdk.actions.ready()
          console.log('Farcaster SDK initialized successfully - app fully loaded')
        } catch (error) {
          console.error('Failed to initialize Farcaster SDK:', error)
          
          setTimeout(async () => {
            try {
              await sdk.actions.ready()
              console.log('Farcaster SDK initialized on retry')
            } catch (retryError) {
              console.error('Farcaster SDK retry failed:', retryError)
            }

          }, 1000)
        }

      }

    

      initializeFarcaster()
    }, [])
  const { chain } = useAccount();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    if (chain) {
      const chainCampaigns = getCampaignsByChain(chain.id);
      setCampaigns(chainCampaigns);
    }
  }, [chain]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-green-600 fill-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Celo Fundraiser
                </h1>
                <p className="text-sm text-gray-600">
                  Instant donations on Celo
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <NetworkSwitcher />
              <WalletConnectButton />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Zero fees • Instant transfers • Global reach
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
            Fund What Matters,
            <br />
            <span className="text-green-600">One Tap at a Time</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create campaigns in seconds. Share anywhere. Receive cUSD donations instantly with near-zero fees on Celo blockchain.
          </p>
          <div className="pt-4">
            <CreateCampaignForm />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 px-4 bg-white/50">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-green-600">&lt;$0.001</p>
              <p className="text-sm text-gray-600 mt-1">Transaction Fee</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">1:1</p>
              <p className="text-sm text-gray-600 mt-1">cUSD = USD</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">
                {campaigns.length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Active Campaigns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Campaigns Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            {chain ? `Campaigns on ${chain.name}` : 'All Campaigns'}
          </h3>
          
          {campaigns.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-4">
                No campaigns yet on this network
              </p>
              <p className="text-gray-500">
                Be the first to create a campaign!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign: Campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8 px-4 mt-16">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-4">
            {/* Built on Celo */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Built on</span>
              <a
                href="https://celo.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 font-bold text-lg hover:text-green-700 transition-colors"
              >
                Celo
              </a>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://farcaster.xyz/gumusbey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium"
              >
                Farcaster
              </a>
              <span className="text-gray-400">•</span>
              <a
                href="https://github.com/sinirlibiber"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                GitHub
              </a>
            </div>

            {/* Platform Info */}
            <p className="text-sm text-gray-500">
              Powered by cUSD • No platform fees • Instant transfers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
