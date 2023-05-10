import {Component} from 'react'
import {v4} from 'uuid'
import {
  MainContainer,
  CreateTaskDiv,
  CreateForm,
  FormHeading,
  LabelInputDiv,
  Label,
  Input,
  SelectInput,
  OptionInput,
  FormBtn,
  AddTaskDiv,
  MainHeading,
  TagListUl,
  TagList,
  TagBtn,
  TaskUl,
  TaskListLi,
  TaskText,
  TaskTag,
  NoTaskText,
} from './styledComponents'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class Home extends Component {
  state = {
    inputText: '',
    inputTag: tagsList[0].optionId,
    tasksList: [],
    activeTag: 'INITIAL',
  }

  submitForm = event => {
    event.preventDefault()
    const {inputText, inputTag} = this.state
    const newTask = {
      id: v4(),
      task: inputText,
      tag: inputTag,
    }
    if (inputText.length !== 0) {
      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, newTask],
        inputText: '',
        inputTag: '',
      }))
    }
  }

  onChangeInput = event => {
    this.setState({inputText: event.target.value})
  }

  onChangeTag = event => {
    this.setState({inputTag: event.target.value})
  }

  renderCreateTaskView = () => {
    const {inputText, inputTag} = this.state

    return (
      <CreateTaskDiv>
        <CreateForm onSubmit={this.submitForm}>
          <FormHeading>Create a task!</FormHeading>
          <LabelInputDiv>
            <Label htmlFor="inputText">Task</Label>
            <Input
              type="text"
              id="inputText"
              onChange={this.onChangeInput}
              value={inputText}
              placeholder="Enter the task here"
            />
          </LabelInputDiv>
          <LabelInputDiv>
            <Label htmlFor="selectTag">Tags</Label>
            <SelectInput
              onChange={this.onChangeTag}
              value={inputTag}
              id="selectTag"
            >
              {tagsList.map(each => (
                <OptionInput value={each.optionId} key={each.optionId}>
                  {each.displayText}
                </OptionInput>
              ))}
            </SelectInput>
          </LabelInputDiv>
          <FormBtn type="submit">Add Task</FormBtn>
        </CreateForm>
      </CreateTaskDiv>
    )
  }

  renderTaskCard = () => {
    const {tasksList, activeTag} = this.state
    const filterTaskList =
      activeTag === 'INITIAL'
        ? tasksList
        : tasksList.filter(each => each.tag === activeTag)
    return (
      <>
        {filterTaskList.map(each => (
          <TaskListLi key={each.id}>
            <TaskText>{each.task}</TaskText>
            <TaskTag>{each.tag}</TaskTag>
          </TaskListLi>
        ))}
      </>
    )
  }

  onClickActiveTag = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  renderAddTaskView = () => {
    const {tasksList, activeTag} = this.state

    return (
      <AddTaskDiv>
        <MainHeading>Tags</MainHeading>
        <TagListUl>
          {tagsList.map(each => {
            const isActive = activeTag === each.optionId
            return (
              <TagList key={each.optionId}>
                <TagBtn
                  type="button"
                  value={each.optionId}
                  onClick={this.onClickActiveTag}
                  isActive={isActive}
                >
                  {each.displayText}
                </TagBtn>
              </TagList>
            )
          })}
        </TagListUl>
        <MainHeading>Tasks</MainHeading>
        <TaskUl>
          {tasksList.length === 0 ? (
            <NoTaskText>No Tasks Added Yet</NoTaskText>
          ) : (
            this.renderTaskCard()
          )}
        </TaskUl>
      </AddTaskDiv>
    )
  }

  render() {
    return (
      <MainContainer>
        {this.renderCreateTaskView()}
        {this.renderAddTaskView()}
      </MainContainer>
    )
  }
}

export default Home
