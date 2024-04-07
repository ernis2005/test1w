"use client";

import { useDispatch, useSelector } from "react-redux";
import Haeder from "../components/Haeder/Haeder";
import { useEffect } from "react";
import CardProduct from "../components/Cards/CardProduct/CardProduct";
import s from "./page.module.scss";
import { getProducts } from "./store/slice/product-list-slice";

export default function Page() {
  const dispatch = useDispatch();
  const { products, error, status } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProducts());
 
  }, []);
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return (
    status === "success" && (
      <div>
        <div className={s.CardList}>
          {products?.data.map((product, i) => (
            <CardProduct key={i} product={product} />
          ))}
        </div>
      </div>
    )
  );
}
