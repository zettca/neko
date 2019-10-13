import { Component } from 'react';

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
    const step = steps.chatUser;
    const { message, metadata } = step;

    ws.send(message);
    ws.onmessage = (event) => {
      const { data } = event;
      console.log('Message from server ', data);
      metadata.result = data;
      this.setState({ loading: false, result: data });
      this.triggerNext();
    }
  }

  triggerNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep('TESTPLS');
    });
  }

  render() {
    return null;
  }
}

export default Socketerino;