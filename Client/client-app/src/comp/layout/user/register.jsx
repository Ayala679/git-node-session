import { useRef, useState } from 'react'
// import {Link} from 'react-router-dom'
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Tooltip } from 'primereact/tooltip';
import { Password } from 'primereact/password';
import { Checkbox } from "primereact/checkbox";
import { Button } from 'primereact/button';
import  axios  from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import ikea_logo from '../../../pics/Ikea_logo.png'
import back from '../../../pics/back_register.webp'
import { Toast } from 'primereact/toast';

const Register = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState(" ")
    const [password, setPassword] = useState("")
    const [checkPassword, setCheckPassword] = useState("")
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate()
    const createUser = async (e)=> 
    {
        e.preventDefault()
        try{
            const {newUser} = await axios.post("http://localhost:1135/api/user/register",{firstName,lastName,email,phoneNumber:phone,password})
            show('center')
        }
        catch(err){
            if(err.status === 409)
                show2('שגיאה','חשבון עם דוא"ל זה כבר קיים, תרצה להתחבר במקום?')
        }
    }
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState('center');
    const footerContent = (
        <div>
            <Button label="מעבר להתחברות" icon="pi pi-home" onClick={() => navigate('/login')} className="p-button-text" />
        </div>
    );

    const show = (position) => {
        setPosition(position);
        setVisible(true);
    };


    const toast = useRef(null);

    const show2 = (summary,detail) => {
        toast.current.show({severity:'warn', summary: summary, detail: detail });
    };
    return (
        <>
                <div className="flex relative align-items-center justify-content-center bg-no-repeat bg-cover gap-0 h-screen"
                    style={{
                        backgroundImage: `url(${back})`, animation: "fadeIn 1.5s ease-in-out",
                    }}>
                    <style>{`
                @keyframes fadeIn {
                  0% { opacity: 0; transform: translateY(20px); }
                  100% { opacity: 1; transform: translateY(0); }}
                .fade-in {
                  animation: fadeIn 1s ease forwards;}`}</style>
                <form onSubmit={createUser} className='mt-9 flex flex-column gap-4 align-items-center justify-content-center  mb-7 p-6 border-round-left-3xl'
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.59)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", height: "75vh", marginTop:"113px", border: "1px white solid", borderRight: "0px" }}>
                    <b><p>מהפרופיל שלך תוכל למצוא את כל המידע הקשור לחשבון שלך.</p></b>         
                    <FloatLabel className="w-9"> 
                        <i className="custom-target-icon pi pi-question-circle p-text-secondary "  data-pr-tooltip="הכנס שם פרטי"></i>                      
                        <InputText className='w-9' id=" firsrName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                        <Tooltip target=".custom-target-icon"/>
                        <label className='input' htmlFor="firstName">שם פרטי</label>
                    </FloatLabel>
                    <FloatLabel className="w-9">
                        <i className="custom-target-icon pi pi-question-circle p-text-secondary" data-pr-tooltip="הכנס שם משפחה"></i>                    
                        <InputText className='w-9' id=" lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                        <Tooltip target=".custom-target-icon" />
                        <label className='input' htmlFor="lastName">שם משפחה</label>
                    </FloatLabel>
                    <FloatLabel className="w-9">
                        <i className="custom-target-icon pi pi-question-circle p-text-secondary" data-pr-tooltip='הכנס את כתובת הדוא"ל שלך'></i>                    
                        <InputText className='w-9' id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        <Tooltip target=".custom-target-icon" />
                        <label className='input' htmlFor="email">דוא"ל</label>
                    </FloatLabel>
                    <FloatLabel className="w-9">
                        <i className="custom-target-icon pi pi-question-circle p-text-secondary" data-pr-tooltip="הכנס מס' טלפון"></i>                    
                        <InputMask className='w-9' id="phone" mask="(999) 999-9999" onChange={(e) => setPhone(e.target.value)}></InputMask>
                        <label className="input block mb-2" htmlFor="phone" >מס' טלפון</label>
                        <Tooltip target=".custom-target-icon" />
                    </FloatLabel>
                    <FloatLabel className='w-9'>
                        <i className="custom-target-icon pi pi-question-circle p-text-secondary" data-pr-tooltip="הכנס סיסמה המכילה לפחות 4 תווים"></i>
                        <Password className='w-9' invalid={password && (String(password).length < 4)} id="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask required/>
                        <label className='input' htmlFor="password">סיסמה</label>
                        <Tooltip target=".custom-target-icon" />
                    </FloatLabel>
                    <FloatLabel className='w-9'>
                        <i className="custom-target-icon pi pi-question-circle p-text-secondary" data-pr-tooltip="הכנס סיסמה המכילה לפחות 4 תווים"></i>
                        <Password className='w-9' feedback={false} invalid={password !== checkPassword && checkPassword} id="checkPassword" value={checkPassword} onChange={(e) => setCheckPassword(e.target.value)} toggleMask required/>
                        <Tooltip target=".custom-target-icon" />
                        <label className='input' htmlFor="checkPassword">אימות סיסמה</label>
                    </FloatLabel>
                    <div>
                        <Checkbox id="ingredient2" onChange={e => setChecked(e.checked)}  checked={checked}></Checkbox>
                        <label className=" ml-2" htmlFor="ingredient2" style={{marginRight:"1vw"}}> ידוע לי כי המידע אודותיי ישמר במערכות החברה בכפוף למדיניות הפרטיות </label>
                    </div>
                    <Button type='submit' label="צור חשבון" icon="pi pi-user-plus" disabled={ !firstName || !lastName || !email || !checked || password!=checkPassword} />
                </form>

            {/* <div className="text-black text-center mt-5 border-round-3xl p-5 border-1 border-white border-solid md:hidden absolute w-10" style={{ top: "6%", backgroundColor: "rgba(255, 255, 255, 0.59)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
                <h1>צרו חשבון איקאה</h1>
                <span>כבר יש לכם חשבון?<Link to="/login">הכנסו כאן</Link></span>
            </div> */}

            <div className="border-round-right-3xl relative hidden md:block mt-7" style={{ height: "75vh", width: "20%" }}>
                <div className="absolute"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.59)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderTop: "1px white solid"
                        , top: 0, height: "2rem", width: "100%"
                    }}></div>
                <div className="absolute h-full border-round-right-3xl"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.59)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px white solid", borderLeft: "0px"
                        , right: -27, width: "2rem"
                    }}></div>
                <div className="absolute"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.59)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderBottom: "1px white solid"
                        , bottom: 0, height: "2rem", width: "99.8%"
                    }}></div>
                <div className="text-white" style={{ position: "absolute", top: "40%", left: "20%" }}>
                    <h1>צרו חשבון איקאה</h1>
                    <span>כבר יש לכם חשבון?<Link to="/login">הכנסו כאן</Link></span>
                </div>
            </div>

            <div className="text-black text-center mt-7 border-round-3xl p-2 border-1 border-white border-solid md:hidden absolute w-10" style={{ top: "6%", backgroundColor: "rgba(255, 255, 255, 0.59)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
                <h1>צרו חשבון איקאה</h1>
                <span>כבר יש לכם חשבון?<Link to="/login">הכנסו כאן</Link></span>
            </div>
            <div className="card">
                <Dialog header={<img src={ikea_logo} height="40" className=" mr-2"></img>} visible={visible} position={position} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent} draggable={false} resizable={false}>
                    <p className="m-0">
                        ההרשמה הושלמה בהצלחה. אנו מודים לך על הצטרפותך לאתר שלנו.<br/>
                        חשבונך נוצר בהצלחה, ומעתה תוכל ליהנות מגישה מלאה לכל השירותים והכלים המוצעים למשתמשים רשומים.<br/>
                        למידע נוסף על השימוש באתר ועל תנאי השירות, ניתן ליצור קשר עם שירות הלקוחות.<br/>
                        תודה שבחרת להצטרף אלינו.<br/>
                        IKEA.
                    </p>
                </Dialog>
                <Toast ref={toast} />
                
            </div>
            </div>


        
            {<div></div>}
        </>
    )
}
export default Register