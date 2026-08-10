export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // صفحه اصلی
    if (url.pathname === "/") {
      return json({
        success: true,
        app: "Bazaarino",
        server: "online",
        version: "1.0.0"
      });
    }

    // وضعیت API
    if (url.pathname === "/api/status") {
      return json({
        success: true,
        app: "Bazaarino",
        status: "online"
      });
    }

    // جستجوی محصولات
    if (url.pathname === "/search") {
      const query = (url.searchParams.get("q") || "").trim();

      if (!query) {
        return json({
          success: false,
          message: "نام کالا را وارد کنید",
          total: 0,
          products: []
        }, 400);
      }

      /*
       * اینجا نقطه اتصال به منبع واقعی محصولات بازارینو است.
       *
       * بعداً API یا Feed واقعی فروشگاه‌ها را به این قسمت وصل می‌کنیم.
       * هیچ محصول و قیمت ساختگی در این Worker قرار داده نشده است.
       */

      const products = [];

      return json({
        success: true,
        query,
        total: products.length,
        products
      });
    }

    return json({
      success: false,
      message: 
    }
  });
}
