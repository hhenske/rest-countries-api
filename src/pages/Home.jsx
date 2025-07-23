import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import CustomSelect from '../components/CustomSelect';


export default function Home() {
    const [countries, setCountries] = useState([]);
    const [regions, setRegions] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,region,flags,population,capital,cca3")
        .then(res => res.json())
        .then(data => {
            setCountries(data);
            //Extract unique regions
            const uniqueRegions = [...new Set(data.map(country => country.region))].filter(Boolean);
            setRegions(uniqueRegions);
        });
    }, []);

    const filteredCountries = countries.filter(country => {
    return (
        country.name.common.toLowerCase().includes(search.toLowerCase()) &&
        (selectedRegion ? country.region === selectedRegion.value : true)
    );
});


    
const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: 'none',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
            borderRadius: '6px',
            minHeight: '55px',
            fontSize: '1rem',
            padding: '0 10px',
            backgroundColor: 'white',
            fontFamily: 'var(--font-base)',
            fontWeight: '600',
            cursor: 'pointer',
            '&:hover': {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '6px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            marginTop: '4px',
            backgroundColor: 'white',
            zIndex: 1000,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#f0f0f0' : 'white',
            color: '#333',
            cursor: 'pointer',
            fontFamily: 'var(--font-base)',
            fontWeight: '600',
            '&:hover': {
                backgroundColor: '#f0f0f0',
            }
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#999',
            fontFamily: 'var(--font-base)',
            fontWeight: '600',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#333',
            fontFamily: 'var(--font-base)',
            fontWeight: '600',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: '#999',
            '&:hover': {
                color: '#666',
            }
        }),
        indicatorSeparator: () => ({ display: 'none' }),
    };

    const regionOptions = regions.map(region => ({
    value: region,
    label: region
}));

    return (
        <div className="home-container">
            <div className="top-bar">
                <div className="search-wrapper">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
                    <input 
                        id="search-bar"
                        type="text"
                        placeholder="Search for a country..."
                        className="search-input"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                
                 <CustomSelect
                    options={regionOptions}
                    value={selectedRegion}
                    onChange={setSelectedRegion}
                />
            </div>

            <div className="countries-grid">
                {filteredCountries.map(country => (
                    <div 
                        key={country.cca3 || country.name.common}
                        className="country-card"
                        onClick={() => navigate(`/country/${country.cca3}`)}
                        style={{ cursor: 'pointer' }}
                        >
                        <img src={country.flags.svg} alt={`${country.name.common} flag`} className="flag" />
                        <div className="card-body">
                            <h3>{country.name.common}</h3>
                            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                            <p><strong>Region:</strong> {country.region}</p>
                            <p><strong>Capital:</strong> {country.capital?.[0]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}