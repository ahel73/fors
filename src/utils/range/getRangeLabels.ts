export const getRangeLabels = (
  label: string | undefined,
  valueFrom: string | (string | null)[] | undefined,
  valueTo: string | (string | null)[] | undefined
): string => {
  if (label && valueFrom?.length && valueTo?.length) {
    return `${label}: c ${valueFrom?.toString()} по ${valueTo?.toString()}`;
  } else if (valueFrom?.length) {
    return `${label}: c ${valueFrom?.toString()}`;
  } else if (valueTo?.length) {
    return `${label}: по ${valueTo?.toString()}`;
  }

  return '';
};
