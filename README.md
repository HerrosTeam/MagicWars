# MagicWars
Game developed by Daniel Rossetto and Laura Hernando

### 1. Diseño del Juego
*Magic Wars* es un juego de Tower Defense que posee 2 modos de juego: Survival y Levels además de una tienda donde podrás obtener mejoras que te ayuden a lograr la victoria. 

El modo Levels está formado por 10 niveles desbloqueables. Un nivel se desbloquea cuando los niveles que lo preceden han sido ganados. Antes de comenzar cada nivel, se muestra una pantalla con información sobre los defensores y enemigos que se desbloquean en dicho nivel.
Para que el usuario no se canse, en los niveles pares ponemos una música y en los impares otra.

El modo survival es un clásico, donde tendrás que resistir el ataque continuo de las ordas de enemigos que se te presenten.

##### 1.1. Objetivo del juego
➤ Levels: 
El objetivo es desbloquear y conseguir las 3 estrellas de cada nivel. Para ganar, en cada nivel debes eliminar a todos los enemigos sin que estos alcancen tu muralla, consiguiendo así una estrella por completar el nivel. La segunda estrella se obtiene cogiendo al menos un determinado número de pociones. La tercera estrella, se obtiene si el número de defensores que has usado para ganar, no supera un número máximo de defensores. Los números de defensores a situar y de pociones a recoger varían según el nivel.

➤Survival:
El objetivo es conseguir eliminar al máximo número de enemigos que puedas, antes de que estos alcancen tu muralla. Por cada enemigo eliminado, aumentará tu puntuación. Por cada 8 enemigos que mates, se incrementará la dificultad del modo de juego, lo que supone la reducción del tiempo que tardan en aparecer los enemigos, y el aumento del bonus por eliminación, lo que hará que aumente la puntuación que obtienes al eliminar a un enemigo.
    
##### 1.2. Principales mecánicas
➤ Escenario: El escenario es un tablero creado con la herramienta Tiled. El jugador debe colocar en él los elementos defensores necesarios para eliminar a los enemigos, estos aparecen a la derecha del escenario y avanzan en linea recta hacía la izquierda.

➤ Caldero, Magia y Generador de pociones mágicas: El generador crea pociones mágicas en el mapa con una determinada frecuencia. Por defecto, existe un generador de pociones que genera poción cada 6 segundos. El usuario puede consumir magia para colocar calderos en el tablero. Cada caldero posee un generador de pociones. Las pociones otorgan al usuario 25 unidades de magia.

➤ Botones para seleccionar los elementos defensores y el caldero (PlayerButton y CauldronButton): al seleccionar los botones se actualizan las variables de estado del juego que permiten crear en el tablero el elemento defensor seleccionado.

➤ GridTile: Representa un cuadrado del tablero y en ellos, el usuario podrá insertar el elemento defensor que seleccione.

➤ Enemigos y elementos defensores: Definimos sus atributos, colisiones y comportamiento. Los magos lanzan bolas de magia cada dos segundos, cuando detectan que hay al menos un enemigo en la fila de tablero en la que ellos se encuentran. 

➤ Generador de enemigos para el modo de juego Levels: En él especificamos: cuántos enemigos generará, la fila en la se crearán, en qué momento se creará el primer enemigo, cuánto ha de esperar para crear un enemigo desde que se creó el anterior, y qué tipo de enemigo se crea.

➤ Generador de enemigos para el modo de juego Survival: Varía  en cuanto al generador anterior, ya que este genera enemigos de  forma infinita. En él especificamos en qué instante comienzan a generar enemigos, el tiempo entre generación de estos y su fila. Tenemos una variable global para que aumente la dificultad de este modo, con ello reducimos el tiempo que espera para generar nuevos enemigos.

➤ Tienda: A cambio de estrellas (obtenidas en el modo Levels), se pueden mejorar un X% tres tipos de ventajas: reducción del tiempo que tardan en aparecer las pociones, aumento de la vida de los defensores y reducción de la velocidad de los enemigos. Se podrán aplicar un máximo de 5 mejoras a cada ventaja.

### 2. Diseño de la Implementación
Para el desarrollo de Magic Wars hemos utilizado Quintus.

##### 2.1. Arquitectura
A continuación explicaremos los Q.scene que hemos implementado:

➤ startGame: Si es la primera vez que se accede al juego se muestra en la escena "welcome", un diálogo con la introducción del juego y se inicializan las variables de estado necesarias para jugar. StartGame contiene la vista principal del juego, con 2 botones, uno para entrar al modo Levels y otro para entrar al modo Survival.

