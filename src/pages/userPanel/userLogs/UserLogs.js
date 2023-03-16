import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import TitleHead from "../../../components/TitleHead/TitleHead";
import LogBox from "../../../components/userPanel/LogBox/LogBox";
import supabase from "../../../supabase";
import "./UserLogs.css";

export default function UserLogs() {
  const [userLogs, setUserLogs] = useState([]);
    // selectors =? 
    const isLoading = useSelector(state => state.loading)
    // dispatch 
    const reduxDispatch = useDispatch()

  // useEffect =>
  useEffect(() => {
    
    (async function () {
        reduxDispatch({type : 'loader/LOADING_ON'})
      const { data, error } = await supabase
        .from("users")
        .select(
          `
          id ,
          logs  (
            *
          )
      `
        )
        .eq("id", +localStorage.getItem("userId"));
      setUserLogs(data[0].logs);
      reduxDispatch({type : 'loader/LOADING_OFF'})
    })();
  }, []);
  return (
    <>
        {isLoading && <Loader />}
      <TitleHead title="کارنامه های من" />

      <div className="row mt-5 rtl">
        {userLogs.map((userLog) => (
          <div className="col-lg-3 mt-3">
            <LogBox {...userLog}/>
          </div>
        ))}
      </div>
    </>
  );
}
