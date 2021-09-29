import React from 'react'
import styled from 'styled-components'

import { AccessTime, HelpOutline, Search } from '@material-ui/icons';
import { Avatar } from '@material-ui/core'

function Header() {
    return <HeaderContainer>
        { /* Header Left */}
        <HeaderLeft>
            <HeaderAvatar 
                // TODO Add onClick

            />
            <AccessTime />
        </HeaderLeft>

        { /* Header Search */}
        <HeaderSearch>
            <Search />
            <input name="q" placeholder="Поиск" />
        </HeaderSearch>

        <HeaderRight>
            <HelpOutline />
        </HeaderRight>
    </HeaderContainer>
}

export default Header

const HeaderContainer = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    background-color: var(--slack-color);
    color: white;
`;

const HeaderLeft = styled.div`
    flex: 0.3;
    display: flex;
    align-items: center;
    margin-left: 20px;

    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 30px;
    }
`;

const HeaderAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: 0.7;
    }
`;

const HeaderSearch = styled.div`
    display: flex;
    flex: 0.4;
    opacity: 1;
    border-radius: 6px;
    text-align: center;
    background-color: #421f44;
    padding: 0 50px;
    border: 1px gray solid;
    color: gray;

    > input {
        background-color: transparent;
        border: none;
        text-align: center;
        min-width: 30vw;
        outline: none;
        color: white;
    }
`

const HeaderRight = styled.div`
    flex: 0.3;
    display: flex;
    align-items: flex-end;

    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 20px;
        cursor: pointer;
    }
`