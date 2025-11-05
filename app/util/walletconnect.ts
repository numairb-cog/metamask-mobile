/**
 * WalletConnect client metadata
 */
interface ClientMeta {
  description: string;
  url: string;
  icons: string[];
  name: string;
  ssl: boolean;
}

/**
 * WalletConnect client options
 */
interface ClientOptions {
  clientMeta: ClientMeta;
}

/**
 * Default WalletConnect client options for MetaMask Mobile
 */
export const CLIENT_OPTIONS: ClientOptions = {
  clientMeta: {
    // Required
    description: 'MetaMask Mobile app',
    url: 'https://metamask.io',
    icons: [],
    name: 'MetaMask',
    ssl: true,
  },
};

/**
 * WalletConnect origin prefix
 */
export const WALLET_CONNECT_ORIGIN = 'wc::';
