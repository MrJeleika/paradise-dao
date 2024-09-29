import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { NavLink } from 'react-router-dom';

import { ThemeSwitcher } from '../common/theme-switcher';
import { Logo } from '../icons/logo';

export const Header = () => {
  return (
    <div className="flex items-center justify-between px-8 py-4">
      <NavLink to="/" className="flex items-center gap-3">
        <Logo />
        <h1 className="text-4xl font-medium uppercase">Paradise</h1>
      </NavLink>
      <div className="flex items-center gap-8">
        <ThemeSwitcher />
        <WalletMultiButton />
      </div>
    </div>
  );
};
