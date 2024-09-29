import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider as WalletAdapterProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { Connection } from '@solana/web3.js';
import type { FC, PropsWithChildren } from 'react';
import { useMemo } from 'react';

import '@solana/wallet-adapter-react-ui/styles.css';

export const isMainnet =
  (process.env.VITE_PUBLIC_NETWORKS_MODE ?? 'mainnet') === 'testnet';

export const SOLANA_NETWORK = isMainnet
  ? WalletAdapterNetwork.Mainnet
  : WalletAdapterNetwork.Devnet;

const endpoint = isMainnet
  ? process.env.VITE_SOLANA_RPC_ENDPOINT || 'https://solana-rpc.publicnode.com'
  : 'https://api.devnet.solana.com';

export const connection = new Connection(endpoint, 'confirmed');
const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
  const wallets = useMemo(
    () => [
      new TorusWalletAdapter(),
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    [],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletAdapterProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletAdapterProvider>
    </ConnectionProvider>
  );
};

export default WalletProvider;
