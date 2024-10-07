import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from 'lucide-react';

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

function simplifyFraction(numerator: number, denominator: number): [number, number] {
  const divisor = gcd(numerator, denominator);
  return [numerator / divisor, denominator / divisor];
}

function addSubtractFractions(num1: number, den1: number, num2: number, den2: number, operation: '+' | '-'): string {
  let resultNum: number, resultDen: number;
  let steps: string[] = [];

  steps.push(`\\frac{${num1}}{${den1}} ${operation} \\frac{${num2}}{${den2}} = ?`);

  const commonDen = lcm(den1, den2);
  const factor1 = commonDen / den1;
  const factor2 = commonDen / den2;
  
  steps.push(`Find the Least Common Denominator (LCD):`);
  steps.push(`LCD(${den1}, ${den2}) = ${commonDen}`);
  steps.push(`Rewrite fractions with the common denominator:`);
  steps.push(`\\frac{${num1}}{${den1}} = \\frac{${num1} \\times ${factor1}}{${den1} \\times ${factor1}} = \\frac{${num1 * factor1}}{${commonDen}}`);
  steps.push(`\\frac{${num2}}{${den2}} = \\frac{${num2} \\times ${factor2}}{${den2} \\times ${factor2}} = \\frac{${num2 * factor2}}{${commonDen}}`);

  if (operation === '+') {
    resultNum = num1 * factor1 + num2 * factor2;
    steps.push(`Add the numerators:`);
  } else {
    resultNum = num1 * factor1 - num2 * factor2;
    steps.push(`Subtract the numerators:`);
  }
  resultDen = commonDen;

  steps.push(`\\frac{${num1 * factor1}}{${commonDen}} ${operation} \\frac{${num2 * factor2}}{${commonDen}} = \\frac{${resultNum}}{${resultDen}}`);

  const [simplifiedNum, simplifiedDen] = simplifyFraction(resultNum, resultDen);
  if (simplifiedNum !== resultNum || simplifiedDen !== resultDen) {
    steps.push(`Simplify the result:`);
    steps.push(`\\frac{${resultNum}}{${resultDen}} = \\frac{${simplifiedNum}}{${simplifiedDen}}`);
  }

  return steps.join('\n');
}

export function AddingSubtractingFractionsPage() {
  const [num1, setNum1] = useState<string>('');
  const [den1, setDen1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [den2, setDen2] = useState<string>('');
  const [operation, setOperation] = useState<'+' | '-'>('+');
  const [steps, setSteps] = useState<string>('');

  const handleCalculate = () => {
    try {
      const calculationSteps = addSubtractFractions(
        parseInt(num1),
        parseInt(den1),
        parseInt(num2),
        parseInt(den2),
        operation
      );
      setSteps(calculationSteps);
    } catch (error) {
      setSteps('Invalid input or operation');
    }
  };

  const handleClear = () => {
    setNum1('');
    setDen1('');
    setNum2('');
    setDen2('');
    setOperation('+');
    setSteps('');
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <nav className="text-sm mb-4">
        <Link to="/" className="text-primary hover:underline">Home</Link> &gt; <Link to="/fractions" className="text-primary hover:underline">Fractions</Link> &gt; Adding and Subtracting Fractions
      </nav>
      
      <h1 className="text-4xl font-bold mb-6">Adding and Subtracting Fractions</h1>
      
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Adding and Subtracting Fractions Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>How to use</AlertTitle>
            <AlertDescription>
              Enter two fractions, select the operation (+ or -), and click Calculate. For negative fractions, use a minus sign before the numerator.
            </AlertDescription>
          </Alert>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col">
              <Input
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                placeholder="Numerator 1"
                className="mb-2"
              />
              <Input
                type="number"
                value={den1}
                onChange={(e) => setDen1(e.target.value)}
                placeholder="Denominator 1"
              />
            </div>
            <Select value={operation} onValueChange={(value) => setOperation(value as '+' | '-')}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+">+</SelectItem>
                <SelectItem value="-">-</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex flex-col">
              <Input
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                placeholder="Numerator 2"
                className="mb-2"
              />
              <Input
                type="number"
                value={den2}
                onChange={(e) => setDen2(e.target.value)}
                placeholder="Denominator 2"
              />
            </div>
          </div>
          <div className="flex justify-between mb-4">
            <Button onClick={handleClear} variant="outline">Clear</Button>
            <Button onClick={handleCalculate}>Calculate</Button>
          </div>
          {steps && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Solution with Steps:</h3>
              {steps.split('\n').map((step, index) => (
                <div key={index} className="mb-2">
                  {step.startsWith('\\') ? (
                    <BlockMath math={step} />
                  ) : (
                    <p>{step}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}