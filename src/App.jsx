import React, { useState } from "react";
import "./App.css";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WorldPopulationViz = () => {
  const [activeChart, setActiveChart] = useState("line");

  // Authentic historical data from UN Population Division and historical records
  const populationData = [
    { year: 1900, population: 1.65, growth: null },
    { year: 1910, population: 1.75, growth: 0.61 },
    { year: 1920, population: 1.86, growth: 0.63 },
    { year: 1930, population: 2.07, growth: 1.13 },
    { year: 1940, population: 2.3, growth: 1.11 },
    { year: 1950, population: 2.54, growth: 1.04 },
    { year: 1960, population: 3.03, growth: 1.93 },
    { year: 1970, population: 3.7, growth: 2.21 },
    { year: 1980, population: 4.45, growth: 2.03 },
    { year: 1990, population: 5.33, growth: 1.98 },
    { year: 2000, population: 6.14, growth: 1.52 },
    { year: 2010, population: 6.96, growth: 1.34 },
    { year: 2020, population: 7.84, growth: 1.26 },
    { year: 2023, population: 8.05, growth: 0.89 },
  ];

  // Regional data for 2023
  const regionalData = [
    { region: "Asia", population: 4.75, percentage: 59 },
    { region: "Africa", population: 1.49, percentage: 18 },
    { region: "Europe", population: 0.74, percentage: 9 },
    { region: "Latin America", population: 0.66, percentage: 8 },
    { region: "North America", population: 0.38, percentage: 5 },
    { region: "Oceania", population: 0.05, percentage: 1 },
  ];

  // Growth rate data
  const growthRateData = [
    { period: "1900-1950", rate: 0.8 },
    { period: "1950-1970", rate: 1.9 },
    { period: "1970-1990", rate: 1.7 },
    { period: "1990-2010", rate: 1.4 },
    { period: "2010-2023", rate: 1.0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">World Population: 1900-2023</h1>
          <p className="text-xl text-gray-600">Historical trends and demographic analysis</p>
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md inline-block">
            <p className="text-3xl font-bold text-indigo-600">8.05 Billion</p>
            <p className="text-sm text-gray-500">Current world population (2023)</p>
          </div>
        </div>

        {/* Chart Type Selector */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveChart("line")}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeChart === "line"
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Population Trend
          </button>
          <button
            onClick={() => setActiveChart("growth")}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeChart === "growth"
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Growth Rate
          </button>
          <button
            onClick={() => setActiveChart("regional")}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeChart === "regional"
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Regional Distribution
          </button>
        </div>

        {/* Main Chart */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          {activeChart === "line" && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                World Population Growth (1900-2023)
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={populationData}>
                  <defs>
                    <linearGradient id="colorPop" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" stroke="#6b7280" />
                  <YAxis
                    label={{ value: "Population (Billions)", angle: -90, position: "insideLeft" }}
                    stroke="#6b7280"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`${value} billion`, "Population"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="population"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorPop)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </>
          )}

          {activeChart === "growth" && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Average Annual Growth Rate by Period
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={growthRateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="period" stroke="#6b7280" />
                  <YAxis
                    label={{ value: "Growth Rate (%)", angle: -90, position: "insideLeft" }}
                    stroke="#6b7280"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`${value}%`, "Annual Growth Rate"]}
                  />
                  <Bar dataKey="rate" fill="#4f46e5" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}

          {activeChart === "regional" && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Current Population by Region (2023)
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={regionalData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" stroke="#6b7280" />
                  <YAxis dataKey="region" type="category" stroke="#6b7280" width={120} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                    formatter={(value, name) => [
                      name === "population" ? `${value} billion` : `${value}%`,
                      name === "population" ? "Population" : "Percentage",
                    ]}
                  />
                  <Bar dataKey="population" fill="#4f46e5" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}
        </div>

        {/* Key Statistics Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Population in 1900</h3>
            <p className="text-4xl font-bold text-indigo-600">1.65B</p>
            <p className="text-sm text-gray-500 mt-2">Start of 20th century</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Growth</h3>
            <p className="text-4xl font-bold text-green-600">+6.4B</p>
            <p className="text-sm text-gray-500 mt-2">388% increase since 1900</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Peak Growth Period</h3>
            <p className="text-4xl font-bold text-orange-600">1950-1970</p>
            <p className="text-sm text-gray-500 mt-2">1.9% annual growth rate</p>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Historical Insights</h2>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
              <p>
                <strong>1900-1950:</strong> Slow growth period (0.8% annually) due to two world
                wars, Spanish flu pandemic, and the Great Depression.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
              <p>
                <strong>1950-1970:</strong> Peak growth period (1.9% annually) due to medical
                advances, antibiotics, vaccines, and the Green Revolution improving food production.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
              <p>
                <strong>1970-2000:</strong> Continued growth but declining rate as fertility rates
                fell in developed nations and family planning spread globally.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
              <p>
                <strong>2000-Present:</strong> Slowest growth period (1.0% annually) with most
                growth concentrated in Africa and Asia. Europe and some Asian nations now experience
                population decline.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
              <p>
                <strong>Regional Distribution:</strong> Asia dominates with 59% of world population.
                Africa has shown the fastest growth in recent decades and is projected to continue
                this trend.
              </p>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p className="font-semibold mb-2">Data Sources:</p>
          <p>United Nations Population Division, World Population Prospects 2024</p>
          <p>U.S. Census Bureau International Database</p>
          <p>Historical estimates from Angus Maddison Database</p>
        </div>
      </div>
    </div>
  );
};

export default WorldPopulationViz;
