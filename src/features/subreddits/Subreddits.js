import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadSubreddits, selectAllSubreddits, isLoadingSubreddits } from "./subredditsSlice";
import { loadPosts } from "../postsList/postsListSlice";
import SubredditButton from "../../components/SubredditButton/SubredditButton";
import "./subreddits.css";


export default function Subreddits() {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectAllSubreddits);
    const isLoadingSubs = useSelector(isLoadingSubreddits);
    

    useEffect(() => {
        dispatch(loadSubreddits());
    }, [dispatch]);

    const handleClickSubreddit = (term) => {
        dispatch(loadPosts(term, false));
    }

    if (isLoadingSubs) return <div>Loading Subreddits</div>;

    return(
        <div className="subreddit-list">
            {subreddits.map(({ name, urlTerm, image }, index) => 
                <li key={index}>
                    <SubredditButton name={name} url={urlTerm} img={image} handleClickSubreddit={handleClickSubreddit}/>     
                </li>
            )}
        </div>
    )
}