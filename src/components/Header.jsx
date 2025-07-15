import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';



export default function Header() {
  
    return (
    <header className="header">
        <h2 className="site-title">Where in the world?</h2>
        <button className="theme-toggle">
            <FontAwesomeIcon icon={faMoon} />Dark Mode
        </button>
    </header>

  );
}
