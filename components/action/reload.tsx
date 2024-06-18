import { useSpriteStore } from "@/hooks/sprites.store";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export function Reload() {
  const { handleRecharge } = useSpriteStore();
  return (
    <View style={styles.reloadButton} pointerEvents="box-none">
      <TouchableOpacity
        style={styles.reloadButtonTouchable}
        onPress={handleRecharge}
      >
        <MaterialIcons name="healing" size={34} color="rgb(125 211 252)" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  reloadButton: {
    position: "absolute",
    bottom: 40,
    right: 40,
  },
  reloadButtonTouchable: {
    padding: 10,
    borderRadius: 55,
    marginTop: 10,
  },
});
