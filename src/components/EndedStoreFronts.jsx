import React from "react";

const endedStorefronts = [
  {
    id: "h-001",
    name: "สาขาสีลม",
    startDate: "2025-04-01",
    endDate: "2025-04-15",
    totalSales: 13200,
    totalProducts: 90,
  },
  {
    id: "h-002",
    name: "สาขาจตุจักร",
    startDate: "2025-03-20",
    endDate: "2025-04-05",
    totalSales: 8900,
    totalProducts: 60,
  },
  // ... add up to 15
];

export default function EndedStoreFronts() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">ร้านค้าที่สิ้นสุดลง</h2>
      {endedStorefronts.length === 0 ? (
        <p className="text-muted-foreground">ยังไม่มีหน้าร้านที่สิ้นสุดลง</p>
      ) : (
        <div className="space-y-3">
          {endedStorefronts.slice(0, 15).map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-lg shadow-sm border px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <div>
                <h3 className="font-semibold text-base">{store.name}</h3>
                <p className="text-sm text-gray-500">
                  วันที่เริ่มต้น: {store.startDate} | วันที่สิ้นสุด:{" "}
                  {store.endDate}
                </p>
              </div>
              <div className="mt-2 sm:mt-0 sm:text-right text-sm">
                <div>💰 ยอดขายรวม: ฿{store.totalSales.toLocaleString()}</div>
                <div>📦 สินค้าที่ออก: {store.totalProducts}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
