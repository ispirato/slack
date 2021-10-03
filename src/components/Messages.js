import React from 'react';
import styled from 'styled-components';

function Messages() {
    return (
        <MessagesContainer>
            <>
            <Header>
                <HeaderLeft>
                    <h4>Все личные сообщения</h4>
                </HeaderLeft>
                <HeaderRight></HeaderRight>
            </Header>

            <MessagesContainerInner>
                <MessagesEmpty>
                    <h3>Вы в любой момент можете посмотреть, что и кому писали в личных сообщениях.</h3>
                    <p>Здесь будет список всех ваших личных сообщений. Последние сообщения будут вверху списка.</p>
                </MessagesEmpty>
            </MessagesContainerInner>
            </>
        </MessagesContainer>
    )
}

export default Messages;

const MessagesContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    padding: 120px 0 0;
    position: relative;
    box-sizing: border-box;
    > h1 {
        margin-bottom: 40px;
        font-size: 28px;
    }
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

const MessagesContainerInner = styled.div`
    height: 100vh;
`;

const MessagesEmpty = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
    max-width: 615px;
    padding: 88px 16px;
    justify-content: center;
    margin: auto;
    > h3 {
        font-size: 18px;
        line-height: 1.33334;
    }
    > p {
        color: rgba(29,28,29, 0.7);
        margin-top: 10px;
    }
`;