import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadPosts } from "../../features/postsList/postsListSlice";
import PostsList from "../../features/postsList/PostsList";
import { useSearchParams } from "react-router-dom";


export default function SearchResults() {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const term = searchParams.get('q');
    const dispatch = useDispatch();
    useEffect(() => {
        if(term){
            dispatch(loadPosts(term, true));
        }
        
    }, [dispatch, term]);

    return (
        <PostsList />
    )
}