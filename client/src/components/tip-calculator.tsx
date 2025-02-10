import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
    // Round to whole numbers since we're dealing with HUF
    return Math.round(tip).toLocaleString('hu-HU');
  };

  const calculateTotal = () => {
    if (!billAmount) return "0";
    const amount = parseFloat(billAmount);
    if (isNaN(amount)) return "0";
    const tip = (amount * parseInt(tipPercentage)) / 100;
    // Round to whole numbers since we're dealing with HUF
    return Math.round(amount + tip).toLocaleString('hu-HU');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Bill Amount (HUF)</Label>
        <Input
          type="text"
          value={billAmount}
          onChange={(e) => handleBillAmountChange(e.target.value)}
          placeholder="Enter bill amount"
        />
      </div>

      <div className="space-y-2">
        <Label>Tip Percentage</Label>
        <RadioGroup
          value={tipPercentage}
          onValueChange={setTipPercentage}
          className="flex justify-between"
        >
          {[10, 15, 20].map((percentage) => (
            <div key={percentage} className="flex items-center space-x-2">
              <RadioGroupItem value={percentage.toString()} id={`tip-${percentage}`} />
              <Label htmlFor={`tip-${percentage}`}>{percentage}%</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <div className="flex justify-between">
          <Label>Tip Amount:</Label>
          <span className="font-medium">{calculateTip()} Ft</span>
        </div>

        <div className="flex justify-between">
          <Label>Total Amount:</Label>
          <span className="font-medium">{calculateTotal()} Ft</span>
        </div>
      </div>
    </div>
  );
}