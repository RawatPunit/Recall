export * from './constants';

export const getFormBody =(params) =>{
  let formBody = [];

  for(let property in params){
    let encodedKey = encodeURIComponent(property); //'username => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); //punit 123 => punit%2020123

    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');  //username=punit&password=123231
}