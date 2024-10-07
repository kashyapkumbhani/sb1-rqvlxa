import React from 'react';
import { FractionsCalculator } from "@/components/FractionsCalculator";
import { ThemeProvider } from "@/components/theme-provider";

export function EmbeddableFractionsCalculator() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="p-4 bg-background text-foreground">
         
        <FractionsCalculator />
      </div>
    </ThemeProvider>
  );
}