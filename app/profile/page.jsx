'use client'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import s from './page.module.scss'
import cm from 'classnames'
import CreateProduct from '../../components/CreateProduct/CreateProduct';
import { getProfile } from '../../app/store/slice/profile-slice'
import CardProduct from '../../components/Cards/CardProduct/CardProduct'
import { FiEdit2 } from 'react-icons/fi';
import EditProduct from '../../components/EditProduct/EditProduct';

function page() {
    const [navBarId, setNavBarId] = React.useState(1)
    const { user, error } = useSelector((state) => state.user);
    const [productStatus, setProductStatus] = React.useState(true)
    const [editCard ,setEditCard] = React.useState(false)
    const [CardEditId ,setCardEditId] = React.useState(0)

    const dispatch = useDispatch();
    const { data, status } = useSelector((state) => state.profileSlice);
    console.log(data, 'asdsadsad');
    useEffect(() => {
        dispatch(getProfile(productStatus))
    }, [productStatus])
    return (
        <div className={s.profile}>
            <div className={s.userInfo}>
                <img src={user?.logo.data.attributes.url} alt="close" />
                <p>{user?.name}</p>
                <p>{user?.email}</p>
                <span>
                    <p>это токен нужен для входа в аккаунт </p>
                    <p> {user?.token}</p>
                </span>
            </div>
            <div className={s.navBar}>
                <ul>
                    <li onClick={() => { setNavBarId(1), setProductStatus(true) }} className={cm({ [s.active]: navBarId == 1 })} > опубликованные продукты        </li>
                    <li onClick={() => { setNavBarId(2), setProductStatus(false) }} className={cm({ [s.active]: navBarId == 2 })} > не опубликованные продукты </li>
                    <li onClick={() => setNavBarId(3)} className={cm({ [s.active]: navBarId == 3 })} >Добавить продукт</li>
                </ul>
            </div>
            <div className={s.Content}>
                {navBarId !== 3 && <div >
                    {data?.data && data.data.length > 0 && status !== "loading" ? (
                        <div className='CardList'>
                            {data.data.map((product, i) => (
                                <div className={s.CardUser}>
                                    <CardProduct key={i} product={product} />
                                    <FiEdit2 onClick={() => {setEditCard(true) ,setCardEditId(product.id)}} className={s.FiEdit2} />
                                </div>
                            ))
                            }
                        </div>
                    ) : status === "loading" ? (
                        <p>Loading...</p>
                    ) : (
                        <p>Нет данных</p>
                    )}
                </div>}
                {editCard &&  <EditProduct setEditCard={setEditCard}  editCard={editCard} CardEditId={CardEditId}/> }
                {navBarId == 3 && <CreateProduct />}
            </div>
        </div>
    )
}

export default page
