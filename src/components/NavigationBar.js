import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  section: {
    backgroundColor: '#ffc600',
    height: '45px',
  },
  header: {
    fontSize: '20px',
    fontWeight: '500',
    float: 'left',
  },
  button: {
    float: 'right',
    height: '60px',
    margin: 0,
  },
};

const signOut = (actions) => {
  actions.signOut();
};

const NavigationBar = ({ auth, actions }) => (
  <section style={styles.section}>
    <p style={styles.header}>Todo App</p>
    {auth.isLoggedIn
      && <button style={styles.button} onClick={() => signOut(actions)}>Sign Out</button>
    }
  </section>
);

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default NavigationBar;
