'use client'

import React, { useEffect } from 'react'
import s from './page.module.scss'
import Image from 'next/image'
import { getProductId } from '../store/slice/product-full-information'
import { useDispatch, useSelector } from "react-redux";
const page =  ({params:{ id }}) => {

  const dispatch = useDispatch();


const {product , status ,error } = useSelector((state) => state.productSliceFull)
 const res = product?.attributes
 useEffect(() => {
  dispatch(getProductId(id))
},[])

const [imageIndex, setImageIndex] = React.useState(0);
if (status === "loading") {
  return <p>Loading...</p>;
}

  return status === "success" && (
    <div className={s.product} >
        <div className={s.Info}>
        <div className={s.HoomImage}>
        <div className={s.mainImage}>
        <Image 
        src={res?.image?.data[imageIndex].attributes.url}
        alt="Picture of the author"
        objectFit="cover"
        layout="fill"
        />


        </div>
        <div className={s.ImageList}>
        {res?.image?.data.map((item, i) => ( <div className={s.Image}>
          <Image
            key={i}
            src={item.attributes.url}
            alt="Picture of the author"
            objectFit="cover"
            layout="fill"
            onClick={() => setImageIndex(i)}
          />
          </div>
          
        ))}
        </div>
        </div>
        <div className={s.description}>
        
        <h1>{res?.name}</h1>
      <div className={s.user}>
      <div className={s.ava}>
      <Image  src={res?.userLogo} alt="Picture of the author" objectFit="cover" layout="fill"/>
      </div>
      <p>{res?.userNmae}</p>
      </div>
        <p>{res?.description}</p>
        </div>
        </div>
    </div>
  )
}

export default page