➤ levels: Escena principal del modo Levels, en ella se cargan los botones que representan a los niveles. Estos varían en función de si el nivel está bloqueado. Si no lo está, se muestra el número de estrellas que se obtuvieron en él.
En esta escena se encuentra un botón para acceder a la tienda del juego. En la parte superior izquierda de la escena, se encuentra un marcador del número de estrellas que se poseen y en la parte superior derecha hay un botón para acceder a las opciones del juego.

➤ options: Contiene 3 opciones: una para activar/desactivar el sonido del juego, otra de ayuda del juego y la última que muestra los créditos.

➤ help y credits: La primera muestra información de ayuda del juego y la segunda los créditos.

➤ storeBackground y store: Representan a la tienda, en ella se muestran el número de estrellas de las que se dispone, y 3 ventajas a mejorar a cambio de estrellas.

➤ pause: Escena que se muestra al pausar el juego, en ella se puede salir del nivel que se esté jugando, activar/desactivar el sonido del juego y despausar el juego.

➤ hud: En ella se encuentran los botones de los defensores que el jugador tiene disponible (varían dependiendo del nivel), un contador de la magia que se posee y en el modo survival, un contador por la puntuación de la partida. 

➤ levelCleared: Se activa cuando se completa un nivel, en ella se muestra el mejor número de estrellas que se haya conseguido en ese nivel. 

➤ levelFailed: Escena que aparece cuando se pierde una partida.

➤ levelDescription: Se muestra antes de acceder a un nivel, cuenta con información sobre enemigos y defensores que se desbloquean en ese nivel. 

➤ Escenas para cada nivel y el survival: Cada nivel tiene una escena donde se definen la cantidad de enemigos que aparecerán. Para conseguir dos estrellas se definen: el número máximo de defesores a poner y el número mínimo de pociones a conseguir. Por último, se definen los spawners con los que contará el nivel.

A continuación explicaremos los Q.sprite que hemos implementado:

➤ StarsLevel: Sirven para mostrar el número de estrellas que se consiguen en cada nivel en lavista levels.

➤ TowerTall: Es la muralla que hay que defender, no tiene ninguna funcionalidad implementada.

➤ SurvivalSpawner y EnemySpawner: Generadores de enemigos que ya hemos explicado previamente.

➤ ObjectPosition: Clase que usan los spawners para fijar las coordenadas de salida (x, y) de los enemigos.

➤ GridTile: Representa una casilla de nuestro mapa, en ella se asentarán defensores. Para implentarlo tuvimos que modificar la librería de touch y relizar varias pruebas.

➤ Defensores y enemigos: Para hacer más sencillo la inserción de defensores al campo y la interacción entre personajes, decidimos que todos los defensores fueran de tipo Player y que cada uno, implemente el componente que lo representa. Sin embargo, cada enemigo tiene una clase que lo representa pero se le añade a todos ellos el componente DefaultEnemy, donde gestionamos la interacción entre personajes y el fin del juego. 

Player: clase a la que pertenecen todos los tipos de defensores, en ella gestionamos las acciones de atacar y morir de estos.

Orc, SwordOrc, AxeOrc, Troll, GreyTroll y RedTroll: son las clases de los enemigos cada uno tiene una velocidad, un daño y una vida determinada. Si se ha mejorado la ventaja que reduce la velocidad de los enemigos, la velocidad es igual a: vx = vx - vx*n/8 veces, donde n es el número de veces que se ha mejorado la ventaja.

➤ MagicBall: Representa a las bolas de magia que generan los magos, de ellas hablaremos en el componente DefaultEnemy.

➤ Potion: en ella implementamos, un método touch, cuando se coge una poción, se obtienen 25 puntos de magia y se incrementa en 1 el contador de pociones cogidas (utilizado para conseguir una estrella en el modo Levels). Desarrollamos también, un método step para que las pociones desaparezcan, 4 segundos después de haber aparecido en el tablero. Con ello, pretendemos que el usuario además de estar alerta de los enemigos presentes, lo esté también de coger pociones para mejorar sus defensas.

➤ PotionGenerator: Genera pociones cada 6 en un rango determinado del mapa (debajo de la región ocupada por GridTiles).
Si se mejora de generación de pociones. La frecuencia con la que se genera una poción es: frecuencia = frecuencia - frecuencia * n/8, donde n es el número de veces que se ha mejorado la ventaja de generación de pociones.  

➤ Cauldron: El jugador podrá llevarlos al campo de batalla. Estos generan un nuevo PotionGenerator, lo que consigue que se generen un mayor número de pociones.

