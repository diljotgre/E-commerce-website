import Product from "@/components/product";
import {useEffect,useState} from "react";
import { findAllProducts } from "./api/products";
import { initdb } from "@/lib/mongoose";
import Footer from "@/components/footer";
import Layout from "@/components/layout";


export default function Home({products}) {
  // const [productsInfo, setProductInfo] = useState([]);
  const [phrase, setPhrase] = useState('');
  // useEffect(()=> {
  //   fetch("/api/products") 
  //   .then(response=>response.json())
  //   .then(json => setProductInfo(json.products))
  //   .catch(error=> console.error({error}))

  // }, []);

  // console.log(productsInfo);

  const categories =[...new Set( products.map(product => product.category))];
  console.log({categories});
  // let products;

  if (phrase){
    products = products.filter(p=>p.name.toLowerCase().includes(phrase));
  } 

  return (
    <Layout>
      <input value={phrase} onChange={e=> setPhrase(e.target.value)} type="text" placeholder="Search" className ="bg-gray-100 w-full py-2 px-4 rounded-xl text-"/>
      {categories.map(category =>(
        <div key ={category} className ="my-5" >
          {products.find(p=>p.category==category)&&(
            <div>
              <h2 className="text-2xl capitalize font-bold text-gray-400 ">{category}</h2>
              <div className="flex -mx-5 overflow-x-scroll snap-x">
          {products.filter(p=>p.category === category).map(productsInfo =>(
            
            <div key ={productsInfo._id} className="px-8 py-5">
                <Product {...productsInfo}/>
               </div>
            
          ))}
          </div>
              </div>
          )}
          
          
          </div>
      ))}
      
    </Layout>

    
    
  );
}


export async function getServerSideProps(){
  await initdb();
  const products= await findAllProducts();
  return{
    props: {
      products: JSON.parse(JSON.stringify(products)),

    },

    
  
  }
}