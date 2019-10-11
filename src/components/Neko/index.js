import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { request } from 'http';

const shuttleSteps = [
  {
    id: 'shuttle0',
    message: 'you want shuttle?',
    trigger: 'shuttle1'
  },
  {
    id: 'shuttle1',
    user: true,
  }
];

const basicSteps = [
  {
    id: '1',
    message: 'Hello World',
    trigger: '10',
  },
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
    id: '10',
    options: [
      { value: 'Hey', label: 'Hey', trigger: '11' },
      { value: 'Hello', label: 'Hello', trigger: '12' },
      { value: 'Sup', label: 'Sup', trigger: '13' },
      { value: 'Chat', label: 'Chat', trigger: '22' },
      { value: 'Shuttle', label: 'Shuttle', trigger: 'shuttle0' },
    ],
  },
  {
    id: '11',
    message: ({previousValue, steps}) => `You said ${previousValue}`,
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
    message: ({previousValue, steps}) => `You said ${previousValue}`,
    trigger: '20'
  },
  {
    id: '22',
    message: 'tell me something!',
    trigger: '20'
  }
];

const steps = [...shuttleSteps, basicSteps];

const Neko = (props) => (
  <ChatBot
    floating
    steps={steps}
  />
);

export default Neko;
