import React from 'react';
import {
    BarChart, Bar,
    LineChart, Line,
    ScatterChart, Scatter,
    XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer,
    Legend
} from 'recharts';

type ChartProps = {
    x: string[];
    series: { [key: string]: number[] };
    x_label: string;
    y_label: string;
    title: string;
    chart_type: "line" | "bar";
};

class Chart extends React.Component<ChartProps> {
    render() {
        const { x, series, chart_type, x_label, y_label, title } = this.props;
        console.log("Received X:", x);
        console.log("Received Series:", series);

        const seriesNames = Object.keys(series)
        const data = x.map((date, index) => {
            const row: Record<string, string | number> = {};
            row[x_label] = date;
            seriesNames.forEach((name) => {
                row[name] = series[name][index] || 0; // Assign corresponding y-values
            });
            return row;
        });

        console.log("Formatted Data for Recharts:", data);

        const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#d0ed57", "#a4de6c"];

        return (
            <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                {/* Title in the top-left */}
                <div style={{
                    marginLeft: '50px',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    marginBottom: '20px',
                    marginTop: '20px'
                }}>
                    {title}
                </div>
                <ResponsiveContainer width="98%" height={300}>
                    {chart_type === 'bar' ? (
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                            <XAxis stroke='white'
                                   dataKey={x_label}  label={{ value: '', position: 'insideBottom', offset: -0, fill:'white' }}
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
                            <Tooltip contentStyle={{
                                backgroundColor: "rgba(0, 0, 0, 0.3)", // 30% transparent background
                                color: "white",
                                borderRadius: "5px",
                                padding: "10px",
                                border: "1px solid rgba(255, 255, 255, 0.5)" // Soft white border for visibility
                            }}/>
                            {Object.keys(series).map((key, index) => (
                                <Bar
                                    key={key}
                                    dataKey={key}
                                    fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                                />
                            ))}
                        </BarChart>
                    ) : (
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis stroke='white' dataKey={x_label}
                                   label={{ value: '', position: 'insideBottom', offset: 10, fill:'white' }}
                                   tick={{dy:10}}
                            />
                            <YAxis domain={["auto", "auto"]}
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
                            <Tooltip contentStyle={{
                                backgroundColor: "rgba(0, 0, 0, 0.3)", // 30% transparent background
                                color: "white",
                                borderRadius: "5px",
                                padding: "10px",
                                border: "1px solid rgba(255, 255, 255, 0.5)" // Soft white border for visibility
                            }}/>
                            <Legend />
                            {Object.keys(series).map((key, index) => (
                                <Line
                                    key={key}
                                    type="monotone"
                                    dataKey={key}
                                    stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                                    strokeWidth={3}
                                />
                            ))}
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </div>
        );
    }
}

export default Chart;