import React from 'react';
import {Routes, Route} from "react-router-dom"
import AppartmentListProvider from './context/appartmentsList'

// Components imports
import AppartmentList from './screens/appartmentList';

function App() {
  return (
    <div className="flex justify-center items-center">
      
      <AppartmentListProvider>  
      <Routes>
        <Route path='/' element={<AppartmentList/>}/>
        <Route path="/pk/appartment-details" />
      </Routes>
      </AppartmentListProvider>

    </div>
  );
}

export default App;
