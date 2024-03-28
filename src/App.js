import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LS_KEYS, LocalStorageService } from './Components/localStorage/localStorage';
import {PrivateRoutes, BookListProvider, LayOut, SignIn, BookList, Book, Basket, ErrorPage } from "./Components/index";
import books from "./Components/api/books.json";
function App() {
  const [isAuthenticated,setisAuthenticated] = useState(!!LocalStorageService.get(LS_KEYS.USER));
  const [booklist,setBooklist] = useState(books);
 
  return (
  <>
    < BookListProvider value={booklist.books} >
    <Routes>
        <Route path="/" element={<LayOut islogin={setisAuthenticated} Auth={isAuthenticated}/>}>
          <Route index element={<PrivateRoutes isAuthenticated={isAuthenticated}>{isAuthenticated ? < Navigate to ="booklist"/> : < Navigate to ="login"/>} </PrivateRoutes>} />
          <Route path="/login" element={<SignIn islogin={setisAuthenticated} />}/>
          <Route path="/booklist" element={<PrivateRoutes isAuthenticated={isAuthenticated}>< BookList /></PrivateRoutes>}/>
          <Route path="/booklist/book/:id" element={<PrivateRoutes isAuthenticated={isAuthenticated}>{isAuthenticated ? <Book  /> : < Navigate to ="login"/>}</PrivateRoutes>}/>
          <Route path="/basket" element={<PrivateRoutes isAuthenticated={isAuthenticated}>{isAuthenticated ? <Basket status={true} /> : < Navigate to ="login"/>}</PrivateRoutes>}/>
          <Route path="*" element={<PrivateRoutes isAuthenticated={isAuthenticated}> {isAuthenticated ? <ErrorPage /> : < Navigate to ="login"/>}</PrivateRoutes>}/>
        </Route>
    </Routes>
    </ BookListProvider >
    
    </>
  );
}

export default App;
