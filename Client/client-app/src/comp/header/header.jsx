
// //             <nav>

// //                 <NavLink to="/register">Register</NavLink>
// //                 <NavLink to="/login">Login</NavLink>
// //                 <NavLink to="/basket"></NavLink>
// //                 <NavLink to="/products"></NavLink>
// //                 <NavLink to="categories"></NavLink>

// //             </nav>

// import React from 'react';
// import { PanelMenu } from 'primereact/panelmenu';
// import { InputText } from 'primereact/inputtext';
// import { Badge } from 'primereact/badge';
// import ikea_logo from '../../pics/Ikea_logo.png';
// import { Link, useNavigate } from 'react-router-dom';
// import { InputIcon } from "primereact/inputicon";
// import { IconField } from "primereact/iconfield";
// import { Button } from 'primereact/button';
// import { Tooltip } from 'primereact/tooltip';
// import { FloatLabel } from 'primereact/floatlabel';

// const Header = (props) => {
//     const token = localStorage.getItem('token')
//     const aaa = token != null ? JSON.parse(atob(token.split('.')[1])) : ""
//     const firstName = aaa!=""? aaa.firstName:"ccc"
//     const lastName = aaa!=""? aaa.lastName : "ccc"
//     // const items = token === null ?
//     //     [{
//     //         label: 'היי התחברו או הרשמו',
//     //         icon: 'pi pi-user',
//     //         items: [
//     //             {
//     //                 label: 'התחברות',
//     //                 icon: 'pi pi-sign-in',
//     //                 command: () => {
//     //                     navigate('/login');
//     //                 }
//     //             },
//     //             {
//     //                 icon: 'pi pi-user-plus',
//     //                 label: 'הרשמה',
//     //                 command: () => {
//     //                     navigate('/register');
//     //                 }
//     //             }
//     //         ]

//     //     }]
//     //     : [
//     //         {
//     //             label: `היי ${firstName}!`,
//     //             icon: 'pi pi-user',
//     //             items: [
//     //                 {
//     //                     label: `${firstName.charAt(0)}${lastName.charAt(0)}`,
//     //                     icon: 'pi pi-sign-in',
//     //                     command: () => {
//     //                         navigate('/login');
//     //                     }
//     //                 },
//     //                 {
//     //                     icon: 'pi pi-user-plus',
//     //                     label: 'הרשמה',
//     //                     command: () => {
//     //                         navigate('/register');
//     //                     }
//     //                 }
//     //             ]
//     //         }
//     //         , {
//     //             icon: 'pi pi-shopping-cart',
//     //             command: () => {
//     //                 navigate('/basket');
//     //             }
//     //         }]
//     // const itemRenderer = (item) => (
//     //     <a className="flex align-items-center p-menuitem-link">
//     //         <span className={item.icon} />
//     //         <span className="mx-2">{item.label}</span>
//     //         {item.badge && <Badge className="ml-auto" value={item.badge} />}
//     //         {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
//     //     </a>
//     // );
//     // const start = <Link to="/"><img src={ikea_logo} height="40" className=" mr-2"></img></Link>;
//     // const end = (
//     //     <div className="flex  gap-2">
//     //         <IconField iconPosition="right">
//     //             <InputIcon className="pi pi-search"> </InputIcon>
//     //             <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
//     //         </IconField>
//     //     </div>
//     // );



//     const navigate = useNavigate()
//     // const clearToken = useSelector(state => state.userSlice.classToken)

//     const itemRenderer = (item, options) => (
//         <a className="flex border-blue-100  align-items-center px-3 h-3rem cursor-pointer" onClick={options.onClick}>
//             {item.icon &&<span className={`${item.icon} text-primary`} />}
//             {item.badge && <Badge value={item.badge} severity={'info'} size={'large'} className='border-round-circle'/>}
//             <span className={`mx-2 ${item.items && 'font-semibold'}`}>{item.label}</span>
//             {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
//         </a>
//     );

//     const items = token === null ? [
//         {
//             label:  'היי, התחברו או הרשמו',
//             icon: 'pi pi-user',
//             template: itemRenderer,
//             items: [
//                 {
//                     label: 'התחברות',
//                     icon: 'pi pi-sign-in',
//                     template: itemRenderer,
//                     command: () => {
//                         navigate('/login');
//                     }
//                 },
//                 {
//                     label: 'הרשמה',
//                     icon: 'pi pi-user-plus',
//                     template: itemRenderer,
//                     command: () => {
//                         navigate('/login');
//                     }
//                 }
//             ]
//         }
//     ]:[
//        {            
//             badge:`${firstName.charAt(0)}${lastName.charAt(0)}`,
//             label: `היי ${firstName}!`,
//             template: itemRenderer,
//             items: [
//                 {
//                     label: 'התנתקות',
//                     icon: 'pi pi-sign-out',
//                     template: itemRenderer,
//                     command: () => {
//                         localStorage.removeItem('token')
//                         navigate('/')
//                     }
//                 }
//             ]
//         }
//     ]

