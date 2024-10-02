import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SelectedGuidesList({ preferences = [], guides = [] }) {
  const sortedGuides = preferences && guides ? 
    preferences
      .map(id => guides.find(guide => guide.id === id))
      .filter(Boolean) 
    : []

  return (
    <Card className="w-full border-none shadow-none bg-transparent">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-800">Selected Guides</CardTitle>
        <CardDescription className="text-blue-600">Your guide preferences in order of selection</CardDescription>
      </CardHeader>
      <CardContent>
        {sortedGuides.length > 0 ? (
          <ul className="space-y-2">
            {sortedGuides.map((guide, index) => (
              <li key={guide.id} className="flex items-center space-x-2 bg-white rounded-md p-2 shadow-sm">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {index + 1}
                </span>
                <span className="text-blue-800">{guide.name}</span>
                <span className="text-blue-600 text-sm">- {guide.specialization}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-blue-600">No guides selected yet.</p>
        )}
      </CardContent>
    </Card>
  )
}