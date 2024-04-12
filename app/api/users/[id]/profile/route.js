import knex from "@/knex-connection";
import { Knex } from "knex";

export async function GET(req, { params }) {
    try {
        const { id } = params;
        const { searchParams } = req.nextUrl;
        const userID = searchParams.get("id")
        const user = await knex("users")
            .where("users.id", id)
            .first('*')

        const posts = await knex('posts')
            .join('users', 'users.id', 'posts.user_id')
            .where("user_id", id)
            .select('posts.*', 'users.first_name', 'users.last_name')
        
        const following= await knex('friend_list')
            .where("user_id", id)

        const friends = await knex('friend_list')
            .where("user_id", !userID?id:userID)
            .select('*')
           
            const friendIDs = friends.map((friend) => friend.friend_id)
            const friended = await knex('friend_list').whereIn('friend_id', friendIDs).where("user_id", userID)
            const isfriends = friends.map((following) =>{
                following.followed = friended.some((friend) => friend.friend_id === following.friend_id)
                return following
            })

        return Response.json({ data: { user, posts, friends, following, isfriends } });
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