//     return (
//         <div className="w-full flex flex-column">
//             <div className="flex gap-4 fixed top-5 w-11 align-self-center border-1 border-solid border-white border-rounג-3xl p-2 absolute"
//                 style={{ direction: "rtl", backgroundColor: "rgba(255, 255, 255, 0.59)", borderRadius: "20px", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", position: "sticky", top: 10, zIndex: 10 }}>
//                 <Link to="/"><img src={ikea_logo} height="40" className=" mr-2"></img></Link>
//                 <FloatLabel className='flex justify-content-center' >
//                     <IconField iconPosition="right">
//                         <InputIcon className="pi pi-search"> </InputIcon>
//                         <InputText id='search' ></InputText>
//                     </IconField>
//                     <label htmlFor='search' >חיפוש</label>
//                 </FloatLabel>
//                 <PanelMenu model={items} className="w-full md:w-auto absolute" style={{left:"2%"}} />
//                 <span className='basket absolute' style={{left:"21%"}} data-pr-tooltip="עליך להתחבר על מנת להוסיף מוצר זה לסל">
//                     <Button icon="pi pi-shopping-cart" severity="info" disabled={token === null} onClick={()=>{navigate('/basket')}}/>
//                 </span>
//                 {token === null && <Tooltip target='.basket' mouseTrack mouseTrackLeft={10}/>}
 
                
//             </div>
//             {props.children}
//         </div>


//     )
// }











// import React from 'react';
// import { Menubar } from 'primereact/menubar';
// import { useRouter } from 'next/router';

// export default function RouterDemo() {
//     const router = useRouter();
//     const items = [
//         {
//             label: 'Router',
//             icon: 'pi pi-palette',
//             items: [
//                 {
//                     label: 'Styled',
//                     url: '/theming'
//                 },
//                 {
//                     label: 'Unstyled',
//                     url: '/unstyled'
//                 }
//             ]
//         },
//         {
//             label: 'Programmatic',
//             icon: 'pi pi-link',
//             command: () => {
//                 router.push('/installation');
//             }
//         },
//         {
//             label: 'External',
//             icon: 'pi pi-home',
//             items: [
//                 {
//                     label: 'React.js',
//                     url: 'https://react.dev/'
//                 },
//                 {
//                     label: 'Vite.js',
//                     url: 'https://vitejs.dev/'
//                 }
//             ]
//         }
//     ];

//     return (
//         <div className="card">
//             <Menubar model={items} />
//         </div>
//     )
// }



// import { InputText } from 'primereact/inputtext';
// import { Badge } from 'primereact/badge';
// import ikeaLogo from '../../pics/Ikea_logo.png';
// import { Link, Navigate, useNavigate } from 'react-router-dom';
// import { PanelMenu } from 'primereact/panelmenu';
// import { Button } from 'primereact/button';
// import { Tooltip } from 'primereact/tooltip';
// import { InputIcon } from "primereact/inputicon";
// import { IconField } from "primereact/iconfield";
// import { FloatLabel } from 'primereact/floatlabel';
// import { useRef } from 'react';
// import { OverlayPanel } from 'primereact/overlaypanel';

// const Header = (props) => {
//     const op = useRef(null);
//     const desktopOp = useRef(null);

//     const token = localStorage.getItem("token")
//     const { firstName, lastName } = token != null ? JSON.parse(atob(token.split('.')[1])) : "";
//     const navigate = useNavigate()

//     const itemRenderer = (item, options) => (
//         <a className="flex align-items-center px-3 py-2 h-3rem cursor-pointer" onClick={options.onClick}>
//             {item.badge && <Badge value={item.badge} size="large" severity="info" />}
//             {item.icon && <span className={`${item.icon} text-primary`} />}
//             <span className={`mx-2 ${item.items && 'font-semibold'}`}>{item.label}</span>
//             {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
//         </a>
//     );

