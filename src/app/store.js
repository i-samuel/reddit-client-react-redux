import { configureStore } from "@reduxjs/toolkit";
import postsListReducer from '../features/postsList/postsListSlice';
import subredditsReducer from '../features/subreddits/subredditsSlice';
import singlePostReducer from '../features/singlePost/singlePostSlice';

export default configureStore({
    reducer: {
        postsList: postsListReducer,
        subreddits: subredditsReducer,
        singlePost: singlePostReducer,
    }
});