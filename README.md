<h1>MIASHS Master 2 DCISS - TODOLIST</h1>

<h2>Installation</h2>
<p>Pour installer le projet , il vous faut cloner le répertoire et installer toutes les dépendances:</p>
<ul>
    <li>git clone https://github.com/laroseg54/AngularTodoList.git</li>
    <li>cd AngularTodoList</li>
    <li>npm install</li>
    <li>npm start</li>
</ul>
<h2>Fonctionnalités développées</h2>

<h3>Effacer Tout</h3>
<p>Un bouton en forme de poubelle se situe en haut à gauche de la liste,il permet d'effacer tout les items de celle-ci.</p>
<p> Il n'apparait pas s'il n'y a pas d'items dans la liste</p>

<h3>Undo Redo</h3>
<p>Deux boutons sont situés en haut à droite de la liste pour la mise en ouvre de cette fonctionnalité.</p>
<p>Ils n'apparaissent pas s'il n'est pas possible de faire un undo ou un redo</p>
<h3>Local Storage</h3>
<p>Cette fonctionnalité enregistre automatiquement la todolist afin de permettre de ne pas pedre ses données quand on ferme a page.</p>
<h3>Geolocalisation</h3>
<ul>
  <li>Ajout d'une carte google maps de la librairie AGM en bas de la todolist</li>
  <li>Ajout d'une icone map à coté de chachun des todoItems , quand on clique dessus on peut enregistrer un lieu pour l'item</li>
  <li>en tapant dans cet input, l'api google maps places nous propose automatiquement des suggestions de lieu</li>
  <li>Une fois qu'on a enregistré le lieu (en tapant sur entrée), un marqueur s'ajoute sur la map représentant le lieu </li>
  <li>En passant la souris sur un marqueur une bulle d'info s'affiche qui indique quel item il représente</li>
  <li>Le marqueuer change de couleur selon que le todoitem est complété ou non</li>
  <li>Changer la location d'un item fera changer le marqueur de place sur la map</li>
</ul>

<h3>Difficultés recontrés</h3>
 <p>Pas vraiment de difficulté rencontré mis à part qu'au départ je voulais afficher la map dans une div pop up mais je n'ai jamais réussi à le faire sans casser tout le style de la todolist</p>
 <p>j'ai donc laissé la map en bas. Egalement toujours avec la map , je n'ai jamais réussi à la faire centrer sur la position de l'utilsateur à l'ouverture de la page car la fonction qui devrait marcher sur </p>
 <p> le papier se comporte bizarrement (je l'ai malgré tout laissée dans le code) </p> 
