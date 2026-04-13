import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
import { Images } from '../../assets';

const NoData = () => {
  return (
    <View style={styles.main}>
    <Image source={Images.noData} style={styles.noData} />
    <Text style={styles.noDataText}>No Notes Yet</Text>
    </View>
  )
}

export default NoData

const styles = StyleSheet.create({
     main: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
       
     },
    noData:{
    
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  noDataText:{
    color: 'blue',
    fontSize: 14,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,

  }, 
})