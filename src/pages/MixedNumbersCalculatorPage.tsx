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

function simplifyFraction(numerator: number, denominator: number): [number, number] {
  const divisor = gcd(numerator, denominator);
  return [numerator / divisor, denominator / divisor];
}

function mixedToImproper(whole: number, numerator: number, denominator: number): [number, number] {
  const improperNumerator = Math.abs(whole) * denominator + numerator;
  return [whole < 0 ? -improperNumerator : improperNumerator, denominator];
}

function improperToMixed(numerator: number, denominator: number): [number, number, number] {
  const whole = Math.floor(Math.abs(numerator) / denominator);
  const remainingNumerator = Math.abs(numerator) % denominator;
  const sign = numerator < 0 ? -1 : 1;
  return [sign * whole, remainingNumerator, denominator];
}

type Operation = '+' | '-' | '×' | '÷';

function calculateMixedNumbers(whole1: number, num1: number, den1: number, whole2: number, num2: number, den2: number, operation: Operation): string {
  let steps: string[] = [];
  let resultNum: number, resultDen: number;

  steps.push(`${whole1}\\frac{${num1}}{${den1}} ${operation} ${whole2}\\frac{${num2}}{${den2}} = ?`);

  // Convert mixed numbers to improper fractions
  const [impNum1, impDen1] = mixedToImproper(whole1, num1, den1);
  const [impNum2, impDen2] = mixedToImproper(whole2, num2, den2);

  steps.push(`Convert mixed numbers to improper fractions:`);
  steps.push(`${whole1}\\frac{${num1}}{${den1}} = \\frac{${impNum1}}{${impDen1}}`);
  steps.push(`${whole2}\\frac{${num2}}{${den2}} = \\frac{${impNum2}}{${impDen2}}`);

  steps.push(`Perform the ${operation === '×' ? 'multiplication' : operation === '÷' ? 'division' : 'operation'}:`);

  switch (operation) {
    case '+':
    case '-':
      const commonDen = den1 * den2;
      const newNum1 = impNum1 * den2;
      const newNum2 = impNum2 * den1;
      resultNum = operation === '+' ? newNum1 + newNum2 : newNum1 - newNum2;
      resultDen = commonDen;
      steps.push(`\\frac{${impNum1}}{${impDen1}} ${operation} \\frac{${impNum2}}{${impDen2}} = \\frac{${newNum1} ${operation} ${newNum2}}{${commonDen}} = \\frac{${resultNum}}{${resultDen}}`);
      break;
    case '×':
      resultNum = impNum1 * impNum2;
      resultDen = impDen1 * impDen2;
      steps.push(`\\frac{${impNum1}}{${impDen1}} \\times \\frac{${impNum2}}{${impDen2}} = \\frac{${resultNum}}{${resultDen}}`);
      break;
    case '÷':
      resultNum = impNum1 * impDen2;
      resultDen = impDen1 * impNum2;
      steps.push(`\\frac{${impNum1}}{${impDen1}} \\div \\frac{${impNum2}}{${impDen2}} = \\frac{${impNum1}}{${impDen1}} \\times \\frac{${impDen2}}{${impNum2}} = \\frac{${resultNum}}{${resultDen}}`);
      break;
  }

  // Simplify the result
  const [simplifiedNum, simplifiedDen] = simplifyFraction(resultNum, resultDen);
  if (simplifiedNum !== resultNum || simplifiedDen !== resultDen) {
    steps.push(`Simplify the result:`);
    steps.push(`\\frac{${resultNum}}{${resultDen}} = \\frac{${simplifiedNum}}{${simplifiedDen}}`);
  }

  // Convert back to mixed number if necessary
  const [mixedWhole, mixedNum, mixedDen] = improperToMixed(simplifiedNum, simplifiedDen);
  if (mixedWhole !== 0) {
    steps.push(`Convert to mixed number:`);
    steps.push(`\\frac{${simplifiedNum}}{${simplifiedDen}} = ${mixedWhole}\\frac{${mixedNum}}{${mixedDen}}`);
  }

  return steps.join('\n');
}

export function MixedNumbersCalculatorPage() {
  const [whole1, setWhole1] = useState<string>('');
  const [num1, setNum1] = useState<string>('');
  const [den1, setDen1] = useState<string>('');
  const [whole2, setWhole2] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [den2, setDen2] = useState<string>('');
  const [operation, setOperation] = useState<Operation>('+');
  const [steps, setSteps] = useState<string>('');

  const handleCalculate = () => {
    try {
      const calculationSteps = calculateMixedNumbers(
        parseInt(whole1) || 0,
        parseInt(num1) || 0,
        parseInt(den1) || 1,
        parseInt(whole2) || 0,
        parseInt(num2) || 0,
        parseInt(den2) || 1,
        operation
      );
      setSteps(calculationSteps);
    } catch (error) {
      setSteps('Invalid input or operation');
    }
  };

  const handleClear = () => {
    setWhole1('');
    setNum1('');
    setDen1('');
    setWhole2('');
    setNum2('');
    setDen2('');
    setOperation('+');
    setSteps('');
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <nav className="text-sm mb-4">
        <Link to="/" className="text-primary hover:underline">Home</Link> &gt; <Link to="/fractions" className="text-primary hover:underline">Fractions</Link> &gt; Mixed Numbers Calculator
      </nav>
      
      <h1 className="text-4xl font-bold mb-6">Mixed Numbers Calculator</h1>
      
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Mixed Numbers Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>How to use</AlertTitle>
            <AlertDescription>
              Enter two mixed numbers, select the operation, and click Calculate. For whole numbers, leave the fraction part empty. For fractions without a whole number, enter 0 as the whole number.
            </AlertDescription>
          </Alert>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col">
              <Input
                type="number"
                value={whole1}
                onChange={(e) => setWhole1(e.target.value)}
                placeholder="Whole 1"
                className="mb-2"
              />
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
            <Select value={operation} onValueChange={(value) => setOperation(value as Operation)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+">+</SelectItem>
                <SelectItem value="-">-</SelectItem>
                <SelectItem value="×">×</SelectItem>
                <SelectItem value="÷">÷</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex flex-col">
              <Input
                type="number"
                value={whole2}
                onChange={(e) => setWhole2(e.target.value)}
                placeholder="Whole 2"
                className="mb-2"
              />
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