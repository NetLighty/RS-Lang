import { DefaultSettingsOptional, ISettings } from '~/models/ISetting';
import { getSettingsData, updateSettingsData } from '~/utils/setting.action';

export default function useUpsertSetting(
  userId: string, token: string, gameName: string, wordsCount: number, success: number) {
  const upsertSettings = () => {
    const settings = getSettingsData(userId, token)
      .then((response) => {
        const data = response as ISettings;
        const { wordsPerDay } = data;
        let totalCount: number | undefined = 0;
        let successCount: number | undefined = 0;
        let optional = DefaultSettingsOptional;
        if (gameName === 'audio') {
          totalCount = data.optional?.audioTotalCount as number + wordsCount;
          successCount = data.optional?.audioSuccess as number + success;
          optional = {
            audioSuccess: successCount,
            audioTotalCount: totalCount,
            sprintSuccess: data.optional?.sprintSuccess as number,
            sprintTotalCount: data.optional?.sprintTotalCount as number,
          };
        } else if (gameName === 'sprint') {
          totalCount = data.optional?.sprintTotalCount as number;
          successCount = data.optional?.sprintSuccess as number;
          optional = {
            audioSuccess: data.optional?.audioSuccess as number,
            audioTotalCount: data.optional?.audioTotalCount as number,
            sprintSuccess: successCount,
            sprintTotalCount: totalCount,
          };
        }
        const result = updateSettingsData(userId, wordsPerDay + wordsCount, token, optional);
      });
  };
  return { upsertSettings };
}
