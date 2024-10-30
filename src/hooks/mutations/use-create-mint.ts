import {
  createInitializeMint2Instruction,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';

export const useCreateMint = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  return useMutation({
    async mutationFn(decimals: number) {
      if (!publicKey) return;
      const lamports = await getMinimumBalanceForRentExemptMint(connection);
      const keypair = Keypair.generate();

      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: keypair.publicKey,
          space: MINT_SIZE,
          lamports,
          programId: TOKEN_PROGRAM_ID,
        }),

        createInitializeMint2Instruction(
          keypair.publicKey,
          decimals,
          publicKey,
          publicKey,
          TOKEN_PROGRAM_ID,
        ),
      );

      await sendTransaction(transaction, connection);

      return keypair.publicKey;
    },
  });
};
