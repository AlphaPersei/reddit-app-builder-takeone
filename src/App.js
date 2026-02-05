

import Header from './components/Header/Header';
import Reddit from './features/reddit/Reddit';
import BackToTop from './components/BackToTop/BackToTop';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Reddit />
      </main>
      <BackToTop /> {/* It's always listening! */}
    </div>
  );
}

export default App;



/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
