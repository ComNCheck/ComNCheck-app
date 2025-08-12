import HeaderBar from "@/components/HeaderBar";
import ParallaxScrollView from "@/components/view/ParallaxScrollView";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Button, Pressable, Text, View } from "react-native";

export default function MyScreen() {
  return (
    <ParallaxScrollView
      headerBar={
        <HeaderBar
          backgroundColor="#fafafa"
          left={<Text className="text-3xl font-extrabold">MY</Text>}
        >
          <Pressable className="flex-row gap-4">
            <FontAwesome
              size={28}
              name="gear"
              color="#B6B6B6"
              onPress={() => router.push("/(setting)")}
            />
            <MaterialIcons
              size={28}
              name="logout"
              color="#B6B6B6"
              onPress={() => router.push("/(auth)/login")} //임시 라우팅
            />
          </Pressable>
        </HeaderBar>
      }
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 20 }}>MY Screen</Text>
        <Button
          title="로그인 화면으로 이동"
          onPress={() => router.push("/(auth)/login")}
        />
        <View style={{ height: 16 }} />
        <Button
          title="회원가입 화면으로 이동"
          onPress={() => router.push("/(auth)/signup")}
        />
      </View>
    </ParallaxScrollView>
  );
}
