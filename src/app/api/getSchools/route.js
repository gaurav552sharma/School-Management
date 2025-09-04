import { getConnection } from "@/lib/db";

export async function GET() {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      "SELECT id, name, address, city, state, image FROM schools"
    );
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error("Error fetching schools:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch schools" }), {
      status: 500,
    });
  }
}
