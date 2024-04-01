import knex from "@/knex-connection";

import crypto from 'crypto'

export async function POST(req) {
    try {
        const { email, password } = await req.json()
        const foundUser = await knex('users').where('email', email).first()

        if (!foundUser) {
            return new Response('User not found', { status: 404 })
        }
        const hash_password = crypto.pbkdf2Sync(password, foundUser.salt, 1000, 64, 'sha512').toString('hex')
        if(hash_password === foundUser.hash) {
            return Response.json({ foundUser })
        }else{
            return new Response('Incorrect password', { status: 401 })
        }
    } catch (error) {
        console.error('POST Error:', error)
    }

}   