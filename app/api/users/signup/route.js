import knex from "@/knex-connection";
import crypto from "crypto";

export async function GET(req, res) {
    try {
        const users = await knex("users").select("*");
        return res.status(200).json(users);
    } catch (error) {
        console.error("GET Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function POST(req) {
    try {
        const { firstName, lastName, email, password } = await req.json();
        const salt = crypto.randomBytes(16).toString("hex");
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

        const body= await knex("users").insert({
            first_name: firstName,
            last_name: lastName,
            email,
            salt,
            hash
        }).returning("*");
        
        return Response.json({ body});
    } catch (error) {
        if (error.code === '23505') {
            return new Response("User already exists",{status: 409});
        }
        return new Response("Internal Server Error", {status: 500});
    } 
}
