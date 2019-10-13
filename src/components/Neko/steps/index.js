import React from 'react';
import store from 'store';
import Socketerino from '../components/Socketerino';
import Forecast from '../components/Forecast';
import { randomFromArray } from '../utils';

import istSteps from './istSteps';
import jokeSteps from './jokeSteps';

const SOCKET_URL = 'ws://localhost:8000' || 'ws://echo.websocket.org' || 'ws://193.136.167.179:8000/conversation';

const name = store.get('name');
const ws = new WebSocket(SOCKET_URL);

const initSteps = [
  {
    id: '1',
    message: () => {
      const greetings = ['Hello', 'Hey', 'Howdy', 'Welcome'];
      return randomFromArray(greetings.map(g => g + (name ? ` ${name}!` : '!')));
    },
    trigger: () => name ? 'initOpts1' : 'initName',
  },
  {
    id: 'initName',
    message: `I haven't met you before, what's your name?`,
    trigger: 'initAskUsername',
  },
  {
    id: 'initAskUsername',
    user: true,
    trigger: 'initNiceToMeetYou'
  },
  {
    id: 'initNiceToMeetYou',
    message: ({ previousValue }) => {
      store.set('name', previousValue);
      return 'Nice to meet you {previousValue}';
    },
    trigger: 'initOpts1',
  },
  {
    id: 'initOpts1',
    message: randomFromArray(['What would you like to do?', 'How can I help?', 'Tell me what to do!']),
    trigger: 'initOpts2',
  },
  {
    id: 'initOpts2',
    options: [
      { value: 'Forecast', label: 'Forecast', trigger: 'weather0' },
      { value: 'Chat', label: 'Chat', trigger: 'chat0' },
      { value: 'Jokes', label: 'Jokes', trigger: 'joke0' },
      { value: 'IST Tools', label: 'IST Tools', trigger: 'ist0' },
    ],
  }
];

const weatherSteps = [
  {
    id: 'weather0',
    message: 'Forecast comming right up!',
    trigger: 'weather1',
  },
  {
    id: 'weather1',
    component: <Forecast />,
    waitAction: true,
    trigger: 'weatherResponse',
  },
  {
    id: 'weatherResponse',
    message: 'There you go!',
    trigger: 'initOpts1',
  }
];

const chatSteps = [
  {
    id: 'chat0',
    message: 'Say something! 😊',
    trigger: 'chatUser',
  },
  {
    id: 'chatUser',
    user: true,
    trigger: 'chatSocket',
    metadata: { result: "" }
  },
  {
    id: 'chatSocket',
    component: <Socketerino ws={ws} />,
    asMessage: true,
    replace: true,
    waitAction: true,
    trigger: 'chatResponse',
  },
  {
    id: 'chatResponse',
    message: ({ previousValue, steps }) => steps.chatUser.metadata.result,
    trigger: 'chatUser',
  }
];

const steps = [...initSteps, ...jokeSteps, ...istSteps, ...weatherSteps, ...chatSteps];

export default steps;