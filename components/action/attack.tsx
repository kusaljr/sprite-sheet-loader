import { useSpriteStore } from "@/hooks/sprites.store";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export function Attack() {
  const { handleAttack } = useSpriteStore();
  return (
    <View style={styles.attackButton} pointerEvents="box-none">
      <TouchableOpacity
        style={styles.attackButtonTouchable}
        onPress={handleAttack}
      >
        <Entypo name="hair-cross" size={34} color="rgb(125 211 252)" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  attackButton: {
    position: "absolute",
    bottom: 80,
    right: 40,
  },
  attackButtonTouchable: {
    padding: 10,
    borderRadius: 55,
    marginTop: 10,
    backgroundColor: "",
  },
});
