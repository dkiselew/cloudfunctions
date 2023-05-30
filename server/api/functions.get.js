import getFunctionsList from '~/api/getFunctionsList';

export default defineEventHandler((event) => {
  return getFunctionsList();
});