"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { fetchWallet, fetchLedger } from "../../services/centralApi";
import useRazorpay from "../../hooks/useRazorpay";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Bell, RefreshCw, Tag, Gift, PlusCircle, CheckCircle, Home, Search, Ticket, Wallet, User } from "lucide-react";
import { InternalLinksGrid, ReportLinksGrid, HoroscopeNavigation, CompatibilityLinksGrid, RecentBlogLinks } from '../../components/InternalLinksGrid';
import Footer from '../../components/Footer';

const WalletPage = () => {
  const router = useRouter();
  const { initiatePayment, loading: paymentLoading, error: paymentError } = useRazorpay();
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [state, setState] = useState("");
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [showGiftCardInput, setShowGiftCardInput] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [giftCard, setGiftCard] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [giftCardApplied, setGiftCardApplied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const presetAmounts = [100, 200, 500, 1000, 2000];
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu and Kashmir"
  ];

  useEffect(() => {
    const loadWalletAndLedger = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) throw new Error("User not authenticated");
        const walletData = await fetchWallet();
        console.log("Wallet data:", walletData);
        setWallet(walletData.data);
        setBalance(walletData.data.balance || 0);
        const ledgerData = await fetchLedger();
        console.log("Ledger data:", ledgerData);
        setTransactions(ledgerData.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadWalletAndLedger();
  }, []);

  const handleAmountSelection = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount(null);
    }
  };

  const calculateGST = () => {
    const amount = parseFloat(customAmount) || 0;
    return amount * 0.18;
  };

  const calculateTotal = () => {
    const amount = parseFloat(customAmount) || 0;
    const gst = calculateGST();
    return amount + gst;
  };

  const handleApplyPromo = () => {
    if (promoCode.trim() !== "") {
      setPromoApplied(true);
      setTimeout(() => setShowPromoInput(false), 1500);
    }
  };

  const handleRedeemGiftCard = () => {
    if (giftCard.trim() !== "") {
      setGiftCardApplied(true);
      setTimeout(() => setShowGiftCardInput(false), 1500);
    }
  };

  const refreshBalance = async () => {
    try {
      const walletData = await fetchWallet();
      setBalance(walletData.data.balance || 0);
      const ledgerData = await fetchLedger();
      setTransactions(ledgerData.data || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddMoney = async () => {
    const totalAmount = calculateTotal();
    if (totalAmount <= 0 || !state) return;

    await initiatePayment(totalAmount, async (result) => {
      console.log("Payment result:", result);
      setBalance(  balance + totalAmount);
      setPaymentStatus("Payment successful! Amount added to wallet.");
      setCustomAmount("");

      setState("");
      try {
        const ledgerData = await fetchLedger();
        console.log("Ledger updated:", ledgerData);
        setTransactions(ledgerData.data || []);
      } catch (err) {
        console.error("Failed to fetch ledger:", err);
      }
    });
  };

  console.log({
    Input, Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Label,
    ArrowLeft, Bell, RefreshCw, Tag, Gift, PlusCircle, Home, Search, Ticket, Wallet, User, CheckCircle
  });

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading wallet...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!wallet) return <div className="text-center mt-10 text-red-500">No wallet data found.</div>;

  return (
    <div className="bg-[#FFF2E2] min-h-screen w-full max-w-[375px] mx-auto relative pb-24 font-poppins">
      {/* Nav Bar */}
      <div className="bg-white shadow-sm fixed top-0 w-full max-w-[375px] z-10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Button onClick={() => router.push("/")} className="mr-3 p-2 bg-white">
            <ArrowLeft className="w-5 h-5 text-[#FF9960]" />
          </Button>
          <h1 className="text-xl font-semibold text-[#FF9960]">Wallet</h1>
        </div>
        <Bell className="w-5 h-5 text-[#FFE5CC]" />
      </div>

      {/* Main Content */}
      <div className="pt-16 mt-3 px-4">
        {/* Balance Card */}
        <div className="bg-white rounded-xl shadow-lg p-5 mb-6">
          <div className="flex bg-white justify-between items-center mb-2">
            <span className="text- text-gray-500">Available Balance</span>
            <Button onClick={refreshBalance} className="p-2 bg-white">
              <RefreshCw className="w-4 h-4 text-[#FF9933]" />
            </Button>
          </div>
          <div className="text-3xl font-bold text-[#FF9960">
            ₹ {balance.toFixed(2)}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Last updated: {new Date().toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </div>
        </div>

        {/* Quick Amount Selection */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-black mb-3">Quick Add</h2>
          <div className="flex overflow-x-auto pb-2 gap-2">
            {presetAmounts.map((amount) => (
              <Button
                key={amount}
                onClick={() => handleAmountSelection(amount)}
                className={`flex-shrink-0 py-2 px-4 rounded-lg !rounded-button ${
                  selectedAmount === amount ? "bg-[#FF9933] text-white" : "bg-[#FFE5CC] text-[#FF9960]"
                }`}
              >
                ₹ {amount}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Amount Input */}
        <div className="bg-white rounded-xl shadow-lg p-5 mb-6">
          <h2 className="text-lg font-medium text-black mb-3">Enter Amount</h2>
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500">₹</span>
            </div>
            <Input
              type="text"
              placeholder="Enter amount"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className="pl-8 border-gray-300 focus:border-[#FF9933] focus:ring-[#FF9933]"
            />
          </div>
          {customAmount && parseFloat(customAmount) > 0 && (
            <div className="mb-4">
              <Label htmlFor="state-select" className="block text-sm font-medium text-gray-700 mb-1">
                Select State for GST
              </Label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger id="state-select" className="w-full">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((stateName) => (
                    <SelectItem key={stateName} value={stateName}>
                      {stateName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {customAmount && parseFloat(customAmount) > 0 && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Amount:</span>
                <span>₹ {parseFloat(customAmount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">GST (18%):</span>
                <span>₹ {calculateGST().toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                <span className="text-gray-700">Total Amount:</span>
                <span className="text-[#FF9960]">
                  ₹ {calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Promo Code and Gift Card */}
        <div className="space-y-3 mb-6">
          <div>
            <Button
              onClick={() => {
                setShowPromoInput(!showPromoInput);
                setShowGiftCardInput(false);
                setPromoApplied(false);
              }}
              className={`w-full justify-start !rounded-button text-lg py-6 hover:bg-[#FF9933] hover:text-white transition-colors ${
                showPromoInput ? "bg-white border border-[#FF9933] text-[#FF9960]" : "bg-[#FFE5CC] text-[#FF9960]"
              }`}
            >
              <Tag className="w-5 h-5 mr-2" />
              Apply Promocode
            </Button>
            {showPromoInput && (
              <div className="mt-2 p-3 bg-white rounded-xl shadow-lg">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter promocode"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-grow"
                  />
                  <Button
                    onClick={handleApplyPromo}
                    className="bg-[#FF9933] text-white !rounded-button"
                  >
                    Apply
                  </Button>
                </div>
                {promoApplied && (
                  <p className="text-green-600 text-sm mt-2">
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    Promocode applied successfully!
                  </p>
                )}
              </div>
            )}
          </div>
          <div>
            <Button
              onClick={() => {
                setShowGiftCardInput(!showGiftCardInput);
                setShowPromoInput(false);
                setGiftCardApplied(false);
              }}
              className={`w-full justify-start !rounded-button text-lg py-6 hover:bg-[#FF9933] hover:text-white transition-colors ${
                showGiftCardInput ? "bg-white border border-[#FF9933] text-[#FF9960]" : "bg-[#FFE5CC] text-[#FF9960]"
              }`}
            >
              <Gift className="w-5 h-5 mr-2" />
              Redeem Gift Card
            </Button>
            {showGiftCardInput && (
              <div className="mt-2 p-3 bg-white rounded-xl shadow-lg">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter gift card code"
                    value={giftCard}
                    onChange={(e) => setGiftCard(e.target.value)}
                    className="flex-grow"
                  />
                  <Button
                    onClick={handleRedeemGiftCard}
                    className="bg-[#FF9933] text-white !rounded-button"
                  >
                    Redeem
                  </Button>
                </div>
                {giftCardApplied && (
                  <p className="text-green-600 text-sm mt-2">
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    Gift card redeemed successfully!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mb-24">
          <h2 className="text-lg font-medium text-black mb-3">Recent Transactions</h2>
          <div className="bg-white rounded-xl shadow-lg divide-y">
            {transactions.length > 0 ? (
              transactions.map((txn) => (
                <div key={txn._id} className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{txn.description}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(txn.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div
                    className={`font-medium ${
                      txn.type.type === "credit" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {txn.type.type === "credit" ? "+" : "-"}₹ {txn.formattedAmount}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No transactions found.
              </div>
            )}
          </div>
        </div>

        {/* Payment Status Feedback */}
        {paymentStatus && (
          <div className="mb-4 text-green-600 text-center">
            <CheckCircle className="w-4 h-4 inline mr-1" />
            {paymentStatus}
          </div>
        )}
        {paymentError && (
          <div className="mb-4 text-red-600 text-center">
            Error: {paymentError}
          </div>
        )}
      </div>

      {/* Fixed Add Money Button */}
      <div className="fixed bottom-0 w-full max-w-[375px] bg-white p-4 shadow-lg">
        <Button
          onClick={handleAddMoney}
          className="w-full bg-[#FF9933] hover:bg-[#FF8913] text-white !rounded-button py-6"
          disabled={!customAmount || parseFloat(customAmount) <= 0 || !state || paymentLoading}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          {paymentLoading ? "Processing..." : "Add Money"}
        </Button>
      </div>

      {/* Internal Links Section */}
      <div className="mt-12 mb-20 space-y-8 px-4 max-w-4xl mx-auto">
        <InternalLinksGrid />
        <HoroscopeNavigation />
        <CompatibilityLinksGrid />
        <ReportLinksGrid />
        <RecentBlogLinks />
      </div>
      
      <Footer />
    </div>
  );
};

export default WalletPage;