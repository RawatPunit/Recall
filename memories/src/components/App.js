import { useEffect,useState } from "react"
import { getPosts } from '../api'
import {Home} from '../pages';
import { Loader, Navbar } from './';

function App() {
  useEffect(() => {
    
    const fetchPosts = async() =>{
      const response = await getPosts();
    }
    fetchPosts();
  }, []);
  return (
    <div className="App">
      < Navbar/>
      <Home posts={posts}/>
    </div>
  );
}

export default App;
