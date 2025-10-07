import React from 'react';

function Prayer({ name, time }) {
  return (
    <div className='prayer'>
      <p className='time-prayer'>{time}</p>
      <p className='name-prayer'>{name}</p>
      
    </div>
  );
}

export default Prayer;
