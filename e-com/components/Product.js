export default function Product({name, price, description, picture}){
    return (
        <div className="w-64 mt-2">
            <div className="bg-pink-100 p-5 rounded-xl">
              <img src ={picture} alt=""/>
            </div>

            <div className="mt-2">
              <h3 className="font-bold text-md ">{name}</h3>
            </div>

            <p className = "text-sm mt-2 leading-4">{description}</p>
            <div  className = "flex mt-2">
                
               
              <div className="font-bold text-2xl grow">{price}</div>
              
              <button className="text-xl bg-blue-400 text-white rounded-lg py-1 px-2 ">+</button>
            </div>
        </div>
    );
}