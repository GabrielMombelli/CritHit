// src/components/DicePanel.js
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function DicePanel({
  ultimoDado,
  rolarDado,
  aplicarModificadorVida,
  temPersonagemSelecionado,
}) {
  return (
    <View style={styles.dicePanel}>
      <Text style={styles.panelTitle}>🎲 CRITHIT DICE PANEL</Text>

      <View style={styles.diceButtonsRow}>
        <TouchableOpacity style={styles.diceBtn} onPress={() => rolarDado(6)}>
          <Text style={styles.diceBtnText}>D6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.diceBtn} onPress={() => rolarDado(20)}>
          <Text style={styles.diceBtnText}>D20</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.resultRow}>
        <Text style={styles.resultLabel}>Resultado:</Text>
        <Text style={styles.resultValue}>{ultimoDado}</Text>
      </View>

      <View style={styles.actionButtonsRow}>
        <TouchableOpacity
          style={[
            styles.actionBtn,
            styles.btnDano,
            !temPersonagemSelecionado && styles.btnDisabled,
          ]}
          onPress={() => aplicarModificadorVida("DANO")}
          disabled={!temPersonagemSelecionado}
        >
          <Text style={styles.actionBtnText}>💥 Aplicar Dano</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionBtn,
            styles.btnCura,
            !temPersonagemSelecionado && styles.btnDisabled,
          ]}
          onPress={() => aplicarModificadorVida("CURA")}
          disabled={!temPersonagemSelecionado}
        >
          <Text style={styles.actionBtnText}>❤️ Aplicar Cura</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dicePanel: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  panelTitle: {
    color: "#FFD700",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  diceButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  diceBtn: {
    backgroundColor: "#8A2BE2",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  diceBtnText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  resultLabel: {
    color: "#AAA",
    fontSize: 16,
  },
  resultValue: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 8,
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  actionBtn: {
    flex: 0.48,
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  btnDano: { backgroundColor: "#B22222" },
  btnCura: { backgroundColor: "#228B22" },
  btnDisabled: { backgroundColor: "#444", opacity: 0.5 },
  actionBtnText: { color: "#FFF", fontWeight: "bold" },
});
