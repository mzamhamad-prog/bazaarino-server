export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response(
        JSON.stringify({
          success: true,
          app: "Bazaarino",
          server: "online",
          version: "1.0.0"
        }),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    if (url.pathname === "/api/status") {
      return new Response(
        JSON.stringify({
          success: true,
          app: "Bazaarino",
          status: "online"
        }),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
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
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          query: query,
          total: 0,
          products: []
        }),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: "مسیر موردنظر پیدا نشد"
      }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};
