"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { week: "W1", minutes: 80 },
  { week: "W2", minutes: 120 },
  { week: "W3", minutes: 95 },
  { week: "W4", minutes: 150 },
  { week: "W5", minutes: 180 },
]

export function ProgressTrackingSection() {
  return (
    <section aria-labelledby="progress-tracking" className="grid gap-4">
      <h2 id="progress-tracking" className="text-lg font-semibold text-foreground text-balance">
        Progress Tracking
      </h2>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Weekly Study Time</CardTitle>
        </CardHeader>
        <CardContent className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="[&>line]:stroke-border" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="minutes" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </section>
  )
}
