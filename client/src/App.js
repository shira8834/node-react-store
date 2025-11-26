import './App.css';
import {BrowserRouter as router, Routes, Route} from "react-router-dom"
import Layot from './component/Layot';
import Header from './component/Header';
import { HomePage } from './component/HomePage';
import Register from './component/user/Register';
import LogIn from './component/user/LogIn';
import CardProd from './component/prod/CardProd';
import AddProd from './component/prod/AddProd';
import NewProd from './component/prod/NewProd';
import UpdateProd from './component/prod/UpdateProd';
import Bag from './component/bag/Bag';
// import 'primereact/resources/themes/lara-light-indigo/theme.css'; // ערכת נושא
// import 'primereact/resources/primereact.min.css'; // סגנון בסיסי של PrimeReact
// import 'primeicons/primeicons.css'; // אייקונים


function App() {
  return (
    <div className="App">
       {/* <h1>hello</h1> */}
          <Routes>
           <Route path='/' element={<Layot/>}> 
          <Route path='prod' element={<Header />} />
           <Route path='' element={<HomePage />} /> 
          <Route path='register' element={<Register />} /> 
          <Route path='login' element={<LogIn />} /> 
          <Route path='card' element={<CardProd />} /> 
        <Route path='prod/add' element={<AddProd/>} />
        <Route path='add' element={<NewProd/>} />
        <Route path='update' element={<UpdateProd/>} />
        <Route path='bag' element={<Bag/>} />
          {/* <Route path='user/add' element={<AddUser/>} /> */}
          {/* <Route path='login' element={<LogIn/>} /> */}

        </Route>
      </Routes>
    </div>
  );
}

export default App;
