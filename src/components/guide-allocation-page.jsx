"use client"

import React, { useState, useCallback } from "react"
import { GuideSelection } from "./guide-selection"
import { SelectedGuidesList } from "./selected-guides-list"
import { Button } from "@/components/ui/button"
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const guides = [
  { id: 1, name: "Dr. Amit Kumar", specialization: "Machine Learning" },
  { id: 2, name: "Prof. Sunita Sharma", specialization: "Cybersecurity" },
  { id: 3, name: "Dr. Rajesh Verma", specialization: "Internet of Things" },
  { id: 4, name: "Prof. Priya Patel", specialization: "Data Science" },
  { id: 5, name: "Dr. Vikram Singh", specialization: "Artificial Intelligence" },
  { id: 6, name: "Dr. Neha Gupta", specialization: "Computer Vision" },
  { id: 7, name: "Prof. Sanjay Mehta", specialization: "Robotics" },
  { id: 8, name: "Dr. Anita Desai", specialization: "Natural Language Processing" },
]

export default function GuideAllocationPage() {
  const [preferences, setPreferences] = useState([])

  const handlePreferencesChange = useCallback((newPreferences) => {
    setPreferences(newPreferences)
  }, [])

  const handleSubmit = () => {
    if (preferences.length === guides.length) {
      console.log("Preferences submitted:", preferences)
      toast.success("Preferences submitted successfully.");
      // You can add logic here to send the data to your server
    } else {
      toast.failure("Please rank all guides before submitting.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 py-10">
      <div className="container mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          B.Tech Major Project Guide Allocation
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <GuideSelection onPreferencesChange={handlePreferencesChange} guides={guides} />
          </div>
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <SelectedGuidesList preferences={preferences} guides={guides} />
            </div>
            <div className="flex justify-center">
              <Button 
                onClick={handleSubmit} 
                disabled={preferences.length !== guides.length}
                className="w-full max-w-md py-6 text-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Preferences
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}