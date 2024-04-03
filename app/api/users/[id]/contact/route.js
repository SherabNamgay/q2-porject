import knex from "@/knex-connection";

export async function GET(req, { params }) {
    const { id } = params;
    const results = await knex("messages")
    .join('users as senders', 'senders.id', 'messages.sender_id')
    .join('users as receivers', 'receivers.id', 'messages.receiver_id')
    .distinctOn(knex.raw('least(sender_id,receiver_id'), knex.raw('greatest(sender_id,receiver_id)'))
    .where('receiver_id', id)
    .orWhere('sender_id', id)
    .orderByRaw('least(sender_id,receiver_id),greatest(sender_id,receiver_id),created_at DESC')
    .select('messages.*','senders.first_name as sender_first_name', 'senders.last_name as sender_last_name', 'receivers.first_name as receiver_first_name', 'receivers.last_name as receiver_last_name');
    return Response.json({ data: results });
}