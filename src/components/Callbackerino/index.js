import React, { Component } from 'react';

const SHUTTLE_URL = 'https://web.tecnico.ulisboa.pt/~bruno.s.henriques/api/shuttle/';

class Callbackerino extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };

    this.triggerNext = this.triggerNext.bind(this);
  }

  componentDidMount() {
    const self = this;

    fetch(SHUTTLE_URL)
      .then((res) => res.json())
      .then((data) => {
        self.setState({ loading: false, result: data });
        this.triggerNext();
      });
  }

  triggerNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep("cena");
    });
  }

  render() {
    const { trigger, loading, result } = this.state;

    return (
      <div className="dbpedia">
        {loading
          ? "loading"
          : "I got data! " + result.stations.map(st => st.name).join(" ")}
        {
          !loading &&
          <div
            style={{
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            {
              !trigger &&
              <button onClick={() => this.triggerNext()} >
                Search Again
              </button>
            }
          </div>
        }
      </div>
    );
  }
}

export default Callbackerino;