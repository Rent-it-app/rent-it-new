//Authintecate login responce > and save it to session storage
//the session is part of the window obj so using the window you can now

//send the data to local session 
//(it will be as json format but we need it as obj format so we used parse
export const authintecate = (response , next) =>{
    if(window !== 'undefined') {
      //  console.log('authintcate', response);
        sessionStorage.setItem('theToken',JSON.stringify(response.data.token))
        sessionStorage.setItem(JSON.stringify('user',response.data.name))
    }
next();
}
//retreve the token (it will be as obj format but we need it as json format so we used stringfy)
export const getToken = (response , next) =>{
    if(window !== 'undefined') {
      if(sessionStorage.getItem('theToken'))
        return JSON.parse(sessionStorage.getItem('theToken'));
      else
        return false;
    }
next();
}

export const getUser = (response , next) =>{
    if(window !== 'undefined') {
      if(sessionStorage.getItem('user'))
        return JSON.parse(sessionStorage.getItem('user'));
        else
        return false;
    }
next();
}

//delete the values stored at the session storage
export const logout =( next) =>{
    if(window !== 'undefined') {
      //  console.log('authintcate', response);
        sessionStorage.removeItem('theToken');
        sessionStorage.removeItem('user')
    }
next();
}
