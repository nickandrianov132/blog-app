import { defineContract, enumType, member, now } from '@prisma/orm-postgres/contract-builder';

const pgText = { codecId: 'pg/text@1' } as const;

const Role = enumType('Role', pgText,
  member('User', 'USER'),
  member('Admin', 'ADMIN')
);

export const contract = defineContract({}, ({ field, model, rel, gen, type }) => {
  const User = model('User', {
    fields: {
      id: field.column(type.Uuid()).id().onCreate(gen.uuid(7)),
      login: field.column(type.String()).unique(), // Наш уникальный логин для входа
      email: field.column(type.String()).unique(),
      name: field.column(type.String()).optional(), // Отображаемое имя (необязательное)
      password: field.column(type.String()),
      role: field.namedType(Role).default('USER'),
      createdAt: field.column(type.DateTime()).default(now()).onCreate(gen.now()),
      updatedAt: field.column(type.temporal.UpdatedAt()),
    },
  });

  const Post = model('Post', {
    fields: {
      id: field.column(type.Uuid()).id().onCreate(gen.uuid(7)),
      title: field.column(type.String()),
      content: field.column(type.String()).optional(),
      authorId: field.column(type.Uuid()),
      createdAt: field.column(type.DateTime()).default(now()).onCreate(gen.now()),
      updatedAt: field.column(type.temporal.UpdatedAt()),
    },
  });

  return {
    models: {
      User: User.relations({
        posts: rel.hasMany(Post, { by: 'authorId' }),
      }),
      Post: Post.relations({
        author: rel.belongsTo(User, { from: 'authorId', to: 'id' }),
      }),
    },
  };
});
