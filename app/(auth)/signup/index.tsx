import { postStudentCard } from "@/app/apis/auth";
import HeaderBar from "@/components/HeaderBar";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Signup() {
  const router = useRouter();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("권한 필요", "사진 접근 권한이 필요합니다.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setImageUri(asset.uri);
      __DEV__ && console.log("[PICK]", asset.uri, asset.mimeType ?? "");
    }
  };

  const handleSubmit = async () => {
    if (!imageUri) {
      Alert.alert("이미지 필요", "학생증 이미지를 선택해 주세요.");
      return;
    }
    try {
      setSubmitting(true);
      const res = await postStudentCard(imageUri);
      __DEV__ && console.log("[UPLOAD ok]", res);

      Alert.alert("완료", "학생증 이미지가 업로드되었습니다.", [
        { text: "확인", onPress: () => router.replace("/(auth)/signup/done") },
      ]);
    } catch (e: any) {
      __DEV__ && console.log("[UPLOAD error]", e?.message ?? e);
      Alert.alert("업로드 실패", "이미지 업로드 중 문제가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          paddingTop: 40,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <HeaderBar
          left={
            <Image
              source={require("@/assets/images/logo-2x.png")}
              style={{ width: 48, height: 48 }}
            />
          }
        >
          <Pressable onPress={() => router.push("/(auth)/login")}>
            <Text className="text-base font-semibold text-text">로그인</Text>
          </Pressable>
        </HeaderBar>
      </View>

      <View className="flex-1 flex-col bg-white p-4 items-center justify-center">
        <Text className="font-bold text-2xl">회원가입</Text>

        <View className="flex-row items-center gap-2 m-4">
          <Text className="text-base text-gray-800">
            한국외국어대학교 모바일 ID 화면을 캡쳐 후 업로드 해주세요
          </Text>
          <Pressable onPress={() => setModalVisible(true)}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="gray"
            />
          </Pressable>

          <Modal
            visible={modalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <Pressable
              className="flex-1 bg-black/50 justify-center items-center"
              onPress={() => setModalVisible(false)}
            >
              <View className="bg-white p-5 rounded-xl w-82 m-8 items-center">
                <Text className="text-lg font-bold mb-2">업로드 가이드</Text>
                <Text className="text-sm text-gray-600">
                  HUFS 모바일 ID 화면을 캡쳐하신 후 업로드 해주세요. 학번,
                  이름이 명확히 보이도록 해주세요.
                </Text>
                <Image
                  source={require("@/assets/images/mobileId.png")}
                  style={{ width: 200, height: 450 }}
                />
              </View>
            </Pressable>
          </Modal>
        </View>

        {!imageUri && (
          <TouchableOpacity
            onPress={pickImage}
            className="w-[70%] h-60 border-[1px] border-[#D9D9D9] rounded-2xl items-center justify-center"
          >
            <MaterialIcons name="camera-enhance" size={24} color="#D9D9D9" />
          </TouchableOpacity>
        )}

        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{ width: 200, height: 240, marginTop: 10, borderRadius: 10 }}
          />
        )}

        <TouchableOpacity
          style={[styles.button, submitting && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <Text style={[styles.font, { marginLeft: 8 }]}>
              <ActivityIndicator size="small" color="#fff" />
            </Text>
          ) : (
            <Text style={styles.font}>다음 단계로</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0077ff",
    borderRadius: 8,
    padding: 12,
    margin: 20,
    width: "80%",
  },
  font: { fontWeight: "bold", color: "#ffffff", textAlign: "center" },
});
