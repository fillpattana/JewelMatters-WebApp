import { useState } from "react";
import generatePayload from "promptpay-qr";
import QRCode from "qrcode";

export default function PromptPayQR() {
  const [amount, setAmount] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const phoneNumber = "0959543446";

  const generateQR = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert("กรุณา ระบุจำนวนเงินที่ถูกต้อง");
      return;
    }

    const payload = generatePayload(`${phoneNumber}`, {
      amount: parseFloat(amount),
    });

    const qrDataUrl = await QRCode.toDataURL(payload);
    setQrImage(qrDataUrl);
    setIsGenerated(true);
  };

  const cancelQR = () => {
    setAmount("");
    setQrImage("");
    setIsGenerated(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">สร้างบิลใหม่</h2>

      {!isGenerated && (
        <>
          <input
            type="number"
            placeholder="ระบุ จำนวนเงิน"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <button
            onClick={generateQR}
            className="bg-red-500 text-white p-2 rounded w-full"
          >
            ยืนยัน
          </button>
        </>
      )}

      {isGenerated && (
        <div className="mt-4 text-center">
          <img src={qrImage} alt="PromptPay QR Code" className="mx-auto mb-4" />
          <button
            onClick={cancelQR}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            ยกเลิก
          </button>
        </div>
      )}
    </div>
  );
}
