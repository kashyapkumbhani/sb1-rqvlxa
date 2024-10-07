import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HomePage } from "@/pages/HomePage"
import { FractionsPage } from "@/pages/FractionsPage"
import { FractionsCalculatorPage } from "@/pages/FractionsCalculatorPage"
import { AddingSubtractingFractionsPage } from "@/pages/AddingSubtractingFractionsPage"
import { MixedNumbersCalculatorPage } from "@/pages/MixedNumbersCalculatorPage"
import { EmbeddableFractionsCalculator } from "@/components/EmbeddableFractionsCalculator"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/embed/fractions-calculator" element={<EmbeddableFractionsCalculator />} />
          <Route path="*" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/fractions" element={<FractionsPage />} />
                  <Route path="/fractions/fractions-calculator" element={<FractionsCalculatorPage />} />
                  <Route path="/fractions/adding-and-subtracting-fractions" element={<AddingSubtractingFractionsPage />} />
                  <Route path="/fractions/mixed-numbers-calculator" element={<MixedNumbersCalculatorPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App