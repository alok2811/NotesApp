import { StyleSheet,View, Modal, Pressable, FlatList } from 'react-native';
import React, {useState, useEffect} from 'react';
import { AnimatedFAB, TextInput, Appbar, Text, HelperText } from 'react-native-paper';
import NotesCard from './components/NotesCard';
import NoData from '../widgets/NoData';

const API_BASE_URL = 'http://11.11.10.45:3000/notes';

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

  useEffect(() => {
    getNotes();
  }, []);

  const hideDialog = () => {
    
    setVisible(false);
    setTitleError('');
    setContentError('');
    setNoteTitle('');
    setNoteContent('');
    setEditingNoteId(null);
  };

  const saveNotes = async () => {

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
      await updateNotes({
        id: editingNoteId,
        title: noteTitle,
        content: noteContent,
        dateTime: Date.now().toString(),
      });
    } else {
      await newNotes({
        id: generateRandomString(11),
        title: noteTitle,
        content: noteContent,
        dateTime: Date.now().toString(),
      });
    }

    hideDialog();
  };

  const getNotes = async () => {
    try {
      const result = await fetch(API_BASE_URL);
      const data: NotesInterface[] = await result.json();
      setNotes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch notes', error);
    }
  };

  const newNotes = async (note: NotesInterface) => {
    try {
      await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
      await getNotes();
    } catch (error) {
      console.error('Failed to create note', error);
    }
  };

  const deleteNotes = async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
      await getNotes();
    } catch (error) {
      console.error('Failed to delete note', error);
    }
  };

  const updateNotes = async (note: NotesInterface) => {
    try {
      await fetch(`${API_BASE_URL}/${note.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
      await getNotes();
    } catch (error) {
      console.error('Failed to update note', error);
    }
  };

  const handleEditItem = (item: NotesInterface) => {
    setEditingNoteId(item.id);
    setNoteTitle(item.title);
    setNoteContent(item.content);
    setVisible(true);
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
          onEdit={handleEditItem}
          onDelete={(item)=>deleteNotes(item.id)} 
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
        <Text>{editingNoteId ? 'Update' : 'Add'}</Text>
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
