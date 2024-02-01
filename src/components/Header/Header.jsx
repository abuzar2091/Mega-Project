import React, { useState,useEffect } from 'react'
// import LogoutBtn from './LogoutBtn'
import {Container,Login,Logo,LogoutBtn} from '../index'
import { Link,NavLink,useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import authService from '../../appwrite/Auth'
import { login, logout } from '../../store/authSlice'


        

//isme status m mistake hai

function Header() {
    let [email,setEmail]=useState("");
    const [userid,setUserId]=useState("");
    let authStatus=useSelector((state)=>(state.auth.status));
    let navigate=useNavigate();
  
   
  useEffect(() => {
    async function fetchUser() {
      try {
        const user =  await authService.getCurrentUSer();
        setEmail(user.email);
        setUserId(user.$id);
        // console.log("re render",Math.random());
        // console.log(user.$id);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
    fetchUser();
  }, [email,setEmail,authStatus]);


    let navItems=[
        {name:"Home",slug:"/",active:true},
        {name:"Login",slug:'/login',active:!authStatus},
        {name:"Signup",slug:'/signup',active:!authStatus},
        {name:"All Posts",slug:'/all-posts',active:authStatus},
        {name:"Add Post",slug:'/add-post',active:authStatus},
        

    ]
  return (
   <header className='py-3 shadow bg-gray-500'>
    <Container>
        <nav className='flex'>
            <div className='mr-4'>
                <Link to={"/"}>
                    <Logo width='70px'/>
                </Link>

            </div>

            <ul  className=' flex ml-auto'>
                {
                    navItems.map((item)=>
                    item.active?(
                        <li key={item.name}
                     
                    >
                             {/* <Link onClick={()=>{
                                navigate(item.slug)}} */}
                                <NavLink to={`${item.slug}`}
                                 className={({isActive}) =>
                                 `inline-block px-6 py-2 duration-200 hover:bg-blue-100
                                rounded-full
                                 ${isActive?"text-blue-700 ":"text-white-700"}`
                              }
                                // className=' inline-block px-6 py-2 duration-200 hover:bg-blue-100
                                // rounded-full'
                                
                             >{item.name}</NavLink>
                        </li>
                    ):null ) }

                    {
                        authStatus && (
                            <>
                             <li>
                                 <LogoutBtn/>
                                 </li>
                            <li className='inline-block px-6 py-0 duration-200
                          hover:bg-blue-100 rounded-full'>
                                  <div>
                                <NavLink to={`/user/${email}`}
                                    className={({isActive}) =>
                                   `${isActive?"text-blue-700 ":"text-white-700"}`
                                 }
                                
                                 >
                                    user<br/>
                                  {email}
                                  </NavLink>
                                       
                                  </div>
                              
                            </li>
                        
                              
                            </>
                           
                        ) 
                        }
            </ul>

        </nav>

    </Container>

   </header>
  )
}

export default Header;