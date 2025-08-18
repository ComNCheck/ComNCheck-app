import { Fragment } from "react";
import { View } from "react-native";
import ActionButton from "./ActionButton";

interface ButtonConfig {
  role: string[];
  icon: string;
  text: string;
  route?: string;
  action?: "openModal";
}

interface ActionButtonsProps {
  role: string;
}

export default function ActionButtons({ role }: ActionButtonsProps) {
  const buttonConfig: ButtonConfig[] = [
    {
      role: [
        "ROLE_ADMIN",
        "ROLE_STUDENT",
        "ROLE_GRADUATE_STUDENT",
        "ROLE_STUDENT_COUNCIL",
      ],
      icon: "question",
      text: "질문하기",
      route: "/(tabs)/my/question",
    },
    {
      role: ["ROLE_ADMIN", "ROLE_MAJOR_PRESIDENT", "ROLE_STUDENT_COUNCIL"],
      icon: "answer",
      text: "답변하기",
      route: "/my/answer",
    },
    {
      role: ["ROLE_ADMIN", "ROLE_MAJOR_PRESIDENT"],
      icon: "modify-role",
      text: "등급수정하기",
      route: "/my/modifyRole",
    },
    {
      role: [
        "ROLE_ADMIN",
        "ROLE_MAJOR_PRESIDENT",
        "ROLE_STUDENT_COUNCIL",
        "ROLE_STUDENT",
        "ROLE_GRADUATE_STUDENT",
      ],
      icon: "applied-event",
      text: "신청한 행사",
      action: "openModal",
    },
    {
      role: [
        "ROLE_ADMIN",
        "ROLE_STUDENT",
        "ROLE_GRADUATE_STUDENT",
        "ROLE_STUDENT_COUNCIL",
      ],
      icon: "my-text",
      text: "내가 쓴 글",
      route: "/(tabs)/my/writingCheck",
    },
  ];

  const filteredButtons = buttonConfig.filter((btn) => btn.role.includes(role));

  return (
    <View className="items-center px-4 w-full h-20">
      <View className="flex-row rounded-3xl bg-blue-500 p-4 max-w-sm w-full h-full">
        {filteredButtons.map(({ icon, text, route, action }, index) => (
          <Fragment key={`${icon}-${text}`}>
            <View className="flex-1">
              <ActionButton
                icon={icon}
                text={text}
                total={filteredButtons.length}
                route={route}
                action={action}
              />
            </View>
            {index < filteredButtons.length - 1 && (
              <View className="w-px h-12 bg-white self-center" />
            )}
          </Fragment>
        ))}
      </View>
    </View>
  );
}
