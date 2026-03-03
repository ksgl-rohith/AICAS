import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const VideoComposition = ({ title, body }) => {
    const frame = useCurrentFrame();

    const opacity = interpolate(frame, [0,30], [0,1]);

    return (
        <AbsoluteFill
            style={{
                background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        color: "white",
        padding: 80,
        textAlign: "center"
            }}
            >
        <div style={{ opacity }}>
        <h1 style={{ fontSize: 70 }}>{title}</h1>
        <p style={{ fontSize: 40, marginTop: 40 }}>{body}</p>
      </div>
            </AbsoluteFill>
    );
};