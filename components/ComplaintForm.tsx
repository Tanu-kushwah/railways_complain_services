"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Mic, Camera, Send, Sparkles } from "lucide-react";

interface AiAnalysis {
  suggestedType: string;
  priority: "High" | "Medium" | "Low";
  sentiment: string;
  confidence: number;
  suggestedCategory?: string;
}

interface FormData {
  type: string;
  priority: string;
  trainNumber: string;
  coachNumber: string;
  seatNumber: string;
  description: string;
  passengerName: string;
  phone: string;
  email: string;
  language: string;
}

export function ComplaintForm() {
  const [formData, setFormData] = useState<FormData>({
    type: "",
    priority: "",
    trainNumber: "",
    coachNumber: "",
    seatNumber: "",
    description: "",
    passengerName: "",
    phone: "",
    email: "",
    language: "en",
  });

  const [isRecording, setIsRecording] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AiAnalysis | null>(null);

  const complaintTypes = ["Cleanliness","Food Quality","AC/Fan Problem","Staff Behavior","Security Issue","Delay","Booking Issue","Other"];

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "bn", name: "বাংলা" },
    { code: "te", name: "తెలుగు" },
    { code: "ta", name: "தமிழ்" },
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "description" && value.length > 20) {
      setTimeout(() => {
        setAiAnalysis({
          suggestedType: "Cleanliness",
          priority: "Medium",
          sentiment: "Neutral",
          confidence: 0.87,
          suggestedCategory: "Coach Maintenance",
        });
      }, 1000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Absolute URL use karo, dev/production dono me safe
      const res = await fetch(`${window.location.origin}/api/complaints`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // ✅ Always check for data.trackingId
      if (res.ok && data.trackingId) {
        alert(`Complaint submitted successfully! Tracking ID: ${data.trackingId}`);
      } else {
        // Agar backend error diya
        alert("Failed to submit complaint: " + (data.error || "Please try again"));
        return;
      }

      // Reset form
      setFormData({
        type: "",
        priority: "",
        trainNumber: "",
        coachNumber: "",
        seatNumber: "",
        description: "",
        passengerName: "",
        phone: "",
        email: "",
        language: "en",
      });
      setAiAnalysis(null);

    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const toggleRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        description: prev.description + " [Voice input: Example complaint...]",
      }));
      setIsRecording(false);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" /> Complaint Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Language & Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="language">Preferred Language</Label>
                <Select value={formData.language} onValueChange={(v) => handleInputChange("language", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="type">Complaint Type</Label>
                <Select value={formData.type} onValueChange={(v) => handleInputChange("type", v)}>
                  <SelectTrigger><SelectValue placeholder="Select complaint type" /></SelectTrigger>
                  <SelectContent>
                    {complaintTypes.map((type) => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Train Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="trainNumber">Train Number</Label>
                <Input id="trainNumber" value={formData.trainNumber} onChange={(e) => handleInputChange("trainNumber", e.target.value)} placeholder="e.g., 12345" />
              </div>
              <div>
                <Label htmlFor="coachNumber">Coach Number</Label>
                <Input id="coachNumber" value={formData.coachNumber} onChange={(e) => handleInputChange("coachNumber", e.target.value)} placeholder="e.g., B2" />
              </div>
              <div>
                <Label htmlFor="seatNumber">Seat Number</Label>
                <Input id="seatNumber" value={formData.seatNumber} onChange={(e) => handleInputChange("seatNumber", e.target.value)} placeholder="e.g., 45" />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} placeholder="Describe your complaint..." rows={4} />
              <div className="flex items-center space-x-2 mt-2">
                <Button type="button" onClick={toggleRecording} className={`${isRecording ? "bg-red-100 text-red-700" : ""}`}>
                  <Mic className={`h-4 w-4 mr-2 ${isRecording ? "animate-pulse" : ""}`} />
                  {isRecording ? "Recording..." : "Voice Input"}
                </Button>
                <Button type="button">
                  <Camera className="h-4 w-4 mr-2" /> Add Photo
                </Button>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="passengerName">Your Name</Label>
                <Input id="passengerName" value={formData.passengerName} onChange={(e) => handleInputChange("passengerName", e.target.value)} placeholder="Full name" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} placeholder="your.email@example.com" />
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Send className="h-4 w-4 mr-2" /> Submit Complaint
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
