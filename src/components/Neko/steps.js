import React from 'react';
import Socketerino from './components/Socketerino';
import Shuttle from './components/Shuttle';
import Forecast from './components/Forecast';

const SOCKET_URL = 'ws://localhost:8000' || 'ws://echo.websocket.org' || 'ws://193.136.167.179:8000/conversation';

const ws = new WebSocket(SOCKET_URL);

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const initSteps = [
  {
    id: '1',
    message: randomFrom(['Hello!', 'Hey!', 'Howdy!', 'Welcome!']),
    trigger: '0',
  },
  {
    id: '0',
    message: randomFrom(['What would you like to do?', 'How can I help?', 'Tell me what to do!']),
    trigger: '10',
  },
  {
    id: '10',
    options: [
      { value: 'Loop', label: 'Loop', trigger: '11' },
      { value: 'Forecast', label: 'Forecast', trigger: 'weather0' },
      { value: 'Insult', label: 'Insult you', trigger: '13' },
      { value: 'Chat', label: 'Chat', trigger: 'chat0' },
      { value: 'Shuttle', label: 'Shuttle', trigger: 'shuttle0' },
      { value: 'Labs', label: 'Labs', trigger: 'lab0' },
    ],
  },
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
    trigger: '1',
  }
]

const shuttleSteps = [
  {
    id: 'shuttle0',
    message: 'Where are you leaving from?',
    trigger: 'shuttleLocs'
  },
  {
    id: 'shuttleLocs',
    options: [
      { value: 'Alameda', label: 'Alameda', trigger: 'shuttleShow' },
      { value: 'Taguspark', label: 'Tagus', trigger: 'shuttleShow' },
    ]
  },
  {
    id: 'shuttleShow',
    component: <Shuttle />,
    waitAction: true,
    trigger: '0'
  },
];

const labSteps = [
  {
    id: 'lab0',
    message: 'You want labs? bad luck!',
    trigger: '0',
  }
]

const otherSteps = [
  {
    id: '2',
    message: ({ previousValue, steps }) => 'Hello',
    trigger: ({ value, steps }) => '3',
  },
  {
    id: '3',
    message: 'Bye',
    end: true,
  },
  {
    id: '4',
    user: true,
    trigger: '2'
  },
  {
    id: '11',
    message: ({ previousValue, steps }) => `You said ${previousValue}`,
    trigger: '1'
  },
  {
    id: '12',
    message: 'Hello World back to you!',
    trigger: '10'
  },
  {
    id: '13',
    message: 'Rude! bye!',
    trigger: '3',
    end: true,
  },
  {
    id: '20',
    user: true,
    trigger: '21'
  },
  {
    id: '21',
    message: ({ previousValue, steps }) => `You said ${previousValue}`,
    trigger: '20'
  },
  {
    id: '22',
    message: 'tell me something!',
    trigger: '20'
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

const steps = [...initSteps, ...shuttleSteps, ...labSteps, ...weatherSteps, ...chatSteps, ...otherSteps];

export default steps;