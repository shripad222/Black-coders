import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TrendingUp, Download, IndianRupee, Package, BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { SalesHistory } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export default function Analytics() {
  const { t } = useLanguage();

  const { data: salesHistory, isLoading } = useQuery<SalesHistory[]>({
    queryKey: ["/api/sales-history"],
  });

  const earningsData = [
    { month: "Jan", earnings: 12500 },
    { month: "Feb", earnings: 18200 },
    { month: "Mar", earnings: 15800 },
    { month: "Apr", earnings: 22400 },
    { month: "May", earnings: 19600 },
    { month: "Jun", earnings: 28450 },
  ];

  const cropDistribution = [
    { name: "Wheat", value: 35 },
    { name: "Rice", value: 28 },
    { name: "Sugarcane", value: 22 },
    { name: "Cotton", value: 10 },
    { name: "Others", value: 5 },
  ];

  const monthlySales = [
    { month: "Jan", sales: 15 },
    { month: "Feb", sales: 22 },
    { month: "Mar", sales: 18 },
    { month: "Apr", sales: 28 },
    { month: "May", sales: 24 },
    { month: "Jun", sales: 32 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-heading text-4xl font-bold" data-testid="heading-analytics">
            {t("analytics")}
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your sales performance and market trends
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="6months">
            <SelectTrigger className="w-40" data-testid="select-time-range">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" data-testid="button-export-report">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-chart-3/10">
              <IndianRupee className="h-5 w-5 text-chart-3" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tabular-nums" data-testid="text-total-revenue">₹1,17,950</div>
            <p className="text-sm text-chart-3 font-medium mt-1">
              +24.5% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-chart-1/10">
              <Package className="h-5 w-5 text-chart-1" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tabular-nums" data-testid="text-total-sales">139</div>
            <p className="text-sm text-chart-3 font-medium mt-1">
              +12 from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Sale Value</CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-chart-2/10">
              <BarChart3 className="h-5 w-5 text-chart-2" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tabular-nums" data-testid="text-avg-sale">₹8,485</div>
            <p className="text-sm text-chart-3 font-medium mt-1">
              +8.2% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="earnings" className="w-full">
        <TabsList>
          <TabsTrigger value="earnings" data-testid="tab-earnings">Earnings Trend</TabsTrigger>
          <TabsTrigger value="sales" data-testid="tab-sales">Sales Volume</TabsTrigger>
          <TabsTrigger value="distribution" data-testid="tab-distribution">Crop Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="earnings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--chart-1))' }}
                    name="Earnings (₹)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Sales Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="sales" fill="hsl(var(--chart-2))" name="Sales Count" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Distribution by Crop</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={cropDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {cropDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>{t("salesHistory")}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-md" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-6 w-24" />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-3 text-left text-sm font-medium">Date</th>
                    <th className="p-3 text-left text-sm font-medium">Crop</th>
                    <th className="p-3 text-left text-sm font-medium">Buyer</th>
                    <th className="p-3 text-left text-sm font-medium">Quantity</th>
                    <th className="p-3 text-left text-sm font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover-elevate" data-testid="sale-row-1">
                    <td className="p-3 text-sm">June 15, 2024</td>
                    <td className="p-3 text-sm font-medium">Wheat</td>
                    <td className="p-3 text-sm">Rajesh Wholesale</td>
                    <td className="p-3 text-sm">50 quintal</td>
                    <td className="p-3 text-sm font-semibold tabular-nums">₹1,42,500</td>
                  </tr>
                  <tr className="border-b hover-elevate" data-testid="sale-row-2">
                    <td className="p-3 text-sm">June 10, 2024</td>
                    <td className="p-3 text-sm font-medium">Rice</td>
                    <td className="p-3 text-sm">Priya Traders</td>
                    <td className="p-3 text-sm">30 quintal</td>
                    <td className="p-3 text-sm font-semibold tabular-nums">₹87,900</td>
                  </tr>
                  <tr className="border-b hover-elevate" data-testid="sale-row-3">
                    <td className="p-3 text-sm">June 5, 2024</td>
                    <td className="p-3 text-sm font-medium">Sugarcane</td>
                    <td className="p-3 text-sm">Kumar Mills</td>
                    <td className="p-3 text-sm">100 quintal</td>
                    <td className="p-3 text-sm font-semibold tabular-nums">₹3,15,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
