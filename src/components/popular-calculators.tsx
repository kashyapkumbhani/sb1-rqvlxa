import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const categories = [
  {
    name: "Math",
    calculators: [
      "Mixed Numbers Calculator",
      "Simplify Fractions Calculator",
      "Percentage Calculator"
    ]
  },
  {
    name: "Business",
    calculators: [
      "Numbers to Words Converter",
      "Margin Calculator",
      "Days and Business Days Calculator"
    ]
  },
  {
    name: "Financial",
    calculators: [
      "Compound Interest Calculator",
      "Simple Interest Calculator",
      "Future Value Calculator"
    ]
  },
  {
    name: "Statistics",
    calculators: [
      "Mean, Median, Mode Calculator",
      "Random Number Generator",
      "Quartile Calculator"
    ]
  },
  {
    name: "Time and Date",
    calculators: [
      "Hours Calculator",
      "Time to Decimal Calculator",
      "Age Calculator"
    ]
  },
  {
    name: "Scientific",
    calculators: [
      "Rounding Numbers Calculator",
      "Scientific Notation Converter",
      "Significant Figures Calculator"
    ]
  }
]

export function PopularCalculators() {
  return (
    <section className="mb-12 animate-fade-in bg-section-popular p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center">Popular Calculators</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300 animate-slide-in bg-card" style={{animationDelay: `${index * 100}ms`}}>
            <CardHeader>
              <CardTitle className="text-xl font-bold">{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {category.calculators.map((calculator, calcIndex) => (
                  <li key={calcIndex} className="text-sm hover:text-primary transition-colors duration-200 cursor-pointer">
                    {calculator}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}