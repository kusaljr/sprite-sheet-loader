import {
  AttackSprite,
  IdleSprite,
  JumpSprite,
  RechargeSprite,
  ShootSprite,
} from "@/constants/sprites";
import { useSharedValue } from "react-native-reanimated";
import { create } from "zustand";
interface Sprite {
  uri: any;
  frameCount: number;
}

interface SpriteStore {
  sprite: Sprite;

  setCurrentSprite: (sprite: Sprite) => void;
  handleShoot: () => void;
  handleAttack: () => void;
  handleJump: () => void;
  handleRecharge: () => void;
}

export const useSpriteStore = create<SpriteStore>((set) => ({
  sprite: IdleSprite,
  translateX: useSharedValue<number>(0),
  translateY: useSharedValue<number>(0),
  setCurrentSprite: (sprite) => set({ sprite }),

  handleShoot: () => {
    set({ sprite: ShootSprite });

    setTimeout(() => {
      set({ sprite: IdleSprite });
    }, ShootSprite.frameCount * 100);
  },

  handleAttack: () => {
    set({ sprite: AttackSprite });

    setTimeout(() => {
      set({ sprite: IdleSprite });
    }, AttackSprite.frameCount * 100);
  },

  handleJump: () => {
    set({ sprite: JumpSprite });

    setTimeout(() => {
      set({ sprite: IdleSprite });
    }, JumpSprite.frameCount * 100);
  },

  handleRecharge: () => {
    set({ sprite: RechargeSprite });

    setTimeout(() => {
      set({ sprite: IdleSprite });
    }, RechargeSprite.frameCount * 100);
  },
}));
