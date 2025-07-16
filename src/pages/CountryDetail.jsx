import { useParams,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import './CountryDetail.css';

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
            <div className="country-detail-container">
                <div className="loading">Louding country details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="country-detail-container">
                <button className="back-button" onClick={handleBackClick}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Back
                </button>
                <div className="error">Country not found</div>
            </div>
        );
    }

    // Helper functions for extracting data
    const getNativeName = () => {
        if (!country.name?.nativeName) return country.name?.common || 'N/A';
        const nativeNames = Object.values(country.name.nativeName);
        return nativeNames[0]?.common || country.name?.common || 'N/A';
    };

    const getCurrencies = () => {
        if (!country.currencies) return 'N/A';
        return Object.values(country.currencies).map(currency => currency.name).join(', ');
    };

    const getLanguages = () => {
        if (!country.languages) return 'N/A';
        return Object.values(country.languages).join(', ');
    };

    const getTopLevelDomain = () => {
        return country.tld ? country.tld.join(', ') : 'N/A';
    };

    return (
        <div className="country-detail-container">
            <button className="back-button" onClick={handleBackClick}>
                <FontAwesomeIcon icon={faArrowLeft} />
                Back
            </button>

            <div className="country-content">
                <div className="flag-section">
                    <img
                        src={country.flags?.svg || country.flags?.png}
                        alt={`${country.name?.common} flag`}
                        className="country-flag"
                    />
                </div>

                <div className="details-section">
                    <h1 className="country-name">{country.name?.common}</h1>

                    <div className="country-info">
                        <div classname="info-column">
                            <p><strong>Native Name: </strong>{getNativeName}</p>
                            <p><strong>Population: </strong>{country.population?.toLocaleString() || 'N/A'}</p>
                            <p><strong>Region: </strong>{country.region || 'N/A'}</p>
                            <p><strong>Sub-Region: </strong>{country.subregion || 'N/A'}</p>
                            <p><strong>Capital: </strong>{country.capital?.join(', ') || 'N/A'}</p>
                        </div>

                        <div className="info-column">
                            <p><strong>Top Level Domain: </strong>{getTopLevelDomain()}</p>
                            <p><strong>Currencies: </strong>{getCurrencies()}</p>
                            <p><strong>Languages: </strong>{getLanguages()}</p>
                        </div>
                    </div>

                    {country.borders && country.borders.length > 0 && (
                        <div className="border-countries">
                            <span className="border-label"><strong>Border Countries: </strong></span>
                            <div className="border-buttons">
                                {country.border.map(borderCode => (
                                    <button
                                        key={borderCode}
                                        className="border-button"
                                        onClick={() => handleBorderCountryClick(borderCode)}
                                    >
                                        {borderCode}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )






   
}