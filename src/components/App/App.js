import React from 'react';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

import Neko from '../Neko';
import CreateForm from '../CreateForm';

import logo from '../Neko/neko.svg';

const App = ({ classes }) => {
  const [checked, setChecked] = React.useState(false);

  const handleClick = () => {
    setChecked(prev => !prev);
  }

  return ((window.self !== window.top)
    ? <Neko />
    : (
      < div className={classes.app} >
        <main className={classes.header}>
          <div style={{ transition: "ease" }}>
            <img src={logo} className={classes.logo} alt="logo" />
            <p>Neko: your personal assistant!</p>
            <Button variant="contained" color="secondary" className={classes.button} onClick={handleClick}>
              Bookmarklet
            </Button>
          </div>
          <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
            <div>
              <CreateForm />
            </div>
          </Slide>
        </main>
        <Neko />
      </div >
    )
  );
}

export default App;
