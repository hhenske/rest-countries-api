import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
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


    return (
    <header className="header">
        <h1 className="site-title">Where in the world?</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
            <FontAwesomeIcon icon={faMoon} />Dark Mode
        </button>
    </header>

  );
}
