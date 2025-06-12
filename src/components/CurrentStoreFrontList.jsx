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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

import editIcon from "@/assets/edit-icon.png";
import deleteIcon from "@/assets/delete-icon.png";

const initialMockStorefronts = [
  {
    id: "sf1",
    name: "วานิชเพชรบุรี",
    startDate: "2025-06-10T08:30:00.000Z",
    endDate: "2025-06-14T08:30:00.000Z",
    totalItems: 45,
    totalSales: 125000,
  },
  {
    id: "sf2",
    name: "ศูนย์แจ้งวัฒนะ",
    startDate: "2025-06-09T10:15:00.000Z",
    endDate: "2025-06-13T10:15:00.000Z",
    totalItems: 30,
    totalSales: 98000,
  },
  {
    id: "sf3",
    name: "ปัญญาพิวัตณ์ CP",
    startDate: "2025-06-08T13:45:00.000Z",
    endDate: "2025-06-12T13:45:00.000Z",
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

// Calculate days remaining
function getDaysRemaining(endDate) {
  const today = new Date();
  const end = new Date(endDate);
  const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  return diff;
}

export default function CurrentStoreFrontList() {
  const [storefronts, setStorefronts] = useState(
    [...initialMockStorefronts].sort(
      (a, b) => new Date(b.startDate) - new Date(a.startDate)
    )
  );
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' or 'desc'
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [storefrontToEdit, setStorefrontToEdit] = useState(null);
  const [storefrontToDelete, setStorefrontToDelete] = useState(null);

  // Toggle sort order and re-sort
  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    setStorefronts((prev) =>
      [...prev].sort((a, b) =>
        newOrder === "asc"
          ? new Date(a.startDate) - new Date(b.startDate)
          : new Date(b.startDate) - new Date(a.startDate)
      )
    );
  };

  // Handle Edit Save
  const handleEditStorefront = () => {
    const updated = storefronts.map((sf) =>
      sf.id === storefrontToEdit.id ? storefrontToEdit : sf
    );
    const sorted = [...updated].sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.startDate) - new Date(b.startDate)
        : new Date(b.startDate) - new Date(a.startDate)
    );
    setStorefronts(sorted);
    setEditDialogOpen(false);
    setStorefrontToEdit(null);
  };

  // Handle Delete
  const handleDeleteStorefront = () => {
    setStorefronts((prev) =>
      [...prev.filter((sf) => sf.id !== storefrontToDelete.id)].sort((a, b) =>
        sortOrder === "asc"
          ? new Date(a.startDate) - new Date(b.startDate)
          : new Date(b.startDate) - new Date(a.startDate)
      )
    );
    setDeleteDialogOpen(false);
    setStorefrontToDelete(null);
  };

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">ร้านค้าที่กำลังขายอยู่</h2>
        <Label className="flex items-center gap-2 cursor-pointer">
          <span className="text-sm text-gray-700">
            {sortOrder === "asc" ? "เก่าไปใหม่" : "ใหม่ไปเก่า"}
          </span>
          <Switch
            checked={sortOrder === "asc"}
            onCheckedChange={toggleSortOrder}
            className="data-[state=checked]:bg-[#202C7C]"
          />
        </Label>
      </div>

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
                    <span>
                      <Badge
                        variant="outline"
                        className={
                          getDaysRemaining(storefront.endDate) <= 0
                            ? "bg-gray-400 text-white"
                            : getDaysRemaining(storefront.endDate) <= 1
                              ? "bg-orange-500 text-white"
                              : "bg-green-500 text-white"
                        }
                      >
                        {getDaysRemaining(storefront.endDate) > 0
                          ? `สิ้นสุดลงใน ${getDaysRemaining(storefront.endDate)} วัน`
                          : "สิ้นสุดแล้ว"}
                      </Badge>
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
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex gap-2">
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
