import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import TimePicker from "react-native-24h-timepicker";

class Example extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0
    };

    this.onConfirm = this.onConfirm.bind(this)
  }

  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {
    console.log(hour, minute)
    this.TimePicker.close();
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.TimePicker.open()}>
        <Text style={styles.text}>{this.state.hours}h : {this.state.minutes}m</Text>
        <TimePicker
          ref={ref => {
            this.TimePicker = ref;
          }}
          onCancel={() => this.onCancel()}
          onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hour: {
    color: 'black',
    fontSize: 17,
    fontWeight: '600',
  },
  month: {
    color: 'black',
    fontSize: 9,
    fontWeight: '400',
  },
});

export default Example
