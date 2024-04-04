import knex from "@/knex-connection";

export async function POST(req, { params }) {
    try {
        const { id } = params;
        const { post } = await req.json();  

        const posts = await knex("posts")
            .insert({
                user_id: id,            
                likes: 0,
                post : post 
            })
            .returning("*");    

        return Response.json({ posts });

    } catch (error) {
        console.error("POST Error:", error);
    }
}

export async function GET(req, { params }) {
    try {
        const { id } = params;
        const data = await knex("posts")
            .join("users", "users.id", "posts.user_id")
            .where("user_id", id)
            .select("posts.*", "users.first_name", "users.last_name");
        return Response.json({ data });
    } catch (error) {
        console.error("GET Error:", error);
    }
}
