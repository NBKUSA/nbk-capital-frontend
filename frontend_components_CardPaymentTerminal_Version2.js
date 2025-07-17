import { useState } from "react";

export default function CardPaymentTerminal() {
  const [number, setNumber] = useState("");
  const [holder, setHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number, holder, expiry, cvv, amount }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Payment successful! 🎉");
      } else {
        setMessage(data.error || "Payment failed!");
      }
    } catch {
      setMessage("Network error!");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-blue-600 to-indigo-800 min-h-screen py-10 px-2">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8">
        <div className="relative mb-8">
          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white shadow-lg">
            <div className="flex items-center mb-6">
              <div className="w-10 h-7 bg-yellow-300 rounded-md mr-4"></div>
              <span className="font-mono text-lg tracking-widest">
                {number ? number.replace(/(\d{4})/g, "$1 ").trim() : "•••• •••• •••• ••••"}
              </span>
            </div>
            <div className="flex justify-between text-xs uppercase">
              <span>{holder || "Name Surname"}</span>
              <span>{expiry || "MM/YY"}</span>
            </div>
          </div>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label className="block font-medium mb-1">Card Number</label>
            <input
              type="text"
              maxLength={19}
              value={number}
              onChange={e => setNumber(e.target.value.replace(/\D/g, "").replace(/(.{4})/g,"$1 ").trim())}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Card Holder</label>
            <input
              type="text"
              maxLength={26}
              value={holder}
              onChange={e => setHolder(e.target.value.toUpperCase())}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
              placeholder="Name Surname"
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium mb-1">Expiry</label>
              <input
                type="text"
                maxLength={5}
                value={expiry}
                onChange={e => {
                  let val = e.target.value.replace(/\D/g, "").substring(0, 4);
                  if (val.length > 2) val = val.slice(0,2) + "/" + val.slice(2);
                  setExpiry(val);
                }}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">CVV</label>
              <input
                type="password"
                maxLength={4}
                value={cvv}
                onChange={e => setCvv(e.target.value.replace(/\D/g, "").substring(0,4))}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                placeholder="CVV"
                required
              />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Amount</label>
            <input
              type="number"
              min={0}
              step="0.01"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
              placeholder="Amount"
              required
            />
          </div>
          <button
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg py-3 font-bold mt-2 transition-transform transform hover:scale-105"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay"}
          </button>
          {message && (
            <div className={`text-center mt-2 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}