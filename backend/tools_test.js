import OpenAI from "openai";
import * as fs from "fs"

const openai = new OpenAI();

function output_item(desc, quantity, val) {
    return { desc: desc, quantity: quantity, val: val }
}

const item_list_tool = {
        type: "function",
        function: {
            name: "output_item",
            description: "Output the details of an item on the reciept",
            parameters: {
                type: "object",
                properties: {
                    desc: {
                        type: "string",
                        description: "Description of the item on the reciept"
                    },
                    quantity: {
                        type: "number",
                        description: "Quantity of items"
                    },
                    val: {
                        type: "number",
                        description: "Value of item on the reciept"
                    }
                },
                required: ["desc", "quantity", "val"],
            },
        },
    };

function output_summary(inv_addr, del_addr, date, total) {
    return {inv_addr: inv_addr, del_addr: del_addr, date: date, total: total};
}

const summary_tool = {
    type: "function",
    function: {
        name: "output_summary",
        description: "Output general data about a receipt",
        parameters: {
            type: "object",
            properties: {
                inv_addr: {
                    type: "string",
                    description: "Address of the invoice"
                },
                del_addr: {
                    type: "string",
                    description: "Address of the delivery"
                },
                date: {
                    type: "string",
                    description: "Date of the reciept in YYYY/MM/DD format"
                },
                total: {
                    type: "number",
                    description: "Total cost on the reciept"
                }
            },
            required: ["inv_addr", "del_addr", "date", "total"],
        },
    },
};

const tools = [item_list_tool, summary_tool]

async function test() {
    const text = fs.readFileSync('files/test.txt', { encoding: 'utf-8' });
    const response = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a receipt processor. You will be given a text which contains a pdf that has been converted to a json format. Output general information about the reciept using output_summary, this should only be called once. Also extract all costs of each of the items and output them using the output_item function",
            },
            { role: "user", content: `${text}` },
        ],
        tools: tools,
        model: "gpt-4-turbo-preview",
        response_format: { type: "json_object" },
    });
    console.log(JSON.stringify(response.choices[0], null, 2));
}

export default test;