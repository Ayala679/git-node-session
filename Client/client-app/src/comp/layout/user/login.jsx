import Header from "../../header/header"
import { useState, useRef } from 'react'
import { Password } from 'primereact/password';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import { Link, useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import axios from 'axios';
import { setRole } from "../../../redux/userSlice";
import { useDispatch } from "react-redux";
import { Messages } from 'primereact/messages';
import back from '../../../pics/back_login.webp'
import { Toast } from "primereact/toast";

// const Login = () => {
//     const dispatch = useDispatch()
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const [flag, setFlag] = useState(false)
//     const login = async (e) => {
//         e.preventDefault()
//         // try{
//         //     const {token} = await axios.post("http://localhost:1135/api/user/login",{email,password})//,{headers:{'Authorization':`Bearer ${token}`}}
//         //     dispatch(setToken(token))

//         // }            

//         // catch(err){
//         //     if(err.status === 401)
//         //         {
//         //         }
//         // }


//         try {
//             const { data: { token } } = await axios.post("http://localhost:1135/api/user/login", { email, password });
//             dispatch(setToken(token));
//         } catch (err) {
//             if (err.response?.status === 401) {
//                 if(msgs.current){
//                     msgs.current.clear()
//                     msgs.current.show({
//                     id: '1',
//                     sticky: true,
//                     severity: 'error',
//                     summary: 'Error',
//                     detail: 'כתובת הדוא"ל או הסיסמה שהזנת שגוייה או שהחשבון אינו קיים ב-IKEA בישראל',
//                     closable: true
//                 })}
//             } else {
//                 console.error(err);
//             }
//         }
//     }
//     const msgs = useRef(null);

//     // useMountEffect(() => {
//     //     if (msgs.current) {
//     //         msgs.current.clear();
//     //         msgs.current.show({ id: '1', sticky: true, severity: 'info', summary: 'Info', detail: 'כתובת הדוא"ל או הסיסמה שהזנת שגוייה או שהחשבון אינו קיים ב-IKEA בישראל', closable: false });
//     //     }
//     // }); 

//     return (
//         <>
//             <h1>היכנסו לחשבון איקאה שלכם</h1>
//             <span>באפשרותך לקבל חוויה מותאמת אישית יותר שבה אין צורך למלא את הפרטים שלך בכל פעם</span>
//             {flag && <div className="card flex justify-content-center">
//                 <Messages ref={msgs} />
//             </div>}

//             <form onSubmit={login} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "10px", flexWrap: "wrap" }}>
//                 <FloatLabel className="input card flex justify-content-center">
//                     <i className="custom-target-icon pi pi-question-circle p-text-secondary" data-pr-tooltip="הכנס סיסמה המכילה לפחות 4 תווים"></i>
//                     <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                     <Tooltip target=".custom-target-icon" />
//                     <label className='input' htmlFor="email">דוא"ל</label>
//                 </FloatLabel>

//                 <div className="input card flex justify-content-center">
//                     <FloatLabel >
//                         <i className="custom-target-icon pi pi-question-circle p-text-secondary" data-pr-tooltip="הכנס סיסמה המכילה לפחות 4 תווים"></i>
//                         <Password invalid={password && (String(password).length < 4)} id="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask required />
//                         <label className='input' htmlFor="password">סיסמה</label>
//                         <Tooltip target=".custom-target-icon" />
//                     </FloatLabel>
//                     <Button type='submit' label="כניסה" icon="pi pi-user-plus" style={{ width: "500px" }} disabled={!password || !email} />
//                 </div>
//             </form>
//         </>
//     )
// }
// export default Login


const Login = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const msgs = useRef(null);
    const navigate = useNavigate()
    const login = async (e) => {
        e.preventDefault()
        //                 const fff = useSelector(myStore=>myStore)
        // console.log(fff);
        try {
            const { data } = await axios.post("http://localhost:1135/api/user/login", { email, password });
            const token = data.accessToken
            const role = data.role
            dispatch(setRole(role));
            console.log(role);

            localStorage.setItem('token', token)
            navigate('/products')

        }

        catch (err) {
            if (err.response?.status === 401) {
                show2('כתובת הדוא"ל או הסיסמה שהזנת שגוייה או שהחשבון אינו קיים ב-IKEA בישראל')
                // msgs.current.show({
                //     id: '1',
                //     sticky: true,
                //     severity: 'error',
                //     summary: 'Error',
                //     detail: 'כתובת הדוא"ל או הסיסמה שהזנת שגוייה או שהחשבון אינו קיים ב-IKEA בישראל',
                //     closable: true
                // });
            }
        }
    }
    const toast = useRef(null);

    const show2 = (detail) => {
        toast.current.show({severity:'warn', summary: 'error', detail: detail });
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
                <form className="flex flex-column align-items-center justify-content-center mb-7 p-6 border-round-3xl my-5 md:static absolute md:top-0 md:border-round-left-3xl md:border-noround-right md:border-right-none"
                style={{ top: "25%", backgroundColor: "rgba(255, 255, 255, 0.59)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px white solid", height: "45vh" }}>

                    <div className="card flex justify-content-center mt-0">
                        <Messages ref={msgs} />
                    </div>
                    <p className="text-right"><b>IKEA-ברוכים השבים ל <br/>.הכנסו כדי לראות את ההזמנות, המועדפים והרעיונות שלכם  </b></p>
                    <FloatLabel className="mt-3">
                        <InputText id="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <Tooltip target=".custom-target-icon" />
                        <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge"
                            style={{ "marginLeft": "5px" }} data-pr-tooltip="הכנס כתובת הדואר האלקטרוני שלך"></i>
                        <label itemType="Email" htmlFor="email">כתובת דוא"ל</label>
                    </FloatLabel><br />
                    <FloatLabel>
                        <Password value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} toggleMask invalid={String(password).length < 4 && password} required />
                        <Tooltip target=".custom-target-icon" />
                        <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge"
                            style={{ "marginLeft": "5px" }} data-pr-tooltip="הכנס את סיסמתך"></i>
                        <label htmlFor="password">סיסמא</label>
                    </FloatLabel>
                    <Button type="submit" label="כניסה" onClick={login} disabled={!email || !password} className="p-button-success w-9 mt-5 p-3 w-full"
                    style={{ backgroundColor: "var(--blue-700)" }} />

                </form>


            <div className="flex justify-content-center align-items-center border-round-right-3xl relative hidden md:block" style={{ height: "45vh", width: "25%" }}>
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
                        backgroundColor: "rgba(255, 203, 203, 0.59)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderBottom: "1px white solid"
                        , bottom: 0, height: "2rem", width: "99.8%"
                    }}></div>
                <div className="text-white " style={{ position: "absolute", top: "20%", left:"5%", padding:"5px"}}>
                    <h1>הכנסו לחשבון איקאה שלכם</h1>
                    <span>אין לכם חשבון?<Link style={{color:"rgb(12, 150, 174)"}} to="/register">הרשמו כאן</Link></span>
                </div>
            </div>

            <div className="text-black text-center mt-5 border-round-3xl p-5 border-1 border-white border-solid md:hidden absolute w-10" style={{ top: "6%", backgroundColor: "rgba(255, 255, 255, 0.59)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
                <h1>הכנסו לחשבון איקאה שלכם</h1>
                <span>אין לכם חשבון?<Link style={{color:"rgb(12, 150, 174)"}} to="/register">הרשמו כאן</Link></span>
            </div>
            </div>
            <Toast ref={toast} />
            
            {/* <img src={`http://localhost:1004/uploads/${product.image}`} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}/> */}
        </>
    )
}
export default Login