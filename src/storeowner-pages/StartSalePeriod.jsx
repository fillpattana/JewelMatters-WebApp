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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import editIcon from "@/assets/edit-icon.png";
import deleteIcon from "@/assets/delete-icon.png";

const initialMockStorefronts = [
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

export default function StartSalePeriod() {
  const [storefronts, setStorefronts] = useState(initialMockStorefronts);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [storefrontToEdit, setStorefrontToEdit] = useState(null);
  const [storefrontToDelete, setStorefrontToDelete] = useState(null);

  // Handle Edit Save
  const handleEditStorefront = () => {
    setStorefronts((prev) =>
      prev.map((sf) => (sf.id === storefrontToEdit.id ? storefrontToEdit : sf))
    );
    setEditDialogOpen(false);
    setStorefrontToEdit(null);
  };

  // Handle Delete
  const handleDeleteStorefront = () => {
    setStorefronts((prev) =>
      prev.filter((sf) => sf.id !== storefrontToDelete.id)
    );
    setDeleteDialogOpen(false);
    setStorefrontToDelete(null);
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
                          setStorefrontToEdit({ ...storefront });
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
                        onClick={() => {
                          setStorefrontToDelete(storefront);
                          setDeleteDialogOpen(true);
                        }}
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

      {/* Edit Dialog */}
      {storefrontToEdit && (
        <AlertDialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>แก้ไขร้านค้า</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="space-y-3">
              <div>
                <Label>ชื่อร้าน</Label>
                <Input
                  value={storefrontToEdit.name}
                  onChange={(e) =>
                    setStorefrontToEdit({
                      ...storefrontToEdit,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>จำนวนสินค้า</Label>
                <Input
                  type="number"
                  value={storefrontToEdit.totalItems}
                  onChange={(e) =>
                    setStorefrontToEdit({
                      ...storefrontToEdit,
                      totalItems: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label>ยอดขายรวม</Label>
                <Input
                  type="number"
                  value={storefrontToEdit.totalSales}
                  onChange={(e) =>
                    setStorefrontToEdit({
                      ...storefrontToEdit,
                      totalSales: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-300 hover:bg-gray-400">
                ยกเลิก
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-[#192F7B] hover:bg-[#16296b] text-white"
                onClick={handleEditStorefront}
              >
                ยืนยัน
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Delete Confirmation Dialog */}
      {storefrontToDelete && (
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>ยืนยันการลบร้านค้า</AlertDialogTitle>
              <AlertDialogDescription>
                ยืนยันที่จะลบข้อมูลของสาขา{" "}
                <span className="font-semibold">{storefrontToDelete.name}</span>{" "}
                หรือไม่?
                <br />
                การลบจะ{" "}
                <span className="font-semibold">
                  ไม่สามารถกู้คืนข้อมูลกลับมา
                </span>{" "}
                ได้ในภายหลัง
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-300 hover:bg-gray-400">
                ยกเลิก
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleDeleteStorefront}
              >
                ลบร้านค้า
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </section>
  );
}
