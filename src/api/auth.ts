// src/api/auth.ts
import { randomBytes } from "crypto";

export interface APIKey {
  key: string;
  userId: string;
  createdAt: Date;
  expiresAt?: Date;
}

// مخزن المفاتيح - يجب أن يكون متاحاً للجميع
export const apiKeys: Map<string, APIKey> = new Map();

export function generateAPIKey(userId: string): APIKey {
  // إنشاء مفتاح عشوائي آمن باستخدام crypto
  const key = `gk_${randomBytes(16).toString("hex")}`;

  const now = new Date();
  const apiKey: APIKey = {
    key,
    userId,
    createdAt: now,
    expiresAt: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 يوم
  };

  // حفظ المفتاح في الخريطة
  apiKeys.set(key, apiKey);

  return apiKey;
}

export function getAPIKey(apiKey: string): APIKey | null {
  if (!apiKey || typeof apiKey !== "string" || apiKey.trim() === "") {
    return null;
  }

  const key = apiKeys.get(apiKey);

  if (!key) {
    return null;
  }

  if (key.expiresAt && key.expiresAt < new Date()) {
    apiKeys.delete(apiKey);
    return null;
  }

  return key;
}

export function validateAPIKey(apiKey: string): boolean {
  return getAPIKey(apiKey) !== null;
}

export function deleteAPIKey(apiKey: string): boolean {
  return apiKeys.delete(apiKey);
}

// تصدير الخريطة أيضاً للاختبارات
export const _test = { apiKeys };
