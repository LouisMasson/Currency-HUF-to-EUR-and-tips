import { CurrencyConverter } from "@/components/currency-converter";
import { TipCalculator } from "@/components/tip-calculator";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Euro, Calculator } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-primary">
          HUF-EUR Converter & Tip Calculator
        </h1>
        
        <Tabs defaultValue="converter" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="converter" className="flex items-center gap-2">
              <Euro className="h-4 w-4" />
              Converter
            </TabsTrigger>
            <TabsTrigger value="tip" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Tip Calculator
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="converter">
            <Card>
              <CardContent className="pt-6">
                <CurrencyConverter />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tip">
            <Card>
              <CardContent className="pt-6">
                <TipCalculator />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
