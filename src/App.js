import './css/style.css';
import Header from './components/header/Header'
import MessageForm from './components/messageComponent/MessageForm'
import {BrowserRouter, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header/>
        <Route exact path='/' render={() => <MessageForm/>} />
      </div>
    </BrowserRouter>
  );
}

export default App;
