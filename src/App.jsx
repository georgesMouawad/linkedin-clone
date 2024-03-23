import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import './App.css';
import './styles/utilities.css';
import './styles/colors.css'

function App() {
  return (
    <div className="app flex column center ">
      <Header/>
      <div className="app-body flex">
        <Sidebar/>

      </div>
    </div>
  );
}

export default App;
