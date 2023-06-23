export function convertDateToString(dateValue) {
  return new Date(dateValue).toLocaleString();
}

export function convertDurationToString(durationValue) {
  var hours = Math.floor(durationValue / 3600);
  var minutes = Math.floor((durationValue % 3600) / 60);
  var seconds = Math.floor(durationValue % 60);
  return `${hours > 0 ? hours + "h " : ""} ${
    minutes > 0 ? minutes + "m " : ""
  } ${seconds + "s"}`;
}

export function combineMeasurementsAndTypes(
  yourMeasurements,
  measurementTypes
) {
  const yourMeasurementsCorrected = [];

  measurementTypes.map((measurementType) => {
    const measurements = yourMeasurements.find(
      (measurement) => measurement.measurementTypeId == measurementType._id
    );

    var combinedMeasurement;

    if (measurements !== undefined) {
      measurements.measurementType = measurementType;
      combinedMeasurement = measurements;
    } else {
      combinedMeasurement = { measurementType: measurementType };
    }

    yourMeasurementsCorrected.push(combinedMeasurement);
  });
  return yourMeasurementsCorrected;
}
