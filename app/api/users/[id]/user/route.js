import knex from "@/knex-connection";

export async function GET(req, { params }) {
    try {
        const { id } = params;
        const data = await knex("users")
            .join("posts", "posts.user_id", "users.id")
            .join("friend_list", "friend_list.user_id", "users.id")
            .select("users.first_name", "users.last_name", knex.raw("COUNT(posts.id) as post_count"), knex.raw("COUNT(DISTINCT friend_list.friend_id) as friend_count"))
            .where("users.id", id)
            .groupBy("users.id", "users.first_name", "users.last_name");     

        return Response.json({ data }); 

    } catch (error) {
        console.error("GET Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}