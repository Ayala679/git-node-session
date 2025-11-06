import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
import  axios  from 'axios';
import { useState } from 'react';
import back from '../../../pics/back_update.webp'


const UpdateProduct = ({visible,onHide,currentProduct,getAllProducts,getByCategory,getProduct})=>{
        const pics = currentProduct.picture.join(',')
        const [name,setName] = useState(currentProduct.name)
        const [description,setDescription] = useState(currentProduct.description)
        const [details,setDetails] = useState(currentProduct.details)
        const [category,setCategory] = useState(currentProduct.category)
        
        // const [size,setSize] = useState({
        //     length:0,
        //     width:0,
        //     height:0,
        //     weight:0
        // })
        const [length,setLength] = useState(currentProduct.size.length)
        const [width, setWidth] = useState(currentProduct.size.width)
        const [height, setHeight] = useState(currentProduct.size.height)
        const [weight, setWeight] = useState(currentProduct.size.weight)
        const [color,setColor] = useState(currentProduct.color)
        const [picture,setPicture] = useState(pics)
        const [price,setPrice] = useState(currentProduct.price)
        const categories = [
            { name: 'גן ומרפסת' },
            { name: 'שמשיות ופתרונות הצללה' },
            { name: 'אדניות ועציצים' },
            { name: 'מטבח חוץואביזרים' },
            { name: 'אביזרים לגינה' },
            { name: 'תאורת גינה וחוץ' }    
        ];
    
        const colors = [
            { name: 'אפור' },
            { name: 'שחור' },
            { name: 'לבן' },
            { name: 'ירוק' },
            { name: 'חום' },
            { name: 'כסוף' }
        ];
        const selectedCategory = (option, props) => {
            if (option) {
                return (
                    <div className="flex align-items-center">
                      
                        <img alt={option.name} src={`http://localhost:1135/images/${option.name}.png`} className={`mr-2 flag`} style={{ width: '18px' }} />
                        <div>{option.name}</div>
                    </div>
                );
            }
    
            return <span>{props.placeholder}</span>;
        };
    
        const countryOptionTemplate = (option) => {
            return (
                <div className="flex align-items-center">
                    <img alt={option.name} src={`http://localhost:1135/images/${option.name}.png`} className={`mr-2 flag`} style={{ width: '18px' }} />
                    <div>{option.name}</div>
                </div>
            );
        };
        const updateProduct = async(e)=>{  
            e.preventDefault()
            const pictures = picture.split(",")
            try{
                const token = localStorage.getItem('token')
                const updated = await axios.put("http://localhost:1135/api/product",{id:currentProduct._id,name,description,details,category,size:{length,width,height,weight},color,picture:pictures,price})
                if(getAllProducts)getAllProducts()
                if(getByCategory)getByCategory()
                if(getProduct)getProduct()
                onHide()
            }
            catch(err){
                console.log(err.message);
            }

        }

    return (
        <div className="card flex justify-content-center" style={{backgroundColor:"rgba(255, 255, 255, 0.37)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)"}}>
            <Sidebar visible={visible} onHide={onHide} className="w-full md:w-30rem lg:w-30rem bg-no-repeat bg-cover" style={{backgroundImage:`url(${back})`}}>

                <div  className="flex flex-column px-5 py-2 gap-5 w-full" style={{ borderRadius: '12px' , backgroundColor:"rgba(255, 255, 255, 0.5)"}}>
                    <h1 className='flex justify-content-center'>הוספת מוצר חדש</h1>
                    <form className='flex flex-column gap-5 justify-content-center' onSubmit={updateProduct} style={{direction:"rtl" }}>
                    <FloatLabel className="w-11 flex justify-content-center "> 
                        <i className="custom-target-icon pi pi-question-circle p-text-secondary"  data-pr-tooltip="הכנס שם מוצר"></i>                      
                        <InputText className='w-full' id="name" value={name} onChange={(e) => setName(e.target.value)} required/>
                        <Tooltip target=".custom-target-icon" />
                        <label htmlFor="name">שם מוצר</label>
                    </FloatLabel>
                    <FloatLabel className="w-11 flex justify-content-center "> 
                        <i className="custom-target-icon pi pi-question-circle p-text-secondary "  data-pr-tooltip="הכנס תיאור מוצר"></i>                      
                        <InputText className='w-full' id="description" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                        <Tooltip target=".custom-target-icon" />
                        <label htmlFor="description">תיאור מוצר</label>
                    </FloatLabel>
                    <FloatLabel className="w-11 h-5rem flex justify-content-center"> 
                        <i className="custom-target-icon pi pi-question-circle p-text-secondary"  data-pr-tooltip="הכנס פרטי מוצר"></i>                      
                        <Tooltip target=".custom-target-icon" />
                        <InputTextarea className='w-full' value={details} onChange={(e) => setDetails(e.target.value)} rows={5} cols={30} />
                        <label htmlFor="details">פרטי מוצר</label>
                    </FloatLabel>
                    <FloatLabel className="w-11 h-3rem flex justify-content-center"> 
                        <i className="custom-target-icon pi pi-question-circle p-text-secondary"  data-pr-tooltip="בחר קטגוריה מהרשימה"></i>                      
                        <Dropdown value={category} onChange={(e) => setCategory(e.value)} options={categories} optionLabel="name" optionValue='name' filter valueTemplate={selectedCategory} itemTemplate={countryOptionTemplate} className="w-full" />                          
                        <Tooltip target=".custom-target-icon" />
                        <label htmlFor="name">קטגוריה</label>
                    </FloatLabel>
                    {/* <div className="w-11 gap-3 flex flex-column justify-content-center"> 
                        <div>
                            <i className="custom-target-icon pi pi-question-circle p-text-secondary"  data-pr-tooltip="הכנס גודל מוצר"></i>                      
                            <Tooltip target=".custom-target-icon" />
                            <label htmlFor="size">גודל מוצר</label>
                        </div>
                        <div className="flex justify-content-center"> 
                            <label htmlFor="length">אורך</label>
                            <InputNumber id="length" className='h-1' value={length} onValueChange={(e) => setLength(e.value)} showButtons buttonLayout="vertical" style={{ width: '3rem' }} decrementButtonClassName="p-button-secondary h-2rem" incrementButtonClassName="p-button-secondary  h-2rem" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus h-1rem" />
                            <label htmlFor="width">רוחב</label>
                            <InputNumber id="width"  value={width} onValueChange={(e) => setWidth(e.value)} showButtons buttonLayout="vertical" style={{ width: '3rem' }} decrementButtonClassName="p-button-secondary h-2rem" incrementButtonClassName="p-button-secondary h-2rem" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus h-1rem" />
                            <label htmlFor="height">גובה</label>
                            <InputNumber id="height"  value={height} onValueChange={(e) => setHeight(e.value)} showButtons buttonLayout="vertical" style={{ width: '3rem' }} decrementButtonClassName="p-button-secondary h-2rem" incrementButtonClassName="p-button-secondary h-2rem" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus h-1rem" />
                            <label htmlFor="weight">משקל</label>
                            <InputNumber id="weight"  value={weight} onValueChange={(e) => setWeight(e.value)} showButtons buttonLayout="vertical" style={{ width: '3rem' }} decrementButtonClassName="p-button-secondary h-2rem" incrementButtonClassName="p-button-secondary h-2rem" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus h-1rem" />
                        </div>
                    </div> */}
                    <FloatLabel className="w-11 flex flex-column justify-content-center">
                        <p>גודל מוצר</p>
                        <div className="flex justify-content-center gap-2">
                            <Tooltip target=".length input"/>
                            <InputNumber data-pr-tooltip='אורך' id="length" className='length h-1' value={length} onValueChange={(e) => setLength(e.value)} showButtons buttonLayout="vertical" style={{ width: '3rem' }} decrementButtonClassName="p-button-secondary h-2rem" incrementButtonClassName="p-button-secondary  h-2rem" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus h-1rem" />
                            <Tooltip target=".width input"/>
                            <InputNumber id="width" data-pr-tooltip='רוחב' className='width' value={width} onValueChange={(e) => setWidth(e.value)} showButtons buttonLayout="vertical" style={{ width: '3rem' }} decrementButtonClassName="p-button-secondary h-2rem" incrementButtonClassName="p-button-secondary h-2rem" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus h-1rem" />
                            <Tooltip target=".height input"/>                        
                            <InputNumber id="height" data-pr-tooltip='גובה' className='height' value={height} onValueChange={(e) => setHeight(e.value)} showButtons buttonLayout="vertical" style={{ width: '3rem' }} decrementButtonClassName="p-button-secondary h-2rem" incrementButtonClassName="p-button-secondary h-2rem" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus h-1rem" />
                            <Tooltip target=".weight input"/>
                            <InputNumber id="weight" data-pr-tooltip='משקל' className='weight' value={weight} onValueChange={(e) => setWeight(e.value)} showButtons buttonLayout="vertical" style={{ width: '3rem' }} decrementButtonClassName="p-button-secondary h-2rem" incrementButtonClassName="p-button-secondary h-2rem" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus h-1rem" />
                        </div>
                    </FloatLabel>
                    <br />
                    <FloatLabel className="w-11 md:w-20rem">
                        <i className="custom-target-icon pi pi-question-circle p-text-secondary"  data-pr-tooltip="הכנס גודל מוצר"></i>                      
                        <Tooltip target=".custom-target-icon" />
                        <MultiSelect value={color} onChange={(e) => {setColor(e.value)}} options={colors} optionValue="name" optionLabel="name" className="w-10" />
                        <label htmlFor="ms-cities">בחר צבעי מוצר</label>
                    </FloatLabel>
                    {/* <div className="w-11 md:w-20rem">
                        <i className="custom-target-icon pi pi-question-circle p-text-secondary" data-pr-tooltip="בחר צבעי מוצר"></i>
                        <Tooltip target=".custom-target-icon" />
                        <MultiSelect placeholder='בחר צבעי מוצר' className="w-10" value={color} options={colors} optionValue="name" optionLabel="name" onChange={(e) => { setColor(e.target.value) }}  />
                    </div> */}
                    <FloatLabel className="w-11 flex justify-content-center "> 
                        <i className="custom-target-icon pi pi-question-circle p-text-secondary"  data-pr-tooltip="הכנס את שמות תמונות המוצר (כולל סיומות) ,מופרדות בפסיקים"></i>                      
                        <InputText className='w-full' id="picture" value={picture} onChange={(e) => setPicture(e.target.value)} required/>
                        <Tooltip target=".custom-target-icon" />
                        <label htmlFor="picture">שם תמונה</label>
                    </FloatLabel>
                    <FloatLabel className="w-11 flex justify-content-center mt-4"> 
                        <i className="custom-target-icon pi pi-question-circle p-text-secondary"  data-pr-tooltip="הכנס מחיר מוצר"></i>                                                  
                        <InputNumber showButtons style={{direction:"ltr"}} inputId="stacked-buttons" value={price} onValueChange={(e) => setPrice(e.value)}  mode="currency"  currency="ILS" />
                        <Tooltip target=".custom-target-icon" />
                        <label htmlFor="stacked-buttons" className="font-bold block mb-2">מחיר מוצר</label>
                    </FloatLabel>
                    <Button type="submit" label="עדכן מוצר" disabled={!name || !description || !details || !category || !color || !price || !picture } className="p-3 w-5 text-primary-50 border-3 border-white-alpha-30 hover:bg-white-alpha-60"  />

                    </form>
                </div>
            </Sidebar>
            {/* <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} /> */}
        </div>
    )
}

export default UpdateProduct