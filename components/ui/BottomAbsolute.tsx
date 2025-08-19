import { PropsWithChildren } from "react";
import { View } from "react-native";

interface BottomAbsoluteProps {
  bottom: number;
  className?: string;
}

export default function BottomAbsolute({
  bottom,
  className,
  children,
}: PropsWithChildren<BottomAbsoluteProps>) {
  return (
    <View
      className={`absolute left-0 right-0 ${className ?? ""}`}
      style={{ bottom }}
    >
      {children}
    </View>
  );
}
