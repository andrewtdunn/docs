import { getMetaStringObj } from '../getMetaStringObj.mjs';
import JSON5 from 'json5';

describe('getMetaStringObj', () => {
  it('should return meta object for a valid page file path with valid meta object', async () => {
    const filePath = './src/directory/__tests__/helpers/valid-meta-page.mdx';
    const expectedMetaObject = JSON5.parse(
      `{"title":"Build & connect backend","description":"Learn more about how you can build the backend for your app or connect with existing resources.","platforms":["android","angular","flutter","javascript","nextjs","react","react-native","swift","vue"],"route":"/[platform]/build-a-backend","canonicalObjects":[{"platforms":["vue","javascript","react","angular","nextjs"],"canonicalPath":"/javascript/build-a-backend/"}]}`
    );

    const results = await getMetaStringObj(filePath);

    expect(results).toEqual(expectedMetaObject);
  });

  it('should throw a MissingMetaError for page with missing meta object ', async () => {
    const filePath = './src/directory/__tests__/helpers/missing-meta-page.mdx';

    expect(async () => {
      await getMetaStringObj(filePath);
    }).rejects.toThrow();
  });

  // it('should throw an InvalidMetaError for page with invalid meta object ', async () => {
  //   const filePath = './src/directory/__tests__/helpers/invalid-meta-page.mdx';

  //   expect(async () => {
  //     await getMetaStringObj(filePath);
  //   }).rejects.toThrow();
  // });
});