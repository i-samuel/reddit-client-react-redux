import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import './searchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if(!searchTerm) {
            alert('Please Enter a Search Term!!!');
        } else {

            const searchQuery = {
                q: searchTerm
            }

            const query = createSearchParams(searchQuery);
            navigate({
                pathname: 'search/',
                search: `?${query}`
            });
        }
    }

    return(
        <div className="search-bar">
            <form onSubmit={handleSearchSubmit}>
                <button type="submit" className="search-button"><FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#ffffff",}} /></button>
                <input type="text" name="search" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                
            </form>
        </div>
    )
}