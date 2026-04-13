import { StyleSheet,View, Modal, Pressable, FlatList } from 'react-native';
import React, {useState} from 'react';
import { AnimatedFAB, TextInput, Appbar, Text } from 'react-native-paper';
import NotesCard from './components/NotesCard';
import NoData from '../widgets/NoData';
import Swipeable from 'react-native-gesture-handler/Swipeable';


const HomeScreen = () => {

  const [visible, setVisible] = useState(false);
  const [notes, setNotes] = useState<NotesInterface[]>([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const saveNotes = (newNote: NotesInterface) => {
    notes.push(newNote);
    setNotes(notes);
    setNoteTitle('');
    setNoteContent('');
    hideDialog();
  };

  function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }

  return result;
}

const handleDeleteItem = (item: NotesInterface) => {
    const updatedData = notes.filter((note) => note.id !== item.id);
    setNotes(updatedData);
  };

  return (
    <View style={styles.main}>
      <Appbar.Header mode='small'>
        <Appbar.Content title="Notes" />
      </Appbar.Header>
      <FlatList
      style={{ marginTop: 5, paddingRight: 10, paddingLeft: 10}}
        data={[...notes].reverse()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          
          <NotesCard item={item} onDelete={handleDeleteItem} title={item.title} content={item.content} dateTime={item.dateTime} />
        )}
       ListEmptyComponent={<NoData />}
       showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
         />

    <Modal
  visible={visible}
  transparent
  animationType="fade"
  onRequestClose={() => setVisible(false)}
>
  <View style={styles.overlay}>
    <View style={styles.modalCard}>
      <Text style={styles.modalTitle}>Add Note</Text>
       <TextInput
      mode="outlined"
      onChangeText={text => setNoteTitle(text)}
      value={noteTitle}
      label="Note Title"
      placeholder="Type something..."
    />
    <View style={{ height: 10 }} />
     <TextInput
      mode="outlined"
      label="Note Content"
      onChangeText={text => setNoteContent(text)}
      value={noteContent}
      multiline={true}
      numberOfLines={4}
       style={{ minHeight: 120 }}
  contentStyle={{ textAlignVertical: 'top' }}
      placeholder="Type something..."
    />
    <View style={{ height: 10 }} />
<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

      
      <Pressable style={styles.modalActions} onPress={() => hideDialog()}>
        <Text>Cancel</Text>
      </Pressable>
      <View style={{ width: 10 }} />
      <Pressable style={styles.modalActions} onPress={() => saveNotes({ id:  generateRandomString(11), title: noteTitle, content: noteContent, dateTime: Date.now().toString() } )}>
        <Text>Save</Text>
      </Pressable>
</View>
      
    </View>
  </View>
</Modal>

       
      <AnimatedFAB
        icon={'plus'}
        label={'Label'}
        extended={false}
        onPress={showDialog}
        visible={true}
        animateFrom={'right'}
        iconMode={'static'}
        style={[styles.fabStyle]}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  titleText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  fabStyle: {
    bottom: 20,
    right: 20,
    position: 'absolute',
  },
  modalTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  modalDescription: {
    color: '#444',
    fontSize: 16,
  },
  modalActions: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
});
