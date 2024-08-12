import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadSubreddits = createAsyncThunk(
    'subreddits/loadSubreddits',
    async() => {
        try{
            const response = await fetch('https://www.reddit.com/subreddits.json');
            if(response.ok) {
                const jsonResponse = await response.json();
                
                return jsonResponse.data.children;
            }
        } catch(e) {
            console.log('error fetching subreddit data');
        }        
    }
)

export const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: {
        subreddits: [],
        isLoadingSubreddits: false,
        failedLoadingSubreddits: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(loadSubreddits.pending, (state) => {
            state.isLoadingSubreddits = true;
            state.failedLoadingSubreddits = false;
          })
          .addCase(loadSubreddits.fulfilled, (state, action) => {
            state.isLoadingSubreddits = false;
            state.failedLoadingSubreddits = false;
            state.subreddits = action.payload.map((item) => {
                let image = null;
                let url = item.data.url;
                let urlTerm = url.substring(3, url.length-1);
                
                if(item.data.icon_img) {
                    image= item.data.icon_img;
                };

                return {
                    name: item.data.display_name,
                    urlTerm,
                    image
                }
            })
            })
          .addCase(loadSubreddits.rejected, (state) => {
                state.isLoadingSubreddits = false;
                state.failedLoadingSubreddits = true;
          })
          }
    
});

export const selectAllSubreddits = (state) => state.subreddits.subreddits;
export const isLoadingSubreddits = (state) => state.subreddits.isLoadingSubreddits;

export default subredditsSlice.reducer;