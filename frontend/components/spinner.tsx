import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const Spinner = () => {
  return (
    <Dimmer page inverted active>
      <Loader size='large' active inline='centered'>
        Loading
      </Loader>
    </Dimmer>
  );
};

export default Spinner;
