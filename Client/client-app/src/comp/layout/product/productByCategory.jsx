import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddProduct from './addProduct';
import UpdateProduct from './updateProduct';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Tooltip } from 'primereact/tooltip';
import { Toast } from 'primereact/toast';
import back from '../../../pics/back_login.webp'
import { Image } from 'primereact/image';
import { setRole } from "../../../redux/userSlice";

const ProductByCategory = ()=>{
    const role2 = useSelector(state => state.userSlice.role)
    const token = localStorage.getItem('token')
    const { role } = JSON.parse(atob(token.split('.')[1]))
    const [products, setProducts] = useState([])
    const [visible, setVisible] = useState(false)
    const [currentProduct, setCurrentProduct] = useState({})
    const [product, setProduct] = useState({})
    const dispatch = useDispatch()
    const {category} = useParams()

    useEffect(() => {
        dispatch(setRole(role))
        getByCategory()
    }, [category])


    const getByCategory = async () => {
        
        try{
            const { data } = await axios.get(`http://localhost:1135/api/product/sort/${category}`)
            setProducts(data)
        }
        catch(err){

        }

    }


    const deleteProduct = async (id) => {
        try {
            const token = localStorage.getItem('token')
            const deleted = await axios.delete(`http://localhost:1135/api/product/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            getByCategory()
        }
        catch (err) {

        }
    }
    const addToBasket = async (product) => {
        const { _id } = JSON.parse(atob(token.split('.')[1]))
        try {
            const productInBasket = await axios.post(`http://localhost:1135/api/basket/${_id}/${product._id}`, {}, { headers: { Authorization: `Bearer ${token}` } })
            const updateProduct = await axios.put(`http://localhost:1135/api/basket/${_id}/${product._id}/${1}`, {}, { headers: { Authorization: `Bearer ${token}` } })
            const summary = 'הצלחה!'
            const detail = `${product.name} נוסף לסל הקניות שלך בהצלחה`
            show(summary, detail)
        }
        catch (err) {
            if (err.status === 409) {
                try {
                    const updateProduct = await axios.put(`http://localhost:1135/api/basket/${_id}/${product._id}/${1}`, {}, { headers: { Authorization: `Bearer ${token}` } })
                    const summary = 'הצלחה!'
                    const detail = `${product.name} נוסף לסל הקניות שלך בהצלחה`
                    show(summary, detail)
                }
                catch (err) {
                    const summary = 'שגיאה!'
                    const detail = ' אירעה שגיאה בעת ההוספה לסל, נסה שוב מאוחר יותר או פנה לשירות הלקוחות'
                    show(summary, detail)
                }
            }
        }
    }
    const toast = useRef(null);

    const show = (summary, detail) => {
        toast.current.show({ summary: summary, detail: detail });
    };





    const gridItem = (product) => {
        return (
            <div  className="col-12 sm:col-6 lg:col-4 xl:col-3 p-2 " key={product._id} style={{ direction: "rtl" }}>
                <div  className="p-2 border-1 border-white border-round-3xl shadow-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.59)', backdropFilter: 'blur(7px)', WebkitBackdropFilter: 'blur(7px)'}}>
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2" >
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.category}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <Image className=" shadow-8 border-round-3xl" style={{border:"1px solid rgb(12,150,174)"}} imageClassName='border-round-3xl'  src={`http://localhost:1135/images/${product.category}/${product.picture[0]}`} alt={product.name}  width="240" preview />
                        <Link to={`/products/${product._id}`} className='no-underline'>
                            <div className="text-2xl text-center font-bold" style={{ color: "black" }}>{product.name}</div>
                            <h4 className="mt-0 mb-3" style={{ color: "grey" }}>{product.description}</h4>
                        </Link>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">{product.price}₪</span>
                        <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                            <span className="basket" data-pr-tooltip="עליך להתחבר כדי שתוכל להוסיף מוצרים לסל שלך">
                                <Button className='border-0' style={{backgroundColor:"rgb(12,150,174)"}} onClick={(e) => addToBasket(product)} icon="pi pi-cart-plus" rounded disabled={token === null} /></span>
                            {token === null && <Tooltip target=".basket" mouseTrack mouseTrackLeft={10} />}
                            {role2 === "manager" && (
                                <>
                                    <Button className='border-0' style={{backgroundColor:"rgb(241,213,2)"}} onClick={() => deleteProduct(product._id)} icon="pi pi-trash" rounded severity="success" />
                                    <Button className='border-0'  onClick={() => { setVisible(true); setCurrentProduct(product) }} icon="pi pi-pencil" rounded />
                                </>
                            )}
                        </div>
                    </div>
                </div>
             </div>
        );
    };

    const itemTemplate = (product, index) => {
        if (!product) {
            return;
        }
        return gridItem(product);
    };

    const listTemplate = (products) => {
        return <div className="grid grid-nogutter" >{products.map((product, index) => itemTemplate(product, index))}</div>;
    };

    return (
        <>
            <div className=''>
                <style>{
                    `
                    .p-dataview .p-dataview-content
                    {
                        background: transparent !important;
                    }`}
                </style>
                <DataView value={products} itemTemplate={itemTemplate}   style={{
                        backgroundImage: `url(${back}) `,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                        padding: '2rem',
                        minHeight: '100vh',
                    }}/>
            </div>
            {role2 === "manager" && <AddProduct getByCategory={getByCategory} />}
            {visible && <UpdateProduct visible={visible} onHide={() => { setVisible(false) }} currentProduct={currentProduct} getByCategory={getByCategory}/>}
            <Toast ref={toast} />
        </>
    )
}
export default ProductByCategory
