import {Routes,Route} from 'react-router-dom'
import Header from './Components/Header';
import Signin from './Components/Login';
import BillGenerator from './Components/BillGenerator';
import CustomerList from './Components/CustomerList';
import Root from './Root';
import Signup from './Components/SignUp';
import NewUpdate from './Components/NewUpdate';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Signup/>}/>
      <Route path='/signin/:name' element={<Signin/>}/>
      <Route path='/home' element={<Root/>}>
         <Route index path='/home/customerlist' element={<CustomerList/>}/>
         <Route path='/home/billgenerator' element={<BillGenerator/>}/>
         <Route path='/home/NewUpdate/:id' element={<NewUpdate/>}/>
      </Route>
    </Routes>
    </>
  );
}

export default App;
