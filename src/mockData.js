// src/mockData.js

export const INITIAL_COMBATANTS = [
  {
    id: "1",
    nome: "Aragorn (Guerreiro)",
    pvMax: 50,
    pvAtual: 45,
    envenenado: false,
    caido: false,
  },
  {
    id: "2",
    nome: "Legolas (Arqueiro)",
    pvMax: 35,
    pvAtual: 35,
    envenenado: true, // Já começa envenenado para testarmos o estilo visual
    caido: false,
  },
  {
    id: "3",
    nome: "Orc Chefe",
    pvMax: 60,
    pvAtual: 60,
    envenenado: false,
    caido: false,
  },
  {
    id: "4",
    nome: "Goblin Arqueiro",
    pvMax: 15,
    pvAtual: 0, // Já começa derrotado para testar o feedback visual de morte
    caido: true,
  },
];
