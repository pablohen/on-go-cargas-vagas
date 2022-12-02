import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { useOnGoCargas } from "../../hooks/useOnGoCargas";

export function ProtectedPages() {
  const { user, logout } = useOnGoCargas();

  useEffect(() => {
    if (!user) {
      logout();
    }
  }, [user]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
