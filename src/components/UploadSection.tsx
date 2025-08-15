import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, FileText, BarChart3, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import Papa from "papaparse";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface CSVData {
  [key: string]: string | number;
}

const UploadSection = () => {
  const [csvData, setCsvData] = useState<CSVData[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/csv" && !file.name.endsWith('.csv')) {
      toast.error("Please upload a valid CSV file");
      return;
    }

    setFileName(file.name);
    
    Papa.parse(file, {
      complete: (results) => {
        if (results.errors.length > 0) {
          toast.error("Error parsing CSV file");
          return;
        }
        
        const [headerRow, ...dataRows] = results.data as string[][];
        setHeaders(headerRow || []);
        
        const parsedData = dataRows
          .filter(row => row.some(cell => cell.trim() !== ""))
          .map(row => {
            const rowData: CSVData = {};
            headerRow?.forEach((header, index) => {
              const value = row[index]?.trim() || "";
              // Try to parse as number, otherwise keep as string
              rowData[header] = isNaN(Number(value)) ? value : Number(value);
            });
            return rowData;
          });
        
        setCsvData(parsedData);
        setIsUploaded(true);
        toast.success(`Successfully uploaded ${file.name}`);
      },
      header: false,
      skipEmptyLines: true
    });
  };

  const getNumericColumns = () => {
    if (csvData.length === 0) return [];
    return headers.filter(header => 
      typeof csvData[0][header] === 'number'
    );
  };

  const getCategoricalColumns = () => {
    if (csvData.length === 0) return [];
    return headers.filter(header => 
      typeof csvData[0][header] === 'string'
    );
  };

  const generateChartData = () => {
    const numericCols = getNumericColumns();
    if (numericCols.length === 0) return [];
    
    return csvData.slice(0, 10).map((row, index) => ({
      name: `Row ${index + 1}`,
      ...numericCols.reduce((acc, col) => ({
        ...acc,
        [col]: row[col]
      }), {})
    }));
  };

  const generateSummaryStats = () => {
    const numericCols = getNumericColumns();
    if (numericCols.length === 0) return [];

    return numericCols.map(col => {
      const values = csvData.map(row => Number(row[col])).filter(val => !isNaN(val));
      const sum = values.reduce((a, b) => a + b, 0);
      const avg = sum / values.length;
      const min = Math.min(...values);
      const max = Math.max(...values);
      
      return { column: col, avg: avg.toFixed(2), min, max, total: sum.toFixed(2) };
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-green-800 mb-4">
          Custom Data Dashboard
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Upload your CSV file to generate interactive dashboards and insights
        </p>
      </div>

      {!isUploaded ? (
        <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader className="text-center">
            <div className="mx-auto bg-green-100 p-4 rounded-full w-fit mb-4">
              <Upload className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="text-green-800">Upload CSV File</CardTitle>
            <CardDescription>
              Select a CSV file to automatically generate charts and analytics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
              <Input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload" className="cursor-pointer">
                <FileText className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Click to upload CSV file
                </p>
                <p className="text-sm text-gray-500">
                  Supported format: .csv files only
                </p>
              </label>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                {fileName}
              </CardTitle>
              <CardDescription>
                {csvData.length} rows • {headers.length} columns
              </CardDescription>
            </CardHeader>
          </Card>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="charts">Charts</TabsTrigger>
              <TabsTrigger value="data">Raw Data</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
                  <CardHeader className="text-center">
                    <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-blue-800">Total Records</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{csvData.length}</div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                  <CardHeader className="text-center">
                    <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-3">
                      <BarChart3 className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-green-800">Numeric Columns</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-green-600">{getNumericColumns().length}</div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
                  <CardHeader className="text-center">
                    <div className="mx-auto bg-amber-100 p-3 rounded-full w-fit mb-3">
                      <TrendingUp className="h-8 w-8 text-amber-600" />
                    </div>
                    <CardTitle className="text-amber-800">Text Columns</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-amber-600">{getCategoricalColumns().length}</div>
                  </CardContent>
                </Card>
              </div>

              {generateSummaryStats().length > 0 && (
                <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle>Summary Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Column</TableHead>
                          <TableHead>Average</TableHead>
                          <TableHead>Minimum</TableHead>
                          <TableHead>Maximum</TableHead>
                          <TableHead>Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {generateSummaryStats().map((stat, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{stat.column}</TableCell>
                            <TableCell>{stat.avg}</TableCell>
                            <TableCell>{stat.min}</TableCell>
                            <TableCell>{stat.max}</TableCell>
                            <TableCell>{stat.total}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="charts" className="space-y-6">
              {getNumericColumns().length > 0 ? (
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                    <CardHeader>
                      <CardTitle>Data Visualization</CardTitle>
                      <CardDescription>Bar chart of numeric columns</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={{}} className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={generateChartData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            {getNumericColumns().map((col, index) => (
                              <Bar key={col} dataKey={col} fill={`hsl(${index * 60}, 70%, 50%)`} />
                            ))}
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
                    <CardHeader>
                      <CardTitle>Trend Analysis</CardTitle>
                      <CardDescription>Line chart showing data trends</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={{}} className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={generateChartData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            {getNumericColumns().map((col, index) => (
                              <Line key={col} type="monotone" dataKey={col} stroke={`hsl(${index * 60}, 70%, 50%)`} />
                            ))}
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="bg-white/80 backdrop-blur-sm border-gray-200">
                  <CardContent className="text-center py-12">
                    <p className="text-gray-500">No numeric data found for charting</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="data">
              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader>
                  <CardTitle>Raw Data Preview</CardTitle>
                  <CardDescription>First 50 rows of your uploaded data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {headers.map((header, index) => (
                            <TableHead key={index}>{header}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {csvData.slice(0, 50).map((row, index) => (
                          <TableRow key={index}>
                            {headers.map((header, cellIndex) => (
                              <TableCell key={cellIndex}>{String(row[header])}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle>Data Quality</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total rows:</span>
                      <span className="font-semibold">{csvData.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Numeric columns:</span>
                      <span className="font-semibold">{getNumericColumns().length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Text columns:</span>
                      <span className="font-semibold">{getCategoricalColumns().length}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-gray-600">
                      • Consider grouping categorical data for better insights
                    </p>
                    <p className="text-sm text-gray-600">
                      • Look for correlations between numeric columns
                    </p>
                    <p className="text-sm text-gray-600">
                      • Check for outliers in your numeric data
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center">
            <Button 
              onClick={() => {
                setCsvData([]);
                setHeaders([]);
                setFileName("");
                setIsUploaded(false);
              }}
              variant="outline"
            >
              Upload New File
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadSection;
