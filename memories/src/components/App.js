import { useEffect,useState } from "react"
import { BrowserRouter as Re, Route, Router } from "react-router-dom";

import { getPosts } from '../api'
import {Home , Login} from '../pages';
import { Loader, Navbar } from './';

const About =  () => {
  return <h1>About</h1>;
};

const UserInfo =  () => {
  return <h1>UserInfo</h1>;
};

const Page404 =  () => {
  return <h1>UserInfo</h1>;
};




function App() {
  useEffect(() => {
    
    const fetchPosts = async() =>{
      const response = await getPosts();
    }
    fetchPosts();
  }, []);

  if(loading){
    return <Loader/>;
  }


  return (
    <div className="App">
      <Navbar/>
      < Router >
      {/* exact keyword help to strictly load that page and no two pages willl get loads  */}

        < Route exact path="/" >            
          < Home posts={posts} />
        </ Route >

        < Route exact path="/Login" >
          < Login />
        </ Route >
        
        < Route exact path="/about" >
          < About />
        </ Route >
        
        < Route exact path="/user/test" >
          < UserInfo />
        </ Route >

        < Route >
          < Page 404 />
        </ Route >

      </ Router >
    </div>
  );
}

export default App;
