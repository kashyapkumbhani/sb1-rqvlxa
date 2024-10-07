import { ModeToggle } from "./mode-toggle"

export function Header() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Calculator Hub</h1>
        <ModeToggle />
      </div>
    </header>
  )
}