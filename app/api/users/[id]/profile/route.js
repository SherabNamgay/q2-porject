import knex from "@/knex-connection";

export async function GET(req, { params }) {
    try {
        const { id } = params;
        const user = await knex("users")
            .where("users.id", id)
            .first('*')

        const posts = await knex('posts')
            .join('users', 'users.id', 'posts.user_id')
            .where("user_id", id)
            .select('posts.*', 'users.first_name', 'users.last_name')

        const friends = await knex('friend_list')
            .where("user_id", id)
            .select('*')

        return Response.json({ data: { user, posts, friends } });
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