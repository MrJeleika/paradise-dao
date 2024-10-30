import { TokenForm } from '@/components/spl/token-form';

export default function SplToken() {
  return (
    <section className="container flex flex-col items-center gap-8 pt-14">
      <h1 className="text-center text-2xl uppercase">SPL-TOKEN CREATOR</h1>
      <TokenForm />
    </section>
  );
}
