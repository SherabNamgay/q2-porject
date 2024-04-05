import knex from "@/knex-connection";

export async function POST(req, { params }) {
    try {
        const { id } = params;
        const {postID} = await req.json();

        const hasLiked = await knex("likes")
            .where("post_id", postID)
            .andWhere("user_id", id)
            .first();
        async function like(){
            const data = await knex.transaction(async (trx)=>{
                const likes = await trx("likes")
                .insert({
                    post_id: postID,
                    user_id: id
                }).returning("*");
    
                const posts = await trx("posts")
                .where("id", postID)
                .increment("likes", 1)
                .returning("*");
                return {likes, posts};
            })
            return data
        }
        async function unlike(){
            const data = await knex.transaction(async (trx)=>{
                const likes = await trx("likes")
                .where("post_id", postID)
                .andWhere("user_id", id)
                .del();
    
                const posts = await trx("posts")
                .where("id", postID)
                .decrement("likes", 1)
                .returning("*");
                return {likes, posts};
            })
            return data
        }

        if(hasLiked){
            await unlike();
            return Response.json("unliked")
        }else{
            await like();
            return Response.json("liked")
        }
    }catch(error){
        console.error("POST Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}