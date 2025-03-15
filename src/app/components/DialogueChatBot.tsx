'use client'
import iconChatbot from '../images/icon-bot.jpg'
import ReactMarkdown from "react-markdown";
import { JSX } from "react";
import Chart from "@/app/components/Chart";

type ChatbotChat = {
    x: string[] | string[][];
    series: { [key: string]: number[] };
    x_label: string;
    y_label: string;
    title: string;
    chart_type: "line" | "bar";
};

export default function DialogueChatBot({ chatbotReply, chatbotChat }: {
    chatbotReply: string | JSX.Element,
    chatbotChat?: ChatbotChat
}) {

    // Ensure chatbotChat is a valid object, otherwise fallback to defaults
    const data: ChatbotChat = chatbotChat || {
        x: [],
        series: {},
        x_label: "X-Axis",
        y_label: "Y-Axis",
        title: "Chart Title",
        chart_type: "line"
    };

    return (
        <div className='w-full py-2'>
            <div className='flex p-2 w-full ml-1'>
                <img className="rounded-xl" style={{ width: '40px', height: '40px' }} src={iconChatbot.src} alt='' />
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

            {/* Render Chart only if chatbotChat contains valid data */}
            {chatbotChat && Object.keys(chatbotChat).length > 0 && (
                <Chart
                    x={data.x}
                    series={data.series}
                    chart_type={data.chart_type}
                    x_label={data.x_label}
                    y_label={data.y_label}
                    title={data.title}
                />
            )}
        </div>
    );
}