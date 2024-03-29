import knex from "@/knex-connection";
import crypto from "crypto"

export async function GET() {
    const body = await knex("users").select("*")
    return Response.json({body})
}
export async function POST(req) {
    const { firstName, lastName, email, password } = await req.json();
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

    const body = await knex("users").insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        salt: salt,
        hash: hash
    }).returning("*")
    
    return Response.json({body})
}