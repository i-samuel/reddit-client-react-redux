import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadPosts } from "../postsList/postsListSlice";
import PostsList from "../postsList/PostsList";
import { useParams } from "react-router-dom";

export default function Subreddit() {
    const { subreddit } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        !subreddit ? dispatch(loadPosts('reddit', true)) : dispatch(loadPosts(subreddit, false));
    }, [dispatch, subreddit]);

    return (
        <PostsList />
    )
}