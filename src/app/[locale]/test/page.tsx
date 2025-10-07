"use client";
import { Fade, Button, Grow, Slide, Zoom } from "@mui/material";
import { useState } from "react";

export default function FadeExample() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Button onClick={() => setOpen(!open)}>Toggle Fade</Button>
      <Grow in={open}>
        <div style={{ width: 200, height: 100, background: "pink" }} />
      </Grow>
    </>
  );
}
