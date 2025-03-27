export const formatTimestamps = (
  data: IndividualReading[],
  measurement: string
): IndividualReading[] => {
  return data.map((reading: IndividualReading) => ({
    timestamp: new Date(reading.timestamp).toLocaleString("en-gb"),
    [measurement]: reading[measurement],
  }));
};
