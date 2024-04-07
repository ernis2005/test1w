"use client";
import React from "react";
import s from './page.module.scss'
function ProductSorter() {
  const [sort, setSort] = React.useState();
  const sortList = [
    {
      id: 1,
      name: "Цена: от низкой к высокой",
    },
    {
      id: 2,
      name: "Цена: от высокой к низкой",
    },
    {
      id: 3,
      name: "Самые новые",
    },
    {
      id: 4,
      name: "Самые старые",
    },
  ];

  return (
    <ul className={s.sorter}>
      {sortList.map((item) => (
        <li key={item.id} onClick={() => setSort(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

export default ProductSorter;
