import {
  irysStorage,
  Metaplex,
  walletAdapterIdentity,
} from '@metaplex-foundation/js';
import { createMint } from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';

import type { FormSchema } from '../../components/spl/token-form';

import { network } from '@/lib/constants';
import { useCreateMint } from './use-create-mint';

export const useCreateToken = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { mutateAsync: createMint } = useCreateMint();

  const metaplex = Metaplex.make(connection, {
    cluster: network,
  })
    .use(walletAdapterIdentity(wallet))
    .use(
      irysStorage({
        address: 'https://devnet.irys.xyz',
        providerUrl: 'https://api.devnet.solana.com',
        timeout: 60000,
      }),
    );

  return useMutation({
    async mutationFn(data: FormSchema) {
      const mintAddress = await createMint(+data.decimals);

      if (!mintAddress) throw new Error('Faild to create mint');

      const { uri } = await metaplex.nfts().uploadMetadata({
        name: data.name,
        description: data.description,
        image: data.image,
        symbol: data.symbol,
      });

      const metadataPDA = await metaplex.nfts().pdas();
    },
  });
};
