import SettinglView from "@/components/SettingView";
import SubTitle from "@/components/SubTitle";

export default function ApplyRatingScreen() {
  //const router = useRouter();
  return (
    <SettinglView>
      <SubTitle
        title="학생회 등급신청"
        description="학생회 부원 및 과회장만 신청이 가능해요."
      />
    </SettinglView>
  );
}
