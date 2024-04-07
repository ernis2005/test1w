import React from "react";
import s from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
function CardProduct({ product }) {
  const res = product?.attributes;
  console.log(product, "test");

  return (
    <div className={s.Card}>
      <Link  href={`/${product.id}`} className={s.Image}>
        <Image
          src={res?.image?.data[0].attributes.url}
          alt="Picture of the author"
          objectFit="cover"
          layout="fill"
        />
      </Link>
      <span>
      <p>{res.name.slice(0, 15)}</p>
      <p>{res.price}</p>
      </span>
    </div>
  );
}

export default CardProduct;
