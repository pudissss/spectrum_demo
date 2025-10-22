"use client"

import { useState } from "react"
import { generateAnalyticsDashboard } from "@/ai/flows/generate-analytics-dashboard"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wand2, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AnalyticsDashboard() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query) return

    setIsLoading(true)
    setResult("")
    try {
      const response = await generateAnalyticsDashboard({ query })
      setResult(response.analyticsData)
    } catch (error) {
      console.error("Failed to generate analytics:", error)
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Could not generate analytics. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="text-primary" />
          <span>AI-Powered Analytics</span>
        </CardTitle>
        <CardDescription>
          Ask for analytics in plain English. For example, "How many logs were
          submitted by the Tech & Society wing this week?"
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="analytics-query">Your question</Label>
              <div className="flex gap-2">
                <Input
                  id="analytics-query"
                  placeholder="e.g., Show me the busiest day for room bookings."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Generate"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
        {(isLoading || result) && (
          <div className="mt-4 rounded-lg border bg-secondary/50 p-4">
            {isLoading && !result && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generating insights...</span>
              </div>
            )}
            {result && (
              <p className="text-sm whitespace-pre-wrap font-code">{result}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
