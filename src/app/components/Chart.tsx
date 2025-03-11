import React from 'react';
import { BarChart, Bar, LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

class Chart extends React.Component<{ data:{ x: string, y: number }[], chartType: any, xAxisLabel:any, yAxisLabel:any, chartTitle:any }> {
    render() {
        const {data, chartType, xAxisLabel, yAxisLabel, chartTitle} = this.props;

        return (
            <div style={{ position: 'relative', width: '100%', height: '400px'}}>
                {/* Title in the top-left */}
                <div style={{
                    marginLeft: '50px',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    marginBottom: '20px',
                    marginTop:'20px'
                }}>
                    {chartTitle}
                </div>
            <ResponsiveContainer width="98%" height={300}>
                {chartType === 'bar' ? (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                        <XAxis stroke='white'
                               dataKey="x" label={{ value: '', position: 'insideBottom', offset: -0, fill:'white' }}
                               tick={{dy:10}}
                        />
                        <YAxis stroke='white'
                               label={{ value: '', angle: -90, position: 'insideLeft', fill:'white' }}
                               tickFormatter={(value) => {
                                   if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`; // Billion
                                   if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`; // Million
                                   if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`; // Thousand
                                   return `$${value.toFixed(1)}`; // Default
                               }}
                        />
                        <Tooltip
                            formatter={(value) => [`$${value}`, "Price"]}
                            labelFormatter={(label) => `Time: ${label}`}

                            contentStyle={{ background: "rgba(0, 0, 0, 0.6)", color: "#fff", borderRadius: "5px", padding: "10px" }}
                        />
                        <Bar dataKey="y" fill="#8884d8"/>
                    </BarChart>
                ) : chartType === 'scatter' ? (
                    <ScatterChart>
                        <CartesianGrid/>
                        <XAxis stroke='white' dataKey="x"
                               label={{ value: '', position: 'insideBottom', offset: -0, fill:'white' }}
                               tick={{dy:10}}
                        />
                        <YAxis stroke='white' dataKey="y"
                               label={{ value: '', angle: -90, position: 'insideLeft', fill:'white' }}
                               tickFormatter={(value) => {
                                   if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`; // Billion
                                   if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`; // Million
                                   if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`; // Thousand
                                   return `$${value.toFixed(1)}`; // Default
                               }}
                        />
                        <Tooltip
                            formatter={(value) => [`$${value}`, "Price"]}
                            labelFormatter={(label) => `Time: ${label}`}
                            contentStyle={{ background: "rgba(0, 0, 0, 0.6)", color: "#fff", borderRadius: "5px", padding: "10px" }}
                        />
                        <Scatter dataKey="y" fill="red"/>
                    </ScatterChart>
                ) : (
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis stroke='white' dataKey="x"
                               label={{ value: '', position: 'insideBottom', offset: 10, fill:'white' }}
                               tick={{dy:10}}
                        />
                        <YAxis domain={['dataMin - 1', 'dataMax + 1']}
                               stroke='white'
                               // tickFormatter={(value) => `$${value.toFixed(2)}`}
                               tickFormatter={(value) => {
                                   if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`; // Billion
                                   if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`; // Million
                                   if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`; // Thousand
                                   return `$${value.toFixed(1)}`; // Default
                               }}
                               label={{
                                   value: '',
                                   angle: -90,
                                   position: 'outsideLeft',
                                   fill:'white',
                                   dx: -20
                        }} />
                        <Tooltip
                            formatter={(value) => [`$${value}`, "Price"]}
                            labelFormatter={(label) => `Time: ${label}`}
                            contentStyle={{ background: "rgba(0, 0, 0, 0.6)", color: "#fff", borderRadius: "5px", padding: "10px" }}
                        />
                        <Line type="monotone" dataKey="y" stroke="#82ca9d" strokeWidth={4} />
                    </LineChart>
                )}
            </ResponsiveContainer>
            </div>
        );
    }
}

export default Chart;