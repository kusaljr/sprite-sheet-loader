import {
  IReactNativeJoystickEvent,
  ReactNativeJoystick,
} from "@/components/ui/joystick/joystick";
import SpriteSheetLoader from "@/components/ui/spritesheet";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import React, { useMemo, useRef, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import {
  AttackSprite,
  IdleSprite,
  JumpSprite,
  RechargeSprite,
  ShootSprite,
  SprintLeft,
  SprintRight,
} from "@/constants/sprites";
import { FontAwesome6 } from "@expo/vector-icons";

const SpriteSheetViewer: React.FC = () => {
  const [currentSprite, setCurrentSprite] = useState(IdleSprite);

  const translateX = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);

  const lastForceRef = useRef<number>(0);

  const handleMove = (event: IReactNativeJoystickEvent) => {
    const { angle, force } = event;
    const radians = angle.radian;
    const deltaX = force * Math.cos(radians);
    const deltaY = force * Math.sin(radians);

    translateX.value += deltaX;
    translateY.value -= deltaY;

    if (force !== lastForceRef.current) {
      lastForceRef.current = force;
      setCurrentSprite(
        force > 0 ? (deltaX > 0 ? SprintRight : SprintLeft) : IdleSprite
      );
    }
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const memoizedSpriteSheetLoader = useMemo(
    () => (
      <SpriteSheetLoader
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
  const handleShoot = () => {
    setCurrentSprite(ShootSprite);
    setTimeout(() => {
      setCurrentSprite(IdleSprite);
    }, ShootSprite.frameCount * 100);
  };

  const handleSelfDeath = () => {
    setCurrentSprite(AttackSprite);
    setTimeout(() => {
      setCurrentSprite(IdleSprite);
    }, AttackSprite.frameCount * 100);
  };

  const handleJump = () => {
    setCurrentSprite(JumpSprite);
    setTimeout(() => {
      setCurrentSprite(IdleSprite);
    }, JumpSprite.frameCount * 100);
  };

  const handleRecharge = () => {
    setCurrentSprite(RechargeSprite);
    setTimeout(() => {
      setCurrentSprite(IdleSprite);
    }, RechargeSprite.frameCount * 100);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground
        src="https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1LGzqHL2O4WDw3N9toCVlo/8ad2739d100e09df872b7b0dcde85700/valiant-hearts-heroBanner.jpg"
        style={styles.mainContainer}
      >
        <View style={styles.selfDeath} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.shootButtonTouchable}
            onPress={handleSelfDeath}
          >
            <FontAwesome6 name="hand-fist" size={34} color="rgb(125 211 252)" />
          </TouchableOpacity>
        </View>
        <View style={styles.jumpButton} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.shootButtonTouchable}
            onPress={handleJump}
          >
            <FontAwesome6
              name="person-running"
              size={34}
              color="rgb(125 211 252)"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.rechargeButton} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.shootButtonTouchable}
            onPress={handleRecharge}
          >
            <MaterialIcons name="healing" size={34} color="rgb(125 211 252)" />
          </TouchableOpacity>
        </View>
        <Animated.View style={animatedStyles}>
          {memoizedSpriteSheetLoader}
        </Animated.View>
        <View style={styles.joystickContainer} pointerEvents="box-none">
          <ReactNativeJoystick
            color="#06b6d4"
            onStop={() => {
              setCurrentSprite(IdleSprite);
            }}
            radius={50}
            onMove={handleMove}
          />
        </View>
        <View style={styles.shootButton} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.shootButtonTouchable}
            onPress={handleShoot}
          >
            <Entypo name="hair-cross" size={34} color="rgb(125 211 252)" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // set bacgkround image
    height: "100%",
  },
  selfDeath: {
    position: "absolute",
    bottom: 80,
    left: 90,
  },
  rechargeButton: {
    position: "absolute",
    bottom: 40,
    right: 40,
  },
  jumpButton: {
    position: "absolute",
    bottom: 40,
    left: 40,
  },
  joystickContainer: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -50 }],
    alignItems: "center",
    justifyContent: "center",
  },
  shootButton: {
    position: "absolute",
    bottom: 80,
    right: 90,
  },
  shootButtonTouchable: {
    padding: 10,
    borderRadius: 55,
    marginTop: 10,
    backgroundColor: "",
  },
  bullet: {
    position: "absolute",
    width: 10,
    height: 10,
    backgroundColor: "black",
    borderRadius: 5,
  },
});

export default SpriteSheetViewer;
