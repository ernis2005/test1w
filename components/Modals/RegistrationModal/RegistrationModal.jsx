"use client";
import React, { useEffect, useState } from 'react'
import s from './page.module.scss'
import { useForm } from 'react-hook-form'
import { generateToken } from '../../../app/hooks/generate'
import useFileChange from '../../../app/hooks/useFileChange'
import { useDispatch, useSelector } from "react-redux";
import { registration, } from '../../../app/store/slice/registration-slice'
import { BiX } from "react-icons/bi";

function RegistrationModal({ setModalOpen }) {
    const { register, handleSubmit, formState: { errors } } = useForm({});
    const { image, selectedImages, handleFileChange, } = useFileChange();
    const dispatch = useDispatch()
    const onSubmit = (data) => {
        if (data.password !== data.password2) {
            alert("Пароли не совпадают");
            return;
        }
        const newToken = generateToken(40)
        const datas = {
            name: data.name,
            email: data.email,
            password: data.password,
            token: newToken,
            image: image[0],
        }
        dispatch(registration(datas));
    }
    const { status, data, error, userList, isRegistered } = useSelector((state) => state.registrationSlice);
    useEffect(() => {
        if (isRegistered == true) {
            setModalOpen(false)
        }
    }, [isRegistered]);
    return (
        <div className={s.RegistrationModal}>
            <div className={s.Info}>
                {status == "loading" ? <p>Загрузка</p> : <>
                    <span className={s.BIX} onClick={() => setModalOpen(false)}><BiX /></span>
                    <p>Зарегистрироваться</p>
                    {selectedImages[0] && <img src={selectedImages[0]} alt="close" style={{ width: '100px', height: '100px', borderRadius: '100%', objectFit: 'cover', }} />}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label>
                            <input type="file" {...register("image", { required: 'Фото обязательно' })} placeholder='Фото' onChange={(e) => handleFileChange(e)} />
                            {errors.image && <p>{errors.image.message}</p>}
                        </label>
                        <label>
                            <input {...register("name", { required: 'Имя обязательно' })} placeholder='Имя' />
                            {errors.name && <p>{errors.name.message}</p>}
                        </label>
                        <label>
                            <input type='email' {...register("email", { required: 'Email обязателен' })} placeholder='Email' />
                            {errors.email && <p>{errors.email.message}</p>}
                        </label>
                        <label >
                            <input {...register("password", { required: 'Пароль обязателен' })} placeholder='Пароль' />
                            {errors.password && <p>{errors.password.message}</p>}
                        </label>
                        <label>
                            <input {...register("password2", { required: 'Повторите пароль' })} placeholder='Повторите пароль' />
                            {errors.password2 && <p>{errors.password2.message}</p>}
                        </label>
                        <input type='submit' />
                    </form>
                </>}

            </div>
        </div>
    )
}

export default RegistrationModal