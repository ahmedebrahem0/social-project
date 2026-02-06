// src/types/api.ts
// responses, errors, etc.
/**
 * أنواع (Types) عامة للـ API تُستخدم في كل المشروع.
 *
 * الهدف:
 * - توحيد شكل الأخطاء اللي هنستخدمه في UI
 * - توحيد شكل الـ Response لو احتجنا envelope لاحقًا
 * - تحسين TypeScript autocomplete وتقليل الـ any
 */

/**
 * بعض الـ APIs بترجع error بشكل:
 * { message: "..." }
 * أو:
 * { error: "..." }
 * أو:
 * { errors: [...] }
 *
 * وإحنا مش ضامنين 100% شكل backend، فبنخلي type مرن.
 */
export type ApiErrorPayload = {
  message?: string;
  error?: string;
  errors?: unknown;
};

/**
 * ده شكل Error "موحّد" هنشتغل بيه داخل التطبيق
 * بغض النظر Axios رجّع إيه.
 *
 * - message: رسالة مفهومة للمستخدم/للديف
 * - status: HTTP status code (مثلاً 401, 404)
 * - details: أي بيانات إضافية لو احتجنا نعرضها أو نlogها
 */
export type ApiError = {
  message: string;
  status?: number;
  details?: unknown;
};

/**
 * نوع عام (Generic) للاستجابة لو حبيت تتعامل مع API
 * بيرجع envelope زي:
 * { data: ..., message: ... }
 *
 * لو الـ API بتاعك بيرجع JSON مباشر بدون envelope،
 * ممكن متستخدمهوش دلوقتي، لكنه مفيد جدًا لما المشروع يكبر.
 */
export type ApiResponse<T> = {
  data: T;
  message?: string;
};

/**
 * نوع اختياري للـ pagination لو API بتاعك فيه صفحات
 * (ممكن ما تحتاجهوش الآن، بس جاهز)
 */
export type Pagination = {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
};
