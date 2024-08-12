import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadPostData = createAsyncThunk(
    'singlePost/loadPoostData',
    async({ postId }) => {
        try{
            let endpoint = `https://www.reddit.com/${postId}.json`;
            const response = await fetch(endpoint);
            
            if(response.ok) {
                const jsonResponse = await response.json();
                
                return {id: postId,
                        postData: jsonResponse[0].data.children[0].data,
                        commentsData: jsonResponse[1].data.children
                        };
            }   
        }catch(e) {
            console.log('error fetching post data');
        }
    }
)

export const singlePostSlice = createSlice(({
    name: 'singlePost',
    initialState: {
        post: {},
        isLoadingPost: false,
        failedLoadingPost: false,
    },
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadPostData.pending, (state) => {
                state.isLoadingPost = true;
                state.failedLoadingPost = false;
                state.status = 'loading';
            })
            .addCase(loadPostData.fulfilled, (state, action) => {
                state.isLoadingPost = false;
                state.failedLoadingPost = false;
                state.status = 'success';
                const { postData, commentsData } = action.payload;
                
                //save post data
                let urlToImage = null;
                let urlVideo = null;
                if(postData.preview && postData.preview.enabled) {
                    let receivedUrl = new URL(postData.preview.images[0].source.url);
                    urlToImage = `https://i.redd.it${receivedUrl.pathname}`;
                } else if(postData.is_video && postData.media.reddit_video){
                    urlVideo = postData.media.reddit_video.fallback_url;
                }
                state.post = {
                    postId: postData.id,
                    title: postData.title,
                    description: postData.selftext,
                    author: postData.author,
                    permalink: postData.permalink,
                    image: urlToImage,
                    video: urlVideo,
                    date: postData.created_utc,
                    votes: postData.ups,
                    commentCount: postData.num_comments,                    
                    comments: commentsData.map((item, index) => {
                        return {
                            id: item.data.id,
                            author: item.data.author,
                            commentText: item.data.body, 
                            date: item.data.created_utc,
                        }
                    }),
                }
            })
            .addCase(loadPostData.rejected, (state) => {
                state.isLoadingPost = false;
                state.failedLoadingPost = true;
                state.status = 'failed';
            })
    }

}))

export const isLoadingPostData = (state) => state.singlePost.isLoadingPost;

export const loadPostAndComments = (state) => state.singlePost.post;

export const singlePostStatus = (state) => state.singlePost.status;

export default singlePostSlice.reducer;