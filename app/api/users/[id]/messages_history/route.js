import knex from "@/knex-connection";

export async function GET(req, { params }) {
    try{
        const { id } = params;
        const { searchParams } = req.nextUrl;
        const receiverId = searchParams.get("id");
    
        const messages = await knex('messages')       
            .join('users as senders', 'senders.id', 'messages.sender_id')
            .join('users as receivers', 'receivers.id', 'messages.receiver_id')
            .where((qB) => {
            qB.where('receiver_id', receiverId)
                .where('sender_id', id)
    })
    .orWhere((qB) => {
        qB.where('receiver_id', id)
            .where('sender_id', receiverId)
    })
    .orderBy('messages.created_at', 'desc')
    .limit(5)
    .select('messages.*','senders.first_name as sender_first_name', 'senders.last_name as sender_last_name', 'receivers.first_name as receiver_first_name', 'receivers.last_name as receiver_last_name');    
    
    return Response.json({ data:messages });
    }catch{
        return new Response("Internal Server Error", { status: 500 });
    }
    }