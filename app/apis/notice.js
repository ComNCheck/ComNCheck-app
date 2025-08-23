// Mock API functions for notice/event data
// Replace with actual API calls when backend is ready

export const getMajorEvent = async () => {
  // Mock data for major events
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          eventName: "컴퓨터공학과 취업설명회",
          date: "2025-05-15",
          location: "공학관 101호",
        },
        {
          id: 2,
          eventName: "프로그래밍 경진대회",
          date: "2025-05-25",
          location: "컴퓨터실습실",
        },
        {
          id: 3,
          eventName: "졸업작품 발표회",
          date: "2025-06-10",
          location: "대강당",
        },
      ]);
    }, 500);
  });
};

export const getAnotherMajorEvent = async () => {
  // Mock data for other major events
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 4,
          eventName: "학과 체육대회",
          date: "2025-05-20",
          location: "운동장",
        },
        {
          id: 5,
          eventName: "산학협력 세미나",
          date: "2025-06-05",
          location: "세미나실",
        },
      ]);
    }, 500);
  });
};
