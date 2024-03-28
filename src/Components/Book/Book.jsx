import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBookList } from "../Context/use-Context";

import { LS_KEYS, LocalStorageService } from "../localStorage/localStorage";

import './styleonebook.css';
import imagenotfound from '../../images/imageNotFound.png';
import sprite from '../../images/sprites.svg';

export const Book = () =>{
   
    const value = useBookList();
    const params = useParams();
    const book = value.find((book) => book.id == params.id);
    const [countBook,setCountbooks] = useState(1);
    const priceforonebook = book.price;
    const [priceforbook, setPriceforbook] = useState(book.price);
    const [BookAmount,setBookAmount] = useState(book.amount);
    const [ls, setLS ] = useState(LocalStorageService.get(LS_KEYS.BOOK)|| []);
    const [isBtnActive,setIsBtnActive] = useState(false);

    useEffect(()=>{
        ls.forEach(element => {
            if(element.id === book.id){
                setCountbooks(element.count);
                setPriceforbook(element.totalCost);  
            }
        })  
    },[]);

    const Increment = () => {
        setCountbooks(countBook+1);
        setPriceforbook(priceforbook+priceforonebook); 
        }
    const Decrement = () => {
        setCountbooks(countBook-1);
        setPriceforbook(priceforbook-priceforonebook);
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
        
        const FILTERBOOKCART = LS.reduce((accumulator, current) => {
            if (!accumulator.find((item) => item.id === current.id)) {
              accumulator.push(current);
            }
            return accumulator;
          }, []);
        
              LocalStorageService.set(LS_KEYS.BOOK,FILTERBOOKCART);
        }

   return (
       <div className="container">
           
            <div className="main">
            
            <section className="descriptionbook">
                <h2 className="visibility-hidden">Book list page</h2>
                <div className="descriptionbook_part1">
                    <div className="descimg"> <img src={book.image ? book.image : imagenotfound }  alt="book websocket"></img></div>
                 <div className="desctext">
                    <dl className="order_desctext">
                    <dt className="ord order_desctext_title">Book name:</dt>  <dd className="ord order_desctext_parag">{book.title}</dd>
                    <dt className="ord order_desctext_title">Book autor:</dt> <dd className="ord order_desctext_parag">{book.author}</dd>
                    <dt className="ord order_desctext_title">Book level:</dt> <dd className="ord order_desctext_parag">{book.level}</dd>
                    <dt className="ord order_desctext_title">Book tags:</dt>  <dd className="ord order_desctext_parag">{book.tags}</dd>
                    </dl>
                    </div>
                </div>
                <div className="descriptionbook_psart2">
                    <dl className="order_desctext" >
                        <dt className="ord order_desctext_title">Description:</dt>  <dd className="ord order_desctext_parag" >{book.description}</dd>
                    </dl>
                </div>
            </section>
     
        
            <section className="orderblock">
                <h2 className="visibility-hidden">Add to cart</h2>
                <div className="orderconteiner">
                    <dl>
                        <div className="dpricce oneBook"><dt>Price,$</dt><dd id="priceforbook">{book.price}</dd></div>
                        <div className="dpricce setPlaseArrow"><dt><label htmlFor="count" id="label">Count</label></dt><dd>
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
                            
                            <input className="ordnumb" type="number" min = "1" max = "42" value={countBook} id="count" name="count" ></input>
                        
                        </dd></div>
                        <div className="dpricce totalBook"><dt>Total price</dt><dd id="TPBS">{priceforbook.toFixed(2)}</dd></div>
                    </dl>
                    
                </div>
                <button onClick={()=>{handleAddBtnCart(book.id,book.title,countBook,priceforbook)}}  type="button" className="orderbtn">Add to cart</button>
            </section>
        </div>
  
    </div> 
        );
}