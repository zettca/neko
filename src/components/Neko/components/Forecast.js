import React, { Component } from 'react';
import ReactAnimatedWeather from 'react-animated-weather';

const URL = 'https://web.tecnico.ulisboa.pt/~bruno.s.henriques/api/forecast/';

function farToCel(f) {
  return Math.round((Number(f) - 32) * (5 / 9));
}

class Forecast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };
  }

  componentDidMount() {
    fetch(`${URL}?coords=38.731,-9.311`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ loading: false, result: data });
        this.triggerNext();
      });
  }

  triggerNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep("cena");
    });
  }

  render() {
    const { loading, result } = this.state;

    return (
      <div>
        {loading
          ? "looking at the skies..."
          : (
            <>
              <ReactAnimatedWeather
                icon={String(result.currently.icon).toUpperCase().replace(/-/g, '_')}
                color="orange"
                animate />
              <div>It's {farToCel(result.currently.temperature)}°C</div>
              <div>{result.currently.summary}</div>
            </>
          )}
      </div>
    );
  }
}

export default Forecast;
