import {useEffect,useState} from "react";

export default function Home() {
  const [productsInfo, setProductInfo] = useState([]);
  useEffect(()=> {
    fetch("/api/products") 
    .then(response=>response.json())
    .then(json => setProductInfo(json))
    .catch(error=> console.error({error}))

  }, []);

    console.log(productsInfo[0].category);

    




  
    // const categories = [...new Set(productsInfo.map(product => product.category))];
    // console.log(categories);


  return (
    <div className="py-5 px-5">

      <div>
        <h2 className="font-bold text-2xl">Mobiles</h2>

        <div className="py-4">
          <div className="w-64">
            <div className="bg-pink-100 p-5 rounded-xl">
              <img src ="/products/iphone.png" alt=""/>
            </div>

            <div className="mt-2">
              <h3 className="font-bold text-md ">Iphone 14 pro</h3>
            </div>

            <p className = "text-sm mt-2 leading-4">The iPhone 14 Pro redefines innovation with its stunning 6.1-inch Super Retina XDR display and the new Dynamic Island feature, offering a seamless blend of function and form. Powered by the ultra-fast A16 Bionic chip, it ensures superior performance for everything from gaming to multitasking.</p>
            <div  className = "flex mt-2">
              <div className="font-bold text-2xl grow">$899</div>
              <button className=" text-xl bg-blue-400 text-white rounded-lg py-1 px-2 ">+</button>
            </div>
          </div>
        </div>
      </div>

    </div>
    
  );
}
