class FetchFacade{

    get(url) {
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

    delete(url, options = {}) {
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

    post(url, options = {}) {
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

export default new FetchFacade()
