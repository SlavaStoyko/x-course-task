import { useParams } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { useEffect,useState } from "react";
import { useBookList } from "../Context/use-Context";
import imagenotfound from '../../images/imageNotFound.png';
import './styleonebook.css';
import sprite from '../../images/sprites.svg';
import { LS_KEYS, LocalStorageService } from "../localStorage/localStorage";



export const Book = () =>{
    const value = useBookList();
    const params = useParams();
    
    const [ls, setLS]=useState(LocalStorageService.get(LS_KEYS.BOOK)|| []);
    const book = value.find((book,index) => book.author === params.author);
  
    const priceforonebook = book.price;
    const [countbooks,setCountbooks] = useState(1);
    const [priceforbook, setPriceforbook] = useState(book.price);
    useEffect(()=>{
        
        setPriceforbook(book.price)
        setCountbooks(1);
        
    },[params.id])
    useEffect (() => {
        if (countbooks < 1){
            setCountbooks(1);
            setPriceforbook(priceforonebook)
        }
        if (countbooks >= book.amount){
            setCountbooks(book.amount);
            setPriceforbook(priceforonebook * book.amount)
        }
    },[countbooks]);
    
    const Increment = () => {
        setCountbooks(countbooks+1);
        setPriceforbook(priceforbook+priceforonebook); 
    }
    const Decrement = () => {
        setCountbooks(countbooks-1);
        setPriceforbook(priceforbook-priceforonebook);
    }
    
    
    const handleAddBtnCart = (id,title,count, totalCost) => {LocalStorageService.set(LS_KEYS.BOOK,[...ls,{id,title,count,totalCost}]);}
    useEffect(()=>{
        ls.forEach(element => {
            if(element.id === book.id){
                setCountbooks(element.count);
                setPriceforbook(element.totalCost)
                
            }
        });
    },[ls])
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
                    <dt className="ord order_desctext_title">Book tags:</dt>  <dd className="ord order_desctext_parag">{book.tags.map((tagItem)=>{<p>tagItem</p>})}</dd>
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
                             <span  onClick={Increment} className="navPriceBtn" id="navPriceBtnMax">
                                <svg  width="55" height="40">
                                    <use xlinkHref={`${sprite}#up_arrow`}></use>{}
                                </svg>
                            </span>
                            <span  onClick={Decrement} className="navPriceBtn" id="navPriceBtnMin">
                                <svg width="55" height="40">
                                    <use xlinkHref={`${sprite}#down_arrow`}></use>
                                </svg>
                            </span>
                            
                            <input className="ordnumb" type="number" min = "1" max = "42" value={countbooks} id="count" name="count" /* style="border: 1px solid black;" */></input>
                        
                        </dd></div>
                        <div className="dpricce totalBook"><dt>Total price</dt><dd id="TPBS">{priceforbook.toFixed(2)}</dd></div>
                    </dl>
                    
                </div>
                <button onClick={()=>handleAddBtnCart(book.id,book.title,countbooks,priceforbook)} type="button" className="orderbtn">Add to cart</button>
            </section>
        </div>
  
    </div>
        
       
    );
}