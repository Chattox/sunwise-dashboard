import { DataPoint, LTTB } from "downsample";
import { MAX_DATA_POINTS } from "./consts";

export const downsampleData = (
  data: IndividualReading[],
  measurement: string
): IndividualReading[] => {
  const tuples: DataPoint[] = data.map((reading: IndividualReading) => [
    Date.parse(reading.timestamp),
    reading[measurement] ? (reading[measurement] as number) : 0,
  ]);

  // whyyyy does this not just return an array
  const downsampledTuples = LTTB(tuples, MAX_DATA_POINTS);

  const downsampledData: IndividualReading[] = [];

  for (let i = 0; i < downsampledTuples.length; i++) {
    const tupleArr = downsampledTuples[i] as Array<number>;
    downsampledData.push({
      timestamp: new Date(tupleArr[0]).toISOString(),
      [measurement]: tupleArr[1],
    });
  }

  return downsampledData;
};
