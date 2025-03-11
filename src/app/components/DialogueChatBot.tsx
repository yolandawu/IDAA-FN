'use client'
import iconChatbot from '../images/icon-bot.jpg'
import ReactMarkdown from "react-markdown";
import {JSX} from "react";
import Chart from "@/app/components/Chart";


export default function DialogueChatBot({chatbotReply, chatbotChat}: {
    chatbotReply: string | JSX.Element,
    chatbotChat?: string
}) {

    const chart = chatbotChat || "";

    function parsePythonChart(markdownString: string) {
        console.log(markdownString);
        if (!markdownString) {
            console.error("Invalid input: markdownString must be a valid string.");
            return null;
        }
        // Regex to find arrays (matches first and second array)
        const arrayRegex = /(\[[\s\S]*?\])\s*\*\s*(\d+)/g;
        const standardArrayRegex = /\[([\s\S]*?)]/g;

        let modifiedMarkdown = markdownString;

        // Expand lists with multiplication (e.g., `[118.79] * 24`)
        modifiedMarkdown = modifiedMarkdown.replace(arrayRegex, (_, array, multiplier) => {
            const expandedArray = JSON.parse(array).flatMap((val:number) => {
                return Array(Number(multiplier)).fill(val);
            });
            return JSON.stringify(expandedArray);
        });

        const matches = Array.from(modifiedMarkdown.matchAll(standardArrayRegex));

        // Convert the extracted arrays to JavaScript arrays
        const xValues = matches[0][1].split(',').map(v => v.trim().replace(/["']/g, ''));
        const yValues = matches[1][1].split(',').map(v => parseFloat(v.trim()));

        // Extract axis labels using regex
        const xAxisLabelMatch = markdownString.match(/xaxis_title=['"](.+?)['"]/);
        const yAxisLabelMatch = markdownString.match(/yaxis_title=['"](.+?)['"]/);
        const titleMatch = markdownString.match(/title=['"](.+?)['"]/);

        const xAxisLabel = xAxisLabelMatch ? xAxisLabelMatch[1] : 'X-Axis';
        const yAxisLabel = yAxisLabelMatch ? yAxisLabelMatch[1] : 'Y-Axis';
        const chartTitle = titleMatch ? titleMatch[1] : '';

        console.log("x:" + xValues);
        console.log("y:" + yValues);

        // Determine the chart type (Bar, Line, Scatter)
        let chartType = 'line'; // Default
        if (markdownString.includes("go.Bar")) {
            chartType = 'bar';
        } else if (markdownString.includes("go.Scatter") && markdownString.includes("mode='markers'")) {
            chartType = 'scatter';
        } else if (markdownString.includes("go.Scatter")) {
            chartType = 'line';
        }

        console.log(chartType);

        return { xValues, yValues, chartType, xAxisLabel, yAxisLabel, chartTitle };
    }

    let chartData: { x: string, y: number }[] = [];
    let xValues: string[] = [];
    let yValues: number[] = [];
    let chartType = 'line';
    let xAxisLabel = 'X-Axis';
    let yAxisLabel = 'Y-Axis';
    let chartTitle = 'Chart Title';
    const parsedData = parsePythonChart(chart);
    if (parsedData) {
        ({ xValues, yValues, chartType, xAxisLabel, yAxisLabel, chartTitle } = parsedData);
        chartData = xValues.map((x: string, index: number) => ({
            x,
            y: yValues[index] || 0, // Ensure a default value for safety
        }));
    }

    return (
        <div className='w-full py-2'>
            <div className='flex p-2 w-full ml-1'>
                <img className="rounded-xl mt-2"  style={{width:'40px', height:'40px'}} src={iconChatbot.src} alt=''/>
                {typeof chatbotReply === 'string' ? (
                    <ReactMarkdown
                        className='px-3 ml-1 flex-1 my-3 reactMarkDown'
                    >
                        {chatbotReply.replace(/\n/gi, " &nbsp;\n\r ")}
                    </ReactMarkdown>
                    ) : (
                    chatbotReply
                )}
            </div>
            {chatbotChat && chatbotChat.length > 0 && (
                <Chart data={chartData} chartType={chartType} xAxisLabel={xAxisLabel} yAxisLabel={yAxisLabel} chartTitle={chartTitle}/>
            )}
        </div>
    )
}
