import { useParams } from 'react-router-dom';

export default function CountryDetail() {
    const { code } = useParams();

    return <h1>🗺️ Details for country code: {code}</h1>
}