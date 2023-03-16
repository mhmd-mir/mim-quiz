import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchInput from "../../../components/SearchInput/SearchInput";
import TitleHead from "../../../components/TitleHead/TitleHead";
import { convertToFastStructure } from "../../../utils";
export default function AdminLogs() {
    // state => 
    const [filteredData , setFilteredDate] = useState([])
    //SELECTORS => 
    const logs = useSelector(state => state.logs)
    const users = useSelector(state => state.users)
    const fasterUsers = convertToFastStructure(users)
    useEffect(() => {
        setFilteredDate(logs)
    } , [logs])
    return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <TitleHead title="لیست کاربران" />
        <SearchInput
          mainData={logs}
          searchTarget="title"
          setFilteredDate={setFilteredDate}
        />
      </div>

      <div className="row mt-5">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr className="bgHeadTable">
                <th>ردیف</th>
                <th>نام کاربر</th>
                <th>ارمون</th>
                <th>مشاهده کارنامه</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((log, index) => (
                <tr key={log.id}>
                  <td>{index + 1}</td>
                  <td> {fasterUsers[log.userId]?.username} </td>
                  <td>{log.title}</td>
                  <td>
                    <Link to={`/p-admin/logData/${log.id}`} className="text-white btn btn-secondary">مشاهده</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
