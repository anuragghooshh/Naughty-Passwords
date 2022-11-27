import React from 'react';
import { reverse, showAlert } from './Script/operations';
import copy from 'copy-to-clipboard';
import crtVid from './resources/crt.mp4';
import copyButton from './resources/Copy.svg';
import regenerateButton from './resources/Refresh.svg'
import './Style/App.css';

class App extends React.Component<{}, { password: string, strength: string }>{
  
  constructor(props:any){
    super(props);
    this.state = {
      password : "(^_^)",
      strength : "Strength",
    }
  }

  render(){
    //Variables & Constants
    var uncheckedIndex : number = 0;

    //Check Strength
    const checkStrength = (password:string) =>{
      var len = password.length;

      if(len<12){
        this.setState({strength:"Usable"});
        return;
      }
      if(len<18){
        this.setState({strength:"Ideal"});
        return;
      }
      if(len<25){
        this.setState({strength:"Strong"});
        return;
      }
    }

    //Password Generator
    const setPassword = (e?:any) =>{
      var trigger=4;
      const checkBox = document.querySelectorAll('.CharCheckBox');

      for(let i=0;i<checkBox.length;i++){
        let x : HTMLInputElement = checkBox[i] as HTMLInputElement;  
        if (x.checked !== true){
          trigger-=1;
          uncheckedIndex=i;
        }  
      }

      if(trigger <= 1){
        let x : HTMLInputElement = checkBox[uncheckedIndex] as HTMLInputElement;  
        x.checked = true;
        setPassword();
      }

      var lenInputVal = document.getElementById("lenInput") as HTMLInputElement;
      let length : number = Number(lenInputVal.value); //Length of password

      if (length > 25 || length < 8){
        showAlert("Firstly enter a valid length between 8 and 25.",1850,"error");
        return;
      }

      var generated:string = "";
      var options:string = "";

      checkBox.forEach(checkBox =>{
        let x : HTMLInputElement = checkBox as HTMLInputElement;  
        if (x.checked === true){
          let chars:string = x.value;
          options+=chars;
        }
      }) 

      let n = options.length;
      for(let i=0;i<length;i++){
        let randIndex:number = Math.floor(Math.random() * n);
        generated+=options[randIndex];
      }
      
      trigger=0;
      this.setState({password:`${reverse(generated)}`});
      checkStrength(generated);
    }

    //Copy to clipboard
    const copyToClipboard = () =>{
      if (String(this.state.password).length < 8 ){
        showAlert("Generate a password first!",1500,"error");
        return;
      }
      copy(this.state.password);
      showAlert("Password copied successfully!",1000,"success");
      // navigator.clipboard.writeText(String(this.state.password));
    }

    //Slider & Input Control
    const lenInputChange = (e:React.FormEvent) => {
      const lenInputVal = document.getElementById("lenInput") as HTMLInputElement;
      const lenSliderVal = document.getElementById("lenSlider") as HTMLInputElement;
      lenSliderVal.value = lenInputVal.value;
      setPassword();
    }
    
    const sliderInputChange = (e:React.FormEvent) => {
      const lenInputVal = document.getElementById("lenInput") as HTMLInputElement;
      const lenSliderVal = document.getElementById("lenSlider") as HTMLInputElement;
      lenInputVal.value = lenSliderVal.value;
      setPassword();
    }

    return (
      <>
        <video src={crtVid} autoPlay muted loop id="myVideo"/>
        <div className="alertHolder">
          <div>
            <p id='alertText'/>
          </div>
        </div>
        <div className="App">
          <div className="container">
            <header>
              <h1>PASSWORD GENERATOR</h1>
            </header>
  
            <div className="controls">
  
              <div className="control1">
                <div className="length">
                  <h3>Length</h3>
                  <input type="number" id="lenInput" min="8" max="25" onChange={lenInputChange}/>
                </div>
                <input type="range" id="lenSlider" min="8" max="25" onInput={sliderInputChange} />
              </div>
  
              <div className="control2">
                <form action="/action_page.php">
                  <label htmlFor="Numbers">Numbers</label>
                  <input type="checkbox" className='CharCheckBox' id="numbers" name="Numbers" value="0123456789" defaultChecked={true} onChange={setPassword}/>
                </form>
                <form action="">
                  <label htmlFor="Uppercase">Uppercase</label>
                  <input type="checkbox" className='CharCheckBox' id="uppercase" name="Uppercase" value="ABCDEFGHIJKLMNOPQRSTUVWXYZ" defaultChecked={true} onChange={setPassword}/>
                </form>
              </div>
              
              <div className="control3">
                <form action="/action_page.php">
                  <label htmlFor="Symbols">Symbols</label>
                  <input type="checkbox" className='CharCheckBox' id="symbols" name="Symbols" value={"~`!@#$%^&*()_-+={[}]|:;'<,>.?"} defaultChecked={true} onChange={setPassword}/>
                </form>
                <form action="">
                  <label htmlFor="Lowercase">Lowercase</label>
                  <input type="checkbox" className='CharCheckBox' id="lowercase" name="Lowercase" value="abcdefghijklmnopqrstuvwxyz" defaultChecked={true} onChange={setPassword}/>
                </form>
              </div>
            </div>
            <div id='strength' className={this.state.strength}>
              <h3>{this.state.strength}</h3>
            </div>
            <div className="result">
              <div className="passwordHolder">
                <h3 id="password">{this.state.password}</h3>
              </div>
              <div className="buttonHolder">
                <button onClick={copyToClipboard}><img src={copyButton} alt="Copy" title='Copy to Clipboard!' /></button>
                <button onClick={setPassword}><img src={regenerateButton} alt="Copy" title='Generate new Password!' /></button>
              </div>
            </div>
            <p>Developed with &#x2764; by <span style={{color:"#88e9a5"}}>Anurag Ghosh</span></p>
          </div>
        </div>
      </>
    );
  }
}

export default App;