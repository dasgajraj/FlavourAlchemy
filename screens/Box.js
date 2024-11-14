import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Box = ({props, style}) => {
  return (
    <View style = {[styles.box, style]}>
      <Text>Box</Text>
    </View>
  )
}

export default Box

const styles = StyleSheet.create({
    box:{
        height:100,
        borderWidth:1,
        borderColor:'black',
    }
})