import React, { Component } from 'react';
import moment from 'moment';
import './styles.css'

const URL = 'https://web.tecnico.ulisboa.pt/~bruno.s.henriques/api/canteen/';

function getNextCanteenDays(data) {
  const futures = data
    .filter(d => moment().isBefore(moment(d.day, 'DD/MM/YYYY')))
    .sort((a, b) => moment(a.day, 'DD/MM/YYYY') - moment(b.day, 'DD/MM/YYYY'));
  return futures;
}

function renderCanteenDay(data) {
  const { meal } = data;

  return (
    <>
      {meal.map((m, i) => (
        <div key={i} style={{ textAlign: "left" }}>
          <h3 style={{ marginBottom: 0 }}>{m.type}</h3>
          {m.info.map((mi, i) => (<div key={i}><b>{mi.type}</b>: {mi.name}</div>))}
        </div>
      ))}
    </>
  );
}

class Canteen extends Component {
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

    let day = null;
    if (result) {
      day = getNextCanteenDays(result)[0];
    }
    return (
      <div>
        <div style={{ marginBottom: "0.4rem" }}>Alameda Menu {day && day.day}</div>
        {loading
          ? <div>getting canteen menu...</div>
          : <div>{renderCanteenDay(day)}</div>}
      </div>
    );
  }
}

export default Canteen;
