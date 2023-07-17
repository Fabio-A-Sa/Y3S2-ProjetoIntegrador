# Reuniões

## Índice

- [Reunião 2023/02/10](#20230210) - Apresentação do Projeto
- [Reunião 2023/02/16](#20230216) - Introdução ao hardware a utilizar
- [Reunião 2023/02/23](#20230223) - Reunião com a Secretaria para levantamento e ajuste de requisitos
- [Reunião 2023/03/02](#20230302) - Funcionamento do InfluxDB e do Mosquitto para trasmissão e rececão de dados
- [Reunião 2023/03/16](#20230316) - Demonstração inicial do sistema
- [Reunião 2023/03/23](#20230323) - Primeiros dados
- [Reunião 2023/04/27](#20230427) - 

## 2023/02/10

Ao dia dez de fevereiro de dois mil e vinte e três, pelas nove horas e trinta minutos, em regime síncrono online, reuniram-se os elementos do grupo PE51, sob a presença do Professor João Cardoso e João Pedro Dias, a fim de dar cumprimento à seguinte ordem de trabalhos:

- Apresentação pessoal dos intervenientes;
- Apresentação pelo proponente dos objetivos e plano de trabalho propostos;
- Elicitação dos requisitos principais;
- Descrição dos recursos necessários (software e hardware);
- Definição dos mecanismos de comunicação síncrona e assíncrona e partilha de informação ao longo do semestre;

Espera-se que o projeto forneça um sistema completo, escalável e não intrusivo para identificar os postos de atendimento disponíveis e sinalizar possíveis vagas de atendimento do DEI. Cada sensor de proximidade, um por cada posto, terá um microcontrolador para captação dos dados. Um módulo central receberá informação dos módulos individuais, processará os dados e publicará numa página web os postos de atendimento vagos. Essa informação será visualizada num ecrã na vitrina e visível no exterior da secretaria. 

Cada módulo individual poderá ainda ser controlado pela pessoa do respectivo posto de atendimento, de forma a que esta possa sinalizar que não está disponível para atendimento mesmo estando presente.

Após o grupo estar familiarizado com as ferramentas e código desenvolvido no ano anterior, esperam-se os seguintes melhoramentos:
- O sistema deverá ser sensível a horários, como período de almoço, período laboral de atendimento e dias da semana;
- O sistema deverá exportar os dados coletados para uma base de dados como InfluxDB por motivos temporais e estatísticos. Por exemplo, entender os horários e dias de maior fluxo de atendimentos será importante para uma melhor gestão dos recursos do DEI;
- Documentação do sistema desenvolvido;
- Cobertura do sistema com testes unitários;

Uma reunião com os membros da secretaria do DEI a efetuar em breve será relevante para levantar novos requisitos e, se necessário, reestruturar os já existentes. 

## 2023/02/16

Ao dia dezasseis de fevereiro de dois mil e vinte e três, pelas catorze horas, na sala I122 - Laboratório de Engenharia de Software, reuniram-se os elementos do grupo PE51, sob a presença do Professor João Pedro Dias, a fim de dar cumprimento à seguinte ordem de trabalhos:

- Descrição e familiarização do hardware a utilizar;
- Principais interações entre o software e hardware no contexto do Projeto;

O sensor a utilizar em cada posto de trabalho é o [Whadda WPSE306N](https://mauser.pt/catalog/product_info.php?cPath=1667_2669_2677&products_id=096-4651). É um sensor ultrassónico compatível com Arduíno que mede distâncias compreendidas entre 2 e 400 centímetros com uma precisão aproximada de 0.3 centímetros.

Juntamente com o sensor temos o controlador [ESP32 M5Stack ATOM-Lite](https://mauser.pt/catalog/product_info.php?cPath=1667_2804_2865&products_id=096-8571). São ligados entre si através de cabos [Jumper Dupont](https://mauser.pt/catalog/product_info.php?cPath=1874_56_2732_2787&products_id=096-7938).
Apesar do controlador possuir um botão integrado, este será ligado posteriormente a um [botão externo](https://mauser.pt/catalog/product_info.php?products_id=010-0243) para uma melhor preservação dos seus circuitos internos.

O conjunto acima descrito pode ser testado recorrendo ao [código](https://github.com/Esdeath-Shogun/DEI-Interface) disponível do ano anterior e, por exemplo, à extensão PlatformIO do VSCode com os plugins descritos no ficheiro `platformio.ini`. <br>
Antes de avançar com o tratamento dos dados e ligação do sistema à rede, é importante refatorar e documentar o código existente, bem como realização de testes unitários.

Ainda nesse dia enviamos um email à Secretaria do DEI para que possamos realizar mais brevemente possível uma curta reunião acerca do projeto e dos problemas que este pretende mitigar.

## 2023/02/23

Ao dia vinte e três de fevereiro de dois mil e vinte e três, pelas quinze horas, na sala I012 - Secretaria do Departamento de Engenharia Informática, reuniram-se os elementos do grupo PE51, sob a presença de todos os membros da secretaria do DEI, a fim de dar cumprimento à seguinte ordem de trabalhos:

- Apresentação do projeto, dos seus objetivos e dos problemas que este pretende mitigar;
- Levantamento de novos requisitos e reestruturação dos já existentes;

A maior preocupação demonstrada foi com a disposição dos sensores. Há uma série de fatores a ter em conta:
- distância mínima e máxima à pessoa a ser atendida. Estes limites variam bastante porque em situações de atendimento mais rápidas as pessoas não costumam sentar;
- o ângulo de abertura do sensor, se for muito pequeno só irá funcionar se a pessoa estiver de frente;
- se o sensor for colocado demasiado próximo do tampo da mesa os objetos normais do espaço, como por exemplo a cadeira, irão interferir na leitura;

Os requisitos acordados são os que se encontram em [Requirements](Requirements.md).

## 2023/03/02

Ao dia dois de março de dois mil e vinte e três, pelas catorze horas na sala I122 - Laboratório de Engenharia de Software, reuniram-se os elementos do grupo PE51, sob a presença do Professor João Pedro Dias, a fim de dar cumprimento à seguinte ordem de trabalhos:

- Discussão acerca dos requisitos acordados com a secretaria do DEI;
- Funcionamento do Mosquitto e InfluxDB para trasmissão e rececão de dados;

Para que o sistema fique num estado consistente, o sensor em cada posto de trabalho deve estar direcionado para a maioria dos atendimentos, ou seja, num ângulo e altura adequados para que detete a presença de uma pessoa sentada ou a pé. As restrições do horário de funcionamento (período de almoço e laboral) permitirão que o sistema volte ao estado inicial e assim recuperar de qualquer falha que possa ter ocorrido.

A reunião serviu essencialmente para o apoio tecnológico necessário para a captação dos dados enviados pelos microcontroladores e respetivos sensores. Entendemos as boas práticas para lidar com a informação disponibilizada de cada um e como modular toda a infraestrutura para que seja facilmente manipulável: tanto na parte hardware como em software. 

Caso o microcontrolador só envie informações quando mudar de estado, o tempo entre duas mudanças pode ser elevado. Nesse caso é recomendado enviar de forma frequente alguma *flag* que indique o estado do dispositivo para detectar erros de hardware ou falhas na comunicação. <br>
Ainda nesse dia conseguimos colocar a Base de Dados InfluxDB a captar dados de um sensor.

## 2023/03/16

Ao dia dezasseis de março de dois mil e vinte e três, pelas catorze horas na sala I122 - Laboratório de Engenharia de Software, reuniram-se os elementos do grupo PE51, sob a presença do Professor João Pedro Dias e Professor João Cardoso, a fim de demonstrar o projeto desenvolvido até ao momento. 

Da reunião resultaram as seguintes melhorias:

#### 1. Envio de dados

Atualmente cada sensor envia dois tipos de dados: 
- o seu estado atual, para deteção imediata do novo estado assim que as condições do posto de atendimento mudem;
- a telemetria, a cada cinco segundos, para verificar a integridade da comunicação;

Por motivos de controlo da configuração, a telemetria passará a mandar a distância lida em cada segundo. Com isso é possível inferir se os limites impostos no sistema e ângulo estão adequados, ao mesmo tempo que continuará a servir de indicador da qualidade da comunicação.

#### 2. Interface

A interface deverá:

- ser visualmente mais apelativa e representativa da composição real da Secretaria do DEI;
- ter uma legenda dos estados, para melhor compreensão por parte dos utilizadores;
- usar uma fonte de texto maior;
- estar disponível tanto em Português como em Inglês ou, preferencialmente, só em Inglês;
- ter em cada posto de trabalho o nome da pessoa responsável;
- ser sensível ao horário. Fora dos horários normais de funcionamento os dados coletados dos sensores deixarão de interferir no sistema e um quarto estado será acionado em todos os postos de trabalho para indicar indisponibilidade total;

Uma vez que o sistema não terá acesso à internet, o horário do mostrador no canto inferior direito será configurado manualmente.

Uma interface interna em modo administrador também está a ser desenvolvida. Com ela será possível:

- Ajustar da composição visual da sala;
- Adicionar, mover e remover postos de trabalho;
- Personalizar a ligação entre cada sensor e o posto de trabalho que controla;
- Modificar legendas e nome da pessoa responsável por cada área;
- Personalizar os horários de atendimento;
- Guardar as alterações em formato JSON;

#### 3. Recuperação de erros

Em testes realizados durante a semana duas situações foram detetadas:

- Cada sensor só começa a enviar o seu estado após detetar uma mudança que corresponda a um dos três estados programados. Isto tem implicações: o *frontend* inicialmente só mostra um estado válido após o primeiro atendimento, por exemplo. Para contornar o problema cada sensor deverá enviar logo após estabelecida a comunicação um estado pré-definido.

- Após algum tempo o sensor pode perder a conexão ao router. Nesse caso não volta a tentar conectar-se, tendo de ser desligado e ligado para tentar uma nova conexão. Ideamente passará a suportar numa periodicidade constante de um minuto tentativas de conexão para reverter esse estado.  

As restrições do horário de funcionamento (período de almoço e laboral) permitirão que o sistema volte ao estado inicial e assim recuperar de qualquer falha que possa ter ocorrido.

#### 4. Ajustes

De modo a termos uma perspectiva realista do funcionamento do sistema, o próximo passo será colocar um dos sensores no local final para captar dados. Para além de termos dados derivados da leitura do dispositivo precisamos de dados reais, facultados pela pessoa encarregue do posto de trabalho, para podermos avaliar a coerência e eficácia do produto desenvolvido. <br>
Esses dados reais podiam ser coletados a partir do próprio microcontrolador mas essa estratégia tinha implicações menos favoráveis, nomeadamente:

- uma mudança da máquina de estados interna;
- um botão externo conectado ao microcontrolador. O botão que já vem incluído é pouco sensível e nada garante que uma exposição prolongada não traga influências negativas ao próprio funcionamento do circuito;
- em nenhum momento há noção do tipo de atendimento realizado, nem se a pessoa foi atendida a pé ou sentada;

Assim optámos por uma estratégia igualmente simples mas que contorna todos os tópicos anteriores: uma folha Excel. Nela terá suporte a:

- Atribuição automática de um *timestamp* a cada atendimento;
- Descrição do tipo de atendimento: CINF, MCI, PRODEI, ...
- Descrição de como o atendimento foi realizado: a pé ou sentado;

De igual forma a caixa de suporte ao sensor e microcontrolador terá de ser impressa em tempo útil. A ideia será imprimir só uma e deixá-la em utilização por algum tempo. Depois criamos um inquérito sobre os aspectos a melhorar, sob o ponto de vista funcional e estético. Assim a versão final será a mais adequada possível.

Em princípio na semana seguinte será possível colocar um sensor num posto de trabalho da secretaria do DEI. A recolha e análise destes dados permitirá afinar todas as definições internas, saber onde o sistema falha e como falha.

## 2023/03/23

Ao dia vinte e três de março de dois mil e vinte e três, pelas catorze horas na secretaria do DEI, reuniram-se os elementos do grupo PE51, sob a presença do Professor João Pedro Dias a fim de colocar o sistema a capturar os primeiros dados.

Foram colocados dois sensores: um na secretária, de forma a captar a distância à pessoa atendida de frente, e outro na lateral. Os limites de mudança de estado foram programados individualmente, mediante a dimensão do espaço.

A folha Excel usada no processo manual pode ser consultada [aqui](https://tinyurl.com/sadas-dei) e o tratamento dos dados recolhidos durante os sete primeiros dias será disponibilizado em breve.

## 2023/04/27

Ao dia vinte e sete de abril de dois mil e vinte e três, pelas catorze horas na secretaria do DEI, reuniram-se os elementos do grupo PE51, sob a presença do Professor João Cardoso.

Os dados recolhidos na anterior experiência mostraram que o sensor frontal conseguiu resultados muito mais precisos ao longo do tempo em relação ao sensor lateral. Por esse motivo o próximo protótipo será colocado de frente em relação à pessoa atendida e constituído por, no mínimo, dois sensores. Estes serão consultados simultaneamente para determinar, com base numa máquina de estados de parâmetros reprogramáveis e com uma exatidão superior, a presença ou ausência de uma pessoa.

Devido à falta de coerência dos dados recolhidos pelos sensores e manualmente é necessário fazer mais testes. Desta vez a folha Excel usada será reformulada para permitir:
- Inserção da hora de início de cada atendimento;
- Inserção da hora de términno de cada atendimento;
- Inserção da forma de atendimento (em pé, sentado);
- Indicação de possíveis erros, como por exemplo um atendimento que não foi reportado adequadamente, para evitar falsos negativos no sistema;
- Descrição do tipo de atendimento: CINF, MCI, PRODEI, ...;

Esta nova experiência será importante para a criação de gráficos de variação da distância ao longo do tempo, de modo a determinar se as condições de transição entre estados estão satisfatórias ou, pelo contrário, necessitam de reformulação. Essa informação será avaliada em termos de precisão, exatidão, percentagem de falsos positivos, falsos negativos, entre outros.
De igual modo serão analisados desvios que não são expectáveis, dentro da hora de funcionamento normal da secretaria do Departamento.

O relatório final irá contemplar a análise desta informação, assim como um fluxograma ou esquema do código que demonstrem as condições de transição de cada um dos três estados implementados (disponível, indisponível, ausente).