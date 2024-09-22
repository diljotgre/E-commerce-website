import { ProductsContext } from "./ProductContext";
import { useContext } from "react";

export default function Product({_id, name, price, description, picture}){
  const {setSelectedProducts}= useContext(ProductsContext);
  function addProduct() {
    setSelectedProducts(prev=>[...prev, _id]);

  }
    return (
        <div className="w-64 mt-2">
            <div className="bg-pink-100 p-5 rounded-xl">
              <img src ={picture} alt=""/>
            </div>

            <div className="mt-2">
              <h3 className="font-bold text-md text-pink-900 ">{name}</h3>
            </div>

            <p className = "text-sm mt-2 leading-4 text-gray-400">{description}</p>
            <div  className = "flex mt-2">          
              <div className="font-bold text-2xl grow text-pink-900">${price}</div>  
              <button onClick={addProduct} className="bg-pink-400 text-white py-1 px-3 rounded-xl">+</button>        
             
            </div>
        </div>
    );
}

