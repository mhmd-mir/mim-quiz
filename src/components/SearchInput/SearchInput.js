import React from "react";

export default function SearchInput({mainData , setFilteredDate , searchTarget}) {
    // handler
  const searchLogicHandler = (searchValue) => {
    const filteredData = mainData.filter(data => {
        return data[searchTarget].includes(searchValue)
    })
    setFilteredDate(filteredData)
  };
  return (
    <>
      <div className="ps-4">
        <input
          type="text"
          className="searchInput"
          placeholder="جست و جو کنید"
          onKeyUp={(event) => searchLogicHandler(event.target.value)}
        />
      </div>
    </>
  );
}
