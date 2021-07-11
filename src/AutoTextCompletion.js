import React from 'react';
import './AutoCompletion.css';
import {ImCross} from 'react-icons/im';

class AutoCompleteText extends React.Component{
        state = {
            items: [
             'JavaScript ',
              'HTML',
              'CSS',
              'React js',
              'React Native',
              'Node js',
              'Express js',
              'MongoDB',
              'Python',
              'Java',
              'Machine Learning',
              'Data science',
              'Android Studio'

            ],
            suggestions: [],
            text: '',
            selectedItems: []
        }

    

    onTextChanged = (e)=>{
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0){
            const regex = new RegExp(value,'i');
            suggestions= this.state.items.sort().filter(v => regex.test(v));
        }

        if(!suggestions.includes(value)){
            if(!this.state.selectedItems.includes(value)){
                suggestions.push(value)
            }
           
        }
        this.setState(()=>({suggestions, text:value}));
    }

    suggestionSelected(value){
        let list= this.state.selectedItems;
        let items_list= this.state.items;
        list.push(value)
        let index= items_list.indexOf(value)
        if (index !== -1) {
            items_list.splice(index, 1);
          }
        this.setState(() => ({
            text: '',
            suggestions: [],
            selectedItems: list,
            items: items_list
        }))
    }

    renderSuggestions(){
        const {suggestions} = this.state;
        if(suggestions.length === 0){
            return null;    
        }

        return(
            <ul>
                {suggestions.map((item) => <li key={item} onClick={()=> this.suggestionSelected(item)}>{item}</li>)}
            </ul>
        );
    }

    DeleteItem = (item) =>{
       let selectedItems = this.state.selectedItems;
       let items = this.state.items
        if(selectedItems.includes(item)){
            let index = selectedItems.indexOf(item)
            selectedItems.splice(index, 1);
            items.push(item)
        }

        this.setState({
            selectedItems:selectedItems,
            items: items
        })
    }

    render(){
        const {text} = this.state;
        return(
            <div className='SearchBoxInput'>
                <div  className='SelctedItems'>
                    {this.state.selectedItems.map(item =>(
                         <div className='SelctedItem' key={item}> 
                           <span>{item}</span>
                           <ImCross onClick={() => this.DeleteItem(item)} className='icon' />
                         </div>
                    ))}
                </div>
               <div className='AutoCompletion'>
                  <input value={text} onChange={this.onTextChanged} type='text' />
                  {this.renderSuggestions()}
               </div>
            </div>
           
        )
    }
}

export default AutoCompleteText;