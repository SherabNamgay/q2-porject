import knex from "@/knex-connection";

export async function POST(req,{ params }) {
    try {
        const { message  } = await req.json();
        const senderId = params.id;
        const {searchParams}= req.nextUrl
        const receiverId= searchParams.get('id')
        const messages = await knex("messages")
            .insert({
                sender_id: senderId,
                receiver_id: receiverId,
                message: message
            })
            
        return new Response(JSON.stringify(messages));
    } catch (error) {
        console.error("GET Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}