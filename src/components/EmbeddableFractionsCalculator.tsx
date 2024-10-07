import React from 'react';
import { FractionsCalculator } from "@/components/FractionsCalculator";

export function EmbeddableFractionsCalculator() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Fractions Calculator</h2>
      <FractionsCalculator />
    </div>
  );
}