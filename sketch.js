//let txt ="What sphinx of cement and aluminum bashed open their skulls and ate up their brains and imagination? Moloch! Solitude! Filth! Ugliness! Ashcans and unobtainable dollars! Children screaming under the stairways! Boys sobbing in armies! Old men weeping in the parks! Moloch! Moloch! Nightmare of Moloch! Moloch the loveless! Mental Moloch! Moloch the heavy judger of men! Moloch the incomprehensible prison! Moloch the crossbone soulless jailhouse and Congress of sorrows! Moloch whose buildings are judgment! Moloch the vast stone of war! Moloch the stunned governments! Moloch whose mind is pure machinery! Moloch whose blood is running money! Moloch whose fingers are ten armies! Moloch whose breast is a cannibal dynamo! Moloch whose ear is a smoking tomb! Moloch whose eyes are a thousand blind windows! Moloch whose skyscrapers stand in the long streets like endless Jehovahs! Moloch whose factories dream and croak in the fog! Moloch whose smoke-stacks and antennae crown the cities! Moloch whose love is endless oil and stone! Moloch whose soul is electricity and banks! Moloch whose poverty is the specter of genius! Moloch whose fate is a cloud of sexless hydrogen! Moloch whose name is the Mind! Moloch in whom I sit lonely! Moloch in whom I dream Angels! Crazy in Moloch! Cocksucker in Moloch! Lacklove and manless in Moloch! Moloch who entered my soul early! Moloch in whom I am a consciousness without a body! Moloch who frightened me out of my natural ecstasy! Moloch whom I abandon! Wake up in Moloch! Light streaming out of the sky! Moloch! Moloch! Robot apartments! invisible suburbs! skeleton treasuries! blind capitals! demonic industries! spectral nations! invincible madhouses! granite cocks! monstrous bombs! They broke their backs lifting Moloch to Heaven! Pavements, trees, radios, tons! lifting the city to Heaven which exists and is everywhere about us! Visions! omens! hallucinations! miracles! ecstasies! gone down the American river! Dreams! adorations! illuminations! religions! the whole boatload of sensitive bullshit! Breakthroughs! over the river! flips and crucifixions! gone down the flood! Highs! Epiphanies! Despairs! Ten years’ animal screams and suicides! Minds! New loves! Mad generation! down on the rocks of Time! Real holy laughter in the river! They saw it all! the wild eyes! the holy yells! They bade farewell! They jumped off the roof! to solitude! waving! carrying flowers! Down to the river! into the street!"

//let txt = "I saw the best minds of my generation destroyed by madness, starving hysterical naked, dragging themselves through the streets at dawn looking for an angry fix, angelheaded hipsters burning for the ancient heavenly connection to the starry dynamo in the machinery of night I saw"
// I repeated the words and it does not run out of possibilities
//let txt ="I-saw-the-best-minds-of-my-generation-destroyed-by-madness-"
//let txt =" l i f e "
//let txt= "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair. It was"
//let txt ="the theremin is theirs. ok? yes, it is. this is a theremin."
let order = 10;
let ngrams = {};
let button;
let foo = new p5.Speech();
let ld; // for loading the the text files as a list of strings
let pholder;
let sel;
let nholder;
let intext; //text from textbox
let myoutput;
let clearit;
let resetit;
let readfrombegin;
let txt;

// javascript object ngram and array that follows it

function setup() {
  noCanvas();
  //nslide = createSlider(1, 10, 5, 1)
  //nslide.changed(makeLM)
  intext = select("#intxt");
  myoutput = select("#out");
  clearit = select("#clearit");
  resetit = select("#resetit");
  readfrombegin = select("#readfrombegin");

  submitButton = select("#submit");
  //submitButton.mousePressed(diit);
  clearit.mousePressed(makeclear);
  resetit.mousePressed(makereset);

  sel = select("#ngramsel");
  sel.option(10);
  sel.option(9);
  sel.option(8);
  sel.option(7);
  sel.option(6);
  sel.option(5);
  sel.option(4);
  sel.option(3);
  sel.option(2);
  sel.option(1);
  sel.selected(5);
  sel.changed(makeLM);
  button = createButton("GENERATE");
  button.style("font-size", "30px");
  button.mouseReleased(doit);
  nholder = createP("n = " + sel.option());
  pholder = createP("OUTPUT");
  print(sel.option(5));
  //txt = intxt.value().trim().replaceAll("\r", " ").replaceAll("\n", " "); // convert the list of strings into one big string
  print("bing", txt);
  makeLM();
}

function makeclear() {
  intext.value("");
  console.log("Clear");
}

function doit() {
  makeLM();
  markovit();
}

