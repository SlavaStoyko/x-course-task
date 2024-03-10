import { Navigate, Route, Routes } from 'react-router-dom';
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
import { LS_KEYS, LocalStorageService } from './Components/localStorage/localStorage';

function App() {
  const [isAuthenticated,setisAuthenticated] = useState(!!LocalStorageService.get(LS_KEYS.USER));
  const [booklist,setBooklist] = useState(books);
 
  return (
  
    < BookListProvider value={booklist.books} >
    <Routes>
        <Route path="/" element={<LayOut islogin={setisAuthenticated} Auth={isAuthenticated}/>}>
          <Route index element={<PrivateRoutes isAuthenticated={isAuthenticated}>{isAuthenticated ? < Navigate to ="booklist"/> : < Navigate to ="login"/>} </PrivateRoutes>} />
          <Route path="/login" element={<SignIn islogin={setisAuthenticated} />}/>
          <Route path="/booklist" element={<PrivateRoutes isAuthenticated={isAuthenticated}>< BookList /></PrivateRoutes>}/>
          <Route path="/booklist/book/:author" element={<PrivateRoutes isAuthenticated={isAuthenticated}>{isAuthenticated ? <Book  /> : < Navigate to ="login"/>}</PrivateRoutes>}/>
          <Route path="/basket" element={<PrivateRoutes isAuthenticated={isAuthenticated}>{isAuthenticated ? <Basket status={true} /> : < Navigate to ="login"/>}</PrivateRoutes>}/>
          <Route path="*" element={<PrivateRoutes isAuthenticated={isAuthenticated}> {isAuthenticated ? <ErrorPage /> : < Navigate to ="login"/>}</PrivateRoutes>}/>
        </Route>
    </Routes>
    </ BookListProvider >
  );
}

export default App;
