# CritHit - Assistente de Combate para RPG

O **CritHit** é um aplicativo mobile desenvolvido em **React Native** focado na automação e agilização de combates em sessões de RPG de Mesa (como D&D, Tormenta20, Ordem Paranormal, etc.). Projetado para ser uma ferramenta de alta utilidade para Mestres, o app unifica um rolador de dados inteligente a um gerenciador de status, turnos e pontos de vida em tempo real.

O projeto foi construído sob uma arquitetura de tela única (**Single Page**) orientada a eventos, priorizando a performance e a usabilidade imediata.

## Funcionalidades Principais

### Gerenciador de Iniciativa e Turnos

Adicione heróis e monstros dinamicamente. Reordene a lista de combate com facilidade e avance os turnos com um clique. O personagem do turno atual recebe destaque visual automático.

### Rolador de Dados Completo

Suporte a todos os dados clássicos (**D4, D6, D8, D10, D12, D20, D100**). Inclui seletores de quantidade de dados e soma automática de modificadores.

### Aplicação de Dano/Cura Inteligente

Selecione um alvo na lista e aplique o resultado do dado diretamente aos Pontos de Vida (PV) dele. O app impede que a vida fique negativa ou ultrapasse o limite máximo.

### Calculadora de Resistência e Vulnerabilidade

Controles rápidos na área do dado permitem dividir por 2, multiplicar por 2, somar ou subtrair o valor final da rolagem antes de aplicar o dano, ideal para lidar com resistências de monstros.

### Condições e Status

Aplique regras básicas de combate através de estados visuais rápidos (Veneno, Caído). O app reage alterando a interface do card imediatamente.

## Tecnologias Utilizadas

* React Native (Framework principal)
* Expo (Workflow e Build)
* React Hooks (`useState`, manipuladores de imutabilidade de arrays)
* Expo Vector Icons (`FontAwesome5` para iconografia imersiva)

## Arquitetura do Projeto

A estrutura foi desenhada visando a componentização e a separação de responsabilidades:

```plaintext
crit-hit/
├── App.js                     # Cérebro: Estado global, Lógica de Turnos e Matemática
├── src/
│   ├── components/
│   │   ├── AddCharacter.js    # Formulário de entrada de novos combatentes
│   │   ├── CombatantCard.js   # UI individual, status e controles de ordem na lista
│   │   └── DicePanel.js       # Motor de rolagem, multiplicadores e aplicação de cura/dano
└── README.md
```

## Como Rodar o Projeto Localmente

### 1. Clone este repositório

```bash
git clone https://github.com/GabrielMombelli/CritHit.git
```

### 2. Acesse a pasta do projeto

```bash
cd CritHit
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Instale o pacote de ícones do Expo (caso necessário)

```bash
npx expo install @expo/vector-icons
```

### 5. Inicie o servidor de desenvolvimento

```bash
npx expo start -c
```

### 6. Execute o aplicativo

Escaneie o QR Code com o app **Expo Go** no seu celular ou rode em um emulador Android.

## Autor

**Desenvolvido por Gabriel Henrique Mombelli**
