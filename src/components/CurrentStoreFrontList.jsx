import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import deleteIcon from "@/assets/delete-icon.png";

// 🧪 Sample data (replace with real API call later)
const sampleStorefronts = [
  {
    id: "sf-001",
    name: "สาขาอโศก",
    startDate: "2025-06-01",
    endDate: "2025-06-20",
    totalSales: 20340,
    totalProducts: 150,
    memo: "ยอดขายพุ่งแรง",
  },
  {
    id: "sf-002",
    name: "สาขาพระราม 9",
    startDate: "2025-06-03",
    endDate: "2025-06-10",
    totalSales: 10500,
    totalProducts: 80,
    memo: "ทดลองพนักงานใหม่",
  },
];

function calculateRemainingDays(endDate) {
  const today = new Date();
  const end = new Date(endDate);
  const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

export default function CurrentStoreFrontList() {
  const [storefronts, setStorefronts] = useState(sampleStorefronts);

  const handleDelete = (id) => {
    setStorefronts((prev) => prev.filter((sf) => sf.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">ร้านค้าปัจจุบัน</h2>
      <Accordion type="single" collapsible className="w-full">
        {storefronts.map((store) => (
          <AccordionItem key={store.id} value={store.id}>
            <AccordionTrigger className="flex justify-between items-center gap-2">
              <span className="text-left">{store.name}</span>
              <Badge variant="success">
                สิ้นสุดลงใน {calculateRemainingDays(store.endDate)} วัน
              </Badge>
            </AccordionTrigger>
            <AccordionContent className="p-4 space-y-2 bg-gray-50 rounded-md">
              <div>
                📅 <strong>วันที่เริ่มต้น:</strong> {store.startDate}
              </div>
              <div>
                📅 <strong>วันที่สิ้นสุด:</strong> {store.endDate}
              </div>
              <div>
                💰 <strong>ยอดขายรวม:</strong> ฿
                {store.totalSales.toLocaleString()}
              </div>
              <div>
                📦 <strong>ยอดรวมจำนวนสินค้าที่ออก:</strong>{" "}
                {store.totalProducts}
              </div>
              <div>
                📝 <strong>บันทึกช่วยจำ:</strong> {store.memo}
              </div>

              <div className="flex gap-3 mt-4">
                {/* Edit Button in Sheet */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="secondary">แก้ไข</Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <h3 className="text-lg font-semibold mb-4">
                      แก้ไข {store.name}
                    </h3>
                    {/* Add edit form fields here later */}
                    <p className="text-sm text-muted-foreground">
                      Coming soon...
                    </p>
                  </SheetContent>
                </Sheet>

                {/* Delete Button with Alert Dialog */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <img
                        src={deleteIcon}
                        alt="delete"
                        className="w-4 h-4 mr-2"
                      />
                      ลบหน้าร้าน
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>ยืนยันการลบ</AlertDialogTitle>
                      <AlertDialogDescription>
                        คุณแน่ใจหรือไม่ว่าต้องการลบหน้าร้านนี้?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(store.id)}>
                        ลบ
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
