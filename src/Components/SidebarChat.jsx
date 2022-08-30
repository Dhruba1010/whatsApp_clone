import { Avatar } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import db from '../Firebase';
import './SidebarChat.css';
import { Link } from 'react-router-dom';

const SidebarChat = ({ id, name, props }) => {
  const [msgs, setMsgs] = useState('');

  useEffect(() => {
    if(id){
      db.collection('rooms').doc(id).collection('messages').orderBy('timestamps', 'desc').onSnapshot(snapshot => (
        setMsgs(snapshot.docs.map(m => m.data()))
      ))
    }
  },[id])

  const addChat = () => {
      const roomName = prompt('Please enter Room Name');

      if(roomName){
          db.collection('rooms').add({
            roomName
          })
      }
  }


  return props ? (
    <div onClick={addChat} className="sidebarChat_add">
        <h2>Add New Chat</h2>
    </div>
  ) : (
    <Link to={`rooms/${id}`}>
      <div className='sidebarChat'>
          <Avatar mr='1rem' size='md' src='https://images.unsplash.com/photo-1589254065909-b7086229d08c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' />
          <div className="sidebarChat_info">
              <h2>{name}</h2>
              <p>{msgs[0]?.message}</p>
          </div>
      </div>
    </Link>
  )
}

export default SidebarChat