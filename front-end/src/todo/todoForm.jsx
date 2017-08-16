import React from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconButton'

export default props => {
  const keyHandler = (e) => {
    if (e.key === 'Enter') {
       props.handleAdd(props.todoText)
    } else if (e.key === 'Escape') {
      props.handleClear()
    }
  }

  return (
    <div role='form' className='todoForm'>
      <Grid cols='12 9 10'>
        <input id='description' onKeyDown={keyHandler} className='form-control' placeholder='Adicione uma tarefa' onChange={props.handleChange} value={props.todoText}></input>
      </Grid>
      <Grid cols='12 3 2'>
        <IconButton style='primary' icon='plus' onClick={() => props.handleAdd(props.todoText)}></IconButton>
      </Grid>
    </div>
  )
}