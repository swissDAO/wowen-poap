import { Chain } from 'wagmi'

export const wowen = {
  id: 981,
  name: 'Wowen',
  network: 'wowen',
  nativeCurrency: {
    decimals: 18,
    name: 'Wowen',
    symbol: 'WOWn',
  },
  rpcUrls: {
    public: { http: ['https://api.wowen.io/nodes/rpc'] },
    default: { http: ['https://api.wowen.io/nodes/rpc'] },
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://www.wowen.io/explorer' },
    default: { name: 'SnowTrace', url: 'https://www.wowen.io/explorer' },
  },
} as const satisfies Chain
