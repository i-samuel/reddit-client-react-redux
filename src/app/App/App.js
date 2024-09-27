import React from 'react';
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Root from '../Root/Root';
import Subreddit from '../../features/subreddits/Subreddit';
import SearchResults from '../../components/SearchResults/SearchResults';
import SinglePost from '../../features/singlePost/SinglePost';

function App() {
  
  const router = createBrowserRouter(createRoutesFromElements([
    <Route path='/' element={ <Root/>}>
      <Route index element={ <Subreddit /> }/>
      <Route path='r/:subreddit/' element={ <Subreddit /> }/>
      <Route path='r/:subreddit/comments/:id/:title' element={ <SinglePost />} />
      <Route path='search/' element={ <SearchResults /> }/>      
     </Route>
  ])) 

  return (      
    <RouterProvider router = { router } />    
  );
}

export default App;
