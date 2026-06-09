// App.js
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { INITIAL_COMBATANTS } from "./src/mockData";
import DicePanel from "./src/components/DicePanel";
import CombatantCard from "./src/components/CombatantCard";

export default function App() {
  const [combatentes, setCombatentes] = useState(INITIAL_COMBATANTS);
  const [ultimoDado, setUltimoDado] = useState(0);
  const [idSelecionado, setIdSelecionado] = useState(null);

  const rolarDado = (lados) => {
    setUltimoDado(Math.floor(Math.random() * lados) + 1);
  };

  const aplicarModificadorVida = (tipo) => {
    if (!idSelecionado || ultimoDado === 0) return;

    setCombatentes((prevList) =>
      prevList.map((c) => {
        if (c.id === idSelecionado) {
          let novoPv =
            tipo === "DANO"
              ? Math.max(0, c.pvAtual - ultimoDado)
              : Math.min(c.pvMax, c.pvAtual + ultimoDado);
          return { ...c, pvAtual: novoPv };
        }
        return c;
      }),
    );
  };

  const alternarCondicao = (id, condicao) => {
    setCombatentes((prevList) =>
      prevList.map((c) =>
        c.id === id ? { ...c, [condicao]: !c[condicao] } : c,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <DicePanel
        ultimoDado={ultimoDado}
        rolarDado={rolarDado}
        aplicarModificadorVida={aplicarModificadorVida}
        temPersonagemSelecionado={!!idSelecionado}
      />

      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>⚔️ Ordem de Combate</Text>
        <FlatList
          data={combatentes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CombatantCard
              item={item}
              isSelected={item.id === idSelecionado}
              onSelect={() =>
                setIdSelecionado(item.id === idSelecionado ? null : item.id)
              }
              alternarCondicao={alternarCondicao}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  listContainer: { flex: 1, paddingHorizontal: 16 },
  sectionTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
});
