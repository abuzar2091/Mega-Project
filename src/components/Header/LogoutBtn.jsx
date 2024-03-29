import React from 'react'
import authService from '../../appwrite/Auth'
import { logout } from '../../store/authSlice'
import {useDispatch} from 'react-redux'

function LogoutBtn() {
    const dispatch=useDispatch();
    let logoutHandler=()=>{
        authService.logout()
        .then(()=>{
            dispatch(logout());
        })
    }
  return (
   <button className='inline-block px-6 py-2 duration-200
    hover:bg-blue-100 rounded-full'
   onClick={logoutHandler}>
    Logout
   </button>
  )
}

export default LogoutBtn;