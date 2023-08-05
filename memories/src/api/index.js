import { API_URLS, LOCALSTORAGE_TOKEN_KEY } from '../utils'

const customFetch = async(url,{body, ...customConfig }) => {
    //segrigated the fetch() so that we dont have to write this again and again
    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)//while logging in Token generated and stored locally 

    const headers = {
        'content-type': 'application/x-www-form-urlencoded',
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
        config.body = getFormBody(body); //imported from utils
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
            success : false,
        }
    }
};

export const getPosts = (page =1, limit = 5) => {
    //limit ----- api call for limited number of pages
    return customFetch(API_URLS.posts(page, limit),{
        method : 'GET',
    });
}

export const login = ( email, password ) => {
    return customFetch(API_URLS.login(),{
        method : 'POST',
        body: {email, password },
    })
}

export const register = async(name, email, password, confirmPassword) => { 
    return customFetch(API_URLS.signup(),{
        method : 'POST',
        body : { name, email, password, confirm_password: confirmPassword}
    });
};

export const editProfile = async(userId,name, password, confirmPassword) => { 
    return customFetch(API_URLS.editUser(),{
        method : 'POST',
        body : { id:  userId,name ,  password, confirm_password: confirmPassword}
    });
};