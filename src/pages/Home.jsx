import { useEffect, useState } from "react";
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'



export default function Home() {
    const [countries, setCountries] = useState([]);
    const [regions, setRegions] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,region,flags,population,capital")
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
            (selectedRegion ? country.region === selectedRegion : true)
        );
    });


    return (
        <div className="home-container">
            <div className="top-bar">
                <div className="search-wrapper">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
                    <input 
                        type="text"
                        placeholder="Search for a country..."
                        className="search-input"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <select
                    className="region-select"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                >
                    <option value="">Filter by Region</option>
                    {regions.map(region => (
                        <option key={region} value={region}>{region}</option>
                    ))}
                </select>
            </div>

            <div className="countries-grid">
                {filteredCountries.map(country => (
                    <div key={country.cca3} className="country-card">
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