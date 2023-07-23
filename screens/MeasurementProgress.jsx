import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import ProgressChart from "../components/Progress/ProgressChart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMeasurementTypes } from "../utils/database/yourMeasurements";
import { setMeasurementTypes } from "../store/redux/yourMeasurements";
import LoadingOverlay from "../components/UI/LoadingOverlay";

const renderProgressChart = ({ item }) => {
  return (
    <ProgressChart
      measurementTypeId={item._id}
      measurementTypeName={item.name}
      measurementTypeMetric={item.metric}
    />
  );
};

const MeasurementProgress = () => {
  const [isFetching, setIsFetching] = useState(true);
  const token = useSelector((store) => store.auth.token);
  const dispatch = useDispatch();
  const measurementTypes = useSelector(
    (store) => store.yourMeasurements.measurementTypes
  );

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      try {
        if (measurementTypes.length < 1) {
          const measurementTypes = await getMeasurementTypes(token);
          dispatch(
            setMeasurementTypes({
              measurementTypes: measurementTypes,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
      setIsFetching(false);
    })();
  }, [measurementTypes, token]);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <FlatList
      data={measurementTypes}
      renderItem={renderProgressChart}
      keyExtractor={(item) => item._id}
    />
  );
};

export default MeasurementProgress;

const styles = StyleSheet.create({});
