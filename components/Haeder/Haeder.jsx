"use client";

import React, { useEffect } from "react";
import s from "./page.module.scss";
import Link from "next/link";
import RegistrationModal from '../Modals/RegistrationModal/RegistrationModal'
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../app/store/slice/user-list";
import { getUser } from "../../app/store/slice/user-slice";
import EntranceModal from '../Modals/EntranceModal/EntranceModal'
function Haeder() {
  const { user, status, error } = useSelector((state) => state.user);

  const [registration, setRegistration] = React.useState(false);
  const [login, setLogin] = React.useState(false);

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
        <li onClick={() => setLogin(true)}>Вход</li>
        <li onClick={() => setRegistration(true)} >Регистрация</li>
      </ul>}
      {registration == true && <RegistrationModal setModalOpen={setRegistration} />}
      {login == true && <EntranceModal setModalOpen={setLogin} />}
    </nav>
  );
}

export default Haeder;
