import SpriteSheetLoaderComponent from "@/components/ui/spritesheet";
import React, { useMemo } from "react";
import { View } from "react-native";

interface SpriteSheetLoaderProps {
  currentSprite: {
    uri: any;
    frameCount: number;
  };
}

const SpriteSheetLoader: React.FC<SpriteSheetLoaderProps> = ({
  currentSprite,
}) => {
  const memoizedSpriteSheetLoader = useMemo(
    () => (
      <SpriteSheetLoaderComponent
        positions={[
          { x: 0, y: 0 },
          { x: 128, y: 0 },
          { x: 256, y: 0 },
          { x: 384, y: 0 },
          { x: 512, y: 0 },
          { x: 640, y: 0 },
        ]}
        spriteSheet={currentSprite.uri}
        frameWidth={128}
        frameHeight={128}
        frameCount={currentSprite.frameCount}
        fps={10}
      />
    ),
    [currentSprite]
  );

  return <View>{memoizedSpriteSheetLoader}</View>;
};

export default SpriteSheetLoader;
