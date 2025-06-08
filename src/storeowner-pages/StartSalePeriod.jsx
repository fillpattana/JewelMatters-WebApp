import React from "react";
import CurrentStorefrontList from "../components/CurrentStoreFrontList";

export default function StartSalePeriod() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">จัดการสาขา</h1>
      <CurrentStorefrontList />
      {/* Other sections to be added later */}
    </div>
  );
}
