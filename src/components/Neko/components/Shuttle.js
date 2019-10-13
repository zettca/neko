import React, { Component } from 'react';
import moment from 'moment';
import { Twemoji } from 'react-emoji-render';
import './styles.css'

const URL = 'https://web.tecnico.ulisboa.pt/~bruno.s.henriques/api/shuttle/';

const DAYOFF_NAME = 'weekend';

function isPastTrip(hr) {
  const [min1, min2] = [moment(new Date()), moment(hr, 'HH:mm')].map(m => m.minutes() + m.hours() * 60);
  return min1 > min2;
}

function getPeriodFromDates(date, dates) {
  if (dates == null) return null;
  else if (date.getDay() % 6 === 0) return DAYOFF_NAME;

  for (const d of dates) {
    const [d1, d2] = [d.start, d.end].map(d => moment(d, 'DD/MM/YYYY'));
    if (moment(date).isBetween(d1, d2, 'day', '[]')) return d.type;
  }

  return DAYOFF_NAME;
}

function renderNextShuttles(data, campus) {
  const { trips } = data;
  const period = getPeriodFromDates(new Date(), data.date);
  const myTrips = trips
    .filter(t => t.type === period && t.stations[0].station === campus)
    .filter(t => !isPastTrip(t.stations[0].hour))
    .map(t => ({
      hour: t.stations[0].hour,
      stations: [t.stations[0].station, t.stations[t.stations.length - 1].station],
    }));

  return (
    <>
      {(myTrips.length === 0)
        ? (<div>No Shuttle trips today! <Twemoji svg text={'❌ 🚌 😢 😭'} /></div>)
        : myTrips.map((st, i) => (
          <div key={i}>
            {`${st.hour.replace(/\./g, ':')} ${st.stations.join(' > ')}`}
          </div>
        ))}
    </>
  );
}

class Shuttle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };
  }

  componentDidMount() {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ loading: false, result: data });
        this.triggerNext();
      });
  }

  triggerNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  render() {
    const { loading, result } = this.state;
    const { previousStep } = this.props;

    console.log(previousStep);

    return (
      <div>
        {loading
          ? "getting Shuttles trips..."
          : (
            <>
              <div style={{ marginBottom: "0.4rem" }}>Shuttles leaving from {previousStep.value}</div>
              <div>{renderNextShuttles(result, previousStep.value)}</div>
            </>
          )}
      </div>
    );
  }
}

export default Shuttle;