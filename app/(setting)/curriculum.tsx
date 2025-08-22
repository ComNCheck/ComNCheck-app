import curriculumData from "@/app/apis/curriculum";
import SubTitle from "@/components/title/SubTitle";
import ShadowBox from "@/components/ui/ShadowBox";
import SettinglView from "@/components/view/SettingView";
import { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function CurriculumScreen() {
  const defaultSemester = "1-1";
  const semesterItem = ["1-1", "1-2", "2-1", "2-2", "3-1", "3-2", "4-1", "4-2"];
  const [semesterClick, setSemesterClick] = useState(defaultSemester);

  useEffect(() => {
    setSemesterClick(defaultSemester);
  }, []);

  const handleClick = useCallback(
    (semester: string) => {
      if (semesterClick !== semester) {
        setSemesterClick(semester);
      }
    },
    [semesterClick]
  );

  const selectedCurriculum = curriculumData.find(
    (item) => item.semester === semesterClick
  );

  const trackStyles = {
    "liberal-arts": { backgroundColor: "#F4EEEE", borderColor: "#EEE0DA" },
    "major-required": { backgroundColor: "#FEF08A", borderColor: "#FACC15" },
    foundation: { backgroundColor: "#FBF3DB", borderColor: "#FDECC8" },
    "major-elective": { backgroundColor: "#EDF3EC", borderColor: "#DBEDDB" },
    "major-elective-sw": { backgroundColor: "#FAF1F5", borderColor: "#F5E0E9" },
    "major-elective-ai": { backgroundColor: "#E7F3F8", borderColor: "#D3E5EF" },
  };

  const trackGuide = [
    { id: "major-required", name: "전공필수" },
    { id: "liberal-arts", name: "교양" },
    { id: "foundation", name: "기초" },
    { id: "major-elective", name: "전공선택 공통" },
    { id: "major-elective-sw", name: "전공선택SW" },
    { id: "major-elective-ai", name: "전공선택AI" },
  ];

  return (
    <SettinglView>
      <SubTitle
        title="학부과목 이수체계도"
        description="학년을 클릭하여 자신의 학년에 맞는 커리큘럼을 확인해보세요"
      />
      <ShadowBox>
        <View className="flex-row flex-wrap items-center bg-white">
          <View className="flex-1 flex-row flex-wrap justify-center w-full gap-2">
            {semesterItem.map((semester) => (
              <TouchableOpacity
                key={semester}
                className={`w-1/5 items-center justify-center p-1 rounded-3xl border-[2px] 
                ${semesterClick === semester ? "border-tint" : "border-gray-400"}`}
                onPress={() => handleClick(semester)}
              >
                <Text
                  className={`text-center font-semibold text-sm 
                  ${semesterClick === semester ? "text-tint" : "text-gray-400"}`}
                >
                  {semester}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View className="flex-1 flex-row flex-wrap w-full items-start justify-center gap-2 my-5">
          {selectedCurriculum?.tracks.map((track, trackIndex) =>
            track.subjects.map((subject, index) => (
              <View
                key={`${trackIndex}-${index}`}
                className="w-[45%] h-12 rounded-lg items-center justify-center shadow-sm p-1 my-2"
                style={{
                  backgroundColor:
                    trackStyles[track.id as keyof typeof trackStyles]
                      ?.backgroundColor || "#FFFFFF",
                  borderColor:
                    trackStyles[track.id as keyof typeof trackStyles]
                      ?.borderColor || "#E5E7EB",
                  borderWidth: 1,
                }}
              >
                <Text className="text-center text-xs font-medium">
                  {subject.name}
                </Text>
              </View>
            ))
          )}
        </View>
        <View className="flex-row flex-wrap justify-center gap-2 my-8">
          {trackGuide.map((track) => (
            <View
              key={track.id}
              className="w-20 h-8 rounded-full items-center justify-center"
              style={{
                backgroundColor:
                  trackStyles[track.id as keyof typeof trackStyles]
                    ?.backgroundColor || "#FFFFFF",
                borderColor:
                  trackStyles[track.id as keyof typeof trackStyles]
                    ?.borderColor || "#E5E7EB",
                borderWidth: 1,
              }}
            >
              <Text className="text-center text-xs font-bold">
                {track.name}
              </Text>
            </View>
          ))}
        </View>
      </ShadowBox>
    </SettinglView>
  );
}
