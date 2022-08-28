import { DefaultSettingsOptional, ISettings } from '~/models/ISetting';
import formatDate from '~/utils/date';
// eslint-disable-next-line import/extensions
import { getSettingsData, updateSettingsData } from '~/utils/setting.action';

export default function useUpsertSetting(
  userId: string,
  token: string,
  gameName: string,
  wordsCount: number,
  success: number,
  series: number,
  nowData: Date,
) {
  const upsertSettings = () => {
    const settings = getSettingsData(userId, token)
      .then((response) => {
        const data = response as ISettings;
        const { wordsPerDay } = data;
        let totalCount: number | undefined = 0;
        let successCount: number | undefined = 0;
        let seriesCount: number | undefined = 0;
        let optional = DefaultSettingsOptional;
        let settingstDate = '';
        if (data.optional?.dataSettings !== undefined) {
          settingstDate = data.optional?.dataSettings;
        }
        if (settingstDate === formatDate(nowData)) {
          if (gameName === 'audiogame') {
            totalCount = data.optional?.audioTotalCount as number + wordsCount;
            successCount = data.optional?.audioSuccess as number + success;
            seriesCount = (data.optional?.audioSeries as number > series)
              ? data.optional?.audioSeries as number : series;
            optional = {
              audioSuccess: successCount,
              audioTotalCount: totalCount,
              audioSeries: seriesCount,
              sprintSuccess: data.optional?.sprintSuccess as number,
              sprintTotalCount: data.optional?.sprintTotalCount as number,
              sprintSeries: data.optional?.sprintSeries as number,
              dataSettings: settingstDate,
            };
          } else if (gameName === 'sprint') {
            totalCount = data.optional?.sprintTotalCount as number;
            successCount = data.optional?.sprintSuccess as number;
            seriesCount = (data.optional?.sprintSeries as number > series)
              ? data.optional?.sprintSeries as number : series;
            optional = {
              audioSuccess: data.optional?.audioSuccess as number,
              audioTotalCount: data.optional?.audioTotalCount as number,
              audioSeries: data.optional?.audioSeries as number,
              sprintSuccess: successCount,
              sprintTotalCount: totalCount,
              sprintSeries: seriesCount,
              dataSettings: settingstDate,
            };
          }
          const result = updateSettingsData(userId, wordsPerDay + wordsCount, token, optional);
        } else if (settingstDate === '' || settingstDate !== formatDate(nowData)) {
          if (gameName === 'audiogame') {
            optional = {
              ...DefaultSettingsOptional,
              audioSuccess: success,
              audioTotalCount: wordsCount,
              audioSeries: series,
              dataSettings: formatDate(nowData),
            };
          } else if (gameName === 'sprint') {
            optional = {
              ...DefaultSettingsOptional,
              sprintSuccess: success,
              sprintTotalCount: wordsCount,
              sprintSeries: series,
              dataSettings: formatDate(nowData),
            };
          }
          const result = updateSettingsData(userId, wordsCount, token, optional);
        }
      });
  };
  return { upsertSettings };
}
