import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Calculator() {
  const [result, setResult] = useState("")

  const handleClick = (value: string) => {
    setResult(result + value)
  }

  const handleClear = () => {
    setResult("")
  }

  const handleCalculate = () => {
    try {
      setResult(eval(result).toString())
    } catch (error) {
      setResult("Error")
    }
  }

  return (
    <section className="mb-12 bg-section-calculator p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center">Calculator</h2>
      <Tabs defaultValue="basic" className="w-full max-w-md mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="scientific">Scientific</TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Basic Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <Input value={result} readOnly className="mb-4" />
              <div className="grid grid-cols-4 gap-2">
                {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map((btn) => (
                  <Button
                    key={btn}
                    onClick={() => btn === "=" ? handleCalculate() : handleClick(btn)}
                    variant={btn === "=" ? "default" : "outline"}
                  >
                    {btn}
                  </Button>
                ))}
                <Button onClick={handleClear} className="col-span-4" variant="secondary">Clear</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="scientific">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Scientific Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Scientific calculator coming soon!</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  )
}