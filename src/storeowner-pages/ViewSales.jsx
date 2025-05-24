export default function ViewSales() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">ดูยอดขาย</h1>
      <p className="text-gray-700 mb-6">
        หน้านี้จะแสดงข้อมูลยอดขายทั้งหมดของร้านค้า
      </p>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                วันที่
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ยอดขาย
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* รายการยอดขายจะถูกแสดงที่นี่ */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
