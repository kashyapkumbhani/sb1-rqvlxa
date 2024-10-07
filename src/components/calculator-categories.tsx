import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"

const categories = [
  "Fractions", "General Math", "Algebra", "Statistics", "Discrete Math",
  "Geometry", "Plane Geometry", "Solid Geometry", "Trigonometry", "Loans",
  "Interest and APR", "Time Value of Money", "Financial Ratios", "Sales and Retail",
  "Personal Finance, Accounting", "Depreciation", "Saving and Investing",
  "Money, Pay, Taxes", "Time and Date", "Construction", "Conversions",
  "Technology", "Physics", "Chemistry", "Games/Sports", "Health", "Miscellaneous"
]

export function CalculatorCategories() {
  return (
    <section className="mb-12 animate-fade-in bg-section-categories p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center">Calculator Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300 animate-slide-in bg-card" style={{animationDelay: `${index * 50}ms`}}>
            <CardContent className="p-4">
              {category === "Fractions" ? (
                <Link to="/fractions" className="text-center font-medium hover:text-primary transition-colors duration-200">
                  {category}
                </Link>
              ) : (
                <p className="text-center font-medium">{category}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}