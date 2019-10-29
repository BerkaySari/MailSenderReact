import React from 'react';
import './style.scss';
import MailList from '../MailList/';


function App() {
    return (
      <div id="main" className={ 'container' }>
        
        <div className={ 'col-lg-12' }>
        <MailList />
      </div>
  
      </div >
    );
  }
  
  export default App;