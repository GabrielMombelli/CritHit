import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, StatusBar, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import DicePanel from './src/components/DicePanel';
import CombatantCard from './src/components/CombatantCard';
import AddCharacter from './src/components/AddCharacter';

export default function App() {
  const [combatentes, setCombatentes] = useState([]);
  const [ultimoDado, setUltimoDado] = useState(0);
  const [idSelecionado, setIdSelecionado] = useState(null);

  const [idTurnoAtual, setIdTurnoAtual] = useState(null);

  const rolarDado = (quantidade, lados, modificador) => {
    let soma = 0;
    for (let i = 0; i < quantidade; i++) {
      soma += Math.floor(Math.random() * lados) + 1;
    }
    setUltimoDado(soma + modificador);
  };

  const aplicarModificadorVida = (tipo) => {
    if (!idSelecionado || ultimoDado === 0) return;
    setCombatentes(prevList =>
      prevList.map(c => {
        if (c.id === idSelecionado) {
          let novoPv = tipo === 'DANO'
            ? Math.max(0, c.pvAtual - ultimoDado)
            : Math.min(c.pvMax, c.pvAtual + ultimoDado);
          return { ...c, pvAtual: novoPv };
        }
        return c;
      })
    );
  };

  const alternarCondicao = (id, condicao) => {
    setCombatentes(prevList => prevList.map(c => (c.id === id ? { ...c, [condicao]: !c[condicao] } : c)));
  };

  const adicionarPersonagem = (nome, pvMax) => {
    const novoId = Date.now().toString();
    const novoCombatente = {
      id: novoId,
      nome: nome,
      pvMax: parseInt(pvMax),
      pvAtual: parseInt(pvMax),
      envenenado: false,
      caido: false
    };
    setCombatentes(prevList => {
      const novaLista = [...prevList, novoCombatente];
      if (novaLista.length === 1) setIdTurnoAtual(novoId);
      return novaLista;
    });
  };

  const removerPersonagem = (id) => {
    setCombatentes(prevList => {
      const indexRemovido = prevList.findIndex(c => c.id === id);
      const novaLista = prevList.filter(c => c.id !== id);

      if (id === idTurnoAtual) {
        if (novaLista.length === 0) {
          setIdTurnoAtual(null);
        } else {
          const proximoIndex = indexRemovido >= novaLista.length ? 0 : indexRemovido;
          setIdTurnoAtual(novaLista[proximoIndex].id);
        }
      }
      return novaLista;
    });
    if (idSelecionado === id) setIdSelecionado(null);
  };

  const proximoTurno = () => {
    if (combatentes.length <= 1) return;
    const indexAtual = combatentes.findIndex(c => c.id === idTurnoAtual);
    const proximoIndex = indexAtual + 1 >= combatentes.length ? 0 : indexAtual + 1;
    setIdTurnoAtual(combatentes[proximoIndex].id);
  };

  const moverPersonagem = (index, direcao) => {
    setCombatentes(prevList => {
      const novaLista = [...prevList];
      const temp = novaLista[index];
      novaLista[index] = novaLista[index + direcao];
      novaLista[index + direcao] = temp;
      return novaLista;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>

        <DicePanel
          ultimoDado={ultimoDado}
          setUltimoDado={setUltimoDado}
          rolarDado={rolarDado}
          aplicarModificadorVida={aplicarModificadorVida}
          temPersonagemSelecionado={!!idSelecionado}
        />

        <View style={styles.listContainer}>
          <View style={styles.turnHeader}>
            <Text style={styles.sectionTitle}>⚔️ Ordem de Combate</Text>

            <TouchableOpacity
              style={[styles.btnTurno, combatentes.length === 0 && styles.btnTurnoDisabled]}
              onPress={proximoTurno}
              disabled={combatentes.length === 0}
            >
              <Text style={styles.btnTurnoText}>Avançar Turno</Text>
              <FontAwesome5 name="forward" size={12} color="#121212" />
            </TouchableOpacity>
          </View>

          <AddCharacter onAdd={adicionarPersonagem} />

          <FlatList
            data={combatentes}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <CombatantCard
                item={item}
                index={index}
                isFirst={index === 0}
                isLast={index === combatentes.length - 1}
                isSelected={item.id === idSelecionado}
                isTurno={item.id === idTurnoAtual}
                onSelect={() => setIdSelecionado(item.id === idSelecionado ? null : item.id)}
                alternarCondicao={alternarCondicao}
                onDelete={removerPersonagem}
                onMoveUp={() => moverPersonagem(index, -1)}
                onMoveDown={() => moverPersonagem(index, 1)}
              />
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={<Text style={styles.emptyText}>Nenhum combatente. Adicione heróis e monstros acima para começar.</Text>}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
  },

  listContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 420,
    paddingHorizontal: 14,
    paddingBottom: 12,
  },

  turnHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  btnTurno: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00FF7F',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    gap: 6,
  },

  btnTurnoDisabled: {
    backgroundColor: '#444',
  },

  btnTurnoText: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 14,
  },

  emptyText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});