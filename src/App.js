import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LS_KEYS, LocalStorageService } from './Components/localStorage/localStorage';
import {PrivateRoutes, BookListProvider, LayOut, SignIn, BookList, Book, Basket, ErrorPage } from "./Components/index";
import books from "./Components/api/books.json";
function App() {
  const [isAuthenticated,setIsAuthenticated] = useState(!!LocalStorageService.get(LS_KEYS.USER));
  const [bookList,setBookList] = useState(books);
 
  return (
  <>
    < BookListProvider value={bookList.books} >
    <Routes>
        <Route path="/" element={<LayOut isLogin={setIsAuthenticated} Auth={isAuthenticated}/>}>
          <Route index element={<PrivateRoutes isAuthenticated={isAuthenticated}>{isAuthenticated ? < Navigate to ="BookList"/> : < Navigate to ="login"/>} </PrivateRoutes>} />
          <Route path="/login" element={<SignIn isLogin={setIsAuthenticated} />}/>
          <Route path="/BookList" element={<PrivateRoutes isAuthenticated={isAuthenticated}>< BookList /></PrivateRoutes>}/>
          <Route path="/BookList/book/:id" element={<PrivateRoutes isAuthenticated={isAuthenticated}>{isAuthenticated ? <Book  /> : < Navigate to ="login"/>}</PrivateRoutes>}/>
          <Route path="/basket" element={<PrivateRoutes isAuthenticated={isAuthenticated}>{isAuthenticated ? <Basket /> : < Navigate to ="login"/>}</PrivateRoutes>}/>
          <Route path="*" element={<PrivateRoutes isAuthenticated={isAuthenticated}> {isAuthenticated ? <ErrorPage /> : < Navigate to ="login"/>}</PrivateRoutes>}/>
        </Route>
    </Routes>
    </ BookListProvider >
    
    </>
  );
}

export default App;
