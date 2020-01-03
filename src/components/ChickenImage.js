import react from 'react';

import React from 'react';

export default React.forwardRef((props, ref) => {
  
  return <img className='chickenImg' src={require('../images/chicken1.jpg') } alt='chicken walking' height='120px' width='120px' ref={ref}/>;
});