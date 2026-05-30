"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { ChefHat, Star, LogIn, X, ImagePlus, Users } from "lucide-react";

interface CookLogEntry {
  id: string;
  cooked_on: string;
  rating: number | null;
  notes: string | null;
  photo_urls: string[];
  cooked_with: string[];
  user_id: string;
}

interface Profile {
  id: string;
  display_name: string | null;
}

function StarRating({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} type="button" onClick={() => onChange(n)}>
          <Star size={22} className={n <= value ? "text-yellow-400 fill-yellow-400" : "text-foreground/20"} />
        </button>
      ))}
    </div>
  );
}

function StarDisplay({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <Star key={n} size={12} className={n <= value ? "text-yellow-400 fill-yellow-400" : "text-foreground/20"} />
      ))}
    </div>
  );
}

export default function CookLog({ recipeId }: { recipeId: string }) {
  const { user, signInWithGoogle } = useAuth();
  const [logs, setLogs] = useState<CookLogEntry[]>([]);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [friendQuery, setFriendQuery] = useState("");
  const [friendResults, setFriendResults] = useState<Profile[]>([]);
  const [taggedFriends, setTaggedFriends] = useState<Profile[]>([]);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("cook_logs")
      .select("*")
      .eq("recipe_id", recipeId)
      .eq("user_id", user.id)
      .order("cooked_on", { ascending: false })
      .then(({ data }) => { if (data) setLogs(data); });
  }, [recipeId, user]);

  // Search profiles by display_name
  useEffect(() => {
    if (!friendQuery.trim() || !user) {
      const t = setTimeout(() => setFriendResults([]), 0);
      return () => clearTimeout(t);
    }
    const timeout = setTimeout(() => {
      supabase
        .from("profiles")
        .select("id, display_name")
        .ilike("display_name", `%${friendQuery}%`)
        .neq("id", user.id)
        .limit(5)
        .then(({ data }) => { if (data) setFriendResults(data); });
    }, 300);
    return () => clearTimeout(timeout);
  }, [friendQuery, user]);

  const addPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setPhotos(prev => [...prev, ...files]);
    setPhotoPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
  };

  const removePhoto = (i: number) => {
    setPhotos(prev => prev.filter((_, idx) => idx !== i));
    setPhotoPreviews(prev => prev.filter((_, idx) => idx !== i));
  };

  const tagFriend = (profile: Profile) => {
    if (!taggedFriends.find(f => f.id === profile.id)) {
      setTaggedFriends(prev => [...prev, profile]);
    }
    setFriendQuery("");
    setFriendResults([]);
  };

  const untagFriend = (id: string) => {
    setTaggedFriends(prev => prev.filter(f => f.id !== id));
  };

  const uploadPhotos = async (): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of photos) {
      const ext = file.name.split(".").pop();
      const path = `${user!.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("cook-logs").upload(path, file);
      if (!error) {
        const { data } = supabase.storage.from("cook-logs").getPublicUrl(path);
        urls.push(data.publicUrl);
      }
    }
    return urls;
  };

  const submit = async () => {
    if (!user || saving) return;
    setSaving(true);

    const photoUrls = await uploadPhotos();
    const friendIds = taggedFriends.map(f => f.id);

    const logData = {
      recipe_id: recipeId,
      cooked_on: date,
      rating: rating || null,
      notes: notes.trim() || null,
      photo_urls: photoUrls,
      cooked_with: friendIds,
    };

    // Insert own log
    const { data, error } = await supabase
      .from("cook_logs")
      .insert({ ...logData, user_id: user.id })
      .select()
      .single();

    if (!error && data) {
      setLogs(prev => [data, ...prev]);

      // Insert mirrored logs for tagged friends
      if (friendIds.length > 0) {
        await supabase.from("cook_logs").insert(
          friendIds.map(friendId => ({ ...logData, user_id: friendId, cooked_with: [user.id] }))
        );
      }

      setRating(0);
      setNotes("");
      setDate(new Date().toISOString().split("T")[0]);
      setPhotos([]);
      setPhotoPreviews([]);
      setTaggedFriends([]);
    }
    setSaving(false);
  };

  if (!user) {
    return (
      <section className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <ChefHat size={20} /> Cook Log
        </h3>
        <button
          onClick={signInWithGoogle}
          className="flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors"
        >
          <LogIn size={16} /> Sign in to log your cooks
        </button>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <ChefHat size={20} /> Cook Log
      </h3>

      {/* Form */}
      <div className="space-y-4 p-4 rounded-2xl bg-foreground/[0.02] border border-foreground/5">
        <StarRating value={rating} onChange={setRating} />

        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-full bg-transparent border border-foreground/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-foreground/30"
        />

        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Notes (optional)..."
          rows={3}
          className="w-full bg-transparent border border-foreground/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-foreground/30 resize-none"
        />

        {/* Photo upload */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {photoPreviews.map((src, i) => (
              <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden">
                <Image src={src} alt="" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5"
                >
                  <X size={10} className="text-white" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-20 h-20 rounded-xl border border-dashed border-foreground/20 flex items-center justify-center text-foreground/30 hover:text-foreground/60 hover:border-foreground/40 transition-colors"
            >
              <ImagePlus size={20} />
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={addPhoto}
          />
        </div>

        {/* Friend tagging */}
        <div className="space-y-2">
          <div className="relative">
            <div className="flex items-center gap-2 border border-foreground/10 rounded-xl px-4 py-2">
              <Users size={14} className="text-foreground/30 shrink-0" />
              <input
                type="text"
                value={friendQuery}
                onChange={e => setFriendQuery(e.target.value)}
                placeholder="Tag someone you cooked with..."
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </div>
            {friendResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-foreground/10 rounded-xl overflow-hidden z-10 shadow-lg">
                {friendResults.map(profile => (
                  <button
                    key={profile.id}
                    type="button"
                    onClick={() => tagFriend(profile)}
                    className="w-full px-4 py-2 text-sm text-left hover:bg-foreground/5 transition-colors"
                  >
                    {profile.display_name ?? "Unknown"}
                  </button>
                ))}
              </div>
            )}
          </div>
          {taggedFriends.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {taggedFriends.map(f => (
                <span key={f.id} className="flex items-center gap-1 px-3 py-1 rounded-full bg-foreground/5 text-xs">
                  {f.display_name}
                  <button type="button" onClick={() => untagFriend(f.id)}>
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={submit}
          disabled={saving}
          className="w-full py-2 rounded-xl bg-foreground text-background text-sm font-semibold disabled:opacity-50"
        >
          {saving ? "Saving..." : "Log this cook"}
        </button>
      </div>

      {/* Past logs */}
      {logs.length > 0 && (
        <div className="space-y-4">
          {logs.map(log => (
            <div key={log.id} className="p-4 rounded-2xl border border-foreground/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground/40">{log.cooked_on}</span>
                {log.rating && <StarDisplay value={log.rating} />}
              </div>
              {log.notes && <p className="text-sm text-foreground/60">{log.notes}</p>}
              {log.photo_urls?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {log.photo_urls.map((url, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden">
                      <Image src={url} alt="" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
