import { ReplaceConditions } from '@/types';

export const getFieldsToSort = (fieldsToReplace: ReplaceConditions[], originalFIeld = ''): string => {
  const sortDirection = originalFIeld?.startsWith('-') ? '-' : '';

  const sortFieldsArray = fieldsToReplace
    .find(item => sortDirection + item.from === originalFIeld);

  const sortFields = sortFieldsArray
    ? sortFieldsArray.to.split(', ').map(item => sortDirection + item).join()
    : originalFIeld;

  return sortFields;
};
