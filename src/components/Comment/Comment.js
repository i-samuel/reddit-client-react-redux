import React from "react";
import TimePosted from '../TimePosted/TimePosted';
import './comment.css';

export default function Comment({ author, comment, date }){
    if(!date || !comment || !author || comment === '[deleted]' || comment === '[removed]') return '';
    
    return(
        <li className="comment">
            <div className="comment-meta">
                <p className="comment-author">{author}</p>
                <span className="comment-time"><TimePosted date={date*1000}/></span>
            </div>
            <p className="comment-text">{comment}</p>
        </li>
    )
}