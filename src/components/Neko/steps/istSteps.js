import React from 'react';
import Shuttle from '../components/Shuttle';

const optsSteps = [
  {
    id: 'ist0',
    message: 'What would you like to know about Técnico?',
    trigger: 'istOpts',
  },
  {
    id: 'istOpts',
    options: [
      { value: 'Shuttle', label: 'Shuttle', trigger: 'shuttle0' },
      { value: 'Labs', label: 'Labs', trigger: 'lab0' },
    ],
  }
];

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
    trigger: 'initOpts1'
  },
];

const labSteps = [
  {
    id: 'lab0',
    message: 'You want labs? bad luck!',
    trigger: 'initOpts1',
  }
];

const istSteps = [...optsSteps, ...shuttleSteps, ...labSteps];

export default istSteps;