import React from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import events from './events';

const Calendaro = () => (
  <Calendar
    localizer={momentLocalizer(moment)}
    defaultDate={new Date()}
    events={events}
    rtl={false}
    culture={'fr'}
  />
);

export default Calendaro;
