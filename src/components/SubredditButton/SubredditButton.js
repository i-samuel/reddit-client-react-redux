import React from "react";
import subredditImg from '../../uploads/icon-subreddit.png';
import './subredditButton.css';
import { NavLink } from "react-router-dom";

export default function SubredditButton({ name, img, url, handleClickSubreddit }){
    return (
        <div className="subreddit">           
            <div className="sub-btn">
                <NavLink to={`/r/${url}`} className={({ isActive }) => isActive? 'active-link' : ''}>
                    <button onClick={() => handleClickSubreddit(url)}>
                        <img alt="" className="sub-btn-image" src={img || subredditImg} />
                        {name}
                    </button>  
                </NavLink>
            </div>
                              
        </div>
    )
}