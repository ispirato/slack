import { DeleteOutlined, MessageOutlined, StarBorderOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { selectRoomId } from '../features/counter/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { db } from '../firebase';
import Message from './Message';
import ScrollableFeed  from 'react-scrollable-feed';
import ScaleLoader  from "react-spinners/ScaleLoader";
import { Snackbar } from '@material-ui/core';
import { enterRoom } from '../features/counter/appSlice';
import { v4 as uuidv4 } from 'uuid';

function Chat() {

    const dispatch = useDispatch();

    const roomId = useSelector(selectRoomId);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [roomDetails] = useDocument(roomId && db.collection('rooms').doc(roomId));
    const [roomMessages, loading] = useCollection(
        roomId && 
        db.collection('rooms').doc(roomId).collection('messages').orderBy('createdAt', 'asc')
    );

    const handleSnackbar = (p) => setOpenSnackbar(p);

    const handleRemoveChannel = () => {
        db.collection('rooms').doc(roomId).delete();
        dispatch(enterRoom({roomId: null }));
    }
    
    useEffect(() => {
        //console.log(roomId);
    }, [roomId]);

    const handleClose = () => {
        setOpenSnackbar(!openSnackbar);
    };

    return <ChatContainer>

        {loading && (
            <Loading>
                <ScaleLoader color="gray" height={22} width={2} radius={2} margin={1} />
                <p>Подождите, идет загрузка</p>
            </Loading>
        )}

        {roomDetails && roomMessages && (
            <>
            <Header>
                <HeaderLeft>
                    <h4>#{roomDetails?.data().name}</h4>
                    <StarBorderOutlined/>
                </HeaderLeft>
                <HeaderRight>
                    <RemoveChannel onClick={handleRemoveChannel}>
                        <DeleteOutlined /> Удалить канал
                    </RemoveChannel>
                </HeaderRight>
            </Header>
    
            
            <ChatMessages>
                { roomMessages?.docs.length == 0 ? 
                  <Loading>
                      <MessageOutlined sx={{ fontSize: 40, color: 'gray' }} />
                      <p>Сообщений нет. Напиши первым!</p>
                  </Loading> : <ScrollableFeed>
                  { roomMessages?.docs.map(doc => {
                      const {message, createdAt, user, userImage} = doc.data();
      
                      return (
                          <Message 
                              onChange={handleSnackbar}
                              openSnackbar={openSnackbar}
                              key={doc.id}
                              id={doc.id}
                              roomId={roomId}
                              message={message}
                              createdAt={createdAt}
                              user={user}
                              userImage={userImage}
                          />
                      );
                  })}
                  </ScrollableFeed>
                }
            </ChatMessages>
            
    
            <ChatInput
                channelName={roomDetails?.data().name}
                channelId={roomId}
            />

            </>
        )}
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={openSnackbar}
            onClose={handleClose}
            autoHideDuration={2000}
            message="Сообщение удалено"
            key={`deleteMessage_${uuidv4()}`}
        />
    </ChatContainer>
}

export default Chat;

const Loading = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.7;
    flex-grow: 1;
    /* overflow-y: scroll; */
    align-items: center;
    justify-content: center;
    height: 100%;
    > p {
        font-size: 12px;
        color: gray;
        margin-top: 10px;
    }
`

const ChatMessages = styled.div`
    /* overflow-y: scroll; */
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
    position: absolute;
    width: 100%;
    z-index: 100;
    background: #fff;
    box-sizing: border-box;
    left: 0;
    top: 60px;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;

    > h4 {
        display: flex;
        text-transform: lowercase;
        margin-right: 10px;
    }

    > .MuiSvgIcon-root {
        font-size: 21px;
        cursor: pointer;

        :hover {
            color: gold;
        }
    }
`;


const HeaderRight = styled.div`
    display: flex;
    align-items: center;
`;

const RemoveChannel = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 13px;
    color: gray;
    transition: .2s;
    :hover {
        color: black;
    }
    > .MuiSvgIcon-root {
        margin-right: 5px !important;
        font-size: 18px;
    }
`;

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    padding: 120px 0 0;
    padding-bottom: 80px;
    position: relative;
`;