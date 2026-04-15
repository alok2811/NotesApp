import {
    StyleSheet,
    Text,
    PanResponder,
    Animated,
    View,
    Alert
} from 'react-native'
import React, { useRef } from 'react'
import { Card, IconButton } from 'react-native-paper';


const NotesCard = ({
    title, content, dateTime, onDelete, item, onEdit
}: {
    item: NotesInterface;
    title?: string;
    content?: string;
    dateTime?: string;
    onDelete: (item: NotesInterface) => void;
    onEdit: (item: NotesInterface) => void;
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
                        toValue: -140,
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

    const closeSwipe = () => {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      };
      
      const handleEditPress = () => {
        closeSwipe();
        // Slight delay so card visibly closes before modal opens (optional)
        setTimeout(() => onEdit(item), 120);
      };
      
      const handleDeletePress = () => {
        Alert.alert(
          'Delete Note',
          'Are you sure you want to delete this note?',
          [
            { text: 'Cancel', style: 'cancel', onPress: closeSwipe },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                closeSwipe();
                onDelete(item);
              },
            },
          ],
          { cancelable: true }
        );
      };

    return (
        <View style={styles.wrapper}>
            <View style={styles.actionsContainer}>
                <IconButton
                    style={styles.editButton}
                    icon="pencil"
                    iconColor="white"
                    size={20}
                    onPress={() => onEdit(item)}
                />
                <IconButton
                    style={styles.deleteButton}
                    icon="delete"
                    iconColor="white"
                    size={20}
                    onPress={() => onDelete(item)}
                />
            </View>
            <Animated.View
                style={{
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
            </Animated.View>
        </View>


    )
}

export default NotesCard

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 10,
        marginVertical: 6,
        position: 'relative',
    },
    actionsContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 140,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    card: {
        backgroundColor: 'white',
        padding: 10,
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
    editButton: {
        backgroundColor: '#1976d2',
    },
    deleteButton: {
        backgroundColor: '#d32f2f',
    },
    deleteButtonText: {
        color: "white",
        fontWeight: "bold",
    },
})