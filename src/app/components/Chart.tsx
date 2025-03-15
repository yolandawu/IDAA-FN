import React from 'react';
import {
    BarChart, Bar,
    LineChart, Line,
    XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer,
    Legend
} from 'recharts';

type ChartProps = {
    x: string[] | string[][];
    series: { [key: string]: number[] };
    x_label: string;
    y_label: string;
    title: string;
    chart_type: "line" | "bar";
};

const colorPalette = ["#007bff", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];

class Chart extends React.Component<ChartProps> {
    render() {
        const { x, series, chart_type, x_label, title } = this.props;
        let X : string[]
        if (x.length > 0 && Array.isArray(x[0])) {
            X = x[0] as string[]
        } else {
            X = x as string[]
        }
        const seriesNames = Object.keys(series)
        const data = X.map((date, index) => {
            console.log(X)

            const row: Record<string, string | number> = {};
            row[x_label] = date;
            seriesNames.forEach((name) => {
                row[name] = series[name][index] || 0; // Assign corresponding y-values
            });
            return row;
        });

        console.log(data)

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
                            <XAxis dataKey={x_label}  label={{ value: '', position: 'insideBottom', offset: -0, fill:'white' }}
                                   tick={{dy:10}}
                            />
                            <YAxis label={{ value: '', angle: -90, position: 'insideLeft', fill:'white' }}
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
                                    fill={colorPalette[index % colorPalette.length]}
                                />
                            ))}
                        </BarChart>
                    ) : (
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey={x_label}
                                   label={{ value: '', position: 'insideBottom', offset: 10, fill:'white' }}
                                   tick={{dy:10}}
                            />
                            <YAxis domain={["auto", "auto"]}
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
                                    stroke={colorPalette[index % colorPalette.length]}
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