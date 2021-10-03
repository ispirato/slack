import { Add, Apps, BookmarkBorder, Create, Drafts, ExpandMore, FiberManualRecord, FileCopy, Inbox, InsertComment, PeopleAlt } from '@material-ui/icons';
import React from 'react'
import styled from 'styled-components';
import SidebarOption from './SidebarOption';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db, auth } from '../firebase';
import { Link } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";

function Sidebar() {

    const [channels, loading, error] = useCollection(db.collection('rooms'));
    const [user] = useAuthState(auth);

    return (
        <SidebarContainer>
            <SidebarHeader>
                <SidebarInfo>
                    <h2>Профиль</h2>
                    <h3>
                        <FiberManualRecord titleAccess="Редактировать" />
                        {user?.displayName}
                    </h3>
                </SidebarInfo>
                <Create />
            </SidebarHeader>

            <Link to="/messages"><SidebarOption Icon={InsertComment} title="Сообщения" /></Link>
            <SidebarOption Icon={Inbox} title="Упоминания и реакции" />
            <SidebarOption Icon={Drafts} title="Черновики" />
            <SidebarOption Icon={BookmarkBorder} title="Сохранённые объекты" />
            <SidebarOption Icon={PeopleAlt} title="Пользователи и группы" />
            <SidebarOption Icon={Apps} title="Приложения" />
            <SidebarOption Icon={FileCopy} title="Менеджер файлов" />
            <hr />
            <SidebarOption Icon={ExpandMore} title="Каналы" />
            <hr />
            <SidebarOption Icon={Add} addChannelOption title="Создать канал" />
            { channels?.docs.map(doc => (
                <Link to="/"><SidebarOption key={doc.id} id={doc.id} title={doc.data().name} /></Link>
            )) }
        </SidebarContainer>
    )
}

export default Sidebar;

const SidebarContainer = styled.div`
    background-color: var(--slack-color);
    flex: 0.3;
    color: white;
    border-top: 1px solid #49274b;
    max-width: 260px;
    margin-top: 60px;

    >hr {
        border: 1px solid #49274b;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    > a {
        text-decoration: none !important;
        color: white !important;
    }
`;

const SidebarHeader = styled.div`
    display: flex;
    padding-bottom: 10px;
    padding: 13px;
    border-bottom: 1px solid #49274b;

    > .MuiSvgIcon-root {
        cursor: pointer;
        padding: 8px;
        color: #49274b;
        font-size: 12px;
        background-color: white;
        border-radius: 999px;

        :hover {
            opacity: .8;
        }
    }
`

const SidebarInfo = styled.div`
    flex: 1;

    > h2 {
        font-size: 13px;
        font-weight: 900;
        margin-bottom: 5px;
    }

    > h3 {
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items: center;
    }

    > h3 > .MuiSvgIcon-root {
        font-size: 13px;
        margin-top: 1px;
        margin-right: 3px;
        opacity: 0.7;
        color: green;
    }
`
