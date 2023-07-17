# SADAS-DEI
## Sinalização Automática de Disponibilidades para Atendimento na Secretaria do DEI
### System for automatic detection of availability for Informatics Department Secretary

- [Meetings](/docs/Meetings.md)
- [Requirements](/docs/Requirements.md)
- [Report](/docs/finalreport.pdf)

## How to put everything running
> ### __Raspberrypi Initializations__
>  For this step we need a screen of a computer or just a screen to connect with Raspberrypi so we can run the following commands:
>
> __Run the InfluxDB__
>  - <i>cd src/db</i>
>  - <i>docker compose up</i>
>
> __Run the Server that is updating each Table state__
> - <i>cd src/dashboard</i>
> - <i>npm start</i>

> ### __Setup of the M5 and the Sensors__
> Each box contains a M5 micro-controller and 3 sensors pointed to different directions
>
> __M5 and Sensors Connections__
> - <i>Vcc - 5V
> - Trig - G22
> - Echo - G19
> - Gnd - G</i>
>
> __Box Setup__
> - The box must be placed on the desk
> - Pointed to the Attendee's chair
> - Above the chair's __height__


## Group

- André Correia da Costa (up201905916@fe.up.pt)
- Fábio Araújo de Sá (up202007658@fe.up.pt)
- Lourenço Alexandre Correia Gonçalves (up202004816@fe.up.pt)
- Marcos William Ferreira Pinto (up201800177@fe.up.pt)

Proponente: João MP Cardoso (jmpc@fe.up.pt) <br>
Monitor: João Pedro Dias (jpmdias@fe.up.pt)