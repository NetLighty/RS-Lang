import { useLayoutEffect, useState } from 'react';
import { localStorageNames } from '~/utils/auth';

const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem(localStorageNames.theme) || 'original');

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(localStorageNames.theme, theme);
  }, [theme]);

  return { theme, setTheme };
};

export default useTheme;
