import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TreePine, BarChart3, Table as TableIcon } from "lucide-react";
import Papa from 'papaparse';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

interface CSVData {
  [key: string]: any;
}

const CustomStudyAreaDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [studyArea, setStudyArea] = useState<any>(null);
  const [csvData, setCsvData] = useState<CSVData[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    const customAreas = JSON.parse(localStorage.getItem('customStudyAreas') || '[]');
    const area = customAreas.find((area: any) => area.id === parseInt(id || ''));
    
    if (area && area.csvData) {
      setStudyArea(area);
      
      Papa.parse(area.csvData, {
        header: true,
        complete: (results) => {
          setCsvData(results.data);
          if (results.data.length > 0) {
            setColumns(Object.keys(results.data[0]));
          }
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        }
      });
    }
  }, [id]);

  if (!studyArea) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">Study Area Not Found</h2>
            <p className="text-gray-600 mb-4">The requested study area could not be found.</p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const numericColumns = columns.filter(col => 
    csvData.some(row => !isNaN(parseFloat(row[col])))
  );

  const generateChartData = (xCol: string, yCol: string) => {
    return csvData.map((row, index) => ({
      name: row[xCol] || `Row ${index + 1}`,
      value: parseFloat(row[yCol]) || 0
    })).filter(item => !isNaN(item.value));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Gallery
          </Button>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img 
                src={studyArea.image} 
                alt={studyArea.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
            
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{studyArea.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{studyArea.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {studyArea.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="data">Data Table</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Records</CardTitle>
                  <TableIcon className="h-4 w-4 ml-auto text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{csvData.length}</div>
                  <p className="text-xs text-muted-foreground">data points</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Data Columns</CardTitle>
                  <BarChart3 className="h-4 w-4 ml-auto text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{columns.length}</div>
                  <p className="text-xs text-muted-foreground">attributes tracked</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Numeric Fields</CardTitle>
                  <TreePine className="h-4 w-4 ml-auto text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{numericColumns.length}</div>
                  <p className="text-xs text-muted-foreground">measurable values</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="charts" className="space-y-6">
            {numericColumns.length >= 2 && (
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Line Chart - {numericColumns[0]} vs {numericColumns[1]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={generateChartData(columns[0], numericColumns[0])}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Bar Chart - {numericColumns[1] || numericColumns[0]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={generateChartData(columns[0], numericColumns[1] || numericColumns[0])}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#22c55e" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Raw Data</CardTitle>
                <CardDescription>Complete dataset from uploaded CSV file</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        {columns.map((column) => (
                          <th key={column} className="border border-gray-300 px-4 py-2 text-left">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {csvData.slice(0, 50).map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          {columns.map((column) => (
                            <td key={column} className="border border-gray-300 px-4 py-2">
                              {row[column]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {csvData.length > 50 && (
                    <p className="text-sm text-gray-500 mt-2">
                      Showing first 50 rows of {csvData.length} total records
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {numericColumns.map((column) => {
                const values = csvData.map(row => parseFloat(row[column])).filter(val => !isNaN(val));
                const sum = values.reduce((a, b) => a + b, 0);
                const avg = sum / values.length;
                const max = Math.max(...values);
                const min = Math.min(...values);

                return (
                  <Card key={column}>
                    <CardHeader>
                      <CardTitle>{column} Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span>Count:</span>
                        <span className="font-medium">{values.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average:</span>
                        <span className="font-medium">{avg.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maximum:</span>
                        <span className="font-medium">{max}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Minimum:</span>
                        <span className="font-medium">{min}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total:</span>
                        <span className="font-medium">{sum.toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomStudyAreaDashboard;