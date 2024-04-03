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
