import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import Comment from "../../components/Comment/Comment";
import './singlePost.css';
import { loadPostAndComments, loadPostData, singlePostStatus } from "./singlePostSlice";


export default function SinglePost() {
    
    const dispatch = useDispatch();
    const { id } = useParams();
    const postForId = useSelector(loadPostAndComments);
    const status = useSelector(singlePostStatus);
   
    useEffect(() => {
        dispatch(loadPostData({postId: id}));
    },[dispatch, id]);

    
    if(status==='loading') {
        return <p>loading Post</p>;
    } else if(status==='failed') {
        return <p>Error loading Post!</p>
    } else if( status === 'success') {
        return(
            <div className="single-post">
                <PostCard 
                    post={postForId}
                />
                {postForId.comments.map((item) => 
                    <Comment
                        key={item.id}
                        author={item.author}
                        comment={item.commentText}
                        date={item.date}    
                    />
                )}                   
             </div>   
        )
    }   
}
