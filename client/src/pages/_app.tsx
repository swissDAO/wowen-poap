import { type AppType } from "next/dist/shared/lib/utils";

import "~/styles/globals.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { wowen } from "~/helpers/chain";
import Layout from "~/layouts/layout";
import { createPublicClient, http } from "viem";

// const { chains, publicClient } = configureChains(
//   [mainnet, polygon, optimism, arbitrum],
//   [
//     alchemyProvider({ apiKey: process.env.ALCHEMY_ID! }),
//     publicProvider()
//   ]
// );

const { chains, publicClient } = configureChains(
  [wowen],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://api.wowen.io/nodes/rpc`,
        webSocket: `wss://api.wowen.io/nodes/ws`,
      }),
    }),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient: createPublicClient({
    chain: wowen,
    transport: http()
  }),
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  )
};

export default MyApp;
