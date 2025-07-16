import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import './CountryDetail.css';

export default function CountryDetail() {
  const { code } = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!code) return;

    const fetchCountryDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the main country data
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${code}?fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags`
        );

        if (!response.ok) {
          throw new Error('Country not found');
        }

        const data = await response.json();
        setCountry(data);

        // Fetch border countries if any
        if (data.borders?.length > 0) {
          const borderRes = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${data.borders.join(',')}&fields=name,cca3`
          );
          const borderData = await borderRes.json();

          const bordersMapped = borderData.map((c) => ({
            name: c.name.common,
            code: c.cca3,
          }));

          setBorderCountries(bordersMapped);
        } else {
          setBorderCountries([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [code]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleBorderCountryClick = (borderCode) => {
    navigate(`/country/${borderCode}`);
  };

  const getNativeName = () => {
    const nativeNames = country?.name?.nativeName
      ? Object.values(country.name.nativeName)
      : [];
    return nativeNames[0]?.common || country?.name?.common || 'N/A';
  };

  const getCurrencies = () => {
    if (!country?.currencies) return 'N/A';
    return Object.values(country.currencies)
      .map((currency) => currency.name)
      .join(', ');
  };

  const getLanguages = () => {
    if (!country?.languages) return 'N/A';
    return Object.values(country.languages).join(', ');
  };

  const getTopLevelDomain = () => {
    return country?.tld?.join(', ') || 'N/A';
  };

  // -------------------------
  // Conditional Rendering
  // -------------------------
  if (loading) {
    return (
      <div className="country-detail-container">
        <div className="loading">Loading country details...</div>
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
        <div className="error">{error}</div>
      </div>
    );
  }

  if (!country) {
    return null; // Optional fallback
  }

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
            <div className="info-column">
              <p><strong>Native Name:</strong> {getNativeName()}</p>
              <p><strong>Population:</strong> {country.population?.toLocaleString() || 'N/A'}</p>
              <p><strong>Region:</strong> {country.region || 'N/A'}</p>
              <p><strong>Sub-Region:</strong> {country.subregion || 'N/A'}</p>
              <p><strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}</p>
            </div>

            <div className="info-column">
              <p><strong>Top Level Domain:</strong> {getTopLevelDomain()}</p>
              <p><strong>Currencies:</strong> {getCurrencies()}</p>
              <p><strong>Languages:</strong> {getLanguages()}</p>
            </div>
          </div>

          {borderCountries.length > 0 && (
            <div className="border-countries">
              <span className="border-label"><strong>Border Countries:</strong></span>
              <div className="border-buttons">
                {borderCountries.map(({ code, name }) => (
                  <button
                    key={code}
                    className="border-button"
                    onClick={() => handleBorderCountryClick(code)}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
