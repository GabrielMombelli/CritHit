import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function AddCharacter({ onAdd }) {
  const [nome, setNome] = useState('');
  const [pv, setPv] = useState('');

  const handleAdd = () => {
    if (nome.trim() && pv.trim()) {
      onAdd(nome, pv);
      setNome('');
      setPv('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={[styles.input, styles.inputNome]} 
        placeholder="Nome do Herói/Monstro" 
        placeholderTextColor="#666"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput 
        style={[styles.input, styles.inputPv]} 
        placeholder="PV Max" 
        placeholderTextColor="#666"
        keyboardType="numeric"
        value={pv}
        onChangeText={setPv}
      />
      <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
        <FontAwesome5 name="plus" size={16} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#FFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  inputNome: { flex: 2, minWidth: 0, marginRight: 8, marginBottom: 8 },
  inputPv: { flex: 1, minWidth: 80, textAlign: 'center', marginRight: 8, marginBottom: 8 },
  addBtn: {
    width: 50,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
  }
});