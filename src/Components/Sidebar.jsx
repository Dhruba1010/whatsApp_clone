import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { MdDonutLarge } from 'react-icons/md';
import { BsFillChatLeftTextFill } from 'react-icons/bs';
import { FiMoreVertical } from 'react-icons/fi';
import { Avatar, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons'
import SidebarChat from './SidebarChat.jsx';
import db from '../Firebase.js';
import { useSelector } from 'react-redux';


const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const user = useSelector(state => state.user);

  useEffect(() => {
    const unmount = db.collection('rooms').onSnapshot(snapshot => (
      setRooms(snapshot.docs.map(d => 
        ({
          id: d.id,
          data: d.data(),
        })
      ))
    ))

    return () => {
      unmount();
    }
  },[])

  return (
    <div className='sidebar'>
      <div className="sidebar_header">
        <div className="sidebar_headerLeft">
          <Avatar size='md' src={user?.photoURL} />
        </div>
        <div className="sidebar_headerRight">
          <MdDonutLarge size='23px' color='#54656f' />
          <BsFillChatLeftTextFill size='23px' color='#54656f' />
          <FiMoreVertical size='23px' color='#54656f' />
        </div>
      </div>

      <div className="sidebar_search">
        <div className="sidebar_searchContain">
          <SearchIcon color='#54656f' />
          <Input placeholder='Search or start a new chat' />
        </div>
      </div>

      <div className="sidebar_contacts">
        <SidebarChat props />
        {rooms.map(r => (
          <SidebarChat key={r.id} id={r.id} name={r.data.roomName} />
        ))}
      </div>
    </div>
  )
}
 
export default Sidebar