import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground text-center">
        Current Rate: 1 EUR = {rate?.toFixed(2)} HUF
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>{direction === "toEUR" ? "HUF Amount" : "EUR Amount"}</Label>
          <Input
            type="text"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={handleSwitch}
        >
          <ArrowUpDown className="h-4 w-4 mr-2" />
          Switch Direction
        </Button>

        <div className="space-y-2">
          <Label>{direction === "toEUR" ? "EUR Amount" : "HUF Amount"}</Label>
          <Input
            type="text"
            value={convert(amount)}
            readOnly
            className="bg-muted"
          />
        </div>
      </div>
    </div>
  );
}
