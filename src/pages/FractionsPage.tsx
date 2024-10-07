import React from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const fractionsCalculators = [
  {
    title: "Fraction Operations and Manipulations",
    items: [
      { name: "Fractions Calculator", link: "/fractions/fractions-calculator" },
      { name: "Adding and Subtracting Fractions", link: "/fractions/adding-and-subtracting-fractions" },
      { name: "Mixed Numbers Calculator", link: "/fractions/mixed-numbers-calculator" },
      "Mixed Fractions",
      "Simplifying Fractions",
      "Simplifying Complex Fractions Calculator",
      "Complex Fraction Calculator",
    ]
  },
  {
    title: "Fraction Conversions",
    items: [
      "Fraction to Decimal Calculator",
      "Decimal to Fraction Calculator",
      "Fraction to Percent Calculator",
      "Percent to Fraction Calculator",
      "Ratio to Fraction Calculator",
    ]
  },
  {
    title: "Fraction Comparisons",
    items: [
      "Comparing Fractions Calculator",
      "Ordering Fractions Calculator",
      "Equivalent Fractions Calculator",
    ]
  },
  {
    title: "Advanced Fraction Operations",
    items: [
      "Fraction Exponents Calculator",
      "Fraction Root Calculator",
      "Fraction Logarithm Calculator",
    ]
  },
];

export function FractionsPage() {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <nav className="text-sm mb-4">
        <Link to="/" className="text-primary hover:underline">Home</Link> &gt; Fractions
      </nav>
      <h1 className="text-4xl font-bold mb-6">Fractions Calculators</h1>
      <p className="mb-8 text-lg">
        Learn to add, subtract, multiply and divide fractions. Reduce fractions to lowest terms, simplify, compare and order fractions. Convert fractions to decimals and percentages, work with mixed numbers and improper fractions and solve for X in fractions equations using our online fractions calculators.
      </p>
      
      <Button asChild className="mb-8">
        <Link to="/fractions/fractions-calculator">Go to Fractions Calculator</Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {fractionsCalculators.map((category, index) => (
          <Card key={index} className="bg-card">
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {typeof item === 'string' ? (
                      item
                    ) : (
                      <Link to={item.link} className="text-primary hover:underline">
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}