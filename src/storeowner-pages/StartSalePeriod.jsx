import React, { useState } from "react";
import CurrentStoreFrontList from "../components/CurrentStoreFrontList";
import CreateStoreFront from "../components/CreateStoreFront";
import EndedStorefrontHistory from "../components/EndedStoreFronts";
import CalendarTest from "../components/CalendarTest";

export default function StartSalePeriod() {
  const [storefronts, setStorefronts] = useState([]);

  const handleNewStorefront = (data) => {
    console.log("สร้างหน้าร้านใหม่:", data);
    // You could push into existing list or refetch from backend
  };

  return (
    <div className="space-y-8 p-4 pt-44">
      <h1 className="text-2xl font-bold">จัดการสาขา</h1>
      <CalendarTest />
      <CurrentStoreFrontList />
      <div className="pt-4">
        <CreateStoreFront onCreate={handleNewStorefront} />
      </div>
      <EndedStorefrontHistory />
    </div>
  );
}
