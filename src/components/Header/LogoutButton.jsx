import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { Button } from '../Button'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        }).then(() => {
          navigate("/")
        })
    }
    
  return (
    <Button
    className='inline-bock px-4 md:py-2 lg:py-2 sm:py-1 duration-200 md:hover:bg-red-200 text-ms sm:text-xs rounded-full font-bold text-white hover:text-black tracking-[0.12px] text-center sm:size-xs'
    onClick={logoutHandler}
    color="red_50"
    size="md"
    >Logout</Button>
  )
}

export default LogoutBtn