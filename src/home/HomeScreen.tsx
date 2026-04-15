import { StyleSheet,View, Modal, Pressable, FlatList } from 'react-native';
import React, {useState} from 'react';
import { AnimatedFAB, TextInput, Appbar, Text, HelperText } from 'react-native-paper';
import NotesCard from './components/NotesCard';
import NoData from '../widgets/NoData';


const HomeScreen = () => {

  const [visible, setVisible] = useState(false);
  const [notes, setNotes] = useState<NotesInterface[]>([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const showDialog = () => {
    setEditingNoteId(null);
    setVisible(true);
  };

  const hideDialog = () => {
    
    setVisible(false);
    setTitleError('');
    setContentError('');
    setNoteTitle('');
    setNoteContent('');
    setEditingNoteId(null);
  };

  const saveNotes = () => {

    if (noteTitle.trim().length <= 0 || noteContent.trim().length <= 0) {
      if (!noteTitle.trim()) {
        setTitleError('Title is required');
      } else {
        setTitleError('');
      }

      if (!noteContent.trim()) {
        setContentError('Content is required');
      } else {
        setContentError('');
      }
      return;
    }

    if (editingNoteId) {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editingNoteId
            ? { ...note, title: noteTitle, content: noteContent }
            : note
        )
      );
    } else {
      const newNote: NotesInterface = {
        id: generateRandomString(11),
        title: noteTitle,
        content: noteContent,
        dateTime: Date.now().toString(),
      };
      setNotes((prevNotes) => [...prevNotes, newNote]);
    }

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

  const handelEditItem = (item: NotesInterface) => {
    setEditingNoteId(item.id);
    setNoteTitle(item.title);
    setNoteContent(item.content);
    setVisible(true);
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
          
          <NotesCard 
          item={item} 
          onEdit={handelEditItem}
          onDelete={handleDeleteItem} 
          title={item.title} 
          content={item.content} 
          dateTime={item.dateTime} />
        )}
       ListEmptyComponent={<NoData />}
       showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
         />

    <Modal
  visible={visible}
  transparent
  animationType="fade"
  onRequestClose={hideDialog}
>
  <View style={styles.overlay}>
    <View style={styles.modalCard}>
      <Text style={styles.modalTitle}>{editingNoteId ? 'Edit Note' : 'Add Note'}</Text>
       <TextInput
      mode="outlined"
      onChangeText={(text) => {
        setTitleError('');
        setNoteTitle(text)}}
      value={noteTitle}
      label="Note Title"
      placeholder="Type something..."
      onBlur={() => {
        if (!noteTitle.trim()) {
          setTitleError('Title is required');
        } else {
          setTitleError('');
        }
      }}
    
    />
     <HelperText type="error" visible={titleError.trim().length > 0}>
     {titleError}
      </HelperText>
  
     <TextInput
      mode="outlined"
      label="Note Content"
      onChangeText={(text) => {
        setContentError('');
        setNoteContent(text)}}
      value={noteContent}
      multiline={true}
      numberOfLines={4}
       style={{ minHeight: 120 }}
      contentStyle={{ textAlignVertical: 'top' }}
      placeholder="Type something..."
      onBlur={() => {
        if (!noteContent.trim()) {
          setContentError('Content is required');
        } else {
          setContentError('');
        }
      }}
  
    />
    <HelperText type="error" visible={contentError.trim().length > 0}>
    {contentError}
      </HelperText>
 
<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Pressable style={styles.modalActions} onPress={() => hideDialog()}>
        <Text>Cancel</Text>
      </Pressable>
      <View style={{ width: 10 }} />
      <Pressable style={styles.modalActions} onPress={saveNotes}>
        <Text>{editingNoteId ? 'Update' : 'Save'}</Text>
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
