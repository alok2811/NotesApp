import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useTheme } from 'react-native-paper';
import { pushReplacement } from '../../../navigation/RootNavigation';

/**
 * Splash screen for the presentation layer.
 */
const SplashScreen = () => {
    const theme = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => {
            pushReplacement('Home');
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const styles = StyleSheet.create({
        main: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: theme.colors.background,
        },   
        titleText: {
            color: theme.colors.onBackground,
            fontSize: 18,
            fontWeight: 'bold',
        },
        bodyText: {
            color: theme.colors.primary,
            fontSize: 24,
            fontWeight: 'bold',
        }
    });

    return (
        <View style={styles.main}>
            <Text style={styles.titleText}>Welcome</Text>
            <View style={{ height: 5 }} />
            <Text style={styles.bodyText}>Our Notes App</Text>
        </View>
    );
};

export default SplashScreen;
