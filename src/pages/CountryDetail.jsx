import { useParams,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import './CountryDetail.css'

export default function CountryDetail() {
    const { code } = useParams();
    const navigate = useNavigate();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        const fetchCountryDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://restcontries.com/v3.1/alpha/${code}`);
                if (!response.ok) {
                    throw new Error('Country not found');
                }
                const data = await response.json();
                setCountry(data[0]);
            } catch (err) {
                SetError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (code) {
            fetchCountryDetails();
        }
    }, [code]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleBorderCountryClick = (borderCode) => {
        navigate(`/country/${borderCode}`);
    };

    if (loading) {
        return (
            <div className="country-details-container">
                
            </div>
        )
    }



   
}