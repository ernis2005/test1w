"use client";

import React, { useEffect } from "react";
import s from "./page.module.scss";
import Link from "next/link";
import RegistrationModal from '../Modals/RegistrationModal/RegistrationModal'
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../app/store/slice/user-list";
import { getUser } from "../../app/store/slice/user-slice";
function Haeder() {
  const { user, status, error } = useSelector((state) => state.user);
  console.log(user);
  const [registration, setRegistration] = React.useState( );
  const dispatch = useDispatch()
  useEffect(() => {
    const userToken = localStorage.getItem('token')

    if (userToken) {
      dispatch(getUser())
    }

  }, [])

  return (
    <nav className={s.Haeder}>
      <Link href="/" className={s.log}>
        Logo
      </Link>
      {user ? <Link href="/profile" className={s.Name} >
        {user?.name}
      </Link> : <ul>
        <li>Вход</li>
        <li onClick={() => setRegistration(true)} >Регистрация</li>
      </ul>}
      {registration == true && <RegistrationModal setModalOpen={setRegistration} />}
    </nav>
  );
}

export default Haeder;
