import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";

interface SpriteSheetLoaderProps {
  spriteSheet: ImageSourcePropType;
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
  fps: number;
  positions: { x: number; y: number }[];
}

const SpriteSheetLoader: React.FC<SpriteSheetLoaderProps> = ({
  spriteSheet,
  frameWidth,
  frameHeight,
  frameCount,
  fps,
  positions,
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [frameOffset, setFrameOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % frameCount);
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [frameCount, fps]);

  useEffect(() => {
    if (positions[currentFrame]) {
      setFrameOffset(positions[currentFrame]);
    }
  }, [currentFrame, positions]);

  return (
    <View
      style={[styles.container, { width: frameWidth, height: frameHeight }]}
    >
      <ImageBackground
        source={spriteSheet}
        style={{
          width: frameWidth,
          height: frameHeight,
          overflow: "hidden",
        }}
        imageStyle={{
          left: -frameOffset.x,
          top: -frameOffset.y,
          width: frameWidth * frameCount,
          height: frameHeight,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    position: "relative",
  },
  image: {
    position: "absolute",
    resizeMode: "contain",
  },
});

export default SpriteSheetLoader;
