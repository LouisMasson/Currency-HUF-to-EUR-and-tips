import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [direction, setDirection] = useState<"toEUR" | "toHUF">("toEUR");
  const { toast } = useToast();

  const { data: rateData, isLoading } = useQuery({
    queryKey: ["/api/exchange-rate"],
    refetchInterval: 1000 * 60 * 60, // Refresh every hour
  });

  const rate = rateData?.rate;

  const handleSwitch = () => {
    setDirection(prev => prev === "toEUR" ? "toHUF" : "toEUR");
    setAmount("");
  };

  const convert = (value: string) => {
    if (!rate || !value) return "";
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "";

    if (direction === "toEUR") {
      return (numValue / rate).toFixed(2);
    } else {
      return (numValue * rate).toFixed(2);
    }
  };

  const handleAmountChange = (value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    } else {
      toast({
        title: "Invalid input",
        description: "Please enter numbers only",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin text-white" />
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-sm text-white/80 text-center font-medium backdrop-blur-sm rounded-lg py-2">
        Current Rate: 1 EUR = {rate?.toFixed(2)} HUF
      </div>

      <div className="space-y-4">
        <motion.div 
          className="space-y-2"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Label className="text-white">{direction === "toEUR" ? "HUF Amount" : "EUR Amount"}</Label>
          <Input
            type="text"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="Enter amount"
            className="glass-input text-white placeholder:text-white/50"
          />
        </motion.div>

        <Button
          variant="outline"
          className="w-full glass-button text-white border-white/20 hover:border-white/40"
          onClick={handleSwitch}
        >
          <ArrowUpDown className="h-4 w-4 mr-2" />
          Switch Direction
        </Button>

        <motion.div 
          className="space-y-2"
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Label className="text-white">{direction === "toEUR" ? "EUR Amount" : "HUF Amount"}</Label>
          <Input
            type="text"
            value={convert(amount)}
            readOnly
            className="glass-input text-white bg-white/10"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}