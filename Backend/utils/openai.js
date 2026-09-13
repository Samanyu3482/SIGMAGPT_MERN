import 'dotenv/config';

const getOpenAIAPIResponse = async (message) => {
    try {

        const options = {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.ASI_API_KEY}`
            },

            body: JSON.stringify({
                model: "asi1",
                messages: [
                    {
                        role: "assistant",
                        content: message
                    }
                ]
            })
        };

        const response = await fetch(
            "https://inference.asicloud.cudos.org/v1/chat/completions", options

        );

        const data = await response.json();



        return (data.choices[0].message.content);

    } catch (error) {

        console.error(error);


    };

}

export default getOpenAIAPIResponse;