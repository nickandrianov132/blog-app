'use client'; // Обязательно! Файлы ошибок должны быть клиентскими компонентами

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function ErrorPage({ error, retry }: ErrorProps) {
  useEffect(() => {
    // Логируем ошибку в консоль только при ее возникновении, а не при рендере
    console.error('Произошла ошибка:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center p-6 border border-rose-500/20 bg-rose-400/10 rounded-lg">
      <h2 className="text-xl font-semibold text-slate-800 mb-2">
        Что-то пошло не так!
      </h2>
      
      {/* Безопасно выводим текст ошибки */}
      <p className="text-sm text-rose-600 mb-4">
        {error.message || 'Неизвестная ошибка'}
      </p>

      <button
        onClick={() => retry()} // Кнопка сброса ошибки и повторной попытки рендера
        className="px-4 py-2 border border-rose-500/50 bg-rose-400/30 text-slate-800 hover:bg-slate-900 hover:text-white rounded transition-colors text-sm font-medium"
      >
        Попробовать снова
      </button>
    </div>
  );
}
