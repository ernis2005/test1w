"use client";

import { useDispatch, useSelector } from "react-redux";
import Haeder from "../components/Haeder/Haeder";
import { useEffect, useState } from "react";
import CardProduct from "../components/Cards/CardProduct/CardProduct";
import s from "./page.module.scss";
import { getProducts } from "./store/slice/product-list-slice";

export default function Page() {
  const dispatch = useDispatch();
  const { products, error, status } = useSelector((state) => state.product);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    dispatch(getProducts(pageSize));
  }, [pageSize]);
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return (
    status === "success" && (
      <div>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(e.target.value)}
          style={{ marginBottom: '20px', marginTop: '20px' }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={1000}>все</option>
        </select>

        <div className='CardList'>

          {products?.data.length == 0 && <p className={s.P}>Товаров нет</p>}
          {products?.data.map((product, i) => (
            <CardProduct key={i} product={product} />
          ))}

          <div className={s.pagination}>



          </div>
        </div>
      </div>
    )
  );
}
