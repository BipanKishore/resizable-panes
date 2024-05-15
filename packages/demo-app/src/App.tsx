import React from 'react';
import './App.css';
import { ResizableDemo } from './components/resizable-demo';
import 'tailwindcss/base.css'
import Header from './components/header';
import './components/modal'

function App() {

  return (
    <div className='max-w-screen-xl mx-auto' >
      <Header />
      <div >
        <ResizableDemo />
      </div>

    </div>
  );
}

export default App;
