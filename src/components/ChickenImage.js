import react from 'react';

import React from 'react';

export default React.forwardRef((props, ref) => {
  
  return <img src={require('../chicken1.jpg') } alt='chicken walking' height='120px' width='120px' ref={ref}/>;
});