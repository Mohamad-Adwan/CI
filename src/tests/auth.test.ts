import { describe, expect, test, beforeEach } from "vitest";
import { getAPIKey, generateAPIKey } from "../api/auth.js";

describe("API Key Functions", () => {
  let testApiKey: string;

  beforeEach(() => {
    // إعداد مفتاح API للاختبار
    testApiKey = generateAPIKey("test-user");
  });

  test("getAPIKey should return valid key", () => {
    const result = getAPIKey(testApiKey);
    expect(result).toBeDefined();
    expect(result?.userId).toBe("test-user");
  });

  test("getAPIKey should return null for invalid key", () => {
    const result = getAPIKey("invalid-key-123");
    expect(result).toBeNull();
  });

  test("getAPIKey should handle empty string", () => {
    const result = getAPIKey("");
    expect(result).toBeNull();
  });
});
