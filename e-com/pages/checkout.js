import Layout from "@/components/layout";
import { ProductsContext } from "@/components/ProductContext";
import { useContext, useState, useEffect } from "react";

export default function CheckoutPage(){
    const {selectedProducts} =useContext(ProductsContext);
    const [ProductsInfo, setProductsInfo] = useState([]);
    useEffect(()=>{
        const uniqueIds = [...new Set(selectedProducts)];
        fetch('/api/products?ids='+uniqueIds.join(","))
        .then(response=>response.json())
        .then(json=> setProductsInfo(json));
    }, [selectedProducts]);
    console.log({ProductsInfo});
    return(
        <Layout>
            {{ProductsInfo}}
        </Layout>

    );
}