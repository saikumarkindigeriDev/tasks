const ButtonItem = props => {
  const {buttonDetails, clickButton} = props
  const {displayText, optionId} = buttonDetails

  const onClickButton = () => {
    clickButton(optionId)
  }

  return (
    <li>
      <button type="button" onClick={onClickButton}>
        {displayText}
      </button>
    </li>
  )
}

export default ButtonItem
