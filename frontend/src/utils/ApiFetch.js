//----------------------- fichier contenant configuration pour les requêtes http Fetch -----------------------// 

// classe pour creer plus facilement les requêtes http, eviter répétitions
class ApiFetch {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api'
    }

    // headers
    // à améliorer ensuite : ajouter condition si FormData headers = {} + pas JSON.stringify
    headers () {
        return {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        }
    }

    // requête POST, envoi données
    post (path, body) {
        return fetch(this.baseUrl + path, {
            method: 'POST',
            headers: this.headers(),
            body: JSON.stringify(body)
        }).then((res) => res.json())
    }
}

export const apiFetch = new ApiFetch();