import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function DicePanel({ ultimoDado, setUltimoDado, rolarDado, aplicarModificadorVida, temPersonagemSelecionado }) {
  const [quantidade, setQuantidade] = useState(1);
  const [modificador, setModificador] = useState(0);

  const dadosRpg = [4, 6, 8, 10, 12, 20, 100];

  return (
    <View style={styles.dicePanel}>
      <Text style={styles.panelTitle}>
        <FontAwesome5 name="dice-d20" size={16} color="#FFD700" /> CRITHIT PANEL
      </Text>

      <View style={styles.settingsRow}>
        <View style={styles.controlBox}>
          <Text style={styles.controlLabel}>Qtd.</Text>
          <View style={styles.controlActions}>
            <TouchableOpacity onPress={() => setQuantidade(Math.max(1, quantidade - 1))} style={styles.controlBtn}><Text style={styles.controlBtnText}>-</Text></TouchableOpacity>
            <Text style={styles.controlValue}>{quantidade}</Text>
            <TouchableOpacity onPress={() => setQuantidade(quantidade + 1)} style={styles.controlBtn}><Text style={styles.controlBtnText}>+</Text></TouchableOpacity>
          </View>
        </View>

        <View style={styles.controlBox}>
          <Text style={styles.controlLabel}>Mod (+)</Text>
          <View style={styles.controlActions}>
            <TouchableOpacity onPress={() => setModificador(modificador - 1)} style={styles.controlBtn}><Text style={styles.controlBtnText}>-</Text></TouchableOpacity>
            <Text style={styles.controlValue}>{modificador >= 0 ? `+${modificador}` : modificador}</Text>
            <TouchableOpacity onPress={() => setModificador(modificador + 1)} style={styles.controlBtn}><Text style={styles.controlBtnText}>+</Text></TouchableOpacity>
          </View>
        </View>
      </View>

      {/* GRID DE DADOS */}
      <View style={styles.diceGrid}>
        {dadosRpg.map((lados) => (
          <TouchableOpacity key={lados} style={styles.diceBtn} onPress={() => rolarDado(quantidade, lados, modificador)}>
            <Text style={styles.diceBtnText}>D{lados}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.resultLabel}>Valor Final (Ajuste p/ Resistências):</Text>
        <View style={styles.resultRow}>
          <TouchableOpacity onPress={() => setUltimoDado(Math.floor(ultimoDado / 2))} style={styles.adjustBtn}>
            <Text style={styles.adjustBtnText}>/2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setUltimoDado(Math.max(0, ultimoDado - 1))} style={styles.adjustBtn}>
            <Text style={styles.adjustBtnText}>-1</Text>
          </TouchableOpacity>

          <Text style={styles.resultValue}>{ultimoDado}</Text>

          <TouchableOpacity onPress={() => setUltimoDado(ultimoDado + 1)} style={styles.adjustBtn}>
            <Text style={styles.adjustBtnText}>+1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setUltimoDado(ultimoDado * 2)} style={styles.adjustBtn}>
            <Text style={styles.adjustBtnText}>x2</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actionButtonsRow}>
        <TouchableOpacity style={[styles.actionBtn, styles.btnDano, !temPersonagemSelecionado && styles.btnDisabled]} onPress={() => aplicarModificadorVida('DANO')} disabled={!temPersonagemSelecionado}>
          <FontAwesome5 name="tint" size={14} color="#FFF" style={{ marginBottom: 4 }} />
          <Text style={styles.actionBtnText}>Dano</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtn, styles.btnCura, !temPersonagemSelecionado && styles.btnDisabled]} onPress={() => aplicarModificadorVida('CURA')} disabled={!temPersonagemSelecionado}>
          <FontAwesome5 name="heart" size={14} color="#FFF" style={{ marginBottom: 4 }} />
          <Text style={styles.actionBtnText}>Cura</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dicePanel: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },

  panelTitle: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },

  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  controlBox: {
    backgroundColor: '#2A2A2A',
    padding: 8,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
  },

  controlLabel: {
    color: '#AAA',
    fontSize: 12,
    marginBottom: 4,
    fontWeight: 'bold',
  },

  controlActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  controlBtn: {
    backgroundColor: '#444',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },

  controlBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  controlValue: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 12,
    minWidth: 24,
    textAlign: 'center',
  },

  diceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 12,
  },

  diceBtn: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    margin: 4,
  },

  diceBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },

  resultContainer: {
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#222',
    padding: 8,
    borderRadius: 8,
  },

  resultLabel: {
    color: '#AAA',
    fontSize: 12,
    marginBottom: 8,
  },

  resultRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },

  resultValue: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    minWidth: 50,
    textAlign: 'center',
  },

  adjustBtn: {
    backgroundColor: '#333',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#555',
  },

  adjustBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },

  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  actionBtn: {
    flex: 0.48,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },

  btnDano: {
    backgroundColor: '#B22222',
  },

  btnCura: {
    backgroundColor: '#228B22',
  },

  btnDisabled: {
    backgroundColor: '#444',
    opacity: 0.5,
  },

  actionBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});