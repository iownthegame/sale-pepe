"use client";
import { useEffect } from "react";
import Script from "next/script";
import { Video, Instagram } from "lucide-react";
import { RecipeEmbed } from "@/types/recipe";

interface RecipeVideoProps {
  embed: RecipeEmbed;
}

export default function RecipeEmbedVideo({ embed }: RecipeVideoProps) {
  // Every time the embedId changes (navigating between recipes),
  // we need to tell Instagram to process the new blockquote.
  useEffect(() => {
    // @ts-expect-error: Instagram SDK 'instgrm' is injected globally by the external embed.js script
    if (window.instgrm) {
      // @ts-expect-error: The process() method is part of the Instagram SDK and not defined in standard Window types
      window.instgrm.Embeds.process();
    }
  }, [embed.embedId]);

  if (embed.type !== "instagram") return null;

  return (
    <section className="space-y-4 pt-4">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <Video size={20} /> Watch the Recipe
      </h3>

      <div className="flex justify-center bg-foreground/[0.02] rounded-[2rem] p-4 border border-foreground/5 min-h-[400px]">
        <blockquote
          className="instagram-media w-full"
          data-instgrm-captioned
          data-instgrm-permalink={`https://www.instagram.com/reel/${embed.embedId}/`}
          data-instgrm-version="14"
          style={{ width: "100%", margin: "0 auto" }}
        >
          <div className="p-8 text-center">
            <a
              href={`https://www.instagram.com/reel/${embed.embedId}/`}
              className="text-foreground/40 text-sm flex flex-col items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="animate-pulse" />
              Loading Reel...
            </a>
          </div>
        </blockquote>
      </div>

      <Script
        src="https://www.instagram.com/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          // @ts-expect-error: Instagram SDK 'instgrm' is injected globally by the external embed.js script
          if (window.instgrm) {
            // @ts-expect-error: The process() method is required to re-parse the DOM for new blockquotes
            window.instgrm.Embeds.process();
          }
        }}
      />
    </section>
  );
}
