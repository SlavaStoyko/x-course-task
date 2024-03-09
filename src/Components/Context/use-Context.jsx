import {createContext, useContext} from 'react';
export const BookListContext = createContext(null) ;
export const BookListProvider = BookListContext.Provider;
export const useBookList = () => useContext(BookListContext);