// src/components/DicePanel.js
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function DicePanel({
  ultimoDado,
  rolarDado,
  aplicarModificadorVida,
  temPersonagemSelecionado,
}) {
  // Estado local para controlar quantos dados rolar
  const [quantidade, setQuantidade] = useState(1);

  // Array com todos os dados clássicos de RPG
  const dadosRpg = [4, 6, 8, 10, 12, 20, 100];

  return (
    <View style={styles.dicePanel}>
      <Text style={styles.panelTitle}>🎲 CRITHIT DICE PANEL</Text>

      {/* SELETOR DE QUANTIDADE */}
      <View style={styles.qtdContainer}>
        <TouchableOpacity
          style={styles.qtdBtn}
          onPress={() => setQuantidade(Math.max(1, quantidade - 1))}
        >
          <Text style={styles.qtdBtnText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.qtdText}>{quantidade} DADO(S)</Text>

        <TouchableOpacity
          style={styles.qtdBtn}
          onPress={() => setQuantidade(quantidade + 1)}
        >
          <Text style={styles.qtdBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* GRID DE DADOS */}
      <View style={styles.diceGrid}>
        {dadosRpg.map((lados) => (
          <TouchableOpacity
            key={lados}
            style={styles.diceBtn}
            onPress={() => rolarDado(quantidade, lados)}
          >
            <Text style={styles.diceBtnText}>D{lados}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* RESULTADO */}
      <View style={styles.resultRow}>
        <Text style={styles.resultLabel}>Resultado:</Text>
        <Text style={styles.resultValue}>{ultimoDado}</Text>
      </View>

      {/* BOTÕES DE APLICAÇÃO */}
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

  // Estilos da Quantidade
  qtdContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    padding: 4,
  },
  qtdBtn: {
    backgroundColor: "#444",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  qtdBtnText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  qtdText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 20,
  },

  // Estilos do Grid de Dados
  diceGrid: {
    flexDirection: "row",
    flexWrap: "wrap", // Faz os botões pularem de linha automaticamente
    justifyContent: "center",
    gap: 8, // Espaçamento entre os itens (requer React Native recente, caso quebre, use margin)
    marginBottom: 12,
  },
  diceBtn: {
    backgroundColor: "#8A2BE2",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    margin: 4,
  },
  diceBtnText: { color: "#FFF", fontWeight: "bold", fontSize: 14 },

  resultRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  resultLabel: { color: "#AAA", fontSize: 16 },
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
  actionBtn: { flex: 0.48, padding: 12, borderRadius: 6, alignItems: "center" },
  btnDano: { backgroundColor: "#B22222" },
  btnCura: { backgroundColor: "#228B22" },
  btnDisabled: { backgroundColor: "#444", opacity: 0.5 },
  actionBtnText: { color: "#FFF", fontWeight: "bold" },
});
