import { getConnection } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const image = formData.get("image");
    console.log("Received form data keys:", Array.from(formData.keys()));

    console.log("Image received:", image);

    let imageUrl = null;

    if (image && typeof image === "object" && image instanceof Blob) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const base64Image = `data:${image.type};base64,${buffer.toString(
        "base64"
      )}`;

      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "schoolImages",
      });

      imageUrl = uploadResponse.secure_url;
    }

    const conn = await getConnection();
    await conn.execute(
      `INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact, imageUrl, email_id]
    );

    return new Response(
      JSON.stringify({ success: true, message: "School added successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding school:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
