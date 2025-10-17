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

import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';

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

  const handleExportReport = async () => {
    if (!salesHistory || salesHistory.length === 0) {
      alert(t("No sales history data to export."));
      return;
    }

    const doc = new jsPDF();
    let yPos = 22;

    // Helper function to capture chart as image
    const captureChart = async (elementId: string) => {
      const element = document.getElementById(elementId);
      if (!element) return null;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      return canvas.toDataURL('image/png');
    };

    // Add Title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(t("AgriMandi Analytics Report"), 105, yPos, { align: "center" });
    yPos += 15;

    // Add Report Generation Date
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, yPos, { align: "center" });
    yPos += 15;

    // Add Summary Cards
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(t("Performance Summary"), 14, yPos);
    yPos += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`${t("Total Revenue")}: Rs. 1,17,950`, 14, yPos);
    doc.text(`${t("Total Sales")}: 139`, 70, yPos);
    doc.text(`${t("Avg. Sale Value")}: Rs. 8,485`, 120, yPos);
    yPos += 10;

    // Sales History
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(t("Sales History"), 14, yPos);
    yPos += 10;

    if (salesHistory && salesHistory.length > 0) {
      const salesHeaders = [[t("Date"), t("Crop"), t("Buyer"), t("Quantity"), t("Amount")]];
      const salesData = salesHistory.map(sale => [
        new Date(sale.saleDate).toLocaleDateString(),
        sale.cropName,
        sale.buyerName,
        `${sale.quantity} ${sale.unit}`,
        `Rs. ${Number(sale.totalAmount).toLocaleString('en-IN', {maximumFractionDigits: 2})}`,
      ]);

      autoTable(doc, {
        startY: yPos,
        head: [salesHeaders[0]],
        body: salesData,
        theme: 'grid',
        headStyles: { 
          fillColor: [22, 163, 74], 
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: 'bold'
        },
        styles: { 
          font: 'helvetica', 
          fontSize: 9, 
          cellPadding: 4, 
          textColor: [0, 0, 0] 
        },
        columnStyles: { 
          0: { cellWidth: 25 },
          1: { cellWidth: 30 },
          2: { cellWidth: 40 },
          3: { cellWidth: 25 },
          4: { cellWidth: 35, halign: 'right' }
        },
      });
      yPos = (doc as any).lastAutoTable.finalY + 15;
    } else {
      doc.setFontSize(12);
      doc.text(t("No sales history data available."), 14, yPos);
      yPos += 10;
    }

    // Monthly Earnings
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(t("Monthly Earnings"), 14, yPos);
    yPos += 10;

    if (earningsData && earningsData.length > 0) {
      const earningsHeaders = [[t("Month"), t("Earnings")]];
      const earningsTableData = earningsData.map(item => [
        t(item.month),
        `Rs. ${Number(item.earnings).toLocaleString('en-IN', {maximumFractionDigits: 2})}`,
      ]);
      autoTable(doc, {
        startY: yPos,
        head: [earningsHeaders[0]],
        body: earningsTableData,
        theme: 'grid',
        headStyles: { 
          fillColor: [22, 163, 74], 
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: 'bold'
        },
        styles: { 
          font: 'helvetica', 
          fontSize: 9, 
          cellPadding: 4, 
          textColor: [0, 0, 0] 
        },
        columnStyles: { 
          0: { cellWidth: 80 },
          1: { cellWidth: 75, halign: 'right' }
        },
      });
      yPos = (doc as any).lastAutoTable.finalY + 15;
    } else {
      doc.setFontSize(12);
      doc.text(t("No monthly earnings data available."), 14, yPos);
      yPos += 10;
    }

    // Monthly Sales Volume
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(t("Monthly Sales Volume"), 14, yPos);
    yPos += 10;

    if (monthlySales && monthlySales.length > 0) {
      const salesVolumeHeaders = [[t("Month"), t("Sales Count")]];
      const salesVolumeData = monthlySales.map(item => [
        t(item.month),
        item.sales.toString(),
      ]);
      autoTable(doc, {
        startY: yPos,
        head: [salesVolumeHeaders[0]],
        body: salesVolumeData,
        theme: 'grid',
        headStyles: { 
          fillColor: [22, 163, 74], 
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: 'bold'
        },
        styles: { 
          font: 'helvetica', 
          fontSize: 9, 
          cellPadding: 4, 
          textColor: [0, 0, 0] 
        },
        columnStyles: { 
          0: { cellWidth: 80 },
          1: { cellWidth: 75, halign: 'right' }
        },
      });
      yPos = (doc as any).lastAutoTable.finalY + 15;
    } else {
      doc.setFontSize(12);
      doc.text(t("No monthly sales volume data available."), 14, yPos);
      yPos += 10;
    }

    // Crop Distribution
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(t("Crop Distribution"), 14, yPos);
    yPos += 10;

    if (cropDistribution && cropDistribution.length > 0) {
      const cropHeaders = [[t("Crop"), t("Percentage")]];
      const cropData = cropDistribution.map(item => [
        t(item.name),
        `${item.value}%`,
      ]);
      autoTable(doc, {
        startY: yPos,
        head: [cropHeaders[0]],
        body: cropData,
        theme: 'grid',
        headStyles: { 
          fillColor: [22, 163, 74], 
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: 'bold'
        },
        styles: { 
          font: 'helvetica', 
          fontSize: 9, 
          cellPadding: 4, 
          textColor: [0, 0, 0] 
        },
        columnStyles: { 
          0: { cellWidth: 80 },
          1: { cellWidth: 75, halign: 'right' }
        },
      });
      yPos = (doc as any).lastAutoTable.finalY + 15;
    } else {
      doc.setFontSize(12);
      doc.text(t("No crop distribution data available."), 14, yPos);
      yPos += 10;
    }

    // Add page break for charts
    doc.addPage();
    yPos = 20;

    // Capture and add charts
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(t("Visual Analytics"), 105, yPos, { align: "center" });
    yPos += 15;

    // Earnings Chart
    const earningsChart = await captureChart('earnings-chart');
    if (earningsChart) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(t("Monthly Earnings"), 14, yPos);
      yPos += 10;
      doc.addImage(earningsChart, 'PNG', 14, yPos, 180, 80);
      yPos += 90;
    }

    // Check if we need a new page
    if (yPos > 200) {
      doc.addPage();
      yPos = 20;
    }

    // Sales Volume Chart
    const salesChart = await captureChart('sales-chart');
    if (salesChart) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(t("Monthly Sales Volume"), 14, yPos);
      yPos += 10;
      doc.addImage(salesChart, 'PNG', 14, yPos, 180, 80);
      yPos += 90;
    }

    // Crop Distribution Chart
    if (yPos > 200) {
      doc.addPage();
      yPos = 20;
    }

    const distributionChart = await captureChart('distribution-chart');
    if (distributionChart) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(t("Sales Distribution by Crop"), 14, yPos);
      yPos += 10;
      doc.addImage(distributionChart, 'PNG', 14, yPos, 180, 80);
    }

    // Add footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
      doc.text("AgriMandi Analytics Report", 20, doc.internal.pageSize.height - 15);
    }

    doc.save("analytics_report.pdf");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-heading text-4xl font-bold" data-testid="heading-analytics">
            {t("Analytics")}          </h1>
          <p className="text-muted-foreground mt-2">
            {t("Track your sales performance and market trends")}
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="6months">
            <SelectTrigger className="w-40" data-testid="select-time-range">
              <SelectValue placeholder={t("Select time range")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">{t("Last Month")}</SelectItem>
              <SelectItem value="3months">{t("Last 3 Months")}</SelectItem>
              <SelectItem value="6months">{t("Last 6 Months")}</SelectItem>
              <SelectItem value="1year">{t("Last Year")}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" data-testid="button-export-report" onClick={handleExportReport}>
            <Download className="mr-2 h-4 w-4" />
            {t("Export Report")}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t("Total Revenue")}</CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-chart-3/10">
              <IndianRupee className="h-5 w-5 text-chart-3" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tabular-nums" data-testid="text-total-revenue">₹1,17,950</div>
            <p className="text-sm text-chart-3 font-medium mt-1">
              {t("+24.5% from last period")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t("Total Sales")}</CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-chart-1/10">
              <Package className="h-5 w-5 text-chart-1" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tabular-nums" data-testid="text-total-sales">139</div>
            <p className="text-sm text-chart-3 font-medium mt-1">
              {t("+12 from last period")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t("Avg. Sale Value")}</CardTitle>
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-chart-2/10">
              <BarChart3 className="h-5 w-5 text-chart-2" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tabular-nums" data-testid="text-avg-sale">₹8,485</div>
            <p className="text-sm text-chart-3 font-medium mt-1">
              {t("+8.2% from last period")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="earnings" className="w-full">
        <TabsList>
          <TabsTrigger value="earnings" data-testid="tab-earnings">{t("Earnings Trend")}</TabsTrigger>
          <TabsTrigger value="sales" data-testid="tab-sales">{t("Sales Volume")}</TabsTrigger>
          <TabsTrigger value="distribution" data-testid="tab-distribution">{t("Crop Distribution")}</TabsTrigger>
        </TabsList>

        <TabsContent value="earnings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("Monthly Earnings")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div id="earnings-chart">
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("Monthly Sales Volume")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div id="sales-chart">
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("Sales Distribution by Crop")}</CardTitle>
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
                    <th className="p-3 text-left text-sm font-medium">{t("Date")}</th>
                    <th className="p-3 text-left text-sm font-medium">{t("Crop")}</th>
                    <th className="p-3 text-left text-sm font-medium">{t("Buyer")}</th>
                    <th className="p-3 text-left text-sm font-medium">{t("Quantity")}</th>
                    <th className="p-3 text-left text-sm font-medium">{t("Amount")}</th>
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