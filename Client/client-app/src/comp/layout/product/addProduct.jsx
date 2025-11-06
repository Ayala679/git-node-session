import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import { useState } from 'react';
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
import back from '../../../pics/back_add.png'

import axios from 'axios';
const AddProduct = ( {getAllProducts,getByCategory} ) => {
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [details, setDetails] = useState("")
    const [category, setCategory] = useState("")
    const [length, setLength] = useState(0)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [weight, setWeight] = useState(0)
    const [color, setColor] = useState([])
    const [picture, setPicture] = useState("")
    const [price, setPrice] = useState()
    const categories = [
        { name: 'גן ומרפסת' },
        { name: 'שמשיות ופתרונות הצללה' },
        { name: 'אדניות ועציצים' },
        { name: 'מטבח חוץ ואביזרים' },
        { name: 'אביזרים לגינה' },
        { name: 'תאורת גינה וחוץ' }
    ];

    const colors = [
        { name: 'אפור' },
        { name: 'שחור' },
        { name: 'לבן' },
        { name: 'ירוק' },
        { name: 'חום' },
        { name: 'כסוף' },
        { name: 'כחול' }
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

    const addProduct = async (e) => {
        try {
            e.preventDefault()
            const colorArray = color.map((c) => {
                return c.name
            })
            const pictures = picture.split(",")
            const token = localStorage.getItem('token')
            const pp = { name: name, description: description, details: details, category: category, size: { length, width, height, weight }, color: colorArray, picture: pictures, price: price }
            const newProduct = await axios.post("http://localhost:1135/api/product", { name, description, details, category: category.name, size: { length, width, height, weight }, color: colorArray, picture: pictures, price }, { headers: { Authorization: `Bearer ${token}` } })
            console.log("נרשם בהצלחה:")
            setName("")
            setDescription("")
            setDetails("")
            setCategory("")
            setLength(0)
            setWidth(0)
            setHeight(0)
            setWeight(0)
            setColor([])
            setPicture("")
            setPrice(0)
            setVisible(false)
            if(getAllProducts)getAllProducts()
            if(getByCategory)getByCategory()
        }
        catch (err) {
            console.log(err.status);
            console.log(err.message);
        }
    }
    return (
        <>
            <div className="card flex justify-content-center">
                <Button className='btn border-0 border-round-left-3xl fixed z-5' style={{ bottom: "20%", right: "0px" }} label="הוסף מוצר" icon="pi pi-plus" onClick={() => setVisible(true)} />
                <style>
                    {`
                .btn {
                    background-color:rgba(9, 105, 76, 1);
                    padding: 10px 20px;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .btn:hover {
                    background-color:rgba(71, 187, 54, 1);
                    transform: scale(1.08);
                    width:10rem;
                    
                }
                `}
                </style>
                <Dialog className='bg-no-repeat bg-cover' style={{backgroundImage:`url(${back})`}}
                    visible={visible}
                    modal
                    onHide={() => { if (!visible) return; setVisible(false); }}
                    content={({ hide }) => (
                        <div className="overflow-y-scroll overflow-x-hidden flex flex-column px-8 py-5 gap-5" style={{ borderRadius: '12px', backgroundColor:"rgba(255, 255, 255, 0.5)"}}>
                            <h1 className='flex justify-content-center'>הוספת מוצר חדש</h1>
                            <form className='flex flex-column justify-content-center gap-5' onSubmit={addProduct} style={{direction:"rtl" }}>
                                <FloatLabel className="w-11 flex justify-content-center ">
                                    <i className="custom-target-icon pi pi-question-circle p-text-secondary" data-pr-tooltip="הכנס שם מוצר"></i>
                                    <InputText className='w-full text-right' id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                                    <Tooltip target=".custom-target-icon" />
                                    <label htmlFor="name">שם מוצר</label>
                                </FloatLabel>
                                <FloatLabel className="w-11 flex justify-content-center ">
                                    <i className="custom-target-icon pi pi-question-circle p-text-secondary " data-pr-tooltip="הכנס תיאור מוצר"></i>
                                    <InputText className='w-full' id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                                    <Tooltip target=".custom-target-icon" />
                                    <label htmlFor="description">תיאור מוצר</label>
                                </FloatLabel>
                                <FloatLabel className="w-11 h-5rem flex justify-content-center" >
                                    <i className="custom-target-icon pi pi-question-circle p-text-secondary" data-pr-tooltip="הכנס פרטי מוצר"></i>
                                    <Tooltip target=".custom-target-icon" />
                                    <InputTextarea className='w-full' value={details} onChange={(e) => setDetails(e.target.value)} rows={5} cols={30} />
                                    <label htmlFor="details">פרטי מוצר</label>
                                </FloatLabel>
                                <div className="w-10 h-3rem flex-1 justify-content-center">
                                    <i className="custom-target-icon pi pi-question-circle p-text-secondary" data-pr-tooltip="בחר קטגוריה מהרשימה"></i>
                                    <Dropdown value={category} placeholder='קטגוריה' onChange={(e) => setCategory(e.value)} options={categories} optionLabel="name" filter valueTemplate={selectedCategory} itemTemplate={countryOptionTemplate} className="w-10" />
                                    <Tooltip target=".custom-target-icon" />
                                </div>
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
                                <div className="w-11 md:w-20rem">
                                    <i className="custom-target-icon pi pi-question-circle p-text-secondary" data-pr-tooltip="בחר צבעי מוצר"></i>
                                    <Tooltip target=".custom-target-icon" />
                                    <MultiSelect placeholder='בחר צבעי מוצר' className="w-10" value={color} onChange={(e) => { setColor(e.target.value) }} options={colors} optionLabel="name" />
                                </div>
                                <FloatLabel className="w-11 flex justify-content-center ">
                                    <i className="custom-target-icon pi pi-question-circle p-text-secondary" data-pr-tooltip="הכנס את שמות תמונות המוצר (כולל סיומות) ,מופרדות בפסיקים"></i>
                                    <InputText className='w-full' id="picture" value={picture} onChange={(e) => setPicture(e.target.value)} required />
                                    <Tooltip target=".custom-target-icon" />
                                    <label htmlFor="picture">שם תמונה</label>
                                </FloatLabel>
                                <FloatLabel className="w-11 flex justify-content-center mt-4">
                                    <i className="custom-target-icon pi pi-question-circle p-text-secondary" data-pr-tooltip="הכנס מחיר מוצר"></i>
                                    <InputNumber showButtons style={{ direction: "ltr" }} inputId="stacked-buttons" value={price} onValueChange={(e) => setPrice(e.value)} mode="currency" currency="ILS" />
                                    <Tooltip target=".custom-target-icon" />
                                    <label htmlFor="stacked-buttons" className=" block mb-2">מחיר מוצר</label>
                                </FloatLabel>
                                <div className='flex flex-row justify-content-center gap-5'>
                                    <Button onClick={()=>{setVisible(false)}} label="ביטול" className="p-3 w-full text-primary-50 border-3 border-white-alpha-30 hover:bg-white-alpha-60"  />
                                    <Button type="submit" label="הוספה" disabled={!name || !description || !details || !category || !color || !price || !picture } className="p-3 w-full text-primary-50 border-3 border-white-alpha-30 hover:bg-white-alpha-60"   />
                               </div>
                                
                            </form>
                        </div>
                    )}
                ></Dialog>
            </div>
        </>
    )
}

export default AddProduct