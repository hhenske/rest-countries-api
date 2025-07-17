import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon as solidMoon } from '@fortawesome/free-solid-svg-icons';
import { faMoon as regularMoon } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';



export default function Header() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const isLight = theme === 'light';
  const icon = isLight ? regularMoon : solidMoon;
  const label = isLight ? 'Dark Mode' : 'Light Mode';


    return (
    <header className="header">
        <h1 className="site-title">Where in the world?</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
            <FontAwesomeIcon icon={icon} />
            {label}
        </button>
    </header>

  );
}