//     const items = token === null ? [{
//         label: 'הי! התחברו או הרשמו',
//         icon: 'pi pi-user',
//         template: itemRenderer,
//         expanded: false,
//         items: [
//             {
//                 label: 'כניסה',
//                 icon: 'pi pi-sign-in',
//                 template: itemRenderer,
//                 command: () => {
//                     navigate("/login")
//                     desktopOp.current.hide()
//                     op.current.hide()
//                 }
//             },
//             {
//                 label: 'הרשמה',
//                 icon: 'pi pi-user-plus',
//                 template: itemRenderer,
//                 command: () => {
//                     navigate("/Register")
//                     desktopOp.current.hide()
//                     op.current.hide()
//                 }
//             }
//         ]
//     }] : [{
//         label: `הי ${firstName}!`,
//         badge: `${firstName.charAt(0)}${lastName.charAt(0)}`,
//         template: itemRenderer,
//         expanded: false,
//         items: [
//             {
//                 label: 'התנתקות',
//                 icon: 'pi pi-sign-out',
//                 template: itemRenderer,
//                 command: () => {
//                     localStorage.removeItem('token')
//                     navigate("/")
//                     desktopOp.current.hide()
//                     op.current.hide()
//                 }
//             }
//         ]
//     }]
    
//     return (
//         <div className="flex flex-column">
//             <div className="w-11 flex flex-nowrap align-items-center justify-content-between gap-3 border-1 border-white border-round-3xl p-3 fixed z-5"
//                 style={{ backgroundColor: 'rgba(255, 255, 255, 0.59)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', direction: 'rtl', top: "2%", left: "3%" }}>
                
//                 <div className='flex flex-nowrap align-items-center'>
//                     <Link to="/" className="flex align-items-center flex-shrink-0">
//                         <img src={ikeaLogo} height="40" alt="לוגו" />
//                     </Link>

//                     <div className="flex-grow-1 w-full mx-2" style={{ maxWidth: "350px", minWidth: "150px" }}>
//                         <FloatLabel>
//                             <IconField iconPosition="right">
//                                 <InputIcon className="pi pi-search" />
//                                 <InputText id="search" className="w-full" />
//                             </IconField>
//                             <label htmlFor="search">חיפוש</label>
//                         </FloatLabel>
//                     </div>
//                 </div>
                
//                 <div className='flex flex-nowrap align-items-center gap-2'>
//                     {/* Shopping Cart Button */}
//                     <div className="flex-shrink-0">
//                         <span className="basket" data-pr-tooltip="עליך להתחבר כדי שתוכל להוסיף מוצרים לסל שלך">
//                             <Button 
//                                 icon="pi pi-shopping-cart" 
//                                 severity="info" 
//                                 onClick={() => navigate('/Basket')} 
//                                 disabled={token === null} 
//                             />
//                         </span>
//                         {token === null && (
//                             <Tooltip target=".basket" mouseTrack mouseTrackBottom={10} />
//                         )}
//                     </div>
                    
//                     {/* Mobile Menu */}
//                     <div className="block sm:hidden">
//                         <Button 
//                             icon="pi pi-bars" 
//                             onClick={(e) => op.current.toggle(e)} 
//                             text 
//                             rounded 
//                             severity="secondary" 
//                         />
//                         <OverlayPanel 
//                             ref={op} 
//                             style={{
//                                 width: '220px', 
//                                 direction: 'rtl', 
//                                 fontSize: '1rem',
//                                 whiteSpace: 'nowrap',
//                                 overflow: 'hidden',
//                                 textOverflow: 'ellipsis'
//                             }}
//                         >
//                             <PanelMenu model={items} />
//                         </OverlayPanel>
//                     </div>
                    
//                     {/* Desktop Menu */}
//                     <div className="hidden sm:block">
//                         <Button 
//                             icon="pi pi-user" 
//                             onClick={(e) => desktopOp.current.toggle(e)} 
//                             text 
//                             rounded 
//                             severity="secondary" 
//                         />
//                         <OverlayPanel 
//                             ref={desktopOp} 
//                             style={{
//                                 width: '300px', 
//                                 direction: 'rtl', 
//                                 fontSize: '1rem',
//                                 whiteSpace: 'nowrap',
//                                 overflow: 'hidden',
//                                 textOverflow: 'ellipsis'
//                             }}
//                         >
//                             <PanelMenu model={items} />
//                         </OverlayPanel>
//                     </div>
//                 </div>
//             </div>
//             {props.children}
//         </div>
//     )
// }


