import { useEffect,useState } from "react"
import { BrowserRouter as  Route, Router, Routes,useNavigate } from "react-router-dom";

import { getPosts } from '../api'
import {Home , Login, Settings, Signup,UserProfile} from '../pages';
import { Loader, Navbar } from './';
import { useAuth } from "../hooks";
// import Signup from "../pages/Signup";



const About =  () => {
  return <h1>About</h1>;
};

const UserInfo =  () => {
  return <h1>UserInfo</h1>;
};

const Page404 =  () => {
  return <h1>404</h1>;
};

const navigate = useNavigate();
function PrivateRoute ({children, ...rest}){
  const auth = useAuth();
  return ( <Route 
    {...rest}  //this will have the route and its children as specified in the function above
    render= {() => {
      if(auth.user){
        return children;
      }

      return <navigate to="/login" />
    }}
  />);
}


function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
  
      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
    };
  
    fetchPosts();
  }, []);


  if(auth.loading){
    return <Loader/>;
  }


  return (
    <div className="App">
      < Router >
      <Navbar/>
      <Routes>
        
        {/* exact keyword help to strictly load that page and no two pages willl get loads  */}
          < Route exact path="/" >            
            < Home posts={posts} />
          </ Route >

          < Route exact path="/Login" >
            < Login />
          </ Route >
          
          < Route exact path="/register" >
            < Signup />
          </ Route >
          
          < Route exact path="/register" >
            < UserInfo />
          </ Route >

          < PrivateRoute exact path="/settings" >
            < Settings />
          </ PrivateRoute >
          
          < PrivateRoute exact path="/user/:userId" >
            < Settings />
          </ PrivateRoute >

          < Route >
            < Page404 />
          </ Route >
          
        </Routes>
      </ Router >
    </div>
  );
}

export default App;
