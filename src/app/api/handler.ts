const urlSendMessage = '/process'

async function sendMessage(userInput:string) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + urlSendMessage, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "question": userInput,
            "sql_query": "",
            "query_result": "",
            "agents": "",
            "agent_result": ""
        })
    })
    return await res.json()
}

export {sendMessage}