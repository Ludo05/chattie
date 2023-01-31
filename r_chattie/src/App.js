import './App.css';
import { useRef }  from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { ChatMessage } from "./components/chat-message";
import { askQuestion, loadResults, deleteChat } from './api-calls/index'
function App() {
    const textInput = useRef("");
    const queryClient = useQueryClient()
    const { data, isError, isLoading, error } = useQuery(['results'], loadResults)
    const question = useMutation(askQuestion, {
        onSuccess: async () => {
            textInput.current.value = ""
            await queryClient.invalidateQueries(['results'])
        }
    })
    const clearChat = useMutation(deleteChat, {
        onSuccess: async () => {
            textInput.current.value = ""
            await queryClient.invalidateQueries(['results'])
        }
    })

    function handleSubmit (e) {
        e.preventDefault()
        question.mutate(textInput.current.value)
    }

    function handleDelete() {
        clearChat.mutate()

    }

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }


  return (
    <div className="App">
      <aside className={'sidemenu'}>
        <div onClick={handleDelete} className={'side-menu-btn'}>
            <span>+</span> New chat
        </div>
      </aside>
      <section className={'chatbox'}>
          <div className={'chat-log'}>
              {data.map((message, index) => {
                  return (
                      <>
                          <ChatMessage key={index} message={message} />
                      </>
                  )
              })}
          </div>
      </section>
      <section>

          <div className={'input-box'}>
          <form onSubmit={handleSubmit}>
                  <input
                      className={'input-area'}
                      name={'input'}
                      ref={textInput}
                      placeholder={'Type your message here'} />
          </form>
          </div>
      </section>
    </div>
  );
}

export default App;
