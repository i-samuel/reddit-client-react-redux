import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadPosts = createAsyncThunk(
    'postList/loadPosts',
    async(term, isSearch) => {
        let endpoint;
        if(isSearch) {
            endpoint = `https://www.reddit.com/search.json?q=${term}`;
        }else{
            endpoint = `https://www.reddit.com/r/${term}.json`;
        }

        try{
            const response = await fetch(endpoint);
            if(response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse.data.children;
            }
        } catch(e) {
            console.error('error fetching data', e);

        }
    }
)

export const postsListSlice = createSlice({
    name: 'postsList',
    initialState: {
        posts: [],
        isLoadingPosts: false,
        failedLoadingPosts: false
    },
    reducers: {},
    extraReducers: (builder) => {
       builder 
        .addCase(loadPosts.pending, (state) => {
            state.isLoadingPosts = true;
            state.failedLoadingPosts = false;
        })
        .addCase(loadPosts.fulfilled, (state, action) => {
            state.isLoadingPosts = false;
            state.failedLoadingPosts = false;
            state.posts = action.payload.map(item => {
                let urlToImage = null;
                let urlVideo = null;
                if(item.data.preview && item.data.preview.enabled) {
                    let receivedUrl = new URL(item.data.preview.images[0].source.url);
                    urlToImage = `https://i.redd.it${receivedUrl.pathname}`;
                } else if(item.data.is_video && item.data.media.reddit_video){
                    urlVideo = item.data.media.reddit_video.fallback_url;
                }
                return {
                    postId: item.data.id,
                    title: item.data.title,
                    description: item.data.selftext,
                    author: item.data.author,
                    permalink: item.data.permalink,
                    image: urlToImage,
                    video: urlVideo,
                    date: item.data.created_utc,
                    votes: item.data.ups,
                    commentCount: item.data.num_comments,
                }
            })
        })
        .addCase(loadPosts.rejected, (state) => {
            state.isLoadingPosts = false;
            state.failedLoadingPosts = true;
        })
    }
})

export const selectAllPosts = (state) => state.postsList.posts;
export const isLoadingPosts = (state) => state.postsList.isLoadingPosts;

export default postsListSlice.reducer;