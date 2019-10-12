import React, { Component } from 'react';

class Socketerino extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: '',
      loading: true,
      trigger: false,
    };

    this.triggerNext = this.triggerNext.bind(this);
  }

  componentDidMount() {
    const { ws, steps } = this.props;
    const { message } = steps.chatUser;
    const self = this;

    ws.send(message);
    ws.onmessage = (event) => {
      console.log('Message from server ', event.data);
      self.setState({ loading: false, result: event.data });
      this.triggerNext();
    }
  }

  triggerNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  render() {
    const { trigger, loading, result } = this.state;

    return loading ? (<div>loading...</div>) : null;
  }
}

export default Socketerino;