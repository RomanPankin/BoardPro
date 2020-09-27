import { NumberUtils } from './number-utils';

interface ITestData {
   input: string;
   expected: number;
}

describe('NumberUtils.parseNum', () => {
   beforeEach((() => {
   }));

   const testData: ITestData[] = [
      { input: '0', expected: 0 },
      { input: '0ddf', expected: null },
      { input: '123.4', expected: 123.4 },
      { input: ' 10', expected: 10 },
   ];

   testData.forEach(data => {
      it(`input ${data.input}`, () => {
         const result = NumberUtils.parseNum(data.input);
         expect(result).toEqual(data.expected);
      });
   });
 });
