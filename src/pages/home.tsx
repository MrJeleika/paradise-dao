import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { shortenAddress } from '../lib/utils';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSolanaBalance } from '@/hooks/queries/useSolanaBalance';
import { connection } from '@/providers/wallet-provider';

export default function Home() {
  const { publicKey, sendTransaction } = useWallet(); // Получаем адресс

  const { data: solanaBalanceRes } = useSolanaBalance(); // Получаем баланс

  const solanaBalance = useMemo(() => {
    if (!solanaBalanceRes) return 0;
    return solanaBalanceRes / LAMPORTS_PER_SOL;
  }, [solanaBalanceRes]);

  const [address, setAddress] = useState('');
  const [amountOfSol, setAmountOfSol] = useState('');

  const sendSol = useCallback(async () => {
    if (!publicKey) return;

    try {
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(address),
          lamports: Number(amountOfSol) * LAMPORTS_PER_SOL,
        }),
      );

      const signature = await sendTransaction(tx, connection);
      toast.success(signature);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error('Something went wrong');
    }
  }, [address, amountOfSol, publicKey, sendTransaction]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5 text-4xl">
      <div className="flex items-center gap-5">
        {publicKey && (
          <p className="font-medium">{shortenAddress(publicKey.toString())}</p>
        )}
        <p className="font-medium">{solanaBalance} SOL</p>
      </div>
      <WalletMultiButton />
      <div className="flex w-[400px] flex-col items-center gap-5">
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <Input
          value={amountOfSol}
          onChange={(e) => setAmountOfSol(e.target.value)}
          placeholder="Amount of SOL"
        />
        <Button
          disabled={!publicKey}
          onClick={sendSol}
          className="w-full"
          size={'lg'}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
