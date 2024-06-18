import { useSpriteStore } from "@/hooks/sprites.store";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export function Shoot() {
  const { handleShoot } = useSpriteStore();

  return (
    <View style={styles.shootButton} pointerEvents="box-none">
      <TouchableOpacity
        style={styles.shootButtonTouchable}
        onPress={handleShoot}
      >
        <Entypo name="hair-cross" size={34} color="rgb(125 211 252)" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
