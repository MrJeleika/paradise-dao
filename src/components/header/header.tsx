import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { NavLink, useLocation } from 'react-router-dom';

import { ThemeSwitcher } from '../common/theme-switcher';
import { Logo } from '../icons/logo';

import { cn } from '@/lib/utils';
import { routes } from '@/router';

const links = [
  { label: 'home', link: routes.root, highlight: [routes.root] },
  { label: 'spl-token', link: routes.createSpl, highlight: [routes.createSpl] },
];

export const Header = () => {
  const location = useLocation();
  return (
    <div className="flex items-center justify-between px-8 py-4">
      <NavLink to="/" className="flex w-[260px] items-center gap-3">
        <Logo />
        <h1 className="text-4xl font-medium uppercase">Paradise</h1>
      </NavLink>
      <div className="flex items-center gap-4">
        {links.map((link) => (
          <NavLink
            key={link.label}
            className={cn(
              'border-y border-transparent px-2 py-1',
              link.highlight?.some((val) => val === location.pathname) &&
                'border-primary',
            )}
            to={link.link}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
      <div className="flex w-[260px] items-center gap-8">
        <ThemeSwitcher />
        <WalletMultiButton />
      </div>
    </div>
  );
};