import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import ikeaLogo from '../../pics/Ikea_logo.png';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { PanelMenu } from 'primereact/panelmenu';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { InputIcon } from "primereact/inputicon";
import { IconField } from "primereact/iconfield";
import { FloatLabel } from 'primereact/floatlabel';
import { useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';

const Header = (props) => {

    const op = useRef(null);
    const desktopOp = useRef(null);

    const token = localStorage.getItem("token")
    const { firstName, lastName } = token != null ? JSON.parse(atob(token.split('.')[1])) : "";
   
    const navigate = useNavigate()

    const getInitials = (first, last) => {
        
        return `${first.charAt(0)}${last.charAt(0)}`;
    };

    const itemRenderer = (item, options) => (
        <a className="flex align-items-center px-3 py-2 h-3rem cursor-pointer" onClick={options.onClick}>
            {item.badge && <Badge value={item.badge} size="large" severity="info" />}
            {item.icon && <span className={`${item.icon} text-primary`} />}
            <span className={`mx-2 ${item.items && 'font-semibold'}`}>{item.label}</span>
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );

    const items = token === null ? [{
        label: 'הי! התחברו או הרשמו',
        icon: 'pi pi-user',
        template: itemRenderer,
        expanded: false,
        items: [
            {
                label: 'כניסה',
                icon: 'pi pi-sign-in',
                template: itemRenderer,
                command: () => {
                    navigate("/login")
                    desktopOp.current?.hide()
                    op.current?.hide()
                }
            },
            {
                label: 'הרשמה',
                icon: 'pi pi-user-plus',
                template: itemRenderer,
                command: () => {
                    navigate("/register")
                    desktopOp.current?.hide()
                    op.current?.hide()
                }
            }
        ]
    }] : [{
        
        label: `הי ${firstName}!`,
        badge: `${firstName.charAt(0)}${lastName.charAt(0)}`,
        template: itemRenderer,
        expanded: false,
        items: [
            {
                label: 'התנתקות',
                icon: 'pi pi-sign-out',
                template: itemRenderer,
                command: () => {
                    localStorage.removeItem('token')
                    navigate("/");
                    desktopOp.current?.hide()
                    op.current?.hide()
                }
            }
        ]
    }]
    
    return (
        <div className="flex flex-column" style={{backgroundColor:"rgba(248, 221, 84, 0.67)"}}>
   
            <div className="w-11 flex flex-nowrap align-items-center justify-content-between gap-3 border-1 border-white border-round-3xl p-3 fixed z-5"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.59)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', direction: 'rtl', top: "2%", left: "3%" }}>
                <div className='flex flex-nowrap align-items-center'>
                    <Link to="/" className="flex align-items-center flex-shrink-0">
                        <img src={ikeaLogo} height="40" alt="לוגו" />
                    </Link>

                    <div className="flex-grow-1 w-full mx-2" style={{ maxWidth: "350px", minWidth: "150px" }}>
                        <FloatLabel>
                            <IconField iconPosition="right">
                                <InputIcon className="pi pi-search" />
                                <InputText id="search" className="w-full" />
                            </IconField>
                            <label htmlFor="search">חיפוש</label>
                        </FloatLabel>
                    </div>
                </div>
                
                <div className='flex flex-nowrap align-items-center gap-2'>
                    <div className="flex-shrink-0">
                        <span className="basket" data-pr-tooltip="עליך להתחבר כדי שתוכל להוסיף מוצרים לסל שלך">
                            <Button 
                                icon="pi pi-shopping-cart" 
                                severity="info" 
                                onClick={() => navigate('/basket')} 
                                disabled={token === null} 
                            />
                        </span>
                        {token === null && (
                            <Tooltip target=".basket" mouseTrack mouseTrackBottom={10} />
                        )}
                    </div>
                    
                
                    <div>
                        {token === null ? (
                            <Button 
                                icon="pi pi-user" 
                                onClick={(e) => desktopOp.current.toggle(e)} 
                                text 
                                rounded 
                                severity="secondary" 
                            />
                        ) : (
                            <Avatar
                                label={getInitials(firstName, lastName)}
                                size="normal"
                                style={{ 
                                    backgroundColor: 'var(--cyan-400)',
                                    color: 'white', 
                                    cursor: 'pointer' ,
                                }}
                                onClick={(e) => desktopOp.current.toggle(e)}
                            />
                        )}
                        <OverlayPanel 
                            ref={desktopOp} 
                            style={{
                                width: '300px', 
                                direction: 'rtl', 
                                fontSize: '1rem',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            <PanelMenu model={items} />
                        </OverlayPanel>
                    </div>
                </div>
            </div>
            {props.children}
        </div>
    )
}

export default Header
