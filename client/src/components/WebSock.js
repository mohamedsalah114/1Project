import React, {useEffect, useRef, useState} from 'react';
import moduleStyle from "../modules/Comment.module.css"
import {Button, Form} from "react-bootstrap";
import {fetchName} from "../http/userAPI";
import {fetchComments} from "../http/dishAPI";
import {useParams} from "react-router-dom";


const WebSock = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    // const [comments, setComments] = useState({});
    const socket = useRef()
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('')
    const userId = localStorage.getItem('userId')
    const {id} = useParams()

    useEffect(() => {
        fetchName(userId).then(data => setUsername(data))
        connect()
        // fetchComments(id).then(data => setComments(data))
    }, [])

    function connect() {
        socket.current = new WebSocket('ws://localhost:4000')

        socket.current.onopen = () => {
            setConnected(true)
            console.log('Подключение установлено')
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
        }
        socket.current.onclose= () => {
            console.log('Socket закрыт')
        }
        socket.current.onerror = () => {
            console.log('Socket произошла ошибка')
        }
    }

    const sendMessage = async () => {
        const message = {
            username,
            message: value,
            id: Date.now(),
            event: 'message'
        }
        socket.current.send(JSON.stringify(message));
        setValue('')
    }


    if (!connected || !username) {
        return (
            <div className="center">
                <b>Зарегестрируйтесь, чтобы оставлять комментарии</b>
            </div>
        )
    }


    return (
        <div>
            <h2>Обсуждения</h2>
            <div className={moduleStyle.form}>
                <Form className={moduleStyle.interface}>
                    <Form.Control as="textarea" className={moduleStyle.textarea} value={value} onChange={e => setValue(e.target.value)} type="text"/>
                    <Button className="mt-3" onClick={sendMessage}>Отправить</Button>
                </Form>
                <div className="messages">
                    {messages.map(mess =>
                        <div className={moduleStyle.message} key={mess.id}>
                            {mess.event === 'connection'
                                ? <hr/>
                                : <div>
                                    {mess.username}: {mess.message}
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WebSock;