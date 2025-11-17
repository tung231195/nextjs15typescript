"use client";

import { Box, IconButton, Tooltip } from "@mui/material";
import { Facebook, Twitter, LinkedIn } from "@mui/icons-material";

type ShareButtonsProps = {
  slug: string; // slug bài viết
  title: string; // title bài viết
};

export default function ShareButtons({ slug, title }: ShareButtonsProps) {
  const url = `https://ideographic-nonmodificative-alfonso.ngrok-free.dev/en/blog/${slug}`;
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  };

  return (
    <Box display="flex" gap={1}>
      <Tooltip title="Share on Facebook">
        <IconButton color="primary" onClick={() => window.open(shareLinks.facebook, "_blank")}>
          <Facebook />
        </IconButton>
      </Tooltip>

      <Tooltip title="Share on Twitter">
        <IconButton color="primary" onClick={() => window.open(shareLinks.twitter, "_blank")}>
          <Twitter />
        </IconButton>
      </Tooltip>

      <Tooltip title="Share on LinkedIn">
        <IconButton color="primary" onClick={() => window.open(shareLinks.linkedin, "_blank")}>
          <LinkedIn />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
