import knex from "@/knex-connection";

export async function POST(req, { params }) {
    try {
        const { id } = params;
        const { post } = await req.json();
        if(!post){
            throw new error("empty post");
        }


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
            // .where("user_id", id)
            .select("posts.*", "users.first_name", "users.last_name")
            .orderBy('created_at', 'DESC');
        const postIds= data.map((post)=>{return post.id})
        const likes = await knex('likes').whereIn('post_id', postIds).where('user_id', id).select("*")
        const postsWithLikes = data.map((post)=>{
            post.user_liked = likes.some((like) => like.post_id === post.id)
            return post;
        })
        return Response.json({ data: postsWithLikes });
    } catch (error) {
        console.error("GET Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
