import {
  IReactNativeJoystickEvent,
  ReactNativeJoystick,
} from "@/components/ui/joystick/joystick";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export default function App() {
  const translateX = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);

  const handleMove = (event: IReactNativeJoystickEvent) => {
    const { angle, force } = event;
    const radians = angle.radian;
    const deltaX = force * Math.cos(radians);
    const deltaY = force * Math.sin(radians);

    // Directly set the shared values
    translateX.value = translateX.value + deltaX;
    // make sure to invert the Y axis
    translateY.value = translateY.value - deltaY;
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <>
      <Animated.View style={[styles.box, animatedStyles]} />
      <View style={styles.container}>
        <ReactNativeJoystick radius={50} onMove={handleMove} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20, // Adjust this value to your preference
    left: "50%",
    transform: [
      {
        translateX: -50,
      },
    ],
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: 40,
    width: 40,
    backgroundColor: "#b58df1",
    borderRadius: 20,
  },
});
