import knex from "@/knex-connection";

export async function POST(req, { params }) {
    try {
        const { id } = params;
        const {friendID} = await req.json();
        const isfriends= await knex("friend_list")
        .where('user_id',id)
        .andWhere('friend_id',friendID)
        .first();
        
        async function follow(id,friendID){
            const data = await knex("friend_list")
                .insert({
                    user_id:id,
                    friend_id:friendID
                }).returning("*")
            console.log("follow",data)
            }
        async function unfollow(id,friendID){
            const data = await knex("friend_list")
                .where('user_id',id)
                .andWhere('friend_id',friendID)
                .del()
            console.log("unfollow",data)
        }
       if(isfriends){
            await unfollow(id,friendID);
            return new Response("unfollowed", { status: 200 });     
        }else{
            await follow(id,friendID);
            return new Response("follow", { status: 200 })
        }
    }catch(error){
        console.error("GET Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}