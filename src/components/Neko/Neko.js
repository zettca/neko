import React from 'react';
import ChatBot from 'react-simple-chatbot';
import steps from './steps';
import neko from './neko.svg';

const Neko = () => (
  <ChatBot
    floating
    botAvatar={neko}
    botDelay={200}
    userDelay={100}
    steps={steps}
  />
);

export default Neko;
