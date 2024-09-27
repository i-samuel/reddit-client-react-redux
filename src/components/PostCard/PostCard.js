import React from "react";
import TimePosted from "../TimePosted/TimePosted";
import VoteCard from "../VoteCard/VoteCard";
import './PostCard.css';
import { displayCount } from "../../utils/displayCount";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import validator from "validator";
import xssFilters from "xss-filters";

 
export default function PostCard({ post }) {
    
        const { title, author, description, image, video, date, votes, commentCount, permalink} = post;

        const commentDisplay = displayCount(commentCount);

        let media;
        
        if(image){
            media = <img alt="" className="post-card-media" src={image}/>;
        }else if(video) {
            media = <video className="post-card-media" src={video} controls></video>;
        }else{
            media="";
        }
        
    return(     
        <article className="post-card">
            <VoteCard count={votes} />
            
            <div className="content-card">
                <div>
                    <h2 className="post-card-title"><Link to={`${permalink}`}>{title}</Link></h2>
                    {media}
                    
                    <p className="post-card-description">{xssFilters.inHTMLData(validator.unescape(description))}</p>
                </div>
                <div className="meta-card">
                    <div className="meta-card-name">
                        <span className="author"><a href="">{author}</a></span>
                    </div>
                    <div className="meta-card-time">
                        <span><TimePosted date={date*1000}/></span>
                    </div>
                    <div className="meta-card-comment">
                        <FontAwesomeIcon icon={faComment} />
                        <span>{commentDisplay}</span>
                    </div>
                </div>
            </div>            
        </article>   
     ) 
}