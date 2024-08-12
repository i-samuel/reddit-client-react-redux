import React from "react";
import { useSelector } from "react-redux";
import { isLoadingPosts, selectAllPosts } from "./postsListSlice";
import PostCard from '../../components/PostCard/PostCard';
import './postsList.css';

export default function PostsList() {
    const posts = useSelector(selectAllPosts);
    const isLoading = useSelector(isLoadingPosts);
    
    if (isLoading) return <div>Loading Posts</div>;    

    return(              
         <ul className="post-list">
            {posts.map((post, index) => 
                <PostCard key={index}
                post={post}               
                />
            )}
         </ul>        
    )
}