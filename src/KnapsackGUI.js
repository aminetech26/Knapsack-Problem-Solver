import React, { useState } from 'react';

const knapsack = (weights, values, capacity) => {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => Array.from({ length: capacity + 1 }, () => 0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= capacity; j++) {
      if (weights[i - 1] <= j) {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weights[i - 1]] + values[i - 1]);
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  const result = [];
  let i = n, j = capacity;
  while (i > 0 && j > 0) {
    if (dp[i][j] !== dp[i - 1][j]) {
      result.push(i);
      j -= weights[i - 1];
    }
    i -= 1;
  }

  return [dp[n][capacity], result.reverse()];
};

const KnapsackGUI = () => {
  const [weights, setWeights] = useState('');
  const [values, setValues] = useState('');
  const [capacity, setCapacity] = useState('');
  const [result, setResult] = useState([0, []]);

  const handleSolve = () => {
    const weightsArray = weights.split(',').map(Number);
    const valuesArray = values.split(',').map(Number);
    const capacityNumber = Number(capacity);
    const [maxValue, selectedItems] = knapsack(weightsArray, valuesArray, capacityNumber);
    setResult([maxValue, selectedItems]);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="mb-4 p-4 bg-gray-100 text-center rounded-md shadow-md">
        <p className="text-lg font-bold">TPRO - Problème du sac à dos</p>
        <p>Binome: <strong>GUERRAICHE Ahmed Amine</strong> & <strong>MENASSEL Rayane Ibrahim</strong></p>
        <p>Groupe: <strong>SIL2</strong></p>
        <p>Supervisé par: <strong>HADIM Boukhalfa</strong></p>
      </div>

      {/* Main Solver UI */}
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Résolvez le problème du sac à dos</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="weights" className="block font-medium mb-1">
              Les poids (séparés par des virgules):
            </label>
            <input
              id="weights"
              type="text"
              value={weights}
              onChange={(e) => setWeights(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="values" className="block font-medium mb-1">
             Les valeurs (séparées par des virgules):
            </label>
            <input
              id="values"
              type="text"
              value={values}
              onChange={(e) => setValues(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="capacity" className="block font-medium mb-1">
              La capacité:
            </label>
            <input
              id="capacity"
              type="text"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button
            onClick={handleSolve}
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Appliquer l'algorithme
          </button>
          <div>
            <p className="font-medium">Resultat:</p>
            <p>
              Valeur maximale: {result[0]}
              <br />
              Objets séléctionnés [indices]: {result[1].join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnapsackGUI;
