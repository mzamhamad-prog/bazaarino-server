export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    if (url.pathname === "/") {
      return new Response(
        JSON.stringify({
          success: true,
          app: "Bazaarino",
          server: "online",
          version: "1.1.0"
        }),
        { headers }
      );
    }

    if (url.pathname === "/api/status") {
      return new Response(
        JSON.stringify({
          success: true,
          app: "Bazaarino",
          status: "online",
          version: "1.1.0"
        }),
        { headers }
      );
    }

    if (url.pathname === "/search") {
      const query = (url.searchParams.get("q") || "").trim();

      if (!query) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "نام کالا را وارد کنید",
            total: 0,
            products: []
          }),
          {
            status: 400,
            headers
          }
        );
      }

      const products = [
        {
          title: "iPhone 15",
          price: 450,
          store: "Bazaarino Store",
          url: "https://example.com/iphone-15"
        },
        {
          title: "Samsung Galaxy S24",
          price: 520,
          store: "Bazaarino Store",
          url: "https://example.com/galaxy-s24"
        },
        {
          title: "Xiaomi Redmi Note 13",
          price: 220,
          store: "Bazaarino Store",
          url: "https://example.com/redmi-note-13"
        },
        {
          title: "MacBook Air M2",
          price: 899,
          store: "Bazaarino Store",
          url: "https://example.com/macbook-air-m2"
        },
        {
          title: "Laptop Lenovo IdeaPad",
          price: 650,
          store: "Bazaarino Store",
          url: "https://example.com/lenovo-ideapad"
        }
      ];

      const q = query.toLowerCase();

      const filteredProducts = products.filter((product) => {
        const text = (
          product.title +
          " " +
          product.store
        ).toLowerCase();

        return text.includes(q);
      });

      const finalProducts =
        filteredProducts.length > 0
          ? filteredProducts
          : products.filter((product) => {
              const title = product.title.toLowerCase();

              if (
                q.includes("آیفون") ||
                q.includes("iphone")
              ) {
                return title.includes("iphone");
              }

              if (
                q.includes("سامسونگ") ||
                q.includes("samsung") ||
                q.includes("موبایل") ||
                q.includes("گوشی")
              ) {
                return (
                  title.includes("samsung") ||
                  title.includes("xiaomi") ||
                  title.includes("iphone")
                );
              }

              if (
                q.includes("لپ") ||
                q.includes("لپ تاپ") ||
                q.includes("laptop")
              ) {
                return title.includes("laptop") ||
                  title.includes("macbook");
              }

              return false;
            });

      return new Response(
        JSON.stringify({
          success: true,
          query: query,
          total: finalProducts.length,
          products: finalProducts
        }),
        { headers }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: "مسیر موردنظر پیدا نشد"
      }),
      {
        status: 404,
        headers
      }
    );
  }
};
