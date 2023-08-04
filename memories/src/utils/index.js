export * from './constants';

//helper functions to storage the token locally
export const setItemInLocalStorage = (key,value) =>{
  if(!key || !value){
    console.error('Cannot store in local storage');
  }
  const valueToStore = typeof value != "string" ? JSON.stringify(value) : value;
  
  localStorage.setItem(key,valueToStore);
};

export const getItemInLocalStorage = (key) =>{
  if(!key){
    console.error('Can get the value from local storage');
  }

  return localStorage.getItem(key);
};

export const removeItemInLocalStorage = (key) =>{
  if(!key){
    console.error('Cannot get the value from local storage');
  }

  localStorage.getItem(key);
};

export const getFormBody =(params) =>{
  let formBody = [];

  for(let property in params){
    let encodedKey = encodeURIComponent(property); //'username => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); //punit 123 => punit%2020123

    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&');  //username=punit&password=123231
}