##### 2.2. Principales componentes
➤ Componentes para los defensores (BronzeKnight, SilverKnight, BlackKnight, BasicWizard, FireWizard, IceWizard): Hemos utilizado un componente para cada tipo de defensor, especificando en ellos sus puntos de salud, y el daño que hacen en combate. En los componentes de los magos, hemos implementado que generen bolas de magia cada 2 segundos si hay enemigos en su fila. Las bolas de magia de cada mago son diferentes: las del mago básico, hacen poco daño pero dan 10 puntos de magia por cada vez que estas impacten contra un enemigo. Las del mago de hielo hacen poco daño también, pero reducen un 50% la velocidad del enemigo contra el que impacta durante 1 segundo. Las del mago de fuego hacen mucho daño al enemigo. 
Si se mejora la ventaja de aumento de vida de los defensores la vida de estos será: hp= hp + hp * n/4, donde n es la cantidad de veces que se ha mejorado esta ventaja.

➤ Componente para los enemigos (DefultEnemy): Todos los tipos de enemigo utilizan este componente, en él controlamos las colisiones con defensores, calderos y bolas de magia. Gestionamos: los combates que se lleven a cabo, su muerte o la del enemigo defensor con el que luche, la reducción de velocidad que sufre al impactar con una bola de hielo y el aumento de puntos de magia al impactar contra una bola de magia básica. En su método step controlamos si se pierde el nivel, en el caso en el que un enemigo llegue a la muralla. Por último, controlamos si se gana un nivel cuando los enemigos mueren, si la variable de estado del contador de enemigos eliminados es igual a la variable de enemigos totales del nivel que se está jugando. Entonces se gana el nivel.
Para evitar que los enemigos colisionaran entre ellos tuvimos que modificar la librería 2d.

### 3. Equipo de Trabajo
El equipo está formado por Laura Hernando y Daniel Rossetto. La carga de trabajo ha sido equitativa, es decir, 50% por cada integrante. Ambos hemos tenido que modificar 1 a 1 los sprite de cada personaje del juego, ya que cada sprite tenía un tamaño distinto. A continuación, detallaremos el trabajo que ha realizado cada uno: 

##### 3.1. Laura Hernando Serrano
Creación del tablero del juego mediante la herramienta Tiled.
La clase GridTile y la gestión de las celdas del tablero.
Desarrollo de la clase player y de los componentes de los defensores tipo Knight.
Gestión de colisiones.
Edición de imágenes de los personajes.
Desarrollo y gestión de las escenas del juego. Elaboración de todas las imágenes para su uso en las escenas del juego.
Implementación de la funcionalidad del Store y la gestión de estrellas de los niveles.
Desarrollo del caldero y el generador de pociones.
Búsqueda de música para el juego y su implantación.
Desarrollo de las mecánicas de fin de juego para el modo por niveles.
Desarrollo inicial del hud.
Implementación de la funcionalidad del Store y la gestión de estrellas de los niveles.

##### 3.2. Daniel Rossetto Bermejo
Desarrollo de la clase MagicBalls.
Desarrollo y mejora de las mecánicas y comportamientos de los defensores y enemigos,
mediante el desarrollo de lo siguiente:
 Clases de los enemigos y defensores.
 Gestión del ataque a distancia de los magos.
 Gestión de colisiones.
 Componentes para cada tipo de mago.
 Componente DefaultEnemy.
Gestión de las mecánicas de fin de juego para los dos modos de juego.
Desarrollo del modo survival y del SurvivalRespawn.
Implementación de todos los niveles del modo de juego Levels, gestionando su jugabilidad.
Gestión de las mejoras obtenidas tras su compra en la tienda.
Desarrollo del hud.
Implementación de la funcionalidad del Store y la gestión de estrellas de los niveles.

### 4. Fuentes y Referencias
Los assets de los caballeros, magos, orcos y trolls son de CRAFTPIX.NET.
Para desarrollar la interfaz gráfica hemos partido de un asset de graphicburger.com aunque hemos realizado extensas modificaciones para desarrollar Magic Wars. El fondo de la pantalla de inicio es de bevouliin.com
La música la hemos encontrado a través de opengameheart.org y es de Telaron y Matthew Pablo.
Magic Wars parte de la idea del juego PlantsvsZombies pero no se ha seguido fielmente dicho juego para la realización de Magic Wars. 
Ha sido de gran ayuda la comunidad de Quintus, dónde obtuvimos ayuda para detectar y registrar la posición donde se debían colocar los personajes, concretamente el event listener de mouse move.
