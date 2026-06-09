// src/components/CombatantCard.js
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function CombatantCard({
  item,
  isSelected,
  onSelect,
  alternarCondicao,
}) {
  const isDead = item.pvAtual === 0;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && styles.cardSelected,
        isDead && styles.cardDead,
      ]}
      onPress={onSelect}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, isDead && styles.textDead]}>
          {item.nome}
        </Text>
        <Text style={styles.cardHp}>
          {item.pvAtual}/{item.pvMax} PV
        </Text>
      </View>

      <View style={styles.statusContainer}>
        <TouchableOpacity
          style={[
            styles.statusBtn,
            item.envenenado && styles.statusBtnActiveGreen,
          ]}
          onPress={() => alternarCondicao(item.id, "envenenado")}
        >
          <Text style={styles.statusBtnText}>🤢 Envenenado</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.statusBtn, item.caido && styles.statusBtnActiveRed]}
          onPress={() => alternarCondicao(item.id, "caido")}
        >
          <Text style={styles.statusBtnText}>🪵 Caído</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E1E1E",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  cardSelected: {
    borderColor: "#FFD700",
    backgroundColor: "#252525",
  },
  cardDead: {
    opacity: 0.4,
    backgroundColor: "#1A1111",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  textDead: {
    textDecorationLine: "line-through",
  },
  cardHp: {
    color: "#FF6347",
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  statusBtn: {
    backgroundColor: "#333",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusBtnActiveGreen: { backgroundColor: "#006400" },
  statusBtnActiveRed: { backgroundColor: "#8B0000" },
  statusBtnText: {
    color: "#FFF",
    fontSize: 12,
  },
});
