# 💚 Celo Fundraiser

A decentralized fundraising platform built on the Celo blockchain, enabling instant cUSD donations with near-zero fees. Create campaigns, share links, and receive donations with just one tap.

![Built on Celo](https://img.shields.io/badge/Built%20on-Celo-35D07F?style=for-the-badge&logo=celo)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript)

## 🌟 Features

- **🚀 Instant Donations**: One-tap donations with cUSD (1 cUSD = 1 USD)
- **💰 Near-Zero Fees**: Transaction fees under $0.001 on Celo
- **🌐 Multi-Wallet Support**: WalletConnect integration for Valora, MetaMask, Coinbase Wallet, and more
- **🔄 Dual Network**: Support for both Celo Mainnet and Alfajores Testnet
- **📱 QR Code Sharing**: Easy campaign sharing with QR codes
- **📊 Live Progress**: Real-time donation tracking with progress bars
- **🖼️ Campaign Images**: Upload custom images for campaigns
- **🔗 Shareable Links**: Share campaigns via social media, WhatsApp, or any messaging app
- **📈 Transaction History**: View all donations with CeloScan explorer links

## 🎯 Use Cases

- **Medical Fundraising**: Raise funds for medical treatments or emergencies
- **Community Projects**: Support local initiatives and community programs
- **Education**: Help students with tuition fees or educational resources
- **Disaster Relief**: Quick fundraising for emergency situations
- **Creative Projects**: Fund artistic or creative endeavors
- **Animal Welfare**: Support animal rescue and veterinary care

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript 5.8](https://www.typescriptlang.org/)
- **Blockchain**: [Celo](https://celo.org/)
- **Wallet Integration**: [Wagmi](https://wagmi.sh/) + [WalletConnect](https://walletconnect.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **QR Codes**: [qrcode.react](https://github.com/zpao/qrcode.react)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A Celo-compatible wallet (Valora, MetaMask with Celo network, etc.)
- Test tokens from [Celo Alfajores Faucet](https://faucet.celo.org/) for testing

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sinirlibiber/celo-fundraiser.git
   cd celo-fundraiser
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

### Creating a Campaign

1. **Connect Your Wallet**
   - Click "Connect Wallet" in the top right
   - Select your preferred wallet (Valora, MetaMask, etc.)
   - Choose network: Celo Mainnet or Alfajores Testnet

2. **Create Campaign**
   - Click "Create Campaign" button
   - Enter campaign details:
     - Title (e.g., "Help My Dog's Surgery")
     - Description
     - Goal amount in cUSD
     - Optional: Upload a campaign image
   - Submit to create your campaign

3. **Share Your Campaign**
   - Get your unique campaign link
   - Use the QR code for in-person sharing
   - Share on social media (X/Twitter, WhatsApp, Telegram, etc.)

### Making a Donation

1. **Visit Campaign**
   - Click on a campaign or use the shared link

2. **Select Amount**
   - Choose from quick options: 0.1, 0.5, 1, or 5 cUSD
   - Or enter a custom amount

3. **Confirm Transaction**
   - Review the transaction in your wallet
   - Confirm and send
   - Donation appears instantly on the campaign page

## 🌍 Networks

### Celo Mainnet
- **Chain ID**: 42220
- **Currency**: CELO
- **Stablecoin**: cUSD
- **Explorer**: [CeloScan](https://celoscan.io)
- **Use for**: Real donations

### Alfajores Testnet
- **Chain ID**: 44787
- **Currency**: Test CELO
- **Stablecoin**: Test cUSD
- **Explorer**: [Alfajores BlockScout](https://alfajores.celoscan.io)
- **Faucet**: [Get test tokens](https://faucet.celo.org/)
- **Use for**: Testing and development

## 📂 Project Structure

```
celo-fundraiser/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Home page
│   │   ├── layout.tsx              # Root layout
│   │   ├── campaign/
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Campaign detail page
│   │   └── api/
│   │       └── proxy/              # API proxy for external requests
│   ├── components/
│   │   ├── CampaignCard.tsx        # Campaign preview card
│   │   ├── CreateCampaignForm.tsx  # Campaign creation form
│   │   ├── DonationButtons.tsx     # Quick donation buttons
│   │   ├── NetworkSwitcher.tsx     # Network toggle component
│   │   ├── WalletConnectButton.tsx # Wallet connection button
│   │   └── ui/                     # Reusable UI components
│   └── lib/
│       ├── campaign-storage.ts     # Campaign storage utilities
│       ├── celo-config.ts          # Celo network configuration
│       └── wagmi-config.ts         # Wagmi/WalletConnect setup
├── public/
│   └── .well-known/
│       └── farcaster.json          # Farcaster integration
└── package.json
```

## 🔐 Security & Privacy

- **Non-Custodial**: You maintain full control of your funds
- **Open Source**: All code is public and auditable
- **No Platform Fees**: 100% of donations go to campaign creators
- **Transparent**: All transactions are recorded on-chain
- **No Sign-up Required**: Use your wallet address as your identity

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Built on**: [Celo](https://celo.org)
- **Farcaster**: [@gumusbey](https://farcaster.xyz/gumusbey)
- **GitHub**: [@sinirlibiber](https://github.com/sinirlibiber)

## 💡 Why Celo?

Celo is a mobile-first blockchain that makes crypto accessible to anyone with a smartphone. Key benefits:

- **📱 Mobile-First**: Optimized for mobile wallets like Valora
- **💰 Stablecoins**: cUSD maintains 1:1 parity with USD
- **⚡ Fast & Cheap**: Transactions confirm in ~5 seconds with fees under $0.001
- **🌍 Global**: Send money to anyone, anywhere, instantly
- **♻️ Carbon Negative**: Climate-positive blockchain

## 🙏 Acknowledgments

- [Celo Foundation](https://celo.org/) for building an accessible blockchain
- [WalletConnect](https://walletconnect.com/) for seamless wallet integration
- [Wagmi](https://wagmi.sh/) for excellent React hooks
- [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/) for beautiful components

## 📧 Contact

For questions, feedback, or support:

- Farcaster: [@gumusbey](https://farcaster.xyz/gumusbey)
- GitHub: [@sinirlibiber](https://github.com/sinirlibiber)

---

**Made with 💚 on Celo**
