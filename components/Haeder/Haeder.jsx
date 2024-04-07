"use client";

import React, { useEffect } from "react";
import s from "./page.module.scss";
import Link from "next/link";
import RegistrationModal from '../Modals/RegistrationModal/RegistrationModal'
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../app/store/slice/user-list";
function Haeder() {
  const {data , status , error} = useSelector((state) => state.userListSlice);
  const [registration, setRegistration] = React.useState(false);
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(getUserList())
    },[])

  return (
    <nav className={s.Haeder}>
      <Link href="/" className={s.log}>
        Logo
      </Link>
      <ul>
        <li>Вход</li>
        <li onClick={() => setRegistration(true)} >Регистрация</li>
       
      </ul>
      {registration == true && <RegistrationModal setModalOpen={setRegistration} />}
    </nav>
  );
}

export default Haeder;
