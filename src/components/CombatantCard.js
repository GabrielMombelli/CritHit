import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function CombatantCard({item, isSelected, onSelect, alternarCondicao, onDelete, isTurno, onMoveUp, onMoveDown, isFirst, isLast}) {
  const isDead = item.pvAtual === 0;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.orderControls}>
        <TouchableOpacity onPress={onMoveUp} disabled={isFirst} style={[styles.orderBtn, isFirst && styles.disabledBtn]}>
          <FontAwesome5 name="chevron-up" size={14} color={isFirst ? "#444" : "#AAA"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onMoveDown} disabled={isLast} style={[styles.orderBtn, isLast && styles.disabledBtn]}>
          <FontAwesome5 name="chevron-down" size={14} color={isLast ? "#444" : "#AAA"} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[
          styles.card, 
          isTurno && styles.cardTurno,       
          isSelected && styles.cardSelected, 
          isDead && styles.cardDead          
        ]}
        onPress={onSelect}
      >
        <View style={styles.cardHeader}>
          <View style={styles.titleRow}>
            {isTurno && <FontAwesome5 name="play" size={12} color="#00FF7F" style={{marginRight: 8}} />}
            <Text style={[styles.cardTitle, isDead && styles.textDead, isTurno && !isSelected && styles.textTurno]}>
              {item.nome}
            </Text>
          </View>
          
          <View style={styles.hpRow}>
            <Text style={styles.cardHp}>{item.pvAtual}/{item.pvMax} PV</Text>
            <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteBtn}>
              <FontAwesome5 name="trash" size={14} color="#FF6347" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statusContainer}>
          <TouchableOpacity 
            style={[styles.statusBtn, item.envenenado && styles.statusBtnActiveGreen]}
            onPress={() => alternarCondicao(item.id, 'envenenado')}
          >
            <FontAwesome5 name="skull-crossbones" size={12} color="#FFF" style={{marginRight: 4}} />
            <Text style={styles.statusBtnText}>Veneno</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.statusBtn, item.caido && styles.statusBtnActiveRed]}
            onPress={() => alternarCondicao(item.id, 'caido')}
          >
            <FontAwesome5 name="arrow-down" size={12} color="#FFF" style={{marginRight: 4}} />
            <Text style={styles.statusBtnText}>Caído</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  orderControls: {
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },

  orderBtn: {
    padding: 4,
    backgroundColor: '#1E1E1E',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#333',
  },

  disabledBtn: {
    opacity: 0.3,
  },

  card: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2A2A2A',
  },

  cardSelected: {
    borderColor: '#FFD700',
    backgroundColor: '#252525',
  },

  cardDead: {
    opacity: 0.5,
    backgroundColor: '#1A1111',
  },

  cardTurno: {
    borderColor: '#00FF7F',
    backgroundColor: '#182E1E',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  titleRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  textDead: {
    textDecorationLine: 'line-through',
    color: '#888',
  },

  textTurno: {
    color: '#00FF7F',
  },

  hpRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardHp: {
    color: '#FF6347',
    fontWeight: 'bold',
    marginRight: 12,
  },

  deleteBtn: {
    padding: 4,
  },

  statusContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },

  statusBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
  },

  statusBtnActiveGreen: {
    backgroundColor: '#006400',
  },

  statusBtnActiveRed: {
    backgroundColor: '#8B0000',
  },

  statusBtnText: {
    color: '#FFF',
    fontSize: 12,
  },
});