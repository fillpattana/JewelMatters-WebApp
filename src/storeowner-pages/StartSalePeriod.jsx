// export default function StartSalePeriod() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">เริ่มช่วงการขาย</h1>
//       <form className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             วันที่เริ่มต้น
//           </label>
//           <input
//             type="date"
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             วันที่สิ้นสุด
//           </label>
//           <input
//             type="date"
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
//         >
//           เริ่มขาย
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import "../styles/ManageBranches.css"; // move <style> there or keep in styled-components

const storefrontsData = [
  {
    id: 1,
    name: "สาขาสุขุมวิท 21",
    status: "ยังไม่สิ้นสุด",
    statusLabel: "ยังไม่สิ้นสุด",
    startDate: "2023-01-05",
    endDate: null,
    sales: 157900,
    itemsSold: 3187,
  },
  {
    id: 2,
    name: "สาขาราชพฤกษ์",
    status: "ยังไม่สิ้นสุด",
    statusLabel: "ยังไม่สิ้นสุด",
    startDate: "2023-04-12",
    endDate: null,
    sales: 230500,
    itemsSold: 4958,
  },
  {
    id: 3,
    name: "สาขานิมมานฯ",
    status: "ยังไม่สิ้นสุด",
    statusLabel: "ยังไม่สิ้นสุด",
    startDate: "2023-07-31",
    endDate: null,
    sales: 144200,
    itemsSold: 2428,
  },
];

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const StartSalePeriod = () => {
  const [selectedId, setSelectedId] = useState(storefrontsData[0].id);

  const selectedStore = storefrontsData.find(
    (store) => store.id === selectedId
  );

  return (
    <div className="container" id="component-container">
      <div className="page-title">จัดการสาขา</div>
      <div>
        <div className="section-title">ร้านค้าปัจจุบัน</div>
        <div className="storefront-list">
          {storefrontsData.map((store) => (
            <div
              key={store.id}
              className={`storefront-card ${selectedId === store.id ? "selected" : ""}`}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedId(store.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedId(store.id);
              }}
              aria-label={`ดูรายละเอียดสำหรับ ${store.name}`}
            >
              <div className="storefront-info">
                <div className="storefront-title">{store.name}</div>
                <div className="storefront-status">
                  <i
                    className="fas fa-circle"
                    style={{ fontSize: "10px", color: "var(--success)" }}
                  ></i>
                  {store.statusLabel}
                </div>
              </div>
              <span className="storefront-arrow">
                <i className="fas fa-chevron-right"></i>
              </span>
            </div>
          ))}
        </div>

        {selectedStore && (
          <div className="storefront-details" aria-live="polite">
            <div className="details-row">
              <span className="details-label">วันที่เริ่มต้น</span>
              <span className="details-value">{selectedStore.startDate}</span>
            </div>
            <div className="details-row">
              <span className="details-label">วันที่สิ้นสุด</span>
              <span className="details-value">
                {selectedStore.endDate || "-"}
              </span>
            </div>
            <div className="details-row">
              <span className="details-label">ยอดขายรวม</span>
              <span className="details-value">
                {numberWithCommas(selectedStore.sales)} บาท
              </span>
            </div>
            <div className="details-row">
              <span className="details-label">ยอดรวมจำนวน สินค้าออก</span>
              <span className="details-value">
                {numberWithCommas(selectedStore.itemsSold)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartSalePeriod;
