# Requisitos

- [ ] Modular e escalável, de modo a permitir de forma simples a inserção e remoção de sensores e ajustes nos mesmos;
- [ ] Não intrusivo, haverá apenas sensores para captação de distâncias;
- [ ] Sensível aos horários de funcionamento da secretaria do DEI. Fora dos horários estipulados por omissão nenhum posto de trabalho estará disponível para atendimento;
- [ ] Externo à rede interna da FEUP. Um Raspberry Pi será o único dispositivo responsável por aceder, coordenar e interpretar os dados recolhidos de todos os sensores e mostrá-los num ecrã da vitrine;
- [ ] Cada posto de trabalho será independente dentro do sistema e será representado por um de três estados:
    - Vermelho / Ocupado;
    - Verde / Disponível;
    - Amarelo / Indisponível;
- [ ] Apesar da *deadline* ser o fim de semestre, convém ter o sistema pronto e instalado um mês antes por motivos de testes e ajustes;