import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from 'lucide-react';

type Operation = '+' | '-' | '×' | '÷' | 'of';

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

function calculateFractions(num1: number, den1: number, num2: number, den2: number, operation: Operation): string {
  let resultNum: number, resultDen: number;
  let steps: string[] = [];

  steps.push(`\\frac{${num1}}{${den1}} ${operation} \\frac{${num2}}{${den2}} = ?`);

  switch (operation) {
    case '+':
    case '-':
      const commonDen = lcm(den1, den2);
      const factor1 = commonDen / den1;
      const factor2 = commonDen / den2;
      
      steps.push(`The fractions have unlike denominators. First, find the Least Common Denominator and rewrite the fractions with the common denominator.`);
      steps.push(`LCD(${den1}, ${den2}) = ${commonDen}`);
      steps.push(`Multiply both the numerator and denominator of each fraction by the number that makes its denominator equal the LCD. This is basically multiplying each fraction by 1.`);
      steps.push(`\\left(\\frac{${num1}}{${den1}} \\times \\frac{${factor1}}{${factor1}}\\right) ${operation} \\left(\\frac{${num2}}{${den2}} \\times \\frac{${factor2}}{${factor2}}\\right) = ?`);
      steps.push(`Complete the multiplication and the equation becomes`);
      steps.push(`\\frac{${num1 * factor1}}{${commonDen}} ${operation} \\frac{${num2 * factor2}}{${commonDen}} = ?`);
      steps.push(`The two fractions now have like denominators so you can ${operation === '+' ? 'add' : 'subtract'} the numerators.`);

      if (operation === '+') {
        resultNum = num1 * factor1 + num2 * factor2;
      } else {
        resultNum = num1 * factor1 - num2 * factor2;
      }
      resultDen = commonDen;
      break;
    case '×':
      resultNum = num1 * num2;
      resultDen = den1 * den2;
      steps.push(`Multiply numerators: ${num1} × ${num2} = ${resultNum}`);
      steps.push(`Multiply denominators: ${den1} × ${den2} = ${resultDen}`);
      break;
    case '÷':
      resultNum = num1 * den2;
      resultDen = den1 * num2;
      steps.push(`Multiply first fraction by reciprocal of second fraction:`);
      steps.push(`\\frac{${num1}}{${den1}} \\times \\frac{${den2}}{${num2}} = \\frac{${resultNum}}{${resultDen}}`);
      break;
    case 'of':
      resultNum = num1 * num2;
      resultDen = den1 * den2;
      steps.push(`"of" means multiply:`);
      steps.push(`\\frac{${num1}}{${den1}} \\times \\frac{${num2}}{${den2}} = \\frac{${resultNum}}{${resultDen}}`);
      break;
    default:
      throw new Error("Invalid operation");
  }

  steps.push(`Then:`);
  steps.push(`\\frac{${resultNum}}{${resultDen}}`);

  const [simplifiedNum, simplifiedDen] = simplifyFraction(resultNum, resultDen);
  if (simplifiedNum !== resultNum || simplifiedDen !== resultDen) {
    steps.push(`This fraction can be reduced.`);
    steps.push(`\\frac{${simplifiedNum}}{${simplifiedDen}}`);
  } else {
    steps.push(`This fraction cannot be reduced.`);
  }

  steps.push(`Therefore:`);
  steps.push(`\\frac{${num1}}{${den1}} ${operation} \\frac{${num2}}{${den2}} = \\frac{${simplifiedNum}}{${simplifiedDen}}`);

  return steps.join('\n');
}

export function FractionsCalculator() {
  const [num1, setNum1] = useState<string>('');
  const [den1, setDen1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [den2, setDen2] = useState<string>('');
  const [operation, setOperation] = useState<Operation>('+');
  const [result, setResult] = useState<string>('');
  const [steps, setSteps] = useState<string>('');

  const handleCalculate = () => {
    try {
      const calculationSteps = calculateFractions(
        parseInt(num1),
        parseInt(den1),
        parseInt(num2),
        parseInt(den2),
        operation
      );
      setSteps(calculationSteps);
    } catch (error) {
      setResult('Error');
      setSteps('Invalid input or operation');
    }
  };

  const handleClear = () => {
    setNum1('');
    setDen1('');
    setNum2('');
    setDen2('');
    setOperation('+');
    setResult('');
    setSteps('');
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Fractions Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>How to use</AlertTitle>
          <AlertDescription>
            Enter proper or improper fractions, select the operation, and click Calculate. For negative fractions, use a minus sign before the numerator.
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
          <Select value={operation} onValueChange={(value) => setOperation(value as Operation)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Operation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="+">+</SelectItem>
              <SelectItem value="-">-</SelectItem>
              <SelectItem value="×">×</SelectItem>
              <SelectItem value="÷">÷</SelectItem>
              <SelectItem value="of">of</SelectItem>
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
  );
}