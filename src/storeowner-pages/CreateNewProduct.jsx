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
                  className="w-9 h-9 p-1 bg-white"
                >
                  <img
                    src={editIcon}
                    alt="แก้ไข"
                    className="w-5 h-5 object-contain"
                  />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="w-9 h-9 p-1 bg-white"
                  onClick={() => handleDelete(product.id)}
                >
                  <img
                    src={deleteIcon}
                    alt="ลบ"
                    className="w-5 h-5 object-contain"
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
              <Button>สร้างสินค้าใหม่</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>สร้างสินค้าใหม่</AlertDialogTitle>
              </AlertDialogHeader>

              <div className="space-y-3">
                <div>
                  <Label>ชื่อสินค้า</Label>
                  <Input
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
                    value={newProduct.quantity}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, quantity: e.target.value })
                    }
                  />
                </div>
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                <AlertDialogAction onClick={handleAddProduct}>
                  ยืนยัน
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>
    </div>
  );
};

export default CreateNewProduct;
