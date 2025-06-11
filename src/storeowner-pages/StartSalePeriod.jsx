// import React, { useState } from "react";
// import CurrentStoreFrontList from "../components/CurrentStoreFrontList";
// import CreateStoreFront from "../components/CreateStoreFront";
// import EndedStorefrontHistory from "../components/EndedStoreFronts";

// export default function StartSalePeriod() {
//   const [storefronts, setStorefronts] = useState([]);

//   const handleNewStorefront = (data) => {
//     console.log("สร้างหน้าร้านใหม่:", data);
//     // You could push into existing list or refetch from backend
//   };

//   return (
//     <div className="space-y-8 p-4 pt-44">
//       <h1 className="text-2xl font-bold">จัดการสาขา</h1>
//       <CurrentStoreFrontList />
//       <div className="pt-4">
//         <CreateStoreFront onCreate={handleNewStorefront} />
//       </div>
//       <EndedStorefrontHistory />
//     </div>
//   );
// }

import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import editIcon from "@/assets/edit-icon.png";
import deleteIcon from "@/assets/delete-icon.png";

const [editDialogOpen, setEditDialogOpen] = useState(false);
const [storefrontToEdit, setStorefrontToEdit] = useState(null);

// Mock data simulating PostgreSQL timestamps
const mockStorefronts = [
  {
    id: "sf1",
    name: "ร้านทองเจ๊สมศรี",
    startDate: "2025-06-10T08:30:00.000Z",
    totalItems: 45,
    totalSales: 125000,
  },
  {
    id: "sf2",
    name: "ร้านทองบางกอก",
    startDate: "2025-06-09T10:15:00.000Z",
    totalItems: 30,
    totalSales: 98000,
  },
  {
    id: "sf3",
    name: "ร้านทองเยาวราช",
    startDate: "2025-06-08T13:45:00.000Z",
    totalItems: 60,
    totalSales: 189500,
  },
];

// Helper to format ISO string to Thai readable format
function formatThaiDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function StartSalePeriod({ storefronts = mockStorefronts }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const openDialog = (storefront) => {
    setToDelete(storefront);
    setDialogOpen(true);
  };

  const confirmDelete = () => {
    if (toDelete) {
      console.log("Deleting storefront:", toDelete.id);
      // TODO: Replace with your actual delete logic
      setDialogOpen(false);
      setToDelete(null);
    }
  };

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold">ร้านค้าที่กำลังขายอยู่</h2>
      {storefronts.length === 0 ? (
        <p className="text-gray-500">ยังไม่มีร้านค้าที่เปิดขายในขณะนี้</p>
      ) : (
        <Accordion type="multiple" className="w-full space-y-4">
          {storefronts.map((storefront) => (
            <AccordionItem key={storefront.id} value={storefront.id}>
              <Card className="p-4">
                <AccordionTrigger className="w-full text-left">
                  <div className="flex flex-col text-start">
                    <span className="font-semibold">{storefront.name}</span>
                    <span className="text-sm text-gray-500">
                      เริ่มขายเมื่อ {formatThaiDate(storefront.startDate)}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="text-sm text-gray-700">
                      <strong>จำนวนสินค้า:</strong> {storefront.totalItems}
                    </div>
                    <div className="text-sm text-gray-700">
                      <strong>ยอดขายรวม:</strong>{" "}
                      {storefront.totalSales.toLocaleString()} บาท
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-9 h-9 p-1 bg-white border flex items-center justify-center"
                        onClick={() => {
                          setStorefrontToEdit(storefront);
                          setEditDialogOpen(true);
                        }}
                      >
                        <img
                          src={editIcon}
                          alt="แก้ไข"
                          className="w-6 h-6 min-w-[1.5rem] min-h-[1.5rem] object-contain"
                        />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="w-9 h-9 p-1 bg-white border flex items-center justify-center"
                        onClick={() => openDialog(storefront)}
                      >
                        <img
                          src={deleteIcon}
                          alt="ลบ"
                          className="w-6 h-6 min-w-[1.5rem] min-h-[1.5rem] object-contain"
                        />
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบ</AlertDialogTitle>
            <AlertDialogDescription>
              ต้องการลบร้านค้า “{toDelete?.name}” หรือไม่?
              <br />
              ข้อมูลที่เกี่ยวข้องกับร้านค้านี้จะถูกลบถาวร
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>ลบ</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {storefrontToEdit && (
        <AlertDialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>แก้ไขร้านค้า</AlertDialogTitle>
            </AlertDialogHeader>

            <div className="space-y-3 text-sm text-gray-700">
              <p>ขออภัย ฟีเจอร์การแก้ไขยังไม่พร้อมใช้งานในตอนนี้</p>
              <p>
                ชื่อร้าน: <strong>{storefrontToEdit.name}</strong>
              </p>
              <p>
                ยอดขาย:{" "}
                <strong>{storefrontToEdit.totalSales.toLocaleString()}</strong>{" "}
                บาท
              </p>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-300 hover:bg-gray-400">
                ปิด
              </AlertDialogCancel>
              {/* <AlertDialogAction onClick={handleEdit}>ยืนยัน</AlertDialogAction> */}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </section>
  );
}
