//--------- Middleware pour vérifier que l'user est authentifié et le deconnecter si le token est expiré. ---------//
//--------- Ajouté aux pages du site accessibles après connexion (router). ---------//

import jwt_decode from "jwt-decode";

export default (to, from, next) => {
    const logOut = () => {
        localStorage.clear();
        alert("Session expirée !");
        next({ name: 'Login' });
    }
    
    const token = localStorage.getItem("userToken");
    if (token) {
        const decodedToken = jwt_decode(token);
        const dateNow = Math.round(Date.now() / 1000)
        const tokenDateExpired = decodedToken.exp < dateNow;
        if (tokenDateExpired) {
            logOut();
        }
    } 
    if (!token || !localStorage.getItem('userData')) {
        logOut();
    } else {
        next()
    }   
}

  