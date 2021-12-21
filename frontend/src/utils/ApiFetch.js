//----------------------- fichier contenant configuration pour les requêtes http Fetch -----------------------// 

// classe pour creer plus facilement les requêtes http, eviter répétitions
class ApiFetch {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api'
    }

    // headers
    // à améliorer ensuite : ajouter condition si FormData headers = {} + pas JSON.stringify
    headers (options = {}) {
       /* if ()

        return {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        }*/
        
            const contentType = options.isFormData
              ? {}
              : {
                  'Content-Type': 'application/json'
                }
        
            return {
              ...contentType,
              Authorization: 'Bearer ' + localStorage.getItem('userToken')
            }
    }

    // requête POST, envoi données
    post (path, body, options = {}) {
        return fetch(this.baseUrl + path, {
            method: 'POST',
            headers: this.headers(options),
            body: options.isFormData ? body : JSON.stringify(body)
        })
            .then((res) => res.json())
    }

    get (path, body, options = {}) {
        return fetch(this.baseUrl + path, {
            method: 'GET',
            headers: this.headers(options),
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
    }

    put (path, body, options = {}) {
        return fetch(this.baseUrl + path, {
            method: 'PUT',
            headers: this.headers(options),
            body: options.isFormData ? body : JSON.stringify(body)
        })
            .then((res) => res.json())
    }


    delete (path, body) {
        return fetch(this.baseUrl + path, {
            method: 'DELETE',
            headers: this.headers(),
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
    }
}

export const apiFetch = new ApiFetch();