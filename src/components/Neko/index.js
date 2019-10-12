import React from 'react';
import { ThemeProvider } from 'styled-components';
import Neko from './Neko'
import styles from './styles';

const ThemedNeko = () => (
  <ThemeProvider theme={styles}>
    <Neko />
</ThemeProvider>

);

export default ThemedNeko;
