// export default function CreateNewProduct() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">สร้างสินค้าใหม่</h1>
//       <form className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             ชื่อสินค้า
//           </label>
//           <input
//             type="text"
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
//             placeholder="กรุณากรอกชื่อสินค้า"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             ราคา
//           </label>
//           <input
//             type="number"
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
//             placeholder="กรุณากรอกราคา"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
//         >
//           สร้างสินค้า
//         </button>
//       </form>
//     </div>
//   );
// }

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

const CreateNewProduct = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "เครื่องประดับเงิน", price: 1500, quantity: 10 },
    { id: 2, name: "สร้อยทอง", price: 4500, quantity: 5 },
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
    <div className="p-4">
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
                  จำนวน: {product.quantity} | ราคา: ฿{product.price}
                </p>
              </div>
              <div className="space-x-2">
                <Button variant="secondary" size="sm">
                  แก้ไข
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                >
                  ลบ
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
