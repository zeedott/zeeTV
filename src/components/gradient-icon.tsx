import React from "react";
import { View } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

interface GradientIconProps {
  name: keyof typeof Ionicons.glyphMap;
  size: number;
  colors: [string, string, ...string[]];
}

export function GradientIcon({ name, size, colors }: GradientIconProps) {
  return (
    <MaskedView
      style={{ width: size, height: size }}
      maskElement={
        <Ionicons name={name} size={size} color="black" />
      }
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      />
    </MaskedView>
  );
}