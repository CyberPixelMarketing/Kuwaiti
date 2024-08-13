import {  StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import StepIndicator from 'react-native-step-indicator';
import { color } from '../constants/color';
import ExportSvg from '../constants/ExportSvg';

const ProgressBar = ({
    currentPosition,
    setCurrentPosition

}) => {

    const labels = ["Confirmed", "Processing", "Delivery", "Completed"];
    const customStyles = {
        stepIndicatorSize: 5,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#fff',
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: color.theme,
        stepStrokeUnFinishedColor: '#ddd',
        separatorFinishedColor: color.theme,
        separatorUnFinishedColor: '#ddd',
        stepIndicatorFinishedColor: '#red',
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: '#fe7013',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: color.theme
    };

    const onPageChange = (position) => {
        setCurrentPosition(position+1);
    };


 
    const renderStepIndicator = ({ position, stepStatus }) => {
        if (stepStatus === 'current') {
            return <ExportSvg.StepCar/>
        } 
    };
    return (

      <View>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            labels={labels}
            stepCount={labels.length}
            onPress={onPageChange}
            renderStepIndicator={renderStepIndicator}
            
        />
      </View>



    );
};

export default ProgressBar;

const styles = StyleSheet.create({});
