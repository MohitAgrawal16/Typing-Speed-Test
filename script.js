const words = 'in one good real one not school set they state high life consider on and not come what also for set point can want as while with of order child about school thing never hold find order each too between program work end you home place around while place problem end begin interest while public or where see time those increase interest be give end think seem small as both another a child same eye you between way do who into again good fact than under very head become real possible some write know however late each that with because that place nation only for each change form consider we would interest with world so order or run more open that large write turn never over open each over change still old take hold need give by consider line only leave while what set up number part form want against great problem can because head so first this here would course become help year first end want both fact public long word down also long for without new turn against the because write seem line interest call not if line thing what work people way may old consider leave hold want life between most place may if go who need fact such program where which end off child down change to from people high during people find to however into small new general it do that could old for last get another hand much eye great no work and with but good there last think can around use like number never since world need what we around part show new come seem while some and since still small these you general which seem will place come order form how about just also they with state late use both early too lead general seem there point take general seem few out like might under if ask while such interest feel word right again how about system such between late want fact up problem stand new say move a lead small however large public out by eye here over so be way use like say people work for since interest so face order school good not most run problem group run she late other problem real form what just high no man do under would to each too end point give number child through so this large see get form also all those course to work during about he plan still so like down he look down where course at who plan way so since come against he all who at world because while so few last these mean take house who old way large no first too now off would in this course present order home public school back own little about he develop of do over help day house stand present another by few come that down last or use say take would each even govern play around back under some line think she even when from do real problem between long as there school do as mean to all on other good may from might call world thing life turn of he look last problem after get show want need thing old other during be again develop come from consider the now number say life interest to system only group world same state school one problem between for turn run at very against eye must go both still all a as so after play eye little be those should out after which these both much house become both school this he real and may mean time by real number other as feel at end ask plan come turn by all head increase he present increase use stand after see order lead than system here ask in of look point little too without each for both but right we come world much own set we right off long those stand go both but under now must real general then before with much those at no of we only back these person plan from run new as own take early just increase only look open follow get that on system the mean plan man over it possible if most late line would first without real hand say turn point small set at in system however to be home show new again come under because about show face child know person large program how over could thing from out world while nation stand part run have look what many system order some one program you great could write day do he any also where child late face eye run still again on by as call high the must by late little mean never another seem to leave because for day against public long number word about after much need open change also'.split(' ');
const wordsCount = words.length;

let gameTime=30;
let timeInterval=null;

const area=document.querySelector('#area');
const game=document.querySelector('#game');
const cursor = document.getElementById('cursor');

function addClass(ev,name){
    ev.className+=' '+name;
}

function removeClass(ev,name){
    ev.className=ev.className.replace(name,'');
}

function randomWord(){

    let i=Math.floor(Math.random()*wordsCount);
    //console.log(words[i]);
    return words[i];
}

function formatWord(w){
    return `<div class="singleWord"><span class="letter">${w.split('').join('</span><span class="letter">')}</span></div>`;
   // return `<div class="singleWord">${w}</div>`;
}

function getWPM(){

    const words = [...document.querySelectorAll('.singleWord')];
    const lastTypedWord = document.querySelector('.singleWord.current');

    const lastTypedWordIndex = words.indexOf(lastTypedWord) + 1;
    const typedWords = words.slice(0, lastTypedWordIndex);
   // console.log(typedWords);

    const correctWords = typedWords.filter(word => {
    const letters = [...word.children];
    const incorrectLetters = letters.filter(letter => letter.className.includes('incorrect'));
    const correctLetters = letters.filter(letter => letter.className.includes('correct'));
      return incorrectLetters.length === 0 && correctLetters.length === letters.length;

    });

  //  console.log(correctWords);
    return correctWords.length*2;
}

function newGame(){
    
    area.innerHTML='';
    document.querySelector('#res').innerHTML='';
    removeClass(game,"over");
    gameTime=30;
    document.querySelector('#info').innerHTML=gameTime+'';
   // cursor.style.marginLeft="5px";
    timeInterval=null;

    for(let i=0;i<200;i++){
        //console.log(randomWord());
        area.innerHTML+=formatWord(randomWord());
    }
    addClass(document.querySelector(".singleWord"),"current");
    addClass(document.querySelector(".letter"),"current");

    cursor.style.left=document.querySelector(".singleWord.current").getBoundingClientRect().left-4+'px';
    cursor.style.top=document.querySelector(".singleWord.current").getBoundingClientRect().top-5+'px';
}

function gameOver(){
    clearInterval(timeInterval);
    addClass(game,"over");
    document.querySelector('#res').innerHTML="Words per minute = "+getWPM()+'';

}
function timer(){
   gameTime--;
   if(gameTime<=0){
    gameOver();
   }
   document.querySelector('#info').innerHTML=gameTime+'';
}


game.addEventListener('keyup',(ev)=>{
    
    if(document.querySelector('#game.over')){
        return;
    }
    const key=ev.key;
    const isLetter= key.length==1 && key!=' ';
    const isSpace= key===' ';
    
    if(!timeInterval && isLetter){
        timeInterval=setInterval(timer,1000);
    }

    const currentLetter=document.querySelector('.letter.current');
    const currentWord=document.querySelector('.singleWord.current');

    if(isSpace && currentLetter==null ){

        removeClass(currentWord,"current");
        addClass(currentWord.nextSibling,"current");
      //  console.log(currentWord.nextSibling.firstChild);
        addClass(currentWord.nextSibling.firstChild,"current");  
   }
   else if(isSpace){
      addClass(currentLetter,"incorrect");
      removeClass(currentLetter,"current");

      if(currentLetter.nextSibling!=null)
      addClass(currentLetter.nextSibling,"current");
   }
   else if(isLetter && currentLetter==null){
      
      const extraLetter=document.createElement('span');
      extraLetter.innerHTML=key;
      extraLetter.className='letter incorrect extra';
      currentWord.appendChild(extraLetter);
   }
   else if(isLetter && currentLetter){
  
      let expected=currentLetter.innerHTML;
      addClass(currentLetter,key==expected ? "correct" : "incorrect");
      removeClass(currentLetter,"current");

      if(currentLetter.nextSibling!=null)
      addClass(currentLetter.nextSibling,"current");
    
  }  
  
    // to display next line  // 37 diff , 165 start
    console.log(currentWord.getBoundingClientRect().top);
    if(currentWord.getBoundingClientRect().top >= 238){
         const margin = parseInt(area.style.marginTop || '0px');
         area.style.marginTop=margin-37+'px';
    }
    
   const nextLetter = document.querySelector('.letter.current');
   const nextWord = document.querySelector('.singleWord.current');
    // move cursor
    if(nextLetter){
        //console.log(nextLetter.getBoundingClientRect().left);
        cursor.style.left=nextLetter.getBoundingClientRect().left -4 + 'px';
        cursor.style.top=nextLetter.getBoundingClientRect().top -5+'px';
    }else if(nextWord){
        cursor.style.left=nextWord.getBoundingClientRect().right -5+ 'px';
        cursor.style.top=nextWord.getBoundingClientRect().top-5+'px';
    }

   

 });


document.querySelector("#newBtn").addEventListener('click',()=>{
    newGame();
})

newGame();
