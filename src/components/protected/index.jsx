import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "../loader";

const Protected = () => {
  // aktif kullanıcı state'i
  const [user, setUser] = useState(undefined); // undefined | null | {}

  // aktif kullanıcının oturum verisini al
  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user));
  }, []);

  // kullanıcı verisi yükleniyorsa: loader bas
  if (user === undefined) return <Loader />;

  // kullanıcı oturumu kapalıysa: logib sayfasına yönlendir
  if (user === null) return <Navigate to="/login" replace />;

  // kullanıcının oturumu açıksa: alt route'un elementini ekrana bas
  return <Outlet context={user} />;
};

export default Protected;
