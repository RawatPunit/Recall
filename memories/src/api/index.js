import { API_URLS, LOCALSTORAGE_TOKEN_KEY } from '../utils'

const customFetch = async(url,{body, ...customConfig }) => {
    //segrigated the fetch() so that we dont have to write this again and again
    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)//while logging in Token generated and stored locally 

    const headers = {
        'content-type': 'application/json',
        Accept : 'application/json'
    }
    if(token){      //inside the headers pass the authorization key 
        headers.Authorization = `Bearer ${token}`;
    } 

    const config = {
        ...customConfig,
        headers:{
            ...headers,
            ...customConfig.headers,
        },
    };

    if(body){
        config.body = JSON.stringify(body);
    }
    try{
        const response = await fetch(url, config)   //config is like the methods and all
        const data  =  await response.json()
        if(data.success){
            return{
                data : data.data,
                success : true
            }
        }

        throw new Error(data.message);
    }catch(error){
        return{
            message : error.message,
            success : true
        }
    }
};

export const getPosts = (page =1, limit = 5) => {
    //limit ----- api call for limited number of pages
    return customFetch(API_URLS.posts(page, limit));
    method : 'GET';
}