export async function POST(req) {
  try {
    const body = await req.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (body.email === adminEmail && body.password === adminPassword) {
      return Response.json({
        success: true,
      });
    }

    return Response.json({
      success: false,
      message: "Email atau password salah",
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
}
