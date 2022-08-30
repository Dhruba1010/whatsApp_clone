import React from 'react';
import './Login.css';
import { Image, Button, Heading } from '@chakra-ui/react';
import { auth, provider } from '../Firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/action';

const Login = () => {
    const dispatch = useDispatch();

    const signIn = () => {
        auth.signInWithPopup(provider).then(r => dispatch(setUser(r.user))).catch(e => alert(e.message));
    }

  return (
    <div className="login">
        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png" alt="whatApp" w='200px' m='auto' />
        <Heading as='h4' size='md'>
            Sign in to WhatsApp
        </Heading>
        <Button colorScheme='whatsapp' size='md' onClick={signIn}>
            Button
        </Button>
    </div>
  )
}

export default Login