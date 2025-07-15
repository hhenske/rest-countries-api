import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function CountryDetail() {
    const { code } = useParams();

    return <h1>🗺️ Details for country code: {code}</h1>
}