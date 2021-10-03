import { Button } from '@material-ui/core'
import firebase from 'firebase/compat';
import React, { useState } from 'react'
import styled from 'styled-components'
import { db, auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";

function ChatInput({channelName, channelId }) {

    const [input, setInput] = useState('');
    const [user] = useAuthState(auth);

    const sendMessage = (e) => {

        if (!channelId) {
            return false;
        }

        db.collection('rooms').doc(channelId).collection('messages').add({
            message: input,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            user: user?.displayName,
            userImage: user?.photoURL
        });

        // console.log('send',chatRef);
        // chatRef.current?.scrollIntoView({ behavior: "smooth", alignToTop: false });

        setInput('');

        e.preventDefault();

    }

    return <ChatInputContainer>
        <form>
            <input onChange={e => setInput(e.target.value)} value={input} placeholder={`Отправить сообщения для: #${channelName}`} />
            <Button hidden type="submit" onClick={sendMessage}>Отправить</Button>
        </form>
    </ChatInputContainer>
}

export default ChatInput

const ChatInputContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    z-index: 100;

    > form {
        width:100%;
    }

    > form > input {
        width: 100%;
        display: flex;
        border: none;
        padding: 0 20px;
        border-top: 1px solid lightgray;
        outline: none;
        height:80px;
    }

    > form > button {
        display: none !important;
    }
`