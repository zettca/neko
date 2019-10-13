import React from 'react';
import ChatBot from 'react-simple-chatbot';
import steps from './steps';
import neko from './neko.svg';

const Neko = () => (
  <ChatBot
    floating
    recognitionEnable={true}
    speechSynthesis={{ enable: true, lang: 'en' }}
    headerTitle='Chat with Neko'
    botAvatar={neko}
    botDelay={200}
    userDelay={100}
    steps={steps}
  />
);

export default Neko;
