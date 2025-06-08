// src/services/galeriAPI.js
import { supabase } from "../config/supabaseClient";

const table = "media_gallery";
const bucket = "media";

export const galeriAPI = {
  async fetchMedia() {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;
    return data;
  },

  async createMedia({ judul_media, deskripsi, media_file }) {
    const ext = media_file.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, media_file);

    if (uploadError) throw uploadError;

    const { publicUrl } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName).data;

    const media_type = media_file.type.includes("image") ? "image" : "video";

    console.log("🧪 Insert payload:", {
      judul_media,
      deskripsi,
      media: publicUrl,
      media_type,
    });

    const { error: insertError } = await supabase.from(table).insert({
      judul_media,
      deskripsi,
      media: publicUrl,
      media_type,
    });

    if (insertError) {
      console.error("❌ Insert Error:", insertError);
      throw insertError;
    }
  },

  async updateMedia(id, updates) {
    const { error } = await supabase
      .from("media_gallery")
      .update(updates)
      .eq("id", id);

    if (error) throw error;
  },

  async deleteMedia(id, mediaUrl) {
    const path = decodeURIComponent(
      mediaUrl.split(`/storage/v1/object/public/${bucket}/`)[1]
    );
    await supabase.storage.from(bucket).remove([path]);

    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) throw error;
  },
};
