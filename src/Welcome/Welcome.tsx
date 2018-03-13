import * as React from 'react';
import { option as particleOption } from './particles';
import styles from './style.less';
import 'particles.js';

// @observer
class Welcome extends React.Component<{}, {}> {

  constructor(props: {}) {
    super(props);
  }

  componentDidMount() {
    // particle init
    (window as any).particlesJS('particles-js', particleOption);
  }

  render() {
    return (
      <div id="particles-js" className={styles.particles} />
    );
  }

}

export default Welcome;
