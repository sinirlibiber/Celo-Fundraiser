import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/sonner';
import FarcasterWrapper from "@/components/FarcasterWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
        <html lang="en">
          <body className="antialiased">
            <Providers>
              
      <FarcasterWrapper>
        {children}
      </FarcasterWrapper>
      
              <Toaster />
            </Providers>
          </body>
        </html>
      );
}

export const metadata: Metadata = {
        title: "Celo Fundraiser",
        description: "Raise and donate funds instantly with Celo. Create campaigns, share links, and track progress with a live counter. Simple, fast, and affordable donations using cUSD.",
        other: { "fc:frame": JSON.stringify({"version":"next","imageUrl":"https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/thumbnail_a2f0dc46-71a1-4ed8-bbc4-82c060e125e0-U68d3r7H3DE0IeE66ge8xXpXrzZ1se","button":{"title":"Open with Ohara","action":{"type":"launch_frame","name":"Celo Fundraiser","url":"https://queen-anyway-821.app.ohara.ai","splashImageUrl":"https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/farcaster/splash_images/splash_image1.svg","splashBackgroundColor":"#ffffff"}}}
        ) }
    };
