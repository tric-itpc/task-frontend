import React, {Component} from 'react'
import {ICallBackProps, ICallBackState} from './interface'
import {listMessage} from './select/listMessage'
import Input from './input'
import Select from './select'
import TextArea from './textarea'
import Images from './imges'
import Button from './button'
import Email from './email'

import './themes/style.css'


class CallBack extends Component<ICallBackProps, ICallBackState > {

    

    constructor(props:ICallBackProps){
        super(props)

        this.state = {
            fName:"",
            lName:"",
            email:"",
            textMessega:"",
            img:"",
            catMessage:"",
            textResult:"Спасибо Вам за обращение",
            isCatMEssage:false,
            isMail:false,
            isMessageArea:false,
            isImg:false,
            isLengthMessage:true,
            isResult:false
            
        }

    }



    private pushIsTextArea(isMessageArea:boolean){
        this.setState({isMessageArea})
    }

    private pushTextArea(textMessega:string){
        this.setState({textMessega})
    }

    private isLengthMessage(isLengthMessage:boolean){
        this.setState({isLengthMessage})
    }

    private getIsInfoImage(isImg:boolean){
        this.setState({isImg})
    }

    private getNameFile(img:string){
        this.setState({img})
    }

    private getEmail(email:string){
        this.setState({email})
    }


    private isEmail(isMail:boolean){
        this.setState({isMail})
    }

    private getCatMessage(catMessage:string){
        this.setState({catMessage})
    } 

    private isVisibleResultText= () =>{
        return(
            <div className="container-form__result-message">
                {this.state.isResult ? this.state.textResult : ""}
            </div>
        )
    }

    private getData(data:HTMLLIElement){
        const nameField = data.dataset.field
        const valueFieldName = String(data.value)

        if(nameField === "name"){
            this.setState({fName:valueFieldName})
        }else if(nameField === "lname"){
            this.setState({lName:valueFieldName})
        }
    }

    private isCaTMessage = (isCatMEssage:boolean)=>{
        this.setState({isCatMEssage})
    }


    //отправка запроса JSON
    private handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault()
       
        
        if(this.state.isMail && this.state.isCatMEssage){
            if(this.state.fName || this.state.lName){
                if(this.state.isLengthMessage){
                    const {fName,lName,email,catMessage,textMessega,img} = this.state
                    let jsonRequest = {...{fName,lName,email,catMessage,textMessega,img}}
                    

                    alert( JSON.stringify(jsonRequest))

                    this.setState({
                        isResult:true
                    })
                }else{
                    alert("Обратите внимание на текст сообщения")
                }
            }else{
                alert("Заполните Ваше Имя или Фамилию")
            }
        }else{
            alert("Заполните обязательные поля")
        }
    }
    
   




    render(){


        return(
            <div className="container-callback">

                <form method="post" className="container-callback__form container-form" onSubmit={this.handleSubmit}> 
                    <div className="container-form__input">
                        <h1>Обратная связь</h1>
                        <Input className="container-form__input__name" dataTypeField="name" getData={this.getData.bind(this)} placeholder="Ваше имя" name="nameUser" />
                        
                        <Input className="container-form__input__lName" dataTypeField="lname" getData={this.getData.bind(this)} placeholder="Ваша фамилия" name="lastName" />
                        
                        <Email getEmail={this.getEmail.bind(this)} isEmail={this.isEmail.bind(this)}/>
    
                        <Select  listMessage={listMessage} getCatMessage={this.getCatMessage.bind(this)} isCaTMessage={this.isCaTMessage.bind(this)}/> 
    
                        <TextArea  minLength={10} pushIsTextArea={this.pushIsTextArea.bind(this)} pushTextArea={this.pushTextArea.bind(this)} isLengthMessage={this.isLengthMessage.bind(this)}/>  
                        
                        <Images sizeImage={2} acceptImage=".jpg, .png" getIsInfoImage={this.getIsInfoImage.bind(this)}  getNameFile={this.getNameFile.bind(this)} />
                        
                        <Button />
                        {this.isVisibleResultText()}
                    </div>
                </form>
           
            </div>
        )
    }
}

export default CallBack