import React from "react";
import "./Loader.css";

export default function Loader() {
  return (
    <div className="loadingPrant">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
