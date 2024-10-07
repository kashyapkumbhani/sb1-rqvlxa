import { Link } from "react-router-dom";
import { CalculatorCategories } from "@/components/calculator-categories"
import { Calculator } from "@/components/calculator"
import { PopularCalculators } from "@/components/popular-calculators"

export function HomePage() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8 text-center animate-fade-in">Multiple Calculator Website</h1>
      <CalculatorCategories />
      <Calculator />
      <PopularCalculators />
    </>
  )
}