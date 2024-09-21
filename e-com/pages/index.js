import Product from "@/components/product";
import {useEffect,useState} from "react";


export default function Home() {
  const [productsInfo, setProductInfo] = useState([]);
  useEffect(()=> {
    fetch("/api/products") 
    .then(response=>response.json())
    .then(json => setProductInfo(json.products))
    .catch(error=> console.error({error}))

  }, []);

  // console.log(productsInfo);

  const categories =[...new Set( productsInfo.map(product => product.category))];
  console.log({categories});


  return (
    <div className="py-5 px-5">
      {categories.map(category =>(
        <div key ={category} >
          <h2 className="text-2xl capitalize">{category}</h2>
          {productsInfo.filter(p=>p.category === category).map(productsInfo =>(
            <div key ={productsInfo._id}>
                <Product {...productsInfo}/>
               </div>
            
          ))}
          </div>
      ))}
      <div>
        

        <div className="py-4">
          
          </div>
        </div>
    </div>

    
    
  );
}
