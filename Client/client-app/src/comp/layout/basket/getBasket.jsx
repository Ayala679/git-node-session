import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { Badge } from 'primereact/badge';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import basket1 from '../../../pics/basket.png';
import basket2 from '../../../pics/ikea_basket.png';
import back from '../../../pics/back_login.webp'
import { Image } from 'primereact/image';
import { Link } from "react-router-dom";


const GetBasket = () => {

    const [basket, setBasket] = useState([]);
    const token = localStorage.getItem('token')
    const [flag, setFlag] = useState(false)
    const [value,setValue] = useState(0)
    const { _id } = JSON.parse(atob(token.split('.')[1]))
    useEffect(() => {
        getBasket()
    }, [])

    const getBasket = async () => {

        try {
            const { data } = await axios.get(`http://localhost:1135/api/basket/${_id}`, { headers: { Authorization: `Bearer ${token}` } })
            console.log(data);
            
            const basketArray = data.filter((b) => {
                if (b.product === null )
                    deleteFromBasket(b)
                return (b.product != null )
            })
            setFlag(true)
            setBasket(basketArray)

        }
        catch (err) {
            if(err.status === 400)
            {
                setFlag(false)
            }
        }

    }

    const deleteFromBasket = async (order) => {
        try {
            
            const deleted = await axios.delete(`http://localhost:1135/api/basket/${order.customer}/${order.product._id}`, { headers: { Authorization: `Bearer ${token}` } })
            setValue(value+1)
            getBasket()
        }
        catch (err) {

        }
    }

    const updateProduct = async(sign,id,amount,order)=>{
        const num = sign==="+" ?1:-1
        try{
            const updated = await axios.put(`http://localhost:1135/api/basket/${_id}/${id}/${num}`, {},{ headers: { Authorization: `Bearer ${token}` } })            
            if(amount+num <= 0)
                await deleteFromBasket(order)
            getBasket()

        }
        catch(err){
         
        }
        
    }

    const itemTemplate = (product, amount, index,order) => {
        return (
            <div className="col-12 m-4 w-11 " style={{minHeight:"full", height:"100%"}} key={product._id} >
            <style>
                {`.p-dataview .p-dataview-content
                    {
                        background: transparent !important;
                    }`
                }
            </style>
                <div  className={classNames('flex flex-column md:flex-row sm:mr-7 xl:align-items-start p-4 border-round-3xl')}  style={{backgroundColor: 'rgba(255, 255, 255, 0.59)', backdropFilter: 'blur(7px)', WebkitBackdropFilter: 'blur(7px)'}}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-2 border-round-3xl " style={{border:"1px solid rgb(12,150,174)"}} src={`http://localhost:1135/images/${product.category}/${product.picture[0]}`} alt={product.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 " >
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <Link to={`/product/:${product._id}`} className="no-underline text-color ">
                                <div className="text-2xl font-bold text-900">{product.name}</div>
                                <h5>{product.description}</h5>
                                <div className="flex align-items-center gap-3">
                                    <span className="flex align-items-center gap-2">
                                        <i className="pi pi-tag"></i>
                                        <span className="font-semibold">{product.category}</span>
                                    </span>
                                </div>
                            </Link>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">&#8362;{product.price}</span>
                        </div>
                        <div className="flex gap-3">
                            <Button icon="pi pi-plus" className="text-color" rounded text aria-label="Filter" onClick={()=>{updateProduct("+",product._id,amount,order)}}/>
                            <Badge value={amount} size="xlarge" className="text-color" style={{backgroundColor:"transparent"}}></Badge>
                            <Button icon="pi pi-minus" className="text-color" rounded text aria-label="Filter" onClick={()=>{updateProduct("-",product._id,amount,order)}}/>

                        </div>
                        <Button icon="pi pi-trash"  style={{backgroundColor:"rgb(241,213,2)"}} className="border-0" onClick={(e)=>{confirm(e,order)}} rounded severity="success" />
                        
                    </div>
                    
                </div>
            </div>
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((order, index) => {
            setValue(order.amount)
            return itemTemplate(order.product, order.amount, index,order);

        });

        return <div className="grid grid-nogutter">{list}</div>;
    };


    const toast = useRef(null);

    const accept = (order) => {
        deleteFromBasket(order)
        toast.current.show({ summary: 'מחיקה', detail: 'המוצר נמחק בהצלחה', life: 3000 });
    };

    const reject = () => {
        toast.current.show({ summary: 'ביטול מחיקה', detail: 'המחיקה של המוצר בוטלה', life: 3000 });
    };

    const confirm = (event,order) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'האם אתה בטוח שברצונך למחוק מוצר זה מהסל?',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept:()=>accept(order),
            reject
        });
    };

    return (
        <div className="flex flex-column justify-content-center align-items-center bg-cover bg-no-repeat"  style={{backgroundImage:`url(${back})`,direction:"rtl", backgroundPosition: 'center',backgroundAttachment: 'fixed'}}>
            {flag?
            <>
                <h1>סל הקניות שלך</h1>
                <Toast ref={toast} />
                <ConfirmPopup />
                <DataView className="" value={basket} listTemplate={listTemplate} />
            </>:
            

            <div className="flex flex-column align-items-center justify-content-center border-1 border-white border-round-3xl p-5 m-5 w-7" style={{ backgroundColor: 'rgba(255, 255, 255, 0.59)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)'}}>
                <img src={basket1} height="200" className=" mr-2"/>
                <h1>סל הקניות שלך עדיין ריק...</h1>
                <p>נראה שהגן שלך עוד מחכה להתחדשות.<br/>
                הסל שלך מחכה בשקט, עם מקום פנוי לשולחן עץ מפנק, כיסא נוח לשבת בו מול השקיעה, או אולי אפילו ערסל חלומות...<br/><br/>
                 לבחור פריט אחד שיכניס חיים חדשים למרפסת, לחצר או לגג.<br/>
                ב־<b>IKEA</b> תמצא כל מה שצריך כדי להפוך את החוץ שלך למקום שתאהב להיות בו – כל יום, כל עונה.</p>
                <b> יש לך טעם. עכשיו רק נשאר לבחור.</b>
                <img src={basket2} height="30" className=" mr-2"/>

            </div>}


        </div>
    )

}

export default GetBasket