import { Receipt } from "@/types/receipt";

interface ReceiptResultProps {
  receipt: Receipt;
}

export default function ReceiptResult({
  receipt,
}: ReceiptResultProps) {

  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow">

      <h2 className="text-2xl font-bold text-gray-900">
        Hasil Analisis
      </h2>


      <div className="mt-6 grid gap-4 sm:grid-cols-2">

        <div>
          <p className="text-sm text-gray-500">
            Merchant
          </p>

          <p className="font-semibold text-gray-900">
            {receipt.merchant}
          </p>
        </div>


        <div>
          <p className="text-sm text-gray-500">
            Tanggal
          </p>

          <p className="font-semibold text-gray-900">
            {receipt.date}
          </p>
        </div>

      </div>


      <div className="mt-8">

        <h3 className="mb-3 font-semibold text-gray-900">
          Items
        </h3>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead>

              <tr className="border-b text-left">

                <th className="px-3 py-3 text-gray-900">
                  Item
                </th>

                <th className="px-3 py-3 text-gray-900">
                  Qty
                </th>

                <th className="px-3 py-3 text-gray-900">
                  Harga
                </th>

                <th className="px-3 py-3 text-gray-900">
                  Total
                </th>

              </tr>

            </thead>


            <tbody>

              {receipt.items.map((item, index) => (

                <tr
                  key={index}
                  className="border-b"
                >

                  <td className="px-3 py-3 text-gray-900">
                    {item.name}
                  </td>

                  <td className="px-3 py-3 text-gray-900">
                    {item.quantity}
                  </td>

                  <td className="px-3 py-3 text-gray-900">
                    Rp{" "}
                    {item.unit_price.toLocaleString(
                      "id-ID"
                    )}
                  </td>

                  <td className="px-3 py-3 text-gray-900">
                    Rp{" "}
                    {item.total.toLocaleString(
                      "id-ID"
                    )}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>


      <div className="mt-6 flex items-center justify-between border-t pt-6">

        <span className="text-lg font-medium text-gray-900">
          Grand Total
        </span>

        <span className="text-2xl font-bold text-gray-900">
          Rp{" "}
          {receipt.grand_total.toLocaleString(
            "id-ID"
          )}
        </span>

      </div>

    </div>
  );
}