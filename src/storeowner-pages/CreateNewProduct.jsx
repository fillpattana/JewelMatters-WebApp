import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import editIcon from "@/assets/edit-icon.png";
import deleteIcon from "@/assets/delete-icon.png";

const CreateNewProduct = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "แหวนเงิน", price: 199, quantity: 8 },
    { id: 2, name: "แป้นเพชร", price: 169, quantity: 15 },
    { id: 3, name: "แหวนทอง", price: 199, quantity: 8 },
    { id: 4, name: "ต่างหูใหญ่", price: 189, quantity: 18 },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const handleAddProduct = () => {
    const { name, price, quantity } = newProduct;
    if (!name || !price || !quantity) return;
    const newEntry = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    };
    setProducts((prev) => [...prev, newEntry]);
    setNewProduct({ name: "", price: "", quantity: "" });
    setDialogOpen(false);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-4 pt-44">
      <h1 className="text-xl font-bold mb-4">คลังสินค้า</h1>

      <section>
        <h2 className="text-lg font-semibold mb-2">รายการสินค้า</h2>
        <ul className="space-y-3">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center border p-3 rounded-md"
            >
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-500">
                  จำนวน: {product.quantity}
                </p>
                <p className="text-sm text-gray-500">ราคา: ฿{product.price}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-9 h-9 p-1 bg-white border flex items-center justify-center"
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
                >
                  <img
                    src={deleteIcon}
                    alt="ลบ"
                    className="w-6 h-6 min-w-[1.5rem] min-h-[1.5rem] object-contain cursor-pointer"
                    onClick={() => {
                      setProductToDelete(product);
                      setDeleteDialogOpen(true);
                    }}
                  />
                </Button>
              </div>
            </li>
          ))}
        </ul>

        {/* Add Product Button */}
        <div className="mt-6">
          <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button className="bg-[#192F7B] hover:bg-[#16296b] text-white">
                สร้างสินค้าใหม่
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>สร้างสินค้าใหม่</AlertDialogTitle>
              </AlertDialogHeader>

              <div className="space-y-3">
                <div>
                  <Label>ชื่อสินค้า</Label>
                  <Input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>ราคา</Label>
                  <Input
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="0"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>จำนวน</Label>
                  <Input
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="0"
                    value={newProduct.quantity}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, quantity: e.target.value })
                    }
                  />
                </div>
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel className="bg-red-600 hover:bg-red-700 text-white">
                  ยกเลิก
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-[#192F7B] hover:bg-[#16296b] text-white"
                  onClick={handleAddProduct}
                >
                  ยืนยัน
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>

      {/* Delete Confirmation Dialog */}
      {productToDelete && (
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>ยืนยันการลบสินค้า</AlertDialogTitle>
            </AlertDialogHeader>

            <div className="text-sm text-gray-700">
              ยืนยันที่จะลบ{" "}
              <span className="font-semibold">{productToDelete.name}</span>{" "}
              จำนวน{" "}
              <span className="font-semibold">{productToDelete.quantity}</span>{" "}
              ชิ้นจากคลังสินค้าหรือไม่?
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-300 hover:bg-gray-400">
                ยกเลิก
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => {
                  handleDelete(productToDelete.id);
                  setDeleteDialogOpen(false);
                }}
              >
                ลบสินค้า
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default CreateNewProduct;
