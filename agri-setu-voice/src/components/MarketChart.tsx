import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const priceHistoryData = [
    { date: "Oct 1", tomato: 28, onion: 22, wheat: 2100, chilli: 78 },
    { date: "Oct 3", tomato: 30, onion: 24, wheat: 2120, chilli: 80 },
    { date: "Oct 5", tomato: 29, onion: 26, wheat: 2140, chilli: 82 },
    { date: "Oct 7", tomato: 31, onion: 25, wheat: 2130, chilli: 83 },
    { date: "Oct 9", tomato: 32, onion: 23, wheat: 2145, chilli: 85 },
    { date: "Oct 11", tomato: 33, onion: 25, wheat: 2150, chilli: 84 },
    { date: "Oct 13", tomato: 32, onion: 24, wheat: 2155, chilli: 86 },
];

const MarketChart = () => {
    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle className="text-2xl">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            7-Day Price Trend
          </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={priceHistoryData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis
                            dataKey="date"
                            className="text-xs"
                            stroke="hsl(var(--muted-foreground))"
                        />
                        <YAxis
                            className="text-xs"
                            stroke="hsl(var(--muted-foreground))"
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "var(--radius)",
                            }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="tomato"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            name="Tomato (₹/kg)"
                            dot={{ fill: "hsl(var(--primary))" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="onion"
                            stroke="hsl(var(--secondary))"
                            strokeWidth={2}
                            name="Onion (₹/kg)"
                            dot={{ fill: "hsl(var(--secondary))" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="chilli"
                            stroke="hsl(var(--accent))"
                            strokeWidth={2}
                            name="Chilli (₹/kg)"
                            dot={{ fill: "hsl(var(--accent))" }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default MarketChart;