import React from 'react';
import Shuttle from '../components/Shuttle';
import Canteen from '../components/Canteen';

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
      { value: 'Canteen', label: 'Canteen', trigger: 'canteen0' },
      { value: 'Labs', label: 'Tagus Labs', trigger: 'lab0' },
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

const canteenSteps = [
  {
    id: 'canteen0',
    component: <Canteen />,
    trigger: 'initOpts1',
  }
];

const labSteps = [
  {
    id: 'lab0',
    message: 'You want labs? bad luck!',
    trigger: 'initOpts1',
  }
];

const istSteps = [...optsSteps, ...canteenSteps, ...shuttleSteps, ...labSteps];

export default istSteps;