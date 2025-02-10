import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export function TipCalculator() {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState("10");
  const { toast } = useToast();

  const handleBillAmountChange = (value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setBillAmount(value);
    } else {
      toast({
        title: "Invalid input",
        description: "Please enter numbers only",
        variant: "destructive",
      });
    }
  };

  const calculateTip = () => {
    if (!billAmount) return "0";
    const amount = parseFloat(billAmount);
    if (isNaN(amount)) return "0";
    const tip = (amount * parseInt(tipPercentage)) / 100;
    return Math.round(tip).toLocaleString('hu-HU');
  };

  const calculateTotal = () => {
    if (!billAmount) return "0";
    const amount = parseFloat(billAmount);
    if (isNaN(amount)) return "0";
    const tip = (amount * parseInt(tipPercentage)) / 100;
    return Math.round(amount + tip).toLocaleString('hu-HU');
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="space-y-2"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        <Label className="text-white">Bill Amount (HUF)</Label>
        <Input
          type="text"
          value={billAmount}
          onChange={(e) => handleBillAmountChange(e.target.value)}
          placeholder="Enter bill amount"
          className="glass-input text-white placeholder:text-white/50"
        />
      </motion.div>

      <motion.div 
        className="space-y-2"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Label className="text-white">Tip Percentage</Label>
        <RadioGroup
          value={tipPercentage}
          onValueChange={setTipPercentage}
          className="flex justify-between bg-white/5 backdrop-blur-sm rounded-lg p-2"
        >
          {[10, 15, 20].map((percentage) => (
            <motion.div 
              key={percentage}
              className="flex items-center space-x-2 px-4 py-2 rounded-md transition-colors hover:bg-white/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RadioGroupItem 
                value={percentage.toString()} 
                id={`tip-${percentage}`}
                className="text-white border-white/20"
              />
              <Label 
                htmlFor={`tip-${percentage}`}
                className="text-white cursor-pointer"
              >
                {percentage}%
              </Label>
            </motion.div>
          ))}
        </RadioGroup>
      </motion.div>

      <motion.div 
        className="space-y-4 pt-4 border-t border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between text-white">
          <Label>Tip Amount:</Label>
          <span className="font-medium">{calculateTip()} Ft</span>
        </div>

        <div className="flex justify-between text-white">
          <Label>Total Amount:</Label>
          <span className="font-medium">{calculateTotal()} Ft</span>
        </div>
      </motion.div>
    </motion.div>
  );
}