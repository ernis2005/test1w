'use client'
import React, { useEffect } from 'react'
import s from './page.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form'
import { getUserList } from "../../../app/store/slice/user-list";
const EntranceModal = ({setModalOpen}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(getUserList())
    },[])
    const { data } = useSelector((state) => state.userListSlice);
    const onSubmit = (res) => {
        const filter =   data?.data?.filter((data)=>  data.attributes.token ==  res.token)
        if (filter != undefined) {
            localStorage.setItem('token', res.token)
            setModalOpen(false)
            window.location.reload()
        } else {
            alert('Неверный токен')
        }

    }
return (
    <div className={s.EntranceModal}>
    <div className={s.Info}>
    <p>Вход</p>
    
    <form onSubmit={handleSubmit(onSubmit)}>
        <label>
            <input {...register("token", { required: 'token обязателен' })} placeholder='token' />
            {errors.token && <p>{errors.token.message}</p>}
        </label>
        
        <button type='submit'>Войти</button>
    </form>
    </div>
      
    </div>
  )
}

export default EntranceModal
