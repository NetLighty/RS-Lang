import { Console } from 'console';
import WordService from '~/api/wordsService';
import { IAggregated, IAggregatedResponse } from '~/models/IAggregated';
import { AddWordsAction, IWord } from '~/models/IWord';
import { getWordsFromServer } from '~/store/word.actions';
import { getAggregatedWordsForGame, getArrayWords, getWordsArray, getWordsOnPage } from '~/utils/aggregatedWordsFunc';
// eslint-disable-next-line import/extensions

// export default function useGenerateArrayGame(
//   userId: string,
//   token: string,
//   group: string,
//   page: string,
// ) {
// export default function generateArrayGame(
//   userId: string,
//   token: string,
//   group: string,
//   page: string,
// ) {
//   let resultArr: IWord[];
//   let pageNumber = page as unknown as number;
//   const filter = `{"$and":[{"userWord.optional.page":${pageNumber}, "userWord.optional.learned":false}]}`;
//   const aggregated = getAggregatedWordsForGame(userId, token, group, '20', filter)
//     .then((response) => {
//       const data = response as IAggregatedResponse[];
//       const learnedWords: IAggregated[] = data[0].paginatedResults;
//       const getWords = getWordsOnPage(group, page)
//         .then((res) => {
//           const pageWords = res as IWord[];
//           if (learnedWords.length === 0) {
//             return pageWords;
//           }
//           resultArr = pageWords.filter((x) => !learnedWords.some(
//             (y) => x.id === y.userWord.optional?.id,
//           ));
//           if (resultArr.length < 10) {
//             if (pageNumber !== 1) {
//               pageNumber -= 1;
//               return generateArrayGame(userId, token, group, pageNumber as unknown as string);
//             }
//             return resultArr;
//           }
//           console.log(resultArr);
//           return resultArr;
//         });
//     });
// }

// export default async function generateArrayGame(
//   userId: string,
//   token: string,
//   group: string,
//   page: string,
// ) {
//   let resultArr: IWord[] = [];
//   let pageNumber = page as unknown as number;
//   const filter = `{"$and":[{"userWord.optional.page":${pageNumber}, "userWord.optional.learned":true}]}`;
//   const aggregated = (await getAggregatedWordsForGame(userId, token, group, '20', filter));
//   const aggreg: IAggregatedResponse[] = aggregated as IAggregatedResponse[];
//   const learnedWords: IAggregated[] = aggreg[0].paginatedResults;
//   const getWords = (await getWordsOnPage(group, page));
//   const pageWords = getWords as IWord[];
//   if (learnedWords.length === 0) {
//     return pageWords;
//   }
//   resultArr = pageWords.filter((x) => !learnedWords.some(
//     (y) => x.word === y.word,
//   ));
//   if (resultArr.length < 10) {
//     if (pageNumber.toString() !== '0') {
//       pageNumber -= 1;
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//       return (generateArrayGame(userId, token, group, pageNumber as unknown as string));
//     }
//     return resultArr;
//   }
//   return resultArr;
// }

export default async function generateArrayGameFunc(
  userId: string,
  token: string,
  group: string,
  page: string,
) {
  let learnedWords: IAggregated[] = [];
  let pageWords: IWord[] = [];
  async function generateArrayGame(page1: string): Promise<IWord[]> {
    let resultArr: IWord[] = [];
    let pageNumber = page1 as unknown as number;
    const filter = `{"$and":[{"userWord.optional.page":${pageNumber}, "userWord.optional.learned":true}]}`;
    const aggregated = (await getAggregatedWordsForGame(userId, token, group, '20', filter));
    const aggreg: IAggregatedResponse[] = aggregated as IAggregatedResponse[];
    learnedWords = learnedWords.concat(aggreg[0].paginatedResults);
    const getWords = (await getWordsOnPage(group, page1));
    pageWords = pageWords.concat(getWords as IWord[]);
    if (learnedWords.length === 0) {
      return pageWords;
    }
    resultArr = pageWords.filter((x) => !learnedWords.some(
      (y) => x.word === y.word,
    ));
    if (resultArr.length < 10) {
      if (pageNumber.toString() !== '0') {
        pageNumber -= 1;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return (generateArrayGame(pageNumber.toString()));
      }
      return resultArr;
    }
    return resultArr;
  }
  const words = (await generateArrayGame(page));
  return words;
}
