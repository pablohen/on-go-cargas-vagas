import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { useOnGo } from "../../hooks/useOnGo";

export function ProtectedPages() {
  const { user, logout } = useOnGo();

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
