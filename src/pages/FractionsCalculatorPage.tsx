import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FractionsCalculator } from "@/components/FractionsCalculator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CodeIcon } from "lucide-react";

export function FractionsCalculatorPage() {
  const [isCopied, setIsCopied] = useState(false);
  const embedCode = `<iframe src="${window.location.origin}/embed/fractions-calculator" width="100%" height="600" frameborder="0"></iframe>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <nav className="text-sm mb-4">
        <Link to="/" className="text-primary hover:underline">Home</Link> &gt; <Link to="/fractions" className="text-primary hover:underline">Fractions</Link> &gt; Fractions Calculator
      </nav>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Fractions Calculator</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <CodeIcon className="mr-2 h-4 w-4" />
              Embed
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Embed Calculator</DialogTitle>
              <DialogDescription>
                Copy the code below to embed this calculator on your website.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <Input
                readOnly
                value={embedCode}
                className="flex-1"
              />
              <Button onClick={copyToClipboard} type="submit">
                {isCopied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <p className="text-lg mb-4">
            This fractions calculator allows you to perform basic arithmetic operations with fractions, including addition, subtraction, multiplication, and division. It also simplifies the result and provides step-by-step solutions.
          </p>
          <p className="text-lg">
            Enter your fractions, choose an operation, and click "Calculate" to see the result and detailed steps.
          </p>
        </CardContent>
      </Card>

      <FractionsCalculator />
    </div>
  );
}