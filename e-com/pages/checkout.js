import Layout from "@/components/layout";
import { ProductsContext } from "@/components/ProductContext";
import { useContext, useState, useEffect } from "react";

export default function CheckoutPage(){
    const {selectedProducts, setSelectedProducts} =useContext(ProductsContext);
    const [ProductsInfo, setProductsInfo] = useState([]);

    const [address, setAddress]=useState('');
    const [city, setCity] =useState('');
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');

    useEffect(()=>{
        const uniqueIds = [...new Set(selectedProducts)];
        fetch('/api/products?ids='+uniqueIds.join(","))
        .then(response=>response.json())
        .then(json=> setProductsInfo(json));
    }, [selectedProducts]);
    

    function moreProduct(id){
        setSelectedProducts(prev => [...prev, id]);
    }

    function lessProduct(id){
        const pos = selectedProducts.indexOf(id);
        if (pos !== -1){
            
            setSelectedProducts(prev => {
                return selectedProducts.filter((value,index)=> index !==pos )
            });
        }
    }
    // console.log({ProductsInfo});
    const deliveryPrice = 5
    let subtotal = 0;
    if (selectedProducts?.length && ProductsInfo?.length){
        for (let id of selectedProducts){
            const prod = ProductsInfo.find(p=>p._id === id);
            // console.log(prod.price);
            subtotal += prod.price;
        }
    }

    const total = subtotal + deliveryPrice;
    return(
        <Layout>
            {/* {!ProductsInfo.length && (
                <div> No products were added to the shopping cart</div>
            )} */}
            {ProductsInfo.length && ProductsInfo.map((productInfo) =>(
                <div className="flex mb-5">
                    <div className="w-24 bg-pink-100 p-5 rounded-xl mt-2">
                        <img src={productInfo.picture} alt =""/>
                    </div>
                    <div className="pl-4 w-80 ">
                        <h3 className="font-bold text-lg text-pink-900">{productInfo.name}</h3>
                        <p className="text-sm text-gray-400">{productInfo.description}</p>
                        <div className="flex">
                            <div className="font-bold grow">${productInfo.price}</div>
                            <div>
                                <button onClick={()=>lessProduct(productInfo._id)} className ="border border-pink-400 px-2 rounded-lg text-pink-400">-</button>
                                <span className="px-2">
                                {selectedProducts.filter(id=>id === productInfo._id).length}
                                </span>
                                <button onClick={()=> moreProduct(productInfo._id)} className ="border border-pink-400 px-2 rounded-lg text-pink-400">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <form action="/api/checkout" method = "POST">
                <div className="flex flex-col" >
                    <input name = "address" value = {address}  onChange={e=> setAddress(e.target.value)} className="w-60 bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Street address, number"/>
                    <input name = "city" value ={city}      onChange={e=> setCity(e.target.value)} className="w-60 bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="City and Postal Code"/>
                    <input name = "name" value ={name}      onChange={e=> setName(e.target.value)} className="w-60 bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Name"/>
                    <input  name="email" value = {email}   onChange={e=> setEmail(e.target.value)} className="w-60 bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="email" placeholder="Email"/>
                </div>
                <div className="mt-4">
                <div className="flex ">
                    <h3 className="grow font-bold text-gray-400">Subtotal:</h3>
                    <h3  className="font-bold">${subtotal}</h3>

                </div>
                <div className="flex ">
                    <h3 className="grow font-bold text-gray-400">Delivery:</h3>
                    <h3 className="font-bold">${deliveryPrice}</h3>

                </div>
                <div className="flex ">
                    <h3 className="grow font-bold text-gray-400">Total:</h3>
                    <h3  className="font-bold">${total}</h3>

                </div>
                </div>
                
                <input type="hidden" name="products" value={selectedProducts.join(',')}/>

                <button className="bg-pink-900 text-white py-1 px-7 rounded-sm mt-5 w-full font-bold shadow-pink-200 shadow-lg text-lg p-8">Pay </button>
            </form>
        </Layout>

    );
}