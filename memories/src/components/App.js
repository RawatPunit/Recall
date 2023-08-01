import { useEffect } from "react"
import { getPosts } from '../api'

function App() {
  useEffect(() => {
    
    const fetchPosts = async() =>{
      const response = await getPosts();
    }
    fetchPosts();
  }, []);
  return (
    <div className="App">
      <Home posts={posts}/>
    </div>
  );
}

export default App;
