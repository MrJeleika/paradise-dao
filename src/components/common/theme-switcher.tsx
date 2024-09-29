import { useEffect, useState } from 'react';

import { ThemePalm } from '../icons/ThemePalm';

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light',
  );

  const changeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.toggle('dark', true);
    } else {
      document.documentElement.classList.toggle('dark', false);
    }
  }, [theme]);

  return (
    <div
      onClick={changeTheme}
      className="animate-rays-light dark:animate-rays-dark relative h-9 w-9 cursor-pointer rounded-full bg-[#F9CD1A] shadow-[0_0_0_4px_#F9CD1A80,0_0_0_8px_#F9CD1A40,0_0_0_12px_#F9CD1A20,0_0_0_16px_#F9CD1A10,0_0_0_20px_#F9CD1A00,0_0_8px_20px_#F9CD1A10] transition-colors dark:bg-[#e6e6e6] dark:shadow-[0_0_0_4px_#e6e6e680,0_0_0_8px_#e6e6e640,0_0_0_12px_#e6e6e620,0_0_0_16px_#e6e6e610,0_0_0_20px_#e6e6e600,0_0_8px_20px_#e6e6e610]"
    >
      <ThemePalm className="absolute -bottom-1 left-1" />
    </div>
  );
};
