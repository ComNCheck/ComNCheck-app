// import { router, useLocalSearchParams } from "expo-router";
// import * as WebBrowser from "expo-web-browser";
// import { useEffect } from "react";
// import { ActivityIndicator, View } from "react-native";

// export default function OAuthRedirect() {
//   const params = useLocalSearchParams<{
//     code?: string;
//     error?: string;
//     error_description?: string;
//   }>();

//   useEffect(() => {
//     // 반드시 호출되어야 AuthSession이 완료되고 promptAsync가 resolve될 수 있음
//     WebBrowser.maybeCompleteAuthSession();

//     const { code, error, error_description } = params;

//     if (error) {
//       console.log("❌ [AUTH] provider error:", error, error_description ?? "");
//     }

//     if (code) {
//       console.log("✅ [AUTH] CODE (from route):", code);

//       // 디버그용 전역 값(로그인 화면에서 저장해둠)
//       const codeVerifier = (globalThis as any).__pkce ?? "";
//       const redirectUri = (globalThis as any).__redirectUri ?? "";
//       const clientId = (globalThis as any).__clientId ?? "";

//       console.log("🔐 [AUTH] codeVerifier:", codeVerifier);
//       console.log("↩️ [AUTH] redirectUri:", redirectUri);
//       console.log("👤 [AUTH] clientId:", clientId);

//       // 서버로 전송 (예: 토큰 교환 엔드포인트)
//       void (async () => {
//         try {
//           const res = await fetch(
//             "https://www.comncheck.com/api/V1/member/login",
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 code,
//                 codeVerifier,
//                 redirectUri,
//                 clientId,
//               }),
//             }
//           );
//           console.log("[AUTH] server status:", res.status);
//           const data = await res.json();
//           console.log("[AUTH] server response:", data);
//         } catch (e) {
//           console.log("[AUTH] network error:", e);
//         } finally {
//           // 원하는 화면으로 복귀
//           setTimeout(() => router.replace("/(auth)/login/first"), 100);
//         }
//       })();
//     } else {
//       // 코드가 없으면 그냥 홈으로 복귀(로그만 남김)
//       console.log("❌ [AUTH] no code on redirect route");
//       setTimeout(() => router.replace("/"), 100);
//     }
//   }, [params]);

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <ActivityIndicator />
//     </View>
//   );
// }
