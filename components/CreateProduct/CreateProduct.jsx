'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import s from './page.module.scss'
import { AiOutlineDelete } from 'react-icons/ai'

import { useDispatch, useSelector } from "react-redux";
import useFileChange from '../../app/hooks/useFileChange'
import { createProduct } from '../../app/store/slice/create-product-slice'
import Loading from '../loading/loading'
const CreateProduct = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { image, selectedImages, handleFileChange, handleDeleteImage, setImage, setSelectedImages } = useFileChange();
    const { user, } = useSelector((state) => state.user);
    const { status, data, error, } = useSelector((state) => state.createProductSlice);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()

    const onSubmit = (data) => {
      
        const userInfo = {
            userLogo: user?.logo.data.attributes.url,
            userNmae: user?.name,
            userToken: user?.token,
        }
        const datas = [data, image, userInfo]
        dispatch(createProduct(datas));
    }
    useEffect(() => {
        if (isLoading === true) {
            document.body.style.overflow = "hidden";
            window.scrollTo(0, 0);
        } else {
            document.body.style.overflow = "";
        }
    });
    useEffect(() => {
        if (status == "success") {
            setIsLoading(false)
            setSelectedImages([])
            setImage([])
            reset();
        }
    }, [status]);
    useEffect(() => {
        if (status == "loading") {
            setIsLoading(true)
        }
    }, [status]);
    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)} >
            {isLoading && <Loading />}

            <input type="text" placeholder='Name' {...register("name", { required: true })} />
            <textarea type="text" placeholder='Description' {...register("description", { required: true })} />
            <input type="number" placeholder='Price' {...register("price", { required: true })} />

            <p>рекомендую отправлять только две три картинки </p>
            <input onChange={(e) => {
                handleFileChange(e);
            }} multiple type="file"   max={2} accept=".jpg, .jpeg, .png, " placeholder='image' />
            <div className={s.ImageList}>
                {selectedImages?.map((image, index) => (
                    <div key={index}>
                        <AiOutlineDelete onClick={() => handleDeleteImage(index)} />
                        <img key={index} src={image} alt="Selected" />
                    </div>
                ))}
            </div>
            <label>
                <input type="checkbox"  {...register("published",)} />
                <p> опубликовать</p>
            </label>
            <button style={{ cursor: 'pointer' }} type="submit" >Добавить продукт</button>
        </form>
    )
}

export default CreateProduct
