/**
 * Beginner-friendly NoData Widget. 
 */
import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
// We assume Images is exported properly from project assets.
// We use ? chaining in case Images.noData is undefined in current state.
import { Images } from '../../assets';

export const NoData = () => {
  return (
    <View style={styles.main}>
      {Images?.noData && <Image source={Images.noData} style={styles.noData} />}
      <Text style={styles.noDataText}>No Notes Yet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noData: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    color: 'blue',
    fontSize: 14,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  }, 
});
