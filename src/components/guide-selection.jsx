"use client"

import React, { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export function GuideSelection({ onPreferencesChange, guides = [] }) {
  const [preferences, setPreferences] = useState([])

  const updatePreferences = useCallback((newPreferences) => {
    setPreferences(newPreferences)
    onPreferencesChange(newPreferences)
  }, [onPreferencesChange])

  const handleGuideClick = (guideId) => {
    updatePreferences(prev => {
      if (prev.includes(guideId)) {
        return prev.filter((id) => id !== guideId)
      } else {
        return [...prev, guideId]
      }
    })
  }

  const getPreferenceNumber = (guideId) => {
    const index = preferences.indexOf(guideId)
    return index !== -1 ? index + 1 : null
  }

  return (
    <Card className="w-full border-none shadow-none bg-transparent">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-800">Guide Selection</CardTitle>
        <CardDescription className="text-blue-600">Click on guides to rank your preferences. You must rank all guides.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] border rounded-md p-4 bg-white">
          {guides.map((guide) => (
            <Button
              key={guide.id}
              variant={preferences.includes(guide.id) ? "default" : "outline"}
              className={`w-full justify-start mb-2 relative ${
                preferences.includes(guide.id)
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-white text-blue-800 hover:bg-blue-100'
              }`}
              onClick={() => handleGuideClick(guide.id)}
            >
              <div className="text-left flex-grow">
                <div>{guide.name}</div>
                <div className={`text-sm ${preferences.includes(guide.id) ? 'text-blue-200' : 'text-blue-600'}`}>
                  {guide.specialization}
                </div>
              </div>
              {getPreferenceNumber(guide.id) && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-blue-800 rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {getPreferenceNumber(guide.id)}
                </div>
              )}
            </Button>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}