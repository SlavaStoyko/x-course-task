import { useEffect, useState } from "react";
import imagenotfound from '../../images/imageNotFound.png';
import './styleonebook.css';
import sprite from '../../images/sprites.svg';
import { useOrderBook,useLSCart } from "../orderBook/useOrderBook";
import { LS_KEYS, LocalStorageService } from "../localStorage/localStorage";



export const Book = () =>{
   
    const {book,countBook,priceforbook,BookAmount,Increment,Decrement} = useOrderBook(1);
    const [ls, setLS ] = useState(LocalStorageService.get(LS_KEYS.BOOK)|| []);
    const [isBtnActive,setIsBtnActive] = useState(false);
    useEffect(()=>{
        const storage = ls;
        
            storage.find((item)=>{
                 if(item.id == book.id){
            
                    if(countBook >  item.remainingBooks || countBook <  item.remainingBooks){
                        console.log(countBook);
                        console.log(item.remainingBooks);
                        setIsBtnActive(true);
                    }
                    if(countBook >  item.remainingBooks || countBook < item.remainingBooks ){
                        setIsBtnActive(false);
                    }
                    
                
            }
        })
        
    
                 
    },[BookAmount])
    
    const handleAddBtnCart = (id,title,count,totalCost,remainingBooks) => {LocalStorageService.set(LS_KEYS.BOOK,[...ls,{id,title,count,totalCost,remainingBooks}]);}





   
    
    return (
        
       
        
        <div className="container">
           
            <div className="main">
            
            <section className="descriptionbook">
                <h2 className="visibility-hidden">Book list page</h2>
                <div className="descriptionbook_part1">
                    <div className="descimg"> <img src={book.image ? book.image : imagenotfound } /* style="width:100%" */ alt="book websocket"></img></div>
                 <div className="desctext">
                    <dl className="order_desctext" /* style="margin: 0px;" */>
                    <dt className="ord order_desctext_title">Book name:</dt>  <dd className="ord order_desctext_parag">{book.title}</dd>
                    <dt className="ord order_desctext_title">Book autor:</dt> <dd className="ord order_desctext_parag">{book.author}</dd>
                    <dt className="ord order_desctext_title">Book level:</dt> <dd className="ord order_desctext_parag">{book.level}</dd>
                    <dt className="ord order_desctext_title">Book tags:</dt>  <dd className="ord order_desctext_parag">{book.tags}</dd>
                    </dl>
                    </div>
                </div>
                <div className="descriptionbook_psart2">
                    <dl className="order_desctext" /* style="margin: 0px;" */>
                        <dt className="ord order_desctext_title">Description:</dt>  <dd className="ord order_desctext_parag" /* style="text-justify: inter-cluster;" */>{book.description}</dd>
                    </dl>
                </div>
            </section>
     
        
            <section className="orderblock">
                <h2 className="visibility-hidden">Add to cart</h2>
                <div className="orderconteiner">
                    <dl>
                        <div className="dpricce oneBook"><dt>Price,$</dt><dd id="priceforbook">{book.price}</dd></div>
                        <div className="dpricce setPlaseArrow"><dt><label htmlFor="count" id="label">Count</label></dt><dd /* style="display: flex;" */>
                             <button disabled={isBtnActive} type="button"  onClick={Increment} className="navPriceBtn" id="navPriceBtnMax">
                                <svg  width="55" height="40">
                                    <use xlinkHref={`${sprite}#up_arrow`}></use>
                                </svg>
                            </button>
                            <button disabled={isBtnActive} type="button"  onClick={Decrement} className="navPriceBtn" id="navPriceBtnMin">
                                <svg width="55" height="40">
                                    <use xlinkHref={`${sprite}#down_arrow`}></use>
                                </svg>
                            </button>
                            
                            <input className="ordnumb" type="number" min = "1" max = "42" value={countBook} id="count" name="count" /* style="border: 1px solid black;" */></input>
                        
                        </dd></div>
                        <div className="dpricce totalBook"><dt>Total price</dt><dd id="TPBS">{priceforbook.toFixed(2)}</dd></div>
                    </dl>
                    
                </div>
                <button onClick={()=>{handleAddBtnCart(book.id,book.title,countBook,priceforbook,BookAmount)}}  type="button" className="orderbtn">Add to cart</button>
            </section>
        </div>
  
    </div>
        
       
        );
}
/*  <span  onClick={Increment} className="navPriceBtn" id="navPriceBtnMax">
                                <svg  width="55" height="40">
                                    <use xlinkHref={`${sprite}#up_arrow`}></use>
                                </svg>
                            </span> */
 /*  useEffect(()=>{
        
     setPriceforbook(book.price)
        setCountbooks(1);
        
    },[params.id])
    useEffect (() => {
          if (countbooks === (book.amount - BookAmount) ||  countbooks < 1){
              setIsBtnActive(true)
        }
          
       
    },[countbooks]);
    
    

    const handleAddBtnCart = (id,title,count, totalCost) => {LocalStorageService.set(LS_KEYS.BOOK,[...ls,{id,title,count,totalCost}]);}
    useEffect(()=>{
        ls.forEach(element => {
            if(element.id === book.id){
                setCountbooks(element.count);
                setPriceforbook(element.totalCost)
                
            }
        });
    },[ls])
    
    
    
    
    
    */