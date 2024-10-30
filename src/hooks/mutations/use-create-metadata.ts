import {
  irysStorage,
  Metaplex,
  walletAdapterIdentity,
} from '@metaplex-foundation/js';
import type { DataV2 } from '@metaplex-foundation/mpl-token-metadata';
import { createMetadataAccountV3 } from '@metaplex-foundation/mpl-token-metadata';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Transaction, type PublicKey } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';

import type { FormSchema } from './../../components/spl/token-form';

import { network } from '@/lib/constants';

export const useCreateMetadata = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

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
    async mutationFn(data: FormSchema & { mint: PublicKey }) {
      const { uri } = await metaplex.nfts().uploadMetadata({
        name: data.name,
        description: data.description,
        image: data.image,
        symbol: data.symbol,
      });

      const tokenMetadata = {
        name: data.name,
        symbol: data.symbol,
        uri: uri,
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null,
      } satisfies DataV2;

      const metadataPDA = await metaplex
        .nfts()
        .pdas()
        .metadata({ mint: data.mint });

      const transaction = new Transaction().add(
        createCreateMetadataAccountV3Instruction(
          {
            metadata: metadataPDA,
            mint: data.mint,
            mintAuthority: wallet.publicKey,
            payer: wallet.publicKey,
            updateAuthority: wallet.publicKey,
          },
          {
            createMetadataAccountArgsV3: {
              data: tokenMetadata,
              isMutable: true,
              collectionDetails: null,
            },
          },
        ),
      );
      await wallet.sendTransaction(transaction, connection);
    },
  });
};
