import { CurrencyConverter } from "@/components/currency-converter";
import { TipCalculator } from "@/components/tip-calculator";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Euro, Calculator } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background flex items-center justify-center p-4"
    >
      <motion.div 
        className="w-full max-w-md"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-foreground">
          HUF-EUR Converter & Tip Calculator
        </h1>

        <Tabs defaultValue="converter" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="converter" className="flex items-center gap-2">
              <Euro className="h-4 w-4" />
              Converter
            </TabsTrigger>
            <TabsTrigger value="tip" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Tip Calculator
            </TabsTrigger>
          </TabsList>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}