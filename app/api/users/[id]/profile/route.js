import knex from "@/knex-connection";

export async function GET(req, { params }) {
    try {
        const { id } = params;
        const data = await knex("users")
            .where("id", id)
            .join("contacts", "contacts.user_id", "users.id")
            .join("posts", "posts.user_id", "users.id")
            .select("user.first_name", "user.last_name", "contacts.*", "posts.*");
        return Response.json({ data });
    } catch (error) {
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