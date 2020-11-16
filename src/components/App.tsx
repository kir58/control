import React from 'react';
import { FormControler } from './FormControler';
import { Info } from './Info';

const App = () => (
  <div className="container-sm d-flex vh-100 justify-content-center align-items-center p-0">
    <div>
      <FormControler />
      <Info />
    </div>
  </div>
);

export { App };
