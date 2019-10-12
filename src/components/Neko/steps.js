import React from 'react';
import Socketerino from '../Socketerino';
import Callbackerino from '../Callbackerino';

const URL = 'ws://echo.websocket.org' || 'ws://193.136.167.179:8000/conversation';

const initSteps = [
  {
    id: '1',
    message: 'Hello World',
    trigger: 'chat0' || '10',
  },
  {
    id: '10',
    options: [
      { value: 'Hey', label: 'Hey', trigger: '11' },
      { value: 'Hello', label: 'Hello', trigger: '12' },
      { value: 'Sup', label: 'Sup', trigger: '13' },
      { value: 'Chat', label: 'Chat', trigger: 'chat0' },
      { value: 'Shuttle', label: 'Shuttle', trigger: 'shuttle0' },
    ],
  },
];

const shuttleSteps = [
  {
    id: 'shuttle0',
    message: 'you want shuttle?',
    trigger: 'shuttle1'
  },
  {
    id: 'shuttle1',
    options: [
      { value: 'Yes', label: 'Yes', trigger: 'shuttleYes' },
      { value: 'No', label: 'No', trigger: '1' },
    ]
  },
  {
    id: 'shuttleYes',
    component: <Callbackerino />,
    waitAction: true,
    trigger: ({ value, steps }) => 'shuttleWhere'
  },
  {
    id: 'shuttleWhere',
    message: 'ok',
  }
];

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
    message: 'dude, be formal',
    trigger: '3'
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
    message: 'Say something! :)',
    trigger: 'chatUser',
  },
  {
    id: 'chatUser',
    user: true,
    trigger: 'chatSocket',
  },
  {
    id: 'chatSocket',
    component: <Socketerino ws={new WebSocket(URL)} />,
    waitAction: true,
    trigger: 'chatResponse',
  },
  {
    id: 'chatResponse',
    message: ({ previousValue, steps }) => `response was ${steps.chatUser.value}`,
    trigger: 'chatUser',
  }
];

const steps = [...initSteps, ...shuttleSteps, ...chatSteps, ...otherSteps];

export default steps;