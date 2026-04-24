import { StyleSheet, View, Modal, Pressable, FlatList } from 'react-native';
import React from 'react';
import { AnimatedFAB, TextInput, Appbar, Text, HelperText } from 'react-native-paper';
import { NotesCard } from '../../components/NotesCard';
import { NoData } from '../../components/NoData';
import { useNotesViewModel } from './useNotesViewModel';

/**
 * HomeScreen handles ONLY the drawing of UI.
 * Notice how clean it is because the business logic is in `useNotesViewModel.ts`.
 */
const HomeScreen = () => {
  // Use our custom hook (ViewModel) to separate business logic from the view.
  const {
    notes,
    visible,
    noteTitle,
    noteContent,
    titleError,
    contentError,
    editingNoteId,
    setNoteTitle,
    setNoteContent,
    setTitleError,
    setContentError,
    openAddNoteDialog,
    openEditNoteDialog,
    closeDialog,
    saveNote,
    deleteNote,
  } = useNotesViewModel();

  return (
    <View style={styles.main}>
      <Appbar.Header mode='small'>
        <Appbar.Content title="Notes" />
      </Appbar.Header>

      <FlatList
        style={styles.listStyle}
        data={[...notes].reverse()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotesCard 
            item={item} 
            onEdit={openEditNoteDialog}
            onDelete={() => deleteNote(item.id)} 
          />
        )}
        ListEmptyComponent={<NoData />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Modal for Adding/Editing Notes */}
      <Modal visible={visible} transparent animationType="fade" onRequestClose={closeDialog}>
        <View style={styles.overlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{editingNoteId ? 'Edit Note' : 'Add Note'}</Text>
            
            <TextInput
              mode="outlined"
              onChangeText={(text) => {
                setTitleError('');
                setNoteTitle(text);
              }}
              value={noteTitle}
              label="Note Title"
              placeholder="Type something..."
              onBlur={() => {
                if (!noteTitle.trim()) setTitleError('Title is required');
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
                setNoteContent(text);
              }}
              value={noteContent}
              multiline={true}
              numberOfLines={4}
              style={{ minHeight: 120 }}
              contentStyle={{ textAlignVertical: 'top' }}
              placeholder="Type something..."
              onBlur={() => {
                if (!noteContent.trim()) setContentError('Content is required');
              }}
            />
            <HelperText type="error" visible={contentError.trim().length > 0}>
              {contentError}
            </HelperText>
        
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Pressable style={styles.modalActions} onPress={closeDialog}>
                <Text>Cancel</Text>
              </Pressable>
              <View style={{ width: 10 }} />
              <Pressable style={styles.modalActions} onPress={saveNote}>
                <Text>{editingNoteId ? 'Update' : 'Add'}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <AnimatedFAB
        icon={'plus'}
        label={'Add Note'}
        extended={false}
        onPress={openAddNoteDialog}
        visible={true}
        animateFrom={'right'}
        iconMode={'static'}
        style={styles.fabStyle}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main: { flex: 1 },
  listStyle: { marginTop: 5, paddingRight: 10, paddingLeft: 10 },
  fabStyle: { bottom: 20, right: 20, position: 'absolute' },
  modalTitle: { color: 'black', fontSize: 20, fontWeight: '700', marginBottom: 12 },
  modalActions: { marginTop: 20, alignItems: 'flex-end', marginLeft: 10 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCard: { width: '85%', backgroundColor: '#fff', borderRadius: 20, padding: 20 },
});
