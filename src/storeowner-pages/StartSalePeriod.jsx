import React, { useState, useEffect } from "react";
import {
  format,
  differenceInDays,
  isBefore,
  isAfter,
  parseISO,
} from "date-fns";
import { DatePicker } from "../components/ui/datepicker";
import { EmployeeCombobox } from "../components/ui/employeecombobox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editIcon, deleteIcon } from "@/components/icons"; // if you have these icons, else replace with something else

const MOCK_EMPLOYEES = [
  { value: "emp1", label: "สมชาย" },
  { value: "emp2", label: "สมหญิง" },
  { value: "emp3", label: "ศิริพร" },
];

const MOCK_STOREFRONTS = [
  {
    id: 1,
    name: "สาขาอโศก",
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    employee: "สมชาย",
    note: "ยอดขายดีมาก",
  },
  {
    id: 2,
    name: "สาขาเซ็นทรัล",
    startDate: "2025-05-01",
    endDate: "2025-05-31",
    employee: "สมหญิง",
    note: "ลูกค้าเยอะ",
  },
];

export default function StartSalePeriod() {
  const [storefronts, setStorefronts] = useState(MOCK_STOREFRONTS);
  const [dialogOpen, setDialogOpen] = useState(false);

  // New storefront form states
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [note, setNote] = useState("");

  // Calculate days left helper
  const calculateDaysLeft = (end) => {
    const today = new Date();
    const endD = typeof end === "string" ? parseISO(end) : end;
    if (isBefore(endD, today)) return 0;
    return differenceInDays(endD, today);
  };

  // Filter active storefronts (endDate >= today)
  const activeStorefronts = storefronts.filter(({ endDate }) => {
    const today = new Date();
    const endD = parseISO(endDate);
    return isAfter(endD, today) || differenceInDays(endD, today) === 0;
  });

  // Filter ended storefronts (for history)
  const endedStorefronts = storefronts
    .filter(({ endDate }) => {
      const today = new Date();
      const endD = parseISO(endDate);
      return isBefore(endD, today);
    })
    .slice(-15)
    .reverse();

  const resetForm = () => {
    setName("");
    setStartDate(null);
    setEndDate(null);
    setSelectedEmployee("");
    setNote("");
  };

  const handleCreateStorefront = (e) => {
    e.preventDefault();
    if (!name || !startDate || !endDate || !selectedEmployee) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    const newStorefront = {
      id: Date.now(),
      name,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      employee: MOCK_EMPLOYEES.find((emp) => emp.value === selectedEmployee)
        ?.label,
      note,
    };
    setStorefronts((prev) => [...prev, newStorefront]);
    resetForm();
    setDialogOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">จัดการสาขา</h1>

      {/* Current Storefronts Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">สาขาปัจจุบัน</h2>
        {activeStorefronts.length === 0 && (
          <p className="text-sm text-muted-foreground">
            ไม่มีสาขาที่กำลังเปิดอยู่
          </p>
        )}
        <Accordion type="single" collapsible>
          {activeStorefronts.map((storefront) => {
            const daysLeft = calculateDaysLeft(storefront.endDate);
            return (
              <AccordionItem value={String(storefront.id)} key={storefront.id}>
                <AccordionTrigger className="flex justify-between items-center">
                  <div className="font-medium">{storefront.name}</div>
                  <Badge variant="success" className="text-sm">
                    เหลือ {daysLeft} วัน
                  </Badge>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p>
                      <strong>วันที่เริ่มต้น:</strong> {storefront.startDate}
                    </p>
                    <p>
                      <strong>วันที่สิ้นสุด:</strong> {storefront.endDate}
                    </p>
                    <p>
                      <strong>พนักงาน:</strong> {storefront.employee}
                    </p>
                    <p>
                      <strong>หมายเหตุ:</strong> {storefront.note || "-"}
                    </p>
                    <div className="flex space-x-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        {editIcon} แก้ไข
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        {deleteIcon} ลบ
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>

      {/* Create New Storefront Button and Dialog */}
      <section>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>สร้างสาขาใหม่</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>สร้างสาขาใหม่</DialogTitle>
              <DialogDescription>
                กรุณากรอกข้อมูลสาขาใหม่ให้ครบถ้วน
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateStorefront} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="name">ชื่อสาขา</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label>วันที่เริ่มต้น</Label>
                <DatePicker date={startDate} setDate={setStartDate} />
              </div>

              <div>
                <Label>วันที่สิ้นสุด</Label>
                <DatePicker date={endDate} setDate={setEndDate} />
              </div>

              <div>
                <Label>พนักงาน</Label>
                <EmployeeCombobox
                  employees={MOCK_EMPLOYEES}
                  value={selectedEmployee}
                  setValue={setSelectedEmployee}
                />
              </div>

              <div>
                <Label htmlFor="note">หมายเหตุ</Label>
                <Textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="หมายเหตุเพิ่มเติม (ถ้ามี)"
                />
              </div>

              <DialogFooter>
                <Button type="submit" className="w-full">
                  บันทึกสาขา
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </section>

      {/* History Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">ประวัติสาขาที่สิ้นสุด</h2>
        {endedStorefronts.length === 0 && (
          <p className="text-sm text-muted-foreground">
            ไม่มีประวัติสาขาที่สิ้นสุด
          </p>
        )}
        <Accordion type="single" collapsible>
          {endedStorefronts.map((storefront) => (
            <AccordionItem value={String(storefront.id)} key={storefront.id}>
              <AccordionTrigger>{storefront.name}</AccordionTrigger>
              <AccordionContent>
                <p>
                  <strong>วันที่เริ่มต้น:</strong> {storefront.startDate}
                </p>
                <p>
                  <strong>วันที่สิ้นสุด:</strong> {storefront.endDate}
                </p>
                <p>
                  <strong>พนักงาน:</strong> {storefront.employee}
                </p>
                <p>
                  <strong>หมายเหตุ:</strong> {storefront.note || "-"}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
