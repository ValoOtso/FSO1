const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercises}
      </p>
    )
  }
  
  const Content = (props) => {
    return (
      <ul>
          {props.parts.map(part => 
            <Part key={part.id} 
            part={part.name}
            exercises={part.exercises} />
          )}
      </ul>
    )
  }
  
  const Course = (props) => {
    const exercises = props.course.parts.map(part =>
      part.exercises
    )
    const total = exercises.reduce((accumulator, currentValue) => accumulator + currentValue)
    return (
      <div>
      <Header course = {props.course.name}/>
      <Content parts = {props.course.parts}/>
      <Total total = {total}/>
    </div>
    )
  }
  
  const Total = (props) => {
    return (
      <>
      <p>Number of exercises {props.total}</p>
      </>
      
    )
  }

export default Course