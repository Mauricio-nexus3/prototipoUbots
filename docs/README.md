# Redesign: Horário Especial (Logic & Flow)

## Objetivo do Projeto
Simplificar e tornar intuitiva a configuração de datas com horários diferenciados de atendimento. O objetivo é remover a carga cognitiva atual onde o usuário precisa calcular "janelas de indisponibilidade", substituindo por uma definição direta de "quando haverá ou não atendimento".

---

## Lógica de Negócio (Abstração)

### 1. Conceitos Fundamentais
- **Evento Especial**: Uma configuração temporária que substitui a regra de horário padrão de um ou mais times.
- **Hierarquia de Aplicação**: As regras seguem a estrutura organizacional:
    - **Agência (Nível 1)**: Entidade máxima.
    - **Unidade (Nível 2)**: Divisão geográfica ou setorial dentro da agência.
    - **Time (Nível 3)**: Grupo específico de atendimento.
- **Conflitos de Horário**: Quando diferentes times em uma mesma unidade possuem regras distintas para a mesma data, múltiplos "Eventos Especiais" devem ser criados e listados individualmente.

### 2. Estados de um Evento
- **Agendado**: Data futura, aguardando início.
- **Em Execução**: Data atual, regra está sendo aplicada no fluxo de atendimento.
- **Finalizado/Inativo**: A data já passou (limpeza automática da interface).

---

## Fluxo de Criação (Passo a Passo)

O processo será guiado por um assistente de múltiplos passos para garantir que nenhuma informação crítica seja esquecida.

### Passo 1: Identificação
- Definição do nome amigável para a data (ex: "Feriado de Natal").

### Passo 2: Escopo Temporal
- Seleção de abrangência:
    - **Apenas um dia**: Data única.
    - **Período**: Data de início e data de fim.

### Passo 3: Tipo de Expediente
- Escolha fundamental entre:
    - **Sem Expediente**: A unidade estará totalmente fechada.
    - **Com Expediente**: A unidade funcionará em horários específicos.

### Passo 4: Configuração de Horário (Dinâmico)
- **Se "Sem Expediente"**: O sistema assume automaticamente o período das 00:00 às 23:59 como indisponível. Confirmação visual para o usuário.
- **Se "Com Expediente"**: O usuário define o intervalo de atendimento (ex: 08:00 às 16:00). Tudo que estiver fora desse intervalo será tratado como fora de atendimento.

### Passo 5: Alvo (Times)
- Seleção em cascata (Dependência entre campos):
    1. Selecionar Agência.
    2. Selecionar Unidade (filtrado pela Agência).
    3. Selecionar Time (filtrado pela Unidade).

### Passo 6: Comunicação
- Definição da mensagem de texto que será enviada ao cliente quando ele entrar em contato durante este horário especial.

### Passo 7: Ação de Fluxo
- Decisão sobre o que ocorre após a mensagem:
    - **Encerrar**: O protocolo é finalizado.
    - **Seguir Fluxo**: O bot continua para as próximas etapas padrão.

### Passo 8: Revisão
- Exibição de um resumo de todas as escolhas com botão de confirmação final.

---

## Gestão e Visualização

### Visão de Lista
- Exibição clara de todos os eventos ativos e futuros.
- Indicadores de status (Agendado ou Executando).
- Ações rápidas:
    - **Visualizar Times**: Ver quais grupos estão sob essa regra sem precisar abrir a edição.
    - **Editar**: Alterar qualquer parâmetro do evento.
- **Simulação**: Funcionalidade para testar o comportamento do status (forçar mudança de "Agendado" para "Em Execução" para fins de validação do mockup).


