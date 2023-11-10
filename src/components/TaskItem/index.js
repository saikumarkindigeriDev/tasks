const TaskItem = props => {
  const {taskDetails, tagsList} = props

  const {enteredText, currentOption} = taskDetails

  const option = tagsList.find(eachList => eachList.optionId === currentOption)

  return (
    <li>
      <h1>{enteredText}</h1>
      <h1>{option.displayText}</h1>
    </li>
  )
}

export default TaskItem
