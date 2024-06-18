import { useSpriteStore } from "@/hooks/sprites.store";
import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export function Jump() {
  const { handleJump } = useSpriteStore();
  return (
    <View style={styles.jumpButton} pointerEvents="box-none">
      <TouchableOpacity style={styles.jumpButtonTouchable} onPress={handleJump}>
        <FontAwesome6
          name="person-running"
          size={34}
          color="rgb(125 211 252)"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  jumpButton: {
    position: "absolute",
    bottom: 40,
    left: 40,
  },
  jumpButtonTouchable: {
    padding: 10,
    borderRadius: 55,
    marginTop: 10,
  },
});
