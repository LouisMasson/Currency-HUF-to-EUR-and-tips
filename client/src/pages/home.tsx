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
      className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          {/* Animated background shapes */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>
      </div>

      <motion.div 
        className="w-full max-w-md z-10"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-white drop-shadow-lg">
          HUF-EUR Converter & Tip Calculator
        </h1>

        <Tabs defaultValue="converter" className="w-full">
          <TabsList className="grid w-full grid-cols-2 glass-card mb-4">
            <TabsTrigger value="converter" className="flex items-center gap-2 glass-button">
              <Euro className="h-4 w-4" />
              Converter
            </TabsTrigger>
            <TabsTrigger value="tip" className="flex items-center gap-2 glass-button">
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
              <Card className="glass-card border-none">
                <CardContent className="pt-6">
                  <CurrencyConverter />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tip">
              <Card className="glass-card border-none">
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