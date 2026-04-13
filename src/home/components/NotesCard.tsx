import {
    StyleSheet,
    Text,
    PanResponder,
    TouchableOpacity,
    Animated,
    View
} from 'react-native'
import React, { useRef } from 'react'
import { Card, IconButton } from 'react-native-paper';


const NotesCard = ({
    title, content, dateTime, onDelete, item
}: {
    item: NotesInterface;
    title?: string;
    content?: string;
    dateTime?: string;
    onDelete: (item: NotesInterface) => void;
}) => {


    const translateX = useRef(new Animated.Value(0)).current;
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dx < 0) {
                    translateX.setValue(gestureState.dx);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dx < -50) {
                    Animated.spring(translateX, {
                        toValue: -100,
                        useNativeDriver: true,
                    }).start();
                } else {
                    Animated.spring(translateX, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    return (
        <View>
            <Animated.View
                style={{
                    flex: 1,
                    transform: [{ translateX: translateX }],
                }}
            >
                <View {...panResponder.panHandlers}>
                    <Card style={styles.card}>
                        <Card.Title title={title} titleStyle={styles.titleStyle} />
                        <Card.Content>
                            <Text style={styles.contentStyle}>{content}</Text>
                        </Card.Content>
                    </Card>
                </View>

               <IconButton
                style={styles.deleteButton}
                icon="delete"
                size={20}
                onPress={() => onDelete(item)}>
              </IconButton>

            </Animated.View>

        </View>


    )
}

export default NotesCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 8,
        elevation: 3,
    },
    titleStyle: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitleStyle: {
        color: 'gray',
        fontSize: 14,
    },
    contentStyle: {
        color: 'black',
        fontSize: 14,
    },
    item: {
        flex: 1,
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    itemContainer: {
        flexDirection: "row",
    },
    deleteButton: {
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: -100,
    },
    deleteButtonText: {
        color: "white",
        fontWeight: "bold",
    },
})