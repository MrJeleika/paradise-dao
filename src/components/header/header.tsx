import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useMemo, useState } from 'react';
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

  const [hoverId, setHoverId] = useState<null | number>(null);

  const translate = useMemo(() => {
    const linkId =
      hoverId ??
      links.findIndex((link) =>
        link.highlight?.some((val) => val === location.pathname),
      );

    return (100 + 16) * linkId;
  }, [hoverId, location.pathname]);

  return (
    <div className="flex items-center justify-between px-4 py-4 lg:px-8">
      <NavLink to="/" className="flex w-[260px] items-center gap-3">
        <Logo />
        <h1 className="text-4xl font-medium uppercase max-lg:hidden">
          Paradise
        </h1>
      </NavLink>
      <div className="relative flex items-center gap-4 py-[1px]">
        <div
          style={{ transform: `translateX(${translate}px)` }}
          className="absolute left-0 top-0 -z-10 h-full w-[100px] border-y-2 border-primary transition-transform duration-500"
        ></div>
        {links.map((link, i) => (
          <NavLink
            onMouseEnter={() => setHoverId(i)}
            onMouseLeave={() => setHoverId(null)}
            key={link.label}
            className={cn(
              'w-[100px] border-y border-transparent px-2 py-1 text-center',
              // link.highlight?.some((val) => val === location.pathname) &&
              //   'border-primary',
            )}
            to={link.link}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
      <div className="flex w-[260px] items-center justify-end gap-8">
        <ThemeSwitcher />
        <WalletMultiButton />
      </div>
    </div>
  );
};
