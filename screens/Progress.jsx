import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import Card from "../components/UI/Card";
import { GlobalStyles } from "../constants/styles";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getRecentMeasurementsByType } from "../utils/database/yourMeasurements";
import { useEffect } from "react";
import LoadingOverlay from "../components/UI/LoadingOverlay";

const Progress = () => {
  const [isFetching, setIsFetching] = useState(true);
  const token = useSelector((store) => store.auth.token);
  const [measurementData, setMeasurementData] = useState();

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      try {
        const measurementData = await getRecentMeasurementsByType(
          token,
          "649344043a65421e6b78128a"
        );
        setMeasurementData(measurementData);
        console.log(measurementData);
      } catch (error) {
        console.log(error);
      }
      setIsFetching(false);
    })();
  }, [token]);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const plotLabels = (items, interval) => {
    var count = 0;
    const labels = [];
    items.map((item) => {
      count % interval === 0 ? labels.push(item) : labels.push(" ");
      count++;
    });
    return labels;
  };

  const plotData = (items) => {
    var lastValue = 0;
    const data = [];
    items.map((item) => {
      if (item.value) {
        lastValue = item.value;
        data.push(item.value);
      }
      data.push(lastValue);
    });
    return data;
  };

  // const labels = plotLabels(
  //   measurementData.map((item) => item.DateString),
  //   8
  // );

  return (
    <View style={GlobalStyles.AndroidSafeArea.AndroidSafeArea}>
      <Text>Progress</Text>
      <Card>
        <Text>Header Placement</Text>
        <LineChart
          data={{
            labels: plotLabels(
              measurementData.map((item) => item.DateString),
              8
            ),
            datasets: [
              {
                data: plotData(measurementData),
              },
            ],
          }}
          width={Dimensions.get("window").width * 0.9}
          height={220}
          yAxisSuffix="cm"
          withInnerLines={false}
          chartConfig={{
            backgroundColor: GlobalStyles.colors.primary,
            backgroundGradientFrom: GlobalStyles.colors.primary,
            backgroundGradientTo: GlobalStyles.colors.primary,
            propsForLabels: {
              fontSize: 10,
            },
            decimalPlaces: 0,
            color: (opacity = 0.2) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 4,
          }}
          bezier
          style={{
            borderRadius: 8,
          }}
        />
      </Card>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 45,
  },
});
