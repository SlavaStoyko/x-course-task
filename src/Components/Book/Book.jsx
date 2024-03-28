import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBookList } from "../Context/use-Context";

import { LS_KEYS, LocalStorageService } from "../localStorage/localStorage";

import './styleonebook.css';
import imageNotFound from '../../images/imageNotFound.png';
import sprite from '../../images/sprites.svg';

export const Book = () =>{
   
    const value = useBookList();
    const params = useParams();
    const book = value.find((book) => book.id == params.id);
    const [countBook,setCountBooks] = useState(1);
    const priceForOneBook = book.price;
    const [priceForBook, setPriceForBook] = useState(book.price);
    const [BookAmount,setBookAmount] = useState(book.amount);
    const [ls, setLS ] = useState(LocalStorageService.get(LS_KEYS.BOOK)|| []);

    useEffect(()=>{
        ls.forEach(element => {
            if(element.id === book.id){
                setCountBooks(element.count);
                setPriceForBook(element.totalCost);  
            }
        })  
    },[]);

    const Increment = () => {
        setCountBooks(countBook+1);
        setPriceForBook(priceForBook+priceForOneBook); 
        }
    const Decrement = () => {
        setCountBooks(countBook-1);
        setPriceForBook(priceForBook-priceForOneBook);
    }
    const handleAddBtnCart = (id,title,count,totalCost) => {
        
        const LS = ls.reduce ((acc,obj)=>{
            if(obj.count !== acc.count && obj.id === acc.id ){
                obj.count = acc.count;
                obj.totalCost = acc.totalCost;
                return acc;
            }else{
               return acc;
            } 
        },[{id,title,count,totalCost},...ls])
        
        const filterBookCart = LS.reduce((accumulator, current) => {
            if (!accumulator.find((item) => item.id === current.id)) {
              accumulator.push(current);
            }
            return accumulator;
          }, []);
        
              LocalStorageService.set(LS_KEYS.BOOK,filterBookCart);
        }

   return (
       <div className="container">
           
            <div className="main">
            
            <section className="descriptionBook">
                <h2 className="visibility-hidden">Book list page</h2>
                <div className="descriptionBook_part1">
                    <div className="desc_img"> <img src={book.image ? book.image : imageNotFound }  alt="book websocket"></img></div>
                 <div className="desc_text">
                    <dl className="order_desc_text">
                    <dt className="ord order_desc_text_title">Book name:</dt>  <dd className="ord order_desc_text_chapter">{book.title}</dd>
                    <dt className="ord order_desc_text_title">Book author:</dt> <dd className="ord order_desc_text_chapter">{book.author}</dd>
                    <dt className="ord order_desc_text_title">Book level:</dt> <dd className="ord order_desc_text_chapter">{book.level}</dd>
                    <dt className="ord order_desc_text_title">Book tags:</dt>  <dd className="ord order_desc_text_chapter">{book.tags}</dd>
                    </dl>
                    </div>
                </div>
                <div className="descriptionBook_part2">
                    <dl className="order_desc_text" >
                        <dt className="ord order_desc_text_title">Description:</dt>  <dd className="ord order_desc_text_chapter" >{book.description}</dd>
                    </dl>
                </div>
            </section>
     
        
            <section className="orderBlock">
                <h2 className="visibility-hidden">Add to cart</h2>
                <div className="orderContainer">
                    <dl>
                        <div className="orderDescription oneBook"><dt>Price, $</dt><dd>{book.price}</dd></div>
                        <div className="orderDescription setPlaceArrow"><dt><label htmlFor="count" id="label">Count</label></dt><dd>
                             <button disabled={countBook >= BookAmount } type="button"  onClick={Increment} className="navPriceBtn" id="navPriceBtnMax">
                                <svg  width="55" height="40">
                                    <use xlinkHref={`${sprite}#up_arrow`}></use>
                                </svg>
                            </button>
                            <button disabled={countBook <= 1} type="button"  onClick={Decrement} className="navPriceBtn" id="navPriceBtnMin">
                                <svg width="55" height="40">
                                    <use xlinkHref={`${sprite}#down_arrow`}></use>
                                </svg>
                            </button>
                            
                            <input className="inputView" type="number" min = "1" max = "42" value={countBook} id="count" name="count" ></input>
                        
                        </dd></div>
                        <div className="orderDescription totalBook"><dt>Total price</dt><dd id="TPBS">{priceForBook.toFixed(2)}</dd></div>
                    </dl>
                    
                </div>
                <button onClick={()=>{handleAddBtnCart(book.id,book.title,countBook,priceForBook)}}  type="button" className="orderBtn">Add to cart</button>
            </section>
        </div>
  
    </div> 
        );
}