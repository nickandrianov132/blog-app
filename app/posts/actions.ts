// app/posts/actions.ts
'use server'

import { db } from "@/src/prisma/db";
import { revalidatePath } from "next/cache";

// Добавляем параметр prevState
export async function createPostAction(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  try {
    // Вставьте ваш код поиска/создания автора...
    let user = await db.orm.public.User.limit(1).all();
    let authorId = user[0]?.id; 
    
    if (!authorId) {
      const newUser = await db.orm.public.User.create({
        email: "test@example.com",
        username: "testuser",
      });
      authorId = newUser.id;
    }

    await db.orm.public.Post.create({
      title,
      content: content || null,
      authorId,
    });

    revalidatePath("/posts");
    
    return { success: true, error: null }; // Возвращаем успешный статус
  } catch (err) {
    console.error(err);
    // Возвращаем ошибку, которую хук поймает на клиенте
    return { success: false, error: "Не удалось создать пост. Попробуйте еще раз." };
  }
}
