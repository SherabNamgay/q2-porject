import knex from "@/knex-connection";


export async function POST(req, {params}) {
    try {
        const {id}=params
        const {comment, postID}=await req.json()
        if (!comment || !postID) {
            throw new Error("Please fill all the fields");
        }
        const comments=await knex("comments")
        .insert({
            comment,
            commentor_id:id,
            post_id:postID
        }).returning('*')
        return Response.json({comments})

    }catch(error){
        console.error("POST Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function GET(req) {
    try {
        const {searchParams}=req.nextUrl
        const postID=searchParams.get('id')
        const data=await knex("comments")
        .join("users","users.id","comments.commentor_id")
        .where("post_id",postID)
        .select("comments.*", "users.first_name", "users.last_name")

        return Response.json({data})

    }catch(error){
        console.error("GET Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