function makeLM() {
  print(intext.value());
  txt = intext.value().trim().replaceAll("\r", " ").replaceAll("\n", " "); // convert the list of strings into one big string
  // needed to clear the object
  ngrams = {};
  // get the order from select
  order = parseInt(sel.value());

  print("order", order);
  for (let i = 0; i <= txt.length - order; i++) {
    let gram = txt.substring(i, i + order);

    if (!ngrams[gram]) {
      //when I find a new n gram make an array to be the value of the key
      ngrams[gram] = [];
    }
    // always push the the character that follows the n gram
    if (txt.charAt(i + order) === "") {
      // but if it has no value push a space
      ngrams[gram].push(" ");
    } else {
      ngrams[gram].push(txt.charAt(i + order));
    }
  }
  print("made language model");
  print(ngrams);
  nholder.html("n = " + sel.value());
}

function markovit() {
  // algorithm that generates the text

  // get start by getting a random key from grams as seed

  let keys = Object.keys(ngrams);
  let currentGram = random(keys);

  //let currentGram =txt.substring(0,order);
  //let currentGram ="greg"
  //let currentGram = random(ngram)
  print(currentGram);

  let result = currentGram;

  for (let i = 0; i < 400; i++) {
    let possibilities = ngrams[currentGram];

    if (!possibilities) {
      print(currentGram, "no possibilities");
      break; //incase it is undifined
    }

    let next = random(possibilities);
    if (next == "") {
      print(ngrams[currentGram], "picked dead value for that key");
      break;
    }

    result += next;

    // set current gram to the n gram of the text you are createing
    let len = result.length;

    currentGram = result.substring(len - order, len);
  }
  // clean up the result try and start and finish with full words
  // check for first space in in string so the start of the passage is not
  // just a part of a word then
  // cut off the front
  let spaceindex = 0;
  while (result[spaceindex] != " ") {
    spaceindex++;
  }
  let result2 = result.slice(spaceindex);

  // cut off the back

  spaceindex = result2.length;
  while (result2[spaceindex] != " ") {
    spaceindex--;
  }
  let result3 = result2.slice(0, spaceindex);
  //createP(result2)
  //createP(result3)
  //createP("MARKOV GENERATED CHILDHOOD HALLUCINATION "+ result.length)
  pholder.html(result3);
  //foo.speak(result)
}

function makereset() {
  intext.value(`
  Of Man’s first disobedience, and the fruit
  Of that forbidden tree whose mortal taste
  Brought death into the World, and all our woe,
  With loss of Eden, till one greater Man
  Restore us, and regain the blissful seat,
  Sing, Heavenly Muse, that, on the secret top
  Of Oreb, or of Sinai, didst inspire
  That shepherd who first taught the chosen seed
  In the beginning how the heavens and earth
  Rose out of Chaos: or, if Sion hill
  Delight thee more, and Siloa’s brook that flowed
  Fast by the oracle of God, I thence
  Invoke thy aid to my adventurous song,
  That with no middle flight intends to soar
  Above th’ Aonian mount, while it pursues
  Things unattempted yet in prose or rhyme.
  And chiefly thou, O Spirit, that dost prefer
  Before all temples th’ upright heart and pure,
  Instruct me, for thou know’st; thou from the first
  Wast present, and, with mighty wings outspread,
  Dove-like sat’st brooding on the vast Abyss,
  And mad’st it pregnant: what in me is dark
  Illumine, what is low raise and support;
  That, to the height of this great argument,
  I may assert Eternal Providence,
  And justify the ways of God to men.
  Say first—for Heaven hides nothing from thy view,
  Nor the deep tract of Hell—say first what cause
  Moved our grand parents, in that happy state,
  Favoured of Heaven so highly, to fall off
  From their Creator, and transgress his will
  For one restraint, lords of the World besides.
  Who first seduced them to that foul revolt?
  Th’ infernal Serpent; he it was whose guile,
  Stirred up with envy and revenge, deceived
  The mother of mankind, what time his pride
  Had cast him out from Heaven, with all his host
  Of rebel Angels, by whose aid, aspiring
  To set himself in glory above his peers,
  He trusted to have equalled the Most High,
  If he opposed, and with ambitious aim
  Against the throne and monarchy of God,
  Raised impious war in Heaven and battle proud,
  With vain attempt. Him the Almighty Power
  Hurled headlong flaming from th’ ethereal sky,
  With hideous ruin and combustion, down
  To bottomless perdition, there to dwell
  In adamantine chains and penal fire,
  My recent work involves me as an artist-teacher hosting pedagogical projects with student participants within higher education contexts in the UK and China, where questions and phenomena related to the politics of production in art schools are explored. Here, by enacting participatory projects in and through the authoritative mechanism of 'school,' I aim to complicate imaginary narratives of 'educational empowerment' and 'creative freedom' by revealing the ways in which artistic labor is delegated, incentivized, and quantified within institutional contexts.
​Taking a social science approach to facilitating workshops, approaches ranging from experimental, absurdist to disorienting are employed as methods of provocation and condensed reflections of real-world phenomena. The 'work' then is intended to go beyond being distilled as an obscure and personalized artistic product or statement and instead becomes social, explicit in its function as a set of pedagogical techniques. Implicating the schooling system and the status of the teacher in participatory projects, the following phenomena related to participation in cultural and academic contexts are addressed: product-oriented participation, participation as alienated labor, non-voluntary participation, participation as conformity, participation as formality, and participation as mass spectacle.`);
}
