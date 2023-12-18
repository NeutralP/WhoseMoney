import React, { useState } from 'react';

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    display: 'table',
    height: 15,
    width: '100%',
    backgroundColor: '#e0e0de',
    borderRadius: 50,
    margin: 5,
  };

  const fillerStyles = {
    display: 'table',
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'center',
    justifyContent: 'center',
  };

  const labelStyles = {
    color: 'white',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
