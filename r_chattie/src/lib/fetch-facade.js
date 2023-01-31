export default class FetchFacade{

    static get(url) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then( response => {
                if(response.ok) {
                    return resolve(response.json())
                }
            }).catch(err => {
                reject(err)
            })
        })
    }

    static delete(url, options = {}) {
        return new Promise((resolve, reject) => {
            return fetch(url, {
                method: "DELETE",
                ...options
            }).then( response => {
                if(response.ok) {
                   return resolve(response.json())
                }
            }).catch( err => reject(err))
        })
    }

    static post(url, options = {}) {
        return new Promise((resolve, reject) => {
            return fetch(url, {
                method: "POST",
                ...options
            }).then( response => {
                if(response.ok) {
                    return resolve(response.json())
                }
            }).catch( err => reject(err))
        })
    }
}
