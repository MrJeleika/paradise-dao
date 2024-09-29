import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';

import { connection } from '@/providers/wallet-provider';

export const useSolanaBalance = () => {
  const { publicKey } = useWallet();

  return useQuery<number>({
    queryKey: ['solana-balance'],
    enabled: Boolean(publicKey),
    queryFn: async () => {
      return await connection.getBalance(publicKey!);
    },
  });
};
