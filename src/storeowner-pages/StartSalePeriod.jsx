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

import UpArrowIcon from "@/assets/up-arrows-icon.png";
import DownArrowIcon from "@/assets/down-arrows-icon.png";

export default function StartSalePeriod({ storefronts = [] }) {
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
                      เริ่มขายเมื่อ {storefront.startDate}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="text-sm text-gray-700">
                      <strong>จำนวนสินค้า:</strong> {storefront.totalItems}
                    </div>
                    <div className="text-sm text-gray-700">
                      <strong>ยอดขายรวม:</strong> {storefront.totalSales} บาท
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline">แก้ไข</Button>
                      <Button
                        variant="destructive"
                        onClick={() => openDialog(storefront)}
                      >
                        ลบ
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
    </section>
  );
}
