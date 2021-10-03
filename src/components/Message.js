import { Avatar } from '@material-ui/core';
import { DeleteOutlined, EditOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { db } from '../firebase';
// import moment from 'moment';
import 'moment/locale/ru';
import moment from 'moment-timezone';

function Message(props) {

    let date = props.createdAt?.toDate();

    const removeMessage = () => {
        const docRef = db.collection('rooms').doc(props.roomId).collection('messages');
        docRef.doc(props.id).delete();

        handleChange(!props.openSnackbar);
    }

    const handleChange = (openSnackbar) => {
        props.onChange(openSnackbar);
    }

    return <MessageContainer>
        {props.userImage ? (
            <Avatar alt={props.user} src={props.userImage} />
        ) : (
            <Avatar>{props.user[0]}</Avatar>
        )}
        <MessageInfo>
            <MessageInfoTop>
                <h4>{props.user} <span>{moment(date).tz('Europe/Moscow', true).locale('ru').fromNow()}</span></h4>
                <div className="info-right">
                    <EditOutlined /><DeleteOutlined onClick={removeMessage} />
                </div>
            </MessageInfoTop>
            <p>{props.message}</p>
        </MessageInfo>
    </MessageContainer>
}

export default Message;


const MessageContainer = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 20px;
`;

const MessageInfo = styled.div`
    padding-left: 10px;
    width: 100%;
    > p {
        line-height: 1.46668;
        font-size: 15px;
    }
    
    :hover {
        .MuiSvgIcon-root {
            opacity: 1;
        }
    }
`;

const MessageInfoTop = styled.div`
    display: flex;
    justify-content: space-between;
    

    > .info-right {
        justify-content: flex-end;
    }

    > h4 > span {
        color: gray;
        font-weight: 300;
        margin-top: 5px;
        font-size: 12px;
        margin-left: 5px;
    }

    > h4 {
        font-size: 15px;
    }
    > .info-right > .MuiSvgIcon-root {
        margin-left: 5px;
        font-size: 18px;
        color: lightgray;
        position: relative;
        bottom: -3px;
        opacity: .5;
        transition: .2s;
        cursor: pointer;
        :hover {
            color: #49274b;
        }
    }
`;