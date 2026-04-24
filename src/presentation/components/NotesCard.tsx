import { StyleSheet, Text, PanResponder, Animated, View, Alert } from 'react-native';
import React, { useRef } from 'react';
import { Card, IconButton } from 'react-native-paper';
import { NoteEntity } from '../../domain/entities/NoteEntity';

/**
 * NotesCard Component handles the presentation of a single note.
 * Includes a swipe-to-edit-and-delete functionality.
 */
export const NotesCard = ({
    item,
    onDelete,
    onEdit
}: {
    item: NoteEntity;
    onDelete: (item: NoteEntity) => void;
    onEdit: (item: NoteEntity) => void;
}) => {
    const translateX = useRef(new Animated.Value(0)).current;
    
    // Pan Responder handles the swipe gesture for the item
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
                    onPress={handleDeletePress}
                />
            </View>
            <Animated.View
                style={{
                    transform: [{ translateX: translateX }],
                }}
            >
                <View {...panResponder.panHandlers}>
                    <Card style={styles.card}>
                        <Card.Title title={item.title} titleStyle={styles.titleStyle} />
                        <Card.Content>
                            <Text style={styles.contentStyle}>{item.content}</Text>
                        </Card.Content>
                    </Card>
                </View>
            </Animated.View>
        </View>
    );
};

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
    contentStyle: {
        color: 'black',
        fontSize: 14,
    },
    editButton: {
        backgroundColor: '#1976d2',
    },
    deleteButton: {
        backgroundColor: '#d32f2f',
    },
});
