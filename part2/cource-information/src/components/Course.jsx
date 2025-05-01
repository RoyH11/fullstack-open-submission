const Header = (props) => {
    console.log(props)

    return (
        <h2>{props.course}</h2>
    )
}

const Part = (props) => {
    // console.log(props);
    
    return (
        <p>
        {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = (props) => {
    // console.log(props);
    
    return (
        <>
            {props.parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </>
    )
}

const Total = (props) => {
    const totalCount = props.parts.reduce((sum, part) => {
        console.log(sum, "+", part.exercises, "=", sum + part.exercises);
        return sum + part.exercises
    }, 0); 

    return (
        <p><strong>Total of {totalCount} exercises</strong></p>
    )
}

const Course = (props) => {
    return (
        <div>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    )
}

export default Course