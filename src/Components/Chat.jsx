import { Avatar } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import './Chat.css';
import { SearchIcon } from '@chakra-ui/icons';
import { FiMoreVertical } from 'react-icons/fi';
import { BsEmojiLaughing } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { BsFillMicFill } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import db from '../Firebase';
import { useSelector } from 'react-redux';
import firebase from 'firebase';

const Chat = () => {
  const [msg, setMsg] = useState('');
  const {id} = useParams();
  const [rmName, setRmName] = useState('');
  const [msgs, setMsgs] = useState([]);
  const user = useSelector(state => state.user);

  useEffect(() => {
    if(id){
      db.collection('rooms').doc(id).onSnapshot(snapshot => (
        setRmName(snapshot.data().roomName)
      ))

      db.collection('rooms').doc(id).collection('messages').orderBy('timestamps', 'asc').onSnapshot(snapshot => (
        setMsgs(snapshot.docs.map(m => m.data()))
      ))
    }
  },[id])

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection('rooms').doc(id).collection('messages').add({
      message: msg,
      name: user.displayName,
      timestamps: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setMsg('');
  }

  return (
    <div className='chat'>
        <div className="chat_header">
            <div className="chat_headerLeft">
                <Avatar size='md' src='https://images.unsplash.com/photo-1589254065909-b7086229d08c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' />
                <div className="chat_headerInfo">
                    <h2>{rmName}</h2>
                    <p>Last Seen{" "}
                      {new Date(
                        msgs[msgs.length-1]?.timestamps?.toDate()
                      ).toLocaleString()}
                    </p>
                </div>
            </div>
            <div className="chat_headerRight">
              <SearchIcon size='23px' color='#54656f' />
              <FiMoreVertical size='23px' color='#54656f' />
            </div>
        </div>

        <div className="chat_body">
          {msgs.map(m => (
            <p key={m.id} className={`chat_message ${m.name === user.displayName && 'chat_recieve'}`}>
              <span className="chat_name">{m.name}</span>
              {m.message}
              <span className="chat_time">
                {new Date(m.timestamps?.toDate()).toLocaleString()}
              </span>
            </p>
          ))}
        </div>

        <div className="chat_footer">
          <BsEmojiLaughing size='23px' />
          <ImAttachment size='23px' />
          <form>
            <input value={msg} type="text" placeholder='Type a message' onChange={(e) => setMsg(e.target.value)} />
            <button onClick={sendMessage} type='submit'><IoMdSend size='23px' /></button>
          </form>
          <BsFillMicFill size='23px' />
        </div>
    </div>
  )
}

export default Chat