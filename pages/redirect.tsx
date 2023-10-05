import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Redirect = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, []);

  return <div></div>;
};

export default Redirect;
