import { Link } from "react-router-dom"
import { Image } from 'primereact/image';
// import './ScrollPanelDemo.css';
const Categories = ()=>{
    const cat = ["גן ומרפסת","שמשיות ופתרונות הצללה","אדניות ועציצים","מטבח חוץ ואביזרים","אביזרים לגינה","תאורת גינה וחוץ"]

    return (
        <>
        <div className=" overflow-x-auto border-white border-1 border-round-3xl mb-3 p-3" style={{direction:"rtl",padding:"10px", marginTop:"100px", marginRight:"30px",marginLeft:"30px", backgroundColor: 'rgba(255, 255, 255, 0.59)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)'}}>
            <div className="inline-flex justify-content-center px-4 gap-8 " >
                <Link className="hover:underline" to='/products' style={{textDecoration:"none", color:"black", hover:{}}}>
                    <Image src={`http://localhost:1135/images/ריהוט גן ואביזרים.png`} alt="Image" width={70} />
                    <p>לכל המוצרים</p>
                </Link>
                <hr></hr>
                {cat.map((c)=>{
                    return (
                        <Link to={`/productByCategory/${c}`} className="hover:underline" style={{textDecoration:"none", color:"black"}}>
                            <Image src={`http://localhost:1135/images/${c}.png`} alt="Image" width={70} />
                            <p>{c}</p>
                        </Link>
                    )
                })}
            </div>
        </div>

        </>
    )
}
export default Categories
