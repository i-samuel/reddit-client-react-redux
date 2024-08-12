import React from "react";
import logo from '../../uploads/logo.png';
import SearchBar from "../Searchbar/SearchBar";
import './header.css';
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
                <div className="logo">
                <Link to='/'>
                    <img alt="Reddit Client" src={logo} />
                </Link>                
                </div>
                <div className="header-widget">
                    <SearchBar />
                </div>                
        </header>
    );
}