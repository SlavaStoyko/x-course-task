import { useEffect, useState } from "react";
import { useBookList } from "../Context/use-Context";
import { useParams } from "react-router-dom";
import { LS_KEYS, LocalStorageService } from "../localStorage/localStorage";

export const useOrderBook = (counter) =>{
    const value = useBookList();
    const params = useParams();
    const book = value.find((book) => book.id == params.id);
    const [countBook,setCountbooks] = useState(counter);
    const priceforonebook = book.price;
    const [priceforbook, setPriceforbook] = useState(book.price);
    const [BookAmount,setBookAmount] = useState(book.amount);
    
    const Increment = () => {
        setCountbooks(countBook+1);
        setPriceforbook(priceforbook+priceforonebook); 
        setBookAmount(BookAmount - 1);
    }
    const Decrement = () => {
        setCountbooks(countBook-1);
        setPriceforbook(priceforbook-priceforonebook);
        setBookAmount(BookAmount + 1);
        

    }
    return {book,countBook,priceforbook,BookAmount,Increment,Decrement};

}
