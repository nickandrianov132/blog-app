'use client'

import { useActionState } from "react";
import { createPostAction } from "../actions"

export default function PostForm() {
    // state — это то, что возвращает функция из try/catch (или дефолтное значение)
    // formAction — это специальная обертка, которую мы передадим в форму
    // isPending — true, пока идет запрос к базе (можно делать кнопку disabled)
    const [state, formAction, isPending] = useActionState(createPostAction, {
        success: false,
        error: null,
    });
    return (
        <form action={formAction} className="space-y-4 max-w-md mx-auto p-4 border rounded-lg bg-white shadow-sm">
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Create Post</h3>
            {/* Выводим ошибку пользователю, если она прилетела из catch */}
            {state?.error && (
                <div className="bg-red-50 text-red-600 p-2 rounded text-sm border border-red-200">
                {state.error}
                </div>
            )}
            <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Title</label>
                <input
                    type="text"
                    name="title"
                    className="border border-zinc-300 p-2 rounded w-full text-zinc-900"
                    required
                    disabled={isPending}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Content</label>
                <textarea
                    name="content"
                    className="border border-zinc-300 p-2 rounded w-full text-zinc-900"
                    rows={3}
                    disabled={isPending}
                />
            </div>
            <button
                type="submit"
                disabled={isPending}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium p-2 rounded w-full transition-colors"
            >{isPending ? "Loading..." : "Create"}</button>
        </form>
    )
}