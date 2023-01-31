import FetchFacade from "../lib/fetch-facade";


async function askQuestion(question) {
    await FetchFacade.post('http://serv-env.eba-tfnkxnjy.us-east-1.elasticbeanstalk.com/chats', {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: question
        })
    })
}

async function loadResults(){
    return await FetchFacade.get('http://serv-env.eba-tfnkxnjy.us-east-1.elasticbeanstalk.com/chats')
}

async function deleteChat() {
    await FetchFacade.delete('http://serv-env.eba-tfnkxnjy.us-east-1.elasticbeanstalk.com/chats', {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export {
    askQuestion,
    deleteChat,
    loadResults
}
