import React, { useState } from "react";
import CurrentStoreFrontList from "../components/CurrentStoreFrontList";
import CreateStoreFront from "../components/CreateStoreFront";
import EndedStorefrontHistory from "../components/EndedStoreFronts";

export default function StartSalePeriod() {
  const [storefronts, setStorefronts] = useState([]);

  const handleNewStorefront = (data) => {
    console.log("สร้างหน้าร้านใหม่:", data);
    // You could push into existing list or refetch from backend
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">จัดการสาขา</h1>
      <CurrentStoreFrontList />
      <div className="pt-4">
        <CreateStoreFront onCreate={handleNewStorefront} />
      </div>
      <EndedStorefrontHistory />
    </div>
  );
}
