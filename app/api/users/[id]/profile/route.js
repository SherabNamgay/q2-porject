import knex from "@/knex-connection";

export async function GET(req, { params }) {
    try {
        const { id } = params;
        const data = await knex("users")
            .where("users.id", id)
            .join("friend_list", "friend_list.user_id", "users.id")
            .join("posts", "posts.user_id", "users.id")
            .select("users.first_name", "users.last_name", "friend_list.friend_id", "posts.*");
        return Response.json({ data });
    } catch (error){ 
        console.error("GET Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const { first_name, last_name } = await req.json();
        const data = await knex("users")
            .where("id", id)
            .update({ first_name, last_name, hash })
            .returning("*");
        return Response.json({ data });
    } catch (error) {
        console.error("PUT Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}