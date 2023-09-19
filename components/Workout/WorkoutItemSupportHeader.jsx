import { StyleSheet, View } from 'react-native'
import React from 'react'
import Feature from '../FeatureFlags/Feature'
import { GlobalStyles } from '../../constants/styles'
import YourMeasurementValueBox from '../YourMeasurements/YourMeasurementValueBox'

const WorkoutItemSupportHeader = ({mostRecent, goalValue, metric}) => {
    
    return <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
    { mostRecent ?
    <View style={{ width: "48%" }}>
      <YourMeasurementValueBox 
      title={"Recent"} 
      value={mostRecent} 
      metric={metric} 
      flat={true} 
      backgroundColor={GlobalStyles.colors.primary}
      />
      </View> : null
    }
    { goalValue ?
     <Feature name={"Goals"}>
    <View style={[!mostRecent && { flex: 1, alignItems: "flex-end" }, {width: "48%"}]}>
      <YourMeasurementValueBox 
      title={"Goal"} 
      value={goalValue} 
      metric={metric} 
      flat={true} 
      backgroundColor={GlobalStyles.colors.primaryGoal}
      style={[!mostRecent && {width: "48%"}]}
      />
    </View>
     </Feature> : null
    }
  </View>
}

export default WorkoutItemSupportHeader

const styles = StyleSheet.create({})