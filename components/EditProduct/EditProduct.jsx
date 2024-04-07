import React, { useEffect, useState } from 'react'
import s from './page.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { AiOutlineDelete } from 'react-icons/ai';
import useFileChange from '../../app/hooks/useFileChange';
import Loading from '../loading/loading';
import { getProductId } from '../../app/store/slice/product-full-information';
import axios from 'axios'
import { Api } from '../../app/api';
import { editProductList } from '../../app/store/slice/create-product-slice';
import { BiX } from 'react-icons/bi';
function EditProduct({ setEditCard, editCard, CardEditId }) {
    const { register, handleSubmit, watch, formState: { errors } ,reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { product, } = useSelector((state) => state.productSliceFull)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductId(CardEditId))
    }, [CardEditId])

    const res = product?.attributes;
    const onSubmit = (data) => {
        if (data.description?.length <= 0) {
            data.description = res?.description
        }
        if (data.price?.length <= 0) {
            data.price = res?.price
        }
        if (data.name?.length <= 0) {
            data.name = res?.name
        }
        const datas = [data, CardEditId,]
        dispatch(editProductList(datas))
    }

    useEffect(() => {
        if (editCard === true) {
            document.body.style.overflow = "hidden";
            window.scrollTo(0, 0);
        } else {
            document.body.style.overflow = "";
        }
    });

    return (
        <div className={s.EditProduct}>
            <div className={s.EditProductInfo}>
            <span className={s.BIX} onClick={() => setEditCard(false)}><BiX /></span>
                <form className={s.form} onSubmit={handleSubmit(onSubmit)} >
                    {isLoading && <Loading />}
                    <input type="text" defaultValue={res?.name} placeholder='Name' {...register("name",)} />
                    <textarea type="text" defaultValue={res?.description} placeholder='Description' {...register("description",)} />
                    <input type="number" defaultValue={res?.price} placeholder='Price' {...register("price",)} />
                    <p> картинку нельзя поменять У меня слабый сервер и он ломается</p>
                   <div className={s.ImageList}>
                        {res?.image?.data?.map((image, index) => (
                            <div key={index}>
                                <img key={index} src={image?.attributes.url} alt="Selected" />
                            </div>
                        ))}
                       
                    </div>
                    <label>
                        <input type="checkbox"  {...register("published")} />  <p> "нужно выбрать нужный статус" опубликовать</p>
                    </label>
                    <button style={{ cursor: 'pointer' }} type="submit" >Добавить продукт</button>
                </form>
                f
            </div>
        </div>
    )
}

export default EditProduct
