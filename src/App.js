import { Navigate, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import { LayOut } from "./Components/LayOut/LayOut";
import { BookList } from "./Components/BookList/BookList";
import { SignIn } from "./Components/SignIn/SignIn";
import { Book } from "./Components/Book/Book";
import { Basket } from "./Components/Basket/Basket";
import { PrivateRoutes } from './Components/privateRoutes/PrivateRoutes';
import { useEffect, useState } from 'react';
import { getBookList } from './Components/api/API';
import { BookListProvider } from './Components/Context/use-Context';
import { ErrorPage } from './Components/errorpage/ErrorPage';
import books from "./Components/api/books.json";
import { LocalStorageService } from './Components/localStorage/localStorage';
function App() {

  const [isAuthenticated,setisAuthenticated] = useState(false);
  const [booklist,setBooklist] = useState(books);
  return (
    < BookListProvider value={booklist.books} >
    <Routes>
        <Route path="/" element={<LayOut islogin={setisAuthenticated} Auth={isAuthenticated}/>}>
          <Route index element={<PrivateRoutes isAuthenticated={isAuthenticated}>< Navigate to ="booklist"/></PrivateRoutes>} />
          <Route path="/login" element={<SignIn islogin={setisAuthenticated} />}/>
          <Route path="/booklist" element={<PrivateRoutes isAuthenticated={isAuthenticated}>< BookList /></PrivateRoutes>}/>
          <Route path="/booklist/book/:author" element={<PrivateRoutes isAuthenticated={isAuthenticated}><Book  /></PrivateRoutes>}/>
          <Route path="/basket" element={<PrivateRoutes isAuthenticated={isAuthenticated}><Basket status={true} /></PrivateRoutes>}/>
          <Route path="*" element={<PrivateRoutes isAuthenticated={isAuthenticated}><ErrorPage /></PrivateRoutes>}/>
        </Route>
    </Routes>
    </ BookListProvider >
  );
}

export default App;
