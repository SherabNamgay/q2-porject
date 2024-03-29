/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) =>{
        table.increments();
        table.string('first_name').notNullable();
        table.string('last_name')
        table.string('email').notNullable().unique();
        table.string('salt',32).notNullable();
        table.string('hash',128).notNullable();
        table.string('pfp'),
        table.timestamp(true, true).notNullable();
    })
    .createTable('messages', (table) =>{
        table.increments();
        table.integer('sender_id').unsigned().references('users.id');
        table.integer('receiver_id').unsigned().references('users.id');
        table.string('message',1024).notNullable();
        table.timestamp(true, true).notNullable();
    })
    .createTable('posts', (table) =>{
        table.increments();
        table.integer('user_id').unsigned().references('users.id');
        table.integer('likes').notNullable().defaultTo(0);
        table.string('caption',1024);
        table.timestamp(true, true).notNullable();
    })
    .createTable('comments', (table) =>{
        table.increments();
        table.integer('commentor_id').unsigned().references('users.id');
        table.integer('post_id').unsigned().references('posts.id');
        table.string('comment',1024).notNullable();
        table.timestamp(true, true).notNullable();
    })
    .createTable('friend_list', (table) =>{
        table.increments();
        table.integer('user_id').unsigned().references('users.id');
        table.integer('friend_id').unsigned().references('users.id');
        table.timestamp(true, true).notNullable(); 
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable('friend_list')
    .dropTable('comments')
    .dropTable('posts')
    .dropTable('messages')
    .dropTable('users')
};
