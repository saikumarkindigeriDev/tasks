import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TaskItem from './components/TaskItem'
import ButtonItem from './components/ButtonItem'
import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
    isTrue: false,
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
    isTrue: false,
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
    isTrue: false,
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
    isTrue: false,
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
    isTrue: false,
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
    isTrue: false,
  },
]

class App extends Component {
  state = {
    tasksList: [],
    enteredText: '',
    selectedTag: '',
    buttonsList: tagsList,

    currentOption: tagsList[0].optionId,
  }

  clickButton = id => {
    const {buttonsList} = this.state
    const selectedButton = buttonsList.find(
      eachButton => eachButton.optionId === id,
    )
    if (selectedButton.isTrue === false) {
      const filteredList = buttonsList.map(item => {
        if (item.optionId === id) {
          return {...item, isTrue: true}
        }
        return {...item, isTrue: false}
      })
      console.log(filteredList)

      this.śetState({buttonsList: filteredList, selectedTag: id})
    }

    if (selectedButton.isTrue === true) {
      const filteredList = buttonsList.map(item => {
        if (item.optionId === id) {
          return {...item, isTrue: false}
        }
        return item
      })
      console.log(filteredList)

      this.śetState({buttonsList: filteredList, selectedTag: ''})
    }
  }

  changeText = e => {
    this.setState({enteredText: e.target.value})
  }

  changeOption = e => {
    this.setState({currentOption: e.target.value})
  }

  submitForm = e => {
    e.preventDefault()
    const {enteredText, currentOption} = this.state
    const newTask = {
      id: uuidv4(),
      enteredText,
      currentOption,
    }

    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, newTask],
      enteredText: '',
      currentOption: tagsList[0].optionId,
    }))
  }

  render() {
    const {
      tasksList,
      currentOption,
      enteredText,
      buttonsList,
      selectedTag,
    } = this.state
    const filteredTasks = tasksList.filter(eachTask =>
      eachTask.currentOption.includes(selectedTag),
    )
    console.log(tasksList)

    return (
      <div>
        <div className="left-container">
          <form className="form-container" onSubmit={this.submitForm}>
            <h1>Create a task!</h1>
            <div>
              <label htmlFor="textInput">Task</label>
              <input
                type="text"
                id="textInput"
                placeholder="Enter the task here"
                value={enteredText}
                onChange={this.changeText}
              />
            </div>
            <div>
              <label htmlFor="tags">Tags</label>
              <select value={currentOption} onChange={this.changeOption}>
                {tagsList.map(eachList => (
                  <option key={eachList.optionId} value={eachList.optionId}>
                    {eachList.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="submit-button">
              Add Task
            </button>
          </form>
        </div>

        <div className="right-container">
          <div className="tags-container">
            <h1>Tags</h1>
            <ul>
              {buttonsList.map(eachList => (
                <ButtonItem
                  key={eachList.optionId}
                  buttonDetails={eachList}
                  clickButton={this.clickButton}
                />
              ))}
            </ul>
          </div>
          <div className="tasks-container">
            <h1>Tasks</h1>
            {tasksList.length > 0 ? (
              <ul>
                {filteredTasks.map(eachTask => (
                  <TaskItem
                    key={eachTask.optionId}
                    tagsList={tagsList}
                    taskDetails={eachTask}
                  />
                ))}
              </ul>
            ) : (
              <h1>No Tasks Added Yet</h1>